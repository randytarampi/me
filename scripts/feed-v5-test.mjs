import {spawn} from "node:child_process";
import {assertNode24} from "./feed-v5-runtime.mjs";

assertNode24();
const root = new URL("..", import.meta.url).pathname.replace(/\/$/, "");
const children = new Set();

const run = (command, args, options = {}) => new Promise((resolve, reject) => {
    const child = spawn(command, args, {cwd: root, env: process.env, stdio: "inherit", ...options});
    children.add(child);
    child.once("exit", code => {
        children.delete(child);
        code === 0 ? resolve() : reject(new Error(`${command} ${args.join(" ")} exited with ${code}`));
    });
    child.once("error", reject);
});

const lifecycle = spawn("node", ["scripts/feed-v5-local.mjs"], {cwd: root, env: process.env, stdio: "inherit", detached: true});
children.add(lifecycle);

const cleanup = () => {
    for (const child of children) {
        try { process.kill(-child.pid, "SIGTERM"); } catch { child.kill("SIGTERM"); }
    }
};
process.once("SIGINT", () => { cleanup(); process.exit(130); });
process.once("SIGTERM", () => { cleanup(); process.exit(143); });

try {
    // The lifecycle runner itself owns readiness; its process remains alive while the lanes run.
    await new Promise((resolve, reject) => {
        const onData = chunk => {
            if (chunk.toString().includes("feed:v5 local loop ready")) {
                lifecycle.stdout?.off("data", onData);
                resolve();
            }
        };
        lifecycle.stdout?.on("data", onData);
        lifecycle.once("exit", code => reject(new Error(`local lifecycle exited before readiness (${code})`)));
        // Inherited stdio is intentional for logs; readiness is also polled by the HTTP lanes below.
        const poll = setInterval(async () => {
            try {
                const [offline, www] = await Promise.all([fetch("http://localhost:3006/posts"), fetch("http://localhost:8080/blog.html")]);
                if (offline.ok && www.ok) {
                    clearInterval(poll);
                    resolve();
                }
            } catch {
                // Readiness retries intentionally ignore connection refusals.
            }
        }, 500);
        lifecycle.once("exit", () => clearInterval(poll));
    });
    await run("yarn", ["feed:v5:test:unit"]);
    await run("yarn", ["feed:v5:test:db"]);
    // The integration lane intentionally exercises writes and may leave its
    // fixtures in the shared local table. Restore the browser corpus before
    // testing the HTTP/frontend contract.
    await run("yarn", ["workspace", "@randy.tarampi/service", "feed:v5:seed:reset"]);
    await run("yarn", ["feed:v5:test:http"]);
    await run("yarn", ["feed:v5:test:browser"]);
} finally {
    cleanup();
}
