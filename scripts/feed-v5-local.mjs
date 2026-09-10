import {execFileSync, spawn, spawnSync} from "node:child_process";
import net from "node:net";
import {assertNode24} from "./feed-v5-runtime.mjs";
import {runBrowserScenario} from "./browser-smoke.mjs";

const root = new URL("..", import.meta.url).pathname.replace(/\/$/, "");
const env = {
    ...process.env,
    NODE_ENV: "development",
    IS_OFFLINE: "true",
    AWS_ENDPOINT_URL: "http://localhost:4566",
    AWS_REGION: "us-east-1",
    SERVICE_POSTS_DYNAMODB_TABLE: "local-posts",
    SERVICE_AUTH_INFO_DYNAMODB_TABLE: "local-authInfo",
    HIDDEN_POST_SOURCES: "github",
    NODE_CONFIG: JSON.stringify({
        sentry: {dsn: ""},
        gtm: {container: {id: ""}},
        mixpanel: {app: {id: ""}},
        crisp: {app: {id: ""}},
        posts: {
            postsUrl: "http://localhost:3006/posts",
            photosUrl: "http://localhost:3006/posts?type=Photo",
            wordsUrl: "http://localhost:3006/posts?type=Post",
            feedUrl: "http://localhost:3006/posts/feed.rss"
        },
        www: {publishUrl: "http://localhost:8080"}
    })
};
const children = new Set();
let ownsLocalStack = false;

const assertPortAvailable = port => new Promise((resolve, reject) => {
    const socket = net.createConnection({host: "127.0.0.1", port});
    socket.once("connect", () => {
        socket.destroy();
        let owner = "unknown owner";
        try { owner = execFileSync("lsof", ["-nP", `-iTCP:${port}`, "-sTCP:LISTEN"], {encoding: "utf8"}).trim().split("\n").slice(-1)[0] || owner; } catch {}
        reject(new Error(`Local feed port ${port} is already in use (${owner}); stop the existing owner before retrying.`));
    });
    socket.once("error", error => {
        socket.destroy();
        if (error.code === "ECONNREFUSED") resolve();
        else reject(error);
    });
});

const run = (command, args, options = {}) => new Promise((resolve, reject) => {
    const child = spawn(command, args, {cwd: root, env, stdio: "inherit", detached: true, ...options});
    children.add(child);
    child.once("exit", code => {
        children.delete(child);
        if (code === 0) resolve();
        else reject(new Error(`${command} ${args.join(" ")} exited with ${code}`));
    });
    child.once("error", reject);
});

const readinessAttempts = Number.parseInt(process.env.FEED_V5_READINESS_ATTEMPTS || "60", 10);
const readinessIntervalMs = Number.parseInt(process.env.FEED_V5_READINESS_INTERVAL_MS || "500", 10);

const waitFor = async (url, attempts = readinessAttempts, intervalMs = readinessIntervalMs) => {
    let lastError = "no response";
    for (let attempt = 1; attempt <= attempts; attempt++) {
        try {
            const response = await fetch(url);
            if (response.ok || response.status === 404) return;
            lastError = `HTTP ${response.status}`;
        } catch (error) {
            lastError = error.message;
        }
        console.log(`Readiness retry ${attempt}/${attempts} for ${url}: ${lastError}`);
        await new Promise(resolve => setTimeout(resolve, intervalMs));
    }
    throw new Error(`Timed out waiting for ${url} after ${attempts} attempts; last error: ${lastError}`);
};

