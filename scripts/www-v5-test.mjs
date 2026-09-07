import {spawn} from "node:child_process";
import {assertNode24} from "./feed-v5-runtime.mjs";

assertNode24();
const root = new URL("..", import.meta.url).pathname.replace(/\/$/, "");
const children = new Set();

const spawnChild = (command, args, options = {}) => {
    const child = spawn(command, args, {cwd: root, env: process.env, stdio: "inherit", ...options});
    children.add(child);
    child.once("exit", () => children.delete(child));
    return child;
};

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

const cleanup = () => {
    for (const child of children) {
        try { process.kill(-child.pid, "SIGTERM"); } catch { child.kill("SIGTERM"); }
    }
};

const lifecycle = spawnChild("node", ["scripts/feed-v5-local.mjs"], {detached: true});
process.once("SIGINT", () => { cleanup(); process.exit(130); });
process.once("SIGTERM", () => { cleanup(); process.exit(143); });

try {
    await Promise.all([
        waitFor("http://localhost:3006/posts"),
        waitFor("http://localhost:8080/")
    ]);

    const browser = spawnChild("node", ["scripts/www-browser.mjs"]);
    const exitCode = await new Promise((resolve, reject) => {
        browser.once("error", reject);
        browser.once("exit", code => resolve(code ?? 1));
        lifecycle.once("exit", code => reject(new Error(`local lifecycle exited during browser gate (${code})`)));
    });
    if (exitCode !== 0) process.exitCode = exitCode;
} finally {
    cleanup();
}
