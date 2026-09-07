/* global document, window */
import {runBrowserScenario, postsRequests, sleep} from "./browser-smoke.mjs";

const url = process.env.FEED_V5_BROWSER_URL || "http://localhost:8080/";

await runBrowserScenario({name: "feed-v5", url, scenario: async ({page, requests}) => {
    await page.waitForSelector(".post", {timeout: 30000});
    const firstCards = await page.$$eval(".post[id]", elements => elements.map(element => element.id));
    const initialRequests = postsRequests(requests, url);
    if (!initialRequests.length) throw new Error("browser did not issue an initial feed request");

    await page.addStyleTag({content: "html, body { height: 5000px !important; min-height: 5000px !important; }"});
    for (let attempt = 0; attempt < 12 && postsRequests(requests, url).length < 2; attempt++) {
        await page.evaluate(() => window.scrollTo(0, document.scrollingElement.scrollHeight));
        await sleep(250);
    }
    await page.waitForFunction(() => document.querySelectorAll(".post[id]").length > 1, {timeout: 30000});
    const cards = await page.$$eval(".post[id]", elements => elements.map(element => element.id));
    if (new Set(cards).size !== cards.length) throw new Error("browser rendered duplicate card IDs");
    if (!firstCards.length || !initialRequests.length) throw new Error("feed fixture did not hydrate cards");
    console.log(JSON.stringify({scenario: "feed-v5", requests: postsRequests(requests, url).length, cards, profile: "fresh"}));
}});