const runSentinel = async () => {
    const sentinelUid = "s3--@me/sep!-s3-1200";
    const requestOptions = {headers: {"ME-API-VERSION": "5"}};
    const response = await fetch("http://localhost:3006/posts?perPage=100", requestOptions);
    if (!response.ok) throw new Error(`Sentinel API request failed: HTTP ${response.status}`);
    const payload = await response.json();
    const sentinel = payload.posts?.find(post => post.source === "s3" && post.id === "s3-1200");
    if (!sentinel) throw new Error(`Sentinel API response did not contain fixture post ${sentinelUid}; received ${payload.posts?.map(post => `${post.source}:${post.id}`).join(", ")}`);

    const pageResponse = await fetch("http://localhost:3006/posts?perPage=2", requestOptions);
    if (!pageResponse.ok) throw new Error(`Sentinel pagination seed request failed: HTTP ${pageResponse.status}`);
    const pagePayload = await pageResponse.json();
    if (!pagePayload.nextCursor) throw new Error("Sentinel API response did not expose a pagination cursor");

    const nextResponse = await fetch(`http://localhost:3006/posts?perPage=2&continuationToken=${encodeURIComponent(pagePayload.nextCursor)}`, requestOptions);
    if (!nextResponse.ok) throw new Error(`Sentinel pagination request failed: HTTP ${nextResponse.status}`);
    const nextPayload = await nextResponse.json();
    if (nextPayload.posts?.some(post => post.source === "s3" && post.id === "s3-1200")) throw new Error("Sentinel pagination returned a duplicate post");

    const rssResponse = await fetch("http://localhost:3006/posts/feed.rss");
    const rss = await rssResponse.text();
    if (!rssResponse.ok || !rss.includes("Tiny")) throw new Error(`Sentinel RSS request did not contain fixture post ${sentinelUid}`);

    await runBrowserScenario({name: "feed-v5-local-env", url: "http://localhost:8080/", scenario: async ({page}) => {
        const selector = `.post[id="${sentinelUid}"]`;
        for (let attempt = 0; attempt < 12 && !(await page.$(selector)); attempt++) {
            await page.evaluate(() => window.scrollTo(0, document.scrollingElement.scrollHeight));
            await new Promise(resolve => setTimeout(resolve, 250));
        }
        await page.waitForSelector(selector, {timeout: 30000});
        const renderedUid = await page.$eval(selector, element => element.id);
        if (renderedUid !== sentinelUid) throw new Error(`UI rendered ${renderedUid}, expected ${sentinelUid}`);
    }});
    console.log(`local:env sentinel passed: ${sentinelUid}, pagination, RSS and UI`);
};

const start = async () => {
    assertNode24();
    if (!/^http:\/\/(localhost|127\.0\.0\.1):4566$/.test(env.AWS_ENDPOINT_URL)) throw new Error("Local feed requires loopback LocalStack");
    try { execFileSync("docker", ["info"], {stdio: "ignore"}); } catch { throw new Error("Docker is unavailable; start Docker Desktop (or the Docker daemon) and retry."); }
    await Promise.all([3006, 8080].map(assertPortAvailable));
    let localStackWasRunning = false;
    try { localStackWasRunning = execFileSync("docker", ["ps", "--format", "{{.Names}}"], {encoding: "utf8"}).split("\n").includes("me-service-localstack"); } catch {}
    await run("yarn", ["workspace", "@randy.tarampi/service", "localstack:start"]);
    ownsLocalStack = !localStackWasRunning && execFileSync("docker", ["ps", "--format", "{{.Names}}"], {encoding: "utf8"}).split("\n").includes("me-service-localstack");
    await waitFor("http://localhost:4566/_localstack/health");
    await run("yarn", ["workspace", "@randy.tarampi/service", "localstack:migrate"]);
    await run("yarn", ["workspace", "@randy.tarampi/service", "localstack:ssm:seed"]);
    await run("yarn", ["workspace", "@randy.tarampi/service", "feed:v5:seed:reset"]);
    await run("yarn", ["lerna", "run", "build", "--scope", "@randy.tarampi/js", "--scope", "@randy.tarampi/lambda-logger", "--scope", "@randy.tarampi/serverless", "--scope", "@randy.tarampi/browser-logger", "--scope", "@randy.tarampi/redux-metrics", "--scope", "@randy.tarampi/views", "--scope", "@randy.tarampi/jsx", "--scope", "@randy.tarampi/css", "--scope", "@randy.tarampi/printables", "--scope", "@randy.tarampi/resume", "--scope", "@randy.tarampi/letter", "--scope", "jsonresume-theme-randytarampi", "--scope", "@randy.tarampi/www", "--include-dependencies", "--stream"]);

    const service = spawn("yarn", ["workspace", "@randy.tarampi/service", "dev:serverless"], {cwd: root, env, stdio: "inherit", detached: true});
    const www = spawn("yarn", ["workspace", "@randy.tarampi/www", "dev:client"], {cwd: root, env, stdio: "inherit", detached: true});
    children.add(service);
    children.add(www);
    await waitFor("http://localhost:3006/posts");
    await waitFor("http://localhost:8080/");
    await runSentinel();
    console.log("feed:v5 local loop ready: LocalStack :4566, Offline :3006, www :8080");
    console.log("Interactive local loop is ready; Ctrl-C performs process cleanup.");
    if (process.env.LOCAL_ENV_CHECK === "1") {
        cleanup();
        process.exit(0);
    }
    await new Promise(() => {});
};

const cleanup = () => {
    for (const child of children) {
        try { process.kill(-child.pid, "SIGTERM"); } catch { child.kill("SIGTERM"); }
    }
    if (ownsLocalStack) spawnSync("docker", ["rm", "--force", "me-service-localstack"], {stdio: "ignore"});
};
process.once("SIGINT", () => { cleanup(); process.exit(0); });
process.once("SIGTERM", () => { cleanup(); process.exit(0); });

start().catch(error => {
    console.error(error);
    cleanup();
    process.exit(1);
});
