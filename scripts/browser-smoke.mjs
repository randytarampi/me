import puppeteer from "puppeteer";
import {mkdir, writeFile} from "node:fs/promises";

const sleep = milliseconds => new Promise(resolve => setTimeout(resolve, milliseconds));

export const runBrowserScenario = async ({name, url, profileMode = "fresh", bypassServiceWorker = false, deviceScaleFactor = 1, setup, scenario}) => {
    const requests = [];
    const pageErrors = [];
    const disableSandbox = process.env.PUPPETEER_NO_SANDBOX === "1" || process.env.CI || process.getuid?.() === 0;
    const browser = await puppeteer.launch({
        headless: process.env.WWW_BROWSER_HEADED === "1" ? false : "new",
        args: disableSandbox ? ["--no-sandbox", "--disable-setuid-sandbox"] : []
    });
    let page;

    try {
        page = await browser.newPage();
        const [width, height] = (process.env.WWW_BROWSER_VIEWPORT || "1024x768").split("x").map(Number);
        await page.setViewport({width, height, deviceScaleFactor});
        if (bypassServiceWorker) await page.setBypassServiceWorker(true);
        page.on("pageerror", error => pageErrors.push(error.message));
        // Register this before navigation: requests made by boot and rehydration are part of the contract.
        page.on("request", request => requests.push({
            method: request.method(),
            url: request.url(),
            headers: request.headers()
        }));
        if (profileMode === "rehydrated" && setup) await page.evaluateOnNewDocument(setup);
        await page.goto(url, {waitUntil: "networkidle2", timeout: 30000});
        await scenario({page, requests, pageErrors, bypassServiceWorker});
        return {name, url, profileMode, bypassServiceWorker, requests: requests.length};
    } catch (error) {
        const run = new Date().toISOString().replaceAll(/[:.]/g, "-");
        const directory = `.artifacts/browser-smoke/${name}/${run}`;
        await mkdir(directory, {recursive: true});
        await page?.screenshot({path: `${directory}/failure.png`, fullPage: true}).catch(() => {});
        await writeFile(`${directory}/failure.json`, JSON.stringify({
            name, url, profileMode, bypassServiceWorker, message: error.message, pageErrors,
            requests: requests.map(({method, url: requestUrl}) => ({method, url: requestUrl}))
        }, null, 2));
        throw error;
    } finally {
        await browser.close();
    }
};

export const waitForResponse = async (page, predicate, timeout = 30000) => {
    await page.waitForResponse(response => predicate(response), {timeout});
};

export const postsRequests = (requests, url) => requests.filter(request => {
    try {
        return request.method === "GET" && new URL(request.url, url).pathname.endsWith("/posts");
    } catch {
        return false;
    }
});

export {sleep};
