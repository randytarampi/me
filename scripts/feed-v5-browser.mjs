/* global document, window */
import puppeteer from "puppeteer";
import {mkdir, writeFile} from "node:fs/promises";

const browser = await puppeteer.launch({headless: "new"});
let page;
const requests = [];
const responses = [];
const pageErrors = [];
try {
    page = await browser.newPage();
    await page.setViewport({width: 1024, height: 400, deviceScaleFactor: 1});
    page.on("pageerror", error => pageErrors.push(error.message));
    page.on("request", request => {
        if (request.method() === "GET" && request.url().includes("localhost:3006/posts")) {
            requests.push({
                url: request.url(),
                method: request.method(),
                version: request.headers()["me-api-version"],
                query: Object.fromEntries(new URL(request.url()).searchParams)
            });
        }
    });
    page.on("response", async response => {
        const request = response.request();
        if (request.method() !== "GET" || !request.url().includes("localhost:3006/posts") || request.headers()["me-api-version"] !== "5" || response.status() !== 200) return;

        try {
            responses.push({request, body: await response.json()});
        } catch {
            // The assertions below report a missing usable API page.
        }
    });
    await page.goto(process.env.FEED_V5_BROWSER_URL || "http://localhost:8080/", {waitUntil: "networkidle2", timeout: 30000});
    await page.waitForFunction(() => [...document.querySelectorAll("a")].some(element => element.textContent.includes("Follow me")), {timeout: 30000});
    const followMeTab = await page.$$("a");
    const followMe = followMeTab[(await Promise.all(followMeTab.map(tab => tab.evaluate(element => element.textContent.includes("Follow me"))))).findIndex(Boolean)];
    if (!followMe) throw new Error("Follow me tab was not rendered on home route");
    await followMe.click();
    await page.waitForFunction(() => window.location.pathname === "/blog", {timeout: 30000});
    await page.waitForFunction(() => [...document.querySelectorAll("a.active")].some(element => element.textContent.includes("Follow me")), {timeout: 30000});
    if (pageErrors.length) throw new Error(`browser pageerror before feed request: ${pageErrors.join("; ")}`);
    await page.waitForSelector(".post", {timeout: 30000});

    const waitForResponseCount = async count => {
        for (let attempt = 0; attempt < 120; attempt++) {
            if (responses.length >= count) return;
            await new Promise(resolve => setTimeout(resolve, 100));
        }
        throw new Error(`timed out waiting for API response ${count}`);
    };

    await waitForResponseCount(1);
    const firstPage = responses[0].body;
    await new Promise(resolve => setTimeout(resolve, 500));
    const firstCards = await page.$$eval(".post[id]", elements => elements.map(element => element.id));

    // Exercise react-infinite through the real window scroll listener. Repeating the
    // bottom scroll makes this deterministic across image/font load timing. The
    // minimum document height is a local smoke-fixture layout constraint: it keeps
    // the browser viewport genuinely scrollable even when fixture media is absent.
    await page.addStyleTag({content: "html, body { height: 5000px !important; min-height: 5000px !important; }"});
    for (let attempt = 0; attempt < 12 && requests.filter(request => request.version === "5").length < 2; attempt++) {
        await page.evaluate(() => window.scrollTo(0, document.scrollingElement.scrollHeight));
        await new Promise(resolve => setTimeout(resolve, 250));
    }
    await waitForResponseCount(2);

    const secondPage = responses[1].body;
    const secondCards = await page.$$eval(".post[id]", elements => elements.map(element => element.id));
    const renderedCards = [...new Set([...firstCards, ...secondCards])];
    const firstRequest = requests.find(request => request.version === "5");
    const v5Requests = requests.filter(request => request.version === "5");
    const secondRequest = v5Requests[1];
    const legacyParameters = ["beforeDate", "afterDate", "beforeId", "afterId", "orderBy", "orderOperator", "orderComparator", "page"];
    const apiUid = post => post.uid || `${post.source}#${post.id}`;
    const firstApiUids = firstPage.posts.map(apiUid);
    const secondApiUids = secondPage.posts.map(apiUid);
    const allApiUids = [...firstApiUids, ...secondApiUids];
    const domIdsForApiUids = new Set(allApiUids.map(uid => uid.replaceAll("#", "--@me/sep!-")));

    if (!firstRequest || !secondRequest || v5Requests.length !== 2) throw new Error("browser did not issue exactly two V5 localhost requests");
    if (!firstPage.nextCursor) throw new Error("first V5 page did not provide nextCursor");
    if (secondRequest.query.continuationToken !== firstPage.nextCursor) throw new Error("second V5 request did not propagate prior nextCursor");
    if (requests.some(request => legacyParameters.some(parameter => parameter in request.query))) throw new Error("browser issued a legacy cursor/order parameter");
    if (!secondApiUids.length) throw new Error("second V5 page was empty");
    if (!secondApiUids.some(uid => !firstApiUids.includes(uid))) throw new Error("second V5 page did not add a unique API post");
    if (new Set(v5Requests.map(request => request.query.continuationToken || "<initial>" )).size !== v5Requests.length) throw new Error("V5 cursor/page was duplicated");
    if (new Set(allApiUids).size !== allApiUids.length) throw new Error("API pages contain a duplicated post");
    if (new Set(secondCards).size !== secondCards.length) throw new Error("browser rendered duplicate card IDs");
    if (!renderedCards.length || renderedCards.length !== allApiUids.length || !renderedCards.every(id => domIdsForApiUids.has(id))) throw new Error("hydrated browser cards do not match API UID parity");

    console.log(JSON.stringify({requests, firstPage: firstApiUids, secondPage: secondApiUids, cards: renderedCards, profile: "clean"}));
} catch (error) {
    const run = new Date().toISOString().replaceAll(/[:.]/g, "-");
    const directory = `.artifacts/feed-v5/${run}`;
    await mkdir(directory, {recursive: true});
    await page?.screenshot({path: `${directory}/browser-failure.png`, fullPage: true}).catch(() => {});
    await writeFile(`${directory}/browser-failure.json`, JSON.stringify({message: error.message, pageErrors, requests, responses: responses.map(({body}) => body)}, null, 2));
    throw error;
} finally {
    await browser.close();
}
