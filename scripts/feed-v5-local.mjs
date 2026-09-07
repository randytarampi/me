import {spawn} from "node:child_process";
import net from "node:net";
import {assertNode24} from "./feed-v5-runtime.mjs";

const root = new URL("..", import.meta.url).pathname.replace(/\/$/, "");
const env = {
    ...process.env,
    NODE_ENV: "development",
    IS_OFFLINE: "true",
    AWS_ENDPOINT_URL: "http://localhost:4566",
    AWS_REGION: "us-east-1",
    SERVICE_POSTS_DYNAMODB_TABLE: "local-posts",
    SERVICE_AUTH_INFO_DYNAMODB_TABLE: "local-authInfo",
    HIDDEN_POST_SOURCES: "github"
};
const children = new Set();

const assertPortAvailable = port => new Promise((resolve, reject) => {
    const socket = net.createConnection({host: "127.0.0.1", port});
    socket.once("connect", () => {
        socket.destroy();
        reject(new Error(`Local feed port ${port} is already in use; stop the existing owner before retrying.`));
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

const waitFor = async (url, attempts = 60) => {
    for (let attempt = 1; attempt <= attempts; attempt++) {
        try {
            const response = await fetch(url);
            if (response.ok || response.status === 404) return;
        } catch {
            // Readiness retries intentionally ignore connection refusals.
        }
        await new Promise(resolve => setTimeout(resolve, 500));
    }
    throw new Error(`Timed out waiting for ${url}`);
};

const start = async () => {
    assertNode24();
    if (!/^http:\/\/(localhost|127\.0\.0\.1):4566$/.test(env.AWS_ENDPOINT_URL)) throw new Error("Local feed requires loopback LocalStack");
    await Promise.all([3006, 8080].map(assertPortAvailable));
    await run("yarn", ["workspace", "@randy.tarampi/service", "localstack:start"]);
    await waitFor("http://localhost:4566/_localstack/health");
    await run("yarn", ["workspace", "@randy.tarampi/service", "localstack:migrate"]);
    await run("yarn", ["workspace", "@randy.tarampi/service", "feed:v5:seed:reset"]);

    const service = spawn("yarn", ["workspace", "@randy.tarampi/service", "dev:serverless"], {cwd: root, env, stdio: "inherit", detached: true});
    const www = spawn("yarn", ["workspace", "@randy.tarampi/www", "dev:client"], {cwd: root, env, stdio: "inherit", detached: true});
    children.add(service);
    children.add(www);
    await waitFor("http://localhost:3006/posts");
    await waitFor("http://localhost:8080/");
    console.log("feed:v5 local loop ready: LocalStack :4566, Offline :3006, www :8080");
    console.log("Interactive local loop is ready; Ctrl-C performs process cleanup.");
    await new Promise(() => {});
};

const cleanup = () => {
    for (const child of children) {
        try { process.kill(-child.pid, "SIGTERM"); } catch { child.kill("SIGTERM"); }
    }
};
process.once("SIGINT", () => { cleanup(); process.exit(0); });
process.once("SIGTERM", () => { cleanup(); process.exit(0); });

start().catch(error => {
    console.error(error);
    cleanup();
    process.exit(1);
});
