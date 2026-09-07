/* global document, window */
import {runBrowserScenario, postsRequests} from "./browser-smoke.mjs";

const target = process.env.WWW_BROWSER_URL || "http://localhost:8080/";
const isPrd = target.includes("www.randytarampi.ca") && !target.includes("dev.");

const tabDesync = async ({page, bypassServiceWorker}) => {
    const expectedHomeTitle = await page.title();
    await page.waitForFunction(() => [...document.querySelectorAll("a")].some(element => element.textContent.includes("Stalk me")), {timeout: 30000});
    const tabs = await page.$$("a");
    const stalk = tabs[await Promise.all(tabs.map(element => element.evaluate(node => node.textContent.includes("Stalk me")))).then(values => values.findIndex(Boolean))];
    if (!stalk) throw new Error("Stalk me tab was not rendered");
    await stalk.click();
    await page.waitForFunction(() => window.location.pathname === "/map", {timeout: 30000});
    await page.close();
    const freshPage = await page.browser().newPage();
    if (bypassServiceWorker) await freshPage.setBypassServiceWorker(true);
    await freshPage.goto(target, {waitUntil: "networkidle2", timeout: 30000});
    await freshPage.waitForFunction(() => window.location.pathname === "/", {timeout: 30000});
    await freshPage.waitForFunction(() => {
        const active = document.querySelector("a.active, [role=tab][aria-selected='true']");
        const transform = [...document.querySelectorAll("[style*='translate']")].map(node => node.style.transform).find(value => value.includes("translate"));
        return active?.textContent.includes("Hey!") && /translate\(0%,\s*0px\)/.test(transform || "");
    }, {timeout: 30000});
    const result = await freshPage.evaluate(() => ({title: document.title, path: window.location.pathname}));
    if (result.title !== expectedHomeTitle) throw new Error(`home title changed from ${expectedHomeTitle} to ${result.title}`);
    await freshPage.close();
};

const mapInteraction = async ({page, requests}) => {
    await page.goto(`${target.replace(/\/$/, "")}/map`, {waitUntil: "networkidle2", timeout: 30000});
    await page.waitForFunction(() => [...document.querySelectorAll("[title], [aria-label]")]
        .some(element => /^(Twelve|Eleven)$/.test(element.getAttribute("title") || element.getAttribute("aria-label") || "")), {timeout: 30000});
    const before = postsRequests(requests, target).length;
    const marker = await page.$("[title='Twelve'], [title='Eleven'], [aria-label='Twelve'], [aria-label='Eleven']");
    await marker.click();
    await page.waitForSelector(".gm-style-iw, [role='dialog']", {timeout: 30000});
    const windows = await page.$$(".gm-style-iw, [role='dialog']");
    if (windows.length !== 1) throw new Error(`expected one open map window, found ${windows.length}`);
    const box = await windows[0].boundingBox();
    await page.evaluate(() => Promise.all([...document.images].map(image => image.complete ? Promise.resolve() : new Promise(resolve => { image.addEventListener("load", resolve); image.addEventListener("error", resolve); }))));
    const afterBox = await windows[0].boundingBox();
    if (!box || !afterBox || JSON.stringify(box) !== JSON.stringify(afterBox)) throw new Error("map window moved while media loaded");
    if (postsRequests(requests, target).length !== before) throw new Error("opening a map card issued a feed request");
    const cardIds = await page.$$eval(".gm-style-iw .post[id], [role='dialog'] .post[id]", cards => cards.map(card => card.id));
    if (new Set(cardIds).size !== cardIds.length) throw new Error("map window rendered duplicate cards");
    await page.click(".gm-style-iw button, .gm-ui-hover-effect, [role='dialog'] button");
    await page.waitForFunction(() => !document.querySelector(".gm-style-iw, [role='dialog']"), {timeout: 30000});
};

const nestedRouteTitles = async ({page}) => {
    // PRD may retain the parent-title defect; route semantics are asserted for the RC bundle.
    for (const [path, title] of [["/blog/photos", "See (through) me"], ["/blog/words", "Read me"], ["/blog/photos/tags/cats", "See (through) me"]]) {
        await page.goto(`${target.replace(/\/$/, "")}${path}`, {waitUntil: "networkidle2", timeout: 30000});
        await page.waitForFunction(expected => document.title.includes(expected), {timeout: 30000}, title);
    }
};

// PRD remains read-only behavioural reference. A11y/404 standards belong in the follow-up gate lane;
// the parity tab scenario intentionally uses the WAI-ARIA/router semantics rather than PRD's defects.
for (const bypassServiceWorker of [false, true]) {
    await runBrowserScenario({name: `tab-desync${bypassServiceWorker ? "-no-sw" : ""}`, url: target, bypassServiceWorker, scenario: tabDesync});
}
try {
    await runBrowserScenario({name: "nested-route-titles", url: target, scenario: nestedRouteTitles});
} catch (error) {
    if (!isPrd) throw error;
    console.log(JSON.stringify({scenario: "nested-route-titles", prdDivergence: error.message}));
}
try {
    await runBrowserScenario({name: "map-interaction", url: target, scenario: mapInteraction});
} catch (error) {
    if (!isPrd) throw error;
    // The legacy PRD bundle does not expose the current geolocated fixture markers. Keep its
    // failure as a visible, read-only reference result rather than turning it into a dev gate.
    console.log(JSON.stringify({scenario: "map-interaction", prdDivergence: error.message}));
}
console.log(JSON.stringify({target, prdReference: isPrd, scenarios: ["tab-desync", "tab-desync-no-sw", "map-interaction"]}));
