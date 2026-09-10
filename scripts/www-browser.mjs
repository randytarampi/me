/* global document, window, getComputedStyle, Image */
import {runBrowserScenario, postsRequests, sleep} from "./browser-smoke.mjs";

const target = process.env.WWW_BROWSER_URL || "http://localhost:8080/";
const isPrd = target.includes("www.randytarampi.ca") && !target.includes("dev.");
const browserMode = process.env.WWW_BROWSER_MODE || (target.includes("localhost") ? "local-deep" : "deployed-smoke");

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
    if (browserMode === "deployed-smoke") {
        await page.waitForSelector(".map--google", {timeout: 30000});
        await page.waitForFunction(() => document.querySelectorAll(".map--google .gm-style img[alt], .map--google [role='button'][aria-label*='marker' i], .map--google [class*='cluster']").length > 0, {timeout: 30000});
        if (!postsRequests(requests, target).length) throw new Error("map did not issue a successful posts request");
        return;
    }
    const openAndCheckMarker = async (title, expectedRatio) => {
        const marker = await page.waitForSelector(`[title='${title}'], [aria-label='${title}']`, {timeout: 30000});
        await marker.evaluate(element => element.click());
        await page.waitForSelector(".marker-info-box", {timeout: 30000});
        if (await page.$$(".gm-style-iw").then(nodes => nodes.length)) throw new Error("native Google InfoWindow was rendered");
        const window = await page.$(".marker-info-box");
        const beforeMedia = await window.boundingBox();
        await page.evaluate(() => Promise.all([...document.images].map(image => image.complete ? Promise.resolve() : new Promise(resolve => { image.addEventListener("load", resolve); image.addEventListener("error", resolve); }))));
        // Opening a card also pans the map (setMapCenter) and the overlay animates over 250ms
        // (signed contract); sample geometry only after BOTH the pan and transition have settled.
        await sleep(1200);
        const afterBox = await window.boundingBox();
        const stableBox = await window.boundingBox();
        if (!beforeMedia || !afterBox || !stableBox || Math.max(Math.abs(afterBox.x - stableBox.x), Math.abs(afterBox.y - stableBox.y), Math.abs(afterBox.width - stableBox.width), Math.abs(afterBox.height - stableBox.height)) > 1) throw new Error("map card did not remain stable after media settled");
        // Opening a card pans the map to centre on the marker (setMapCenter in the marker onClick),
        // so the marker's geographic anchor sits at the map container's centre after the pan settles,
        // and the overlay centres the card on that anchor. Assert card centre ≈ map centre — this
        // stays icon-geometry-independent (SVG path icons anchor at their path origin, not box centre).
        const mapBox = await page.$eval(".map--google", element => { const box = element.getBoundingClientRect(); return {x: box.x, y: box.y, width: box.width, height: box.height}; });
        if (Math.abs((afterBox.x + afterBox.width / 2) - (mapBox.x + mapBox.width / 2)) > 2 || Math.abs((afterBox.y + afterBox.height / 2) - (mapBox.y + mapBox.height / 2)) > 2) throw new Error("map card is not centred on its marker anchor");
        const transition = await window.evaluate(element => {
            const style = getComputedStyle(element.parentElement);
            return {property: style.transitionProperty, duration: style.transitionDuration};
        });
        if (!transition.property.includes("transform") || !transition.duration.split(",").some(value => parseFloat(value) > 0)) throw new Error("map card position transition is missing");
        const aspectRatio = await window.evaluate(element => {
        const background = getComputedStyle(element).backgroundImage.match(/url\(["']?(.*?)["']?\)/)?.[1];
        if (!background) return null;
        return new Promise(resolve => { const image = new Image(); image.onload = () => resolve(image.width / image.height); image.onerror = () => resolve(null); image.src = background; });
        });
        if (aspectRatio === null || Math.abs(aspectRatio - expectedRatio) > 0.002) throw new Error(`map card media ratio ${aspectRatio} did not match expected ${expectedRatio}`);
        if (Math.abs(afterBox.width / afterBox.height - aspectRatio) > 0.01) throw new Error("map card aspect ratio changed from its media");
        const maxWidth = page.viewport().width * 0.75;
        const maxHeight = page.viewport().height * 0.75;
        const expectedWidth = Math.min(maxWidth, maxHeight * aspectRatio);
        const expectedHeight = expectedWidth / aspectRatio;
        if (Math.abs(afterBox.width - expectedWidth) > 1.5 || Math.abs(afterBox.height - expectedHeight) > 1.5) {
            throw new Error(`map card dimensions ${afterBox.width}x${afterBox.height} did not fill the expected ${expectedWidth}x${expectedHeight} viewport bounds`);
        }
        return marker;
    };
    const openAndCheckTextMarker = async title => {
        const marker = await page.waitForSelector(`[title='${title}'], [aria-label='${title}']`, {timeout: 30000});
        await marker.evaluate(element => element.click());
        await page.waitForSelector(".marker-info-box", {timeout: 30000});
        const card = await page.$(".marker-info-box");
        await sleep(1200);
        const box = await card.boundingBox();
        const mapBox = await page.$eval(".map--google", element => {
            const {x, y, width, height} = element.getBoundingClientRect();
            return {x, y, width, height};
        });
        if (!box || !box.width || !box.height) throw new Error(`${title} text card has no geometry`);
        const maxWidth = page.viewport().width * 0.75 + 2;
        const maxHeight = page.viewport().height * 0.75 + 2;
        if (box.width > maxWidth || box.height > maxHeight) throw new Error(`${title} text card exceeds viewport bounds: ${box.width}x${box.height}`);
        if (Math.abs(box.x + box.width / 2 - (mapBox.x + mapBox.width / 2)) > 2 || Math.abs(box.y + box.height / 2 - (mapBox.y + mapBox.height / 2)) > 2) {
            throw new Error(`${title} text card is not centred on the map container`);
        }
        const closeButton = await card.$("button[aria-label='Close post card']");
        const closeBox = await closeButton?.boundingBox();
        if (!closeButton || !closeBox || !await closeButton.evaluate(element => element.offsetParent !== null)) throw new Error(`${title} text card close button is not visible`);
        if (closeBox.x < box.x || closeBox.y < box.y || closeBox.x + closeBox.width > box.x + box.width || closeBox.y + closeBox.height > box.y + box.height) {
            throw new Error(`${title} text card close button is clipped`);
        }
        const scroll = await card.evaluate(element => {
            const overflowing = element.scrollHeight > element.clientHeight;
            if (!overflowing) return {overflowing, changed: true};
            element.scrollTop = 10;
            return {overflowing, changed: element.scrollTop > 0};
        });
        if (scroll.overflowing && !scroll.changed) throw new Error(`${title} text card scroll position did not change`);
        await page.evaluate(() => { window.__textMarkerCard = document.querySelector(".marker-info-box"); });
        await page.mouse.wheel({deltaY: 200});
        await sleep(500);
        if (!await page.evaluate(() => document.querySelector(".marker-info-box") === window.__textMarkerCard)) throw new Error(`${title} text card remounted during map movement`);
        console.log(JSON.stringify({scenario: "map-text-card", viewport: page.viewport(), title, geometry: box, map: mapBox, scroll}));
        await closeButton.evaluate(element => element.click());
        await page.waitForFunction(() => !document.querySelector(".marker-info-box"), {timeout: 30000});
        return box;
    };
    await page.waitForFunction(() => [...document.querySelectorAll("[title], [aria-label]")].some(element => /^(Landscape 3:2|Portrait)$/.test(element.getAttribute("title") || element.getAttribute("aria-label") || "")), {timeout: 30000});
    await sleep(600);
    const requestsAtOpenSettle = requests.length;
    const marker = await openAndCheckMarker("Landscape 3:2", 1.5);
    // Narrow portrait maps legitimately settle a changed viewport after the
    // requested pan; the desktop interaction is the no-fetch regression guard.
    if (page.viewport().width > 500 && postsRequests(requests.slice(requestsAtOpenSettle), target).length) throw new Error("opening a map card issued a feed request");
    const cardIds = await page.$$eval(".marker-info-box .post[id]", cards => cards.map(card => card.id));
    if (new Set(cardIds).size !== cardIds.length) throw new Error("map window rendered duplicate cards");
    const closeButton = await page.$(".marker-info-box button[aria-label='Close post card']");
    if (!closeButton || !await closeButton.evaluate(element => element.offsetParent !== null && element.getAttribute("aria-label"))) throw new Error("map card close button is not visible and accessible");
    await closeButton.evaluate(element => element.click());
    await page.waitForFunction(() => !document.querySelector(".marker-info-box"), {timeout: 30000});
    await sleep(250);
    await openAndCheckMarker("Portrait", 2 / 3);
    if (page.viewport().width > 500 && postsRequests(requests.slice(requestsAtOpenSettle), target).length) throw new Error("opening map cards issued a feed request");
    const portraitClose = await page.$(".marker-info-box button[aria-label='Close post card']");
    await portraitClose.evaluate(element => element.click());
    await page.waitForFunction(() => !document.querySelector(".marker-info-box"), {timeout: 30000});
    await marker.evaluate(element => element.click());
    await page.waitForSelector(".marker-info-box", {timeout: 30000});
    await page.evaluate(() => { window.__markerCard = document.querySelector(".marker-info-box"); });
    await page.mouse.wheel({deltaY: 200});
    await new Promise(resolve => setTimeout(resolve, 500));
    if (!await page.evaluate(() => document.querySelector(".marker-info-box") === window.__markerCard)) throw new Error("map card remounted during map movement");
    await page.$eval(".marker-info-box button[aria-label='Close post card']", element => element.click());
    await page.waitForFunction(() => !document.querySelector(".marker-info-box"), {timeout: 30000});
    const longTextBox = await openAndCheckTextMarker("Boundary A");
    const shortTextBox = await openAndCheckTextMarker("Tiny");
    if (shortTextBox.width >= page.viewport().width * 0.6) throw new Error(`short text card was forced to ${shortTextBox.width}px; expected less than 60vw`);
    console.log(JSON.stringify({scenario: "map-text-card-summary", viewport: page.viewport(), long: longTextBox, short: shortTextBox}));
};

const nestedRouteTitles = async ({page}) => {
    // PRD may retain the parent-title defect; route semantics are asserted for the RC bundle.
    for (const [path, title] of [["/blog/photos", "See (through) me"], ["/blog/words", "Read me"], ["/blog/photos/tags/cats", "See (through) me"]]) {
        await page.goto(`${target.replace(/\/$/, "")}${path}`, {waitUntil: "networkidle2", timeout: 30000});
        await page.waitForFunction(expected => document.title.includes(expected), {timeout: 30000}, title);
    }
};

const productionRouteSmoke = async ({page}) => {
    await page.goto(`${target.replace(/\/$/, "")}/blog/photos`, {waitUntil: "domcontentloaded", timeout: 30000});
    await page.waitForFunction(() => document.title.includes("See (through) me"), {timeout: 30000});

    await page.goto(`${target.replace(/\/$/, "")}/map`, {waitUntil: "domcontentloaded", timeout: 30000});
    await page.waitForFunction(() => document.title.includes("Stalk me"), {timeout: 30000});
    await page.waitForFunction(() => document.querySelectorAll(".gm-style img[alt], .map--google [role='button'][aria-label*='marker' i], .map--google [class*='cluster']").length > 0, {timeout: 30000});
};

const subtypeRedirects = async ({page}) => {
    for (const [source, destination, title] of [[
        "/photos", "/blog/photos", "See (through) me"
    ], [
        "/words", "/blog/words", "Read me"
    ]]) {
        await page.goto(`${target.replace(/\/$/, "")}${source}`, {waitUntil: "networkidle2", timeout: 30000});
        try {
            await page.waitForFunction(expected => window.location.pathname === expected, {timeout: 30000}, destination);
        } catch (error) {
            const state = await page.evaluate(() => ({path: window.location.pathname, title: document.title}));
            throw new Error(`redirect from ${source} did not settle: ${error.message}; state=${JSON.stringify(state)}`, {cause: error});
        }
        const actualTitle = await page.title();
        if (!actualTitle.includes(title)) throw new Error(`redirect from ${source} landed at ${destination} with title ${actualTitle}`);
        if (await page.evaluate(() => window.location.pathname) !== destination) throw new Error(`redirect from ${source} did not settle`);
    }
};

const unknownRoute = async ({page}) => {
    await page.goto(`${target.replace(/\/$/, "")}/this-route-does-not-exist`, {waitUntil: "networkidle2", timeout: 30000});
    await page.waitForSelector(".error", {timeout: 30000});
    await page.waitForFunction(() => {
        const tabs = document.querySelector(".nav-tabs__swipeable");
        return tabs && window.M?.Tabs?.getInstance(tabs);
    }, {timeout: 30000});
    const state = await page.evaluate(() => ({
        active: Boolean(document.querySelector("a.active, .tab.active, [role='tab'][aria-selected='true']")),
        selected: [...document.querySelectorAll("[role='tab']")].map(tab => tab.getAttribute("aria-selected"))
    }));
    if (state.active) throw new Error("unknown route selected a tab");
    if (state.selected.some(value => value !== "false")) throw new Error(`unknown route tab selection was ${JSON.stringify(state.selected)}`);
};

const tabAccessibility = async ({page}) => {
    await page.goto(target, {waitUntil: "networkidle2", timeout: 30000});
    await page.waitForSelector("[role='tab']", {timeout: 30000});
    const selectedCount = await page.$$eval("[role='tab']", tabs => tabs.filter(tab => tab.getAttribute("aria-selected") === "true").length);
    if (selectedCount !== 1) throw new Error(`expected exactly one selected tab, found ${selectedCount}`);
    const selected = await page.$("[role='tab'][aria-selected='true']");
    if (!await selected?.evaluate(tab => tab.classList.contains("active") || tab.parentElement?.classList.contains("active"))) {
        throw new Error("aria-selected tab is not Materialize-active");
    }
};

const polyfillWarnings = async ({page, pageErrors}) => {
    await page.goto(target, {waitUntil: "networkidle2", timeout: 30000});
    const duplicatePolyfillErrors = pageErrors.filter(error => /polyfill/i.test(error));
    if (duplicatePolyfillErrors.length) throw new Error(`polyfill warning reached the browser: ${duplicatePolyfillErrors.join("; ")}`);
};

// PRD remains read-only behavioural reference. A11y/404 standards belong in the follow-up gate lane;
// the parity tab scenario intentionally uses the WAI-ARIA/router semantics rather than PRD's defects.
for (const bypassServiceWorker of [false, true]) {
    await runBrowserScenario({name: `tab-desync${bypassServiceWorker ? "-no-sw" : ""}`, url: target, bypassServiceWorker, scenario: tabDesync});
}
try {
    await runBrowserScenario({name: "production-route-smoke", url: target, scenario: productionRouteSmoke});
} catch (error) {
    if (!isPrd) throw error;
    console.log(JSON.stringify({scenario: "production-route-smoke", prdDivergence: error.message}));
}
try {
    await runBrowserScenario({name: "nested-route-titles", url: target, scenario: nestedRouteTitles});
} catch (error) {
    if (!isPrd) throw error;
    console.log(JSON.stringify({scenario: "nested-route-titles", prdDivergence: error.message}));
}
try {
    await runBrowserScenario({name: "subtype-redirects", url: target, scenario: subtypeRedirects});
} catch (error) {
    if (!isPrd) throw error;
    console.log(JSON.stringify({scenario: "subtype-redirects", prdDivergence: error.message}));
}
try {
    await runBrowserScenario({name: "unknown-route-no-tab", url: target, scenario: unknownRoute});
} catch (error) {
    if (!isPrd) throw error;
    console.log(JSON.stringify({scenario: "unknown-route-no-tab", prdDivergence: error.message}));
}
try {
    await runBrowserScenario({name: "tab-accessibility", url: target, scenario: tabAccessibility});
} catch (error) {
    if (!isPrd) throw error;
    console.log(JSON.stringify({scenario: "tab-accessibility", prdDivergence: error.message}));
}
try {
    await runBrowserScenario({name: "polyfill-warning-free", url: target, scenario: polyfillWarnings});
} catch (error) {
    if (!isPrd) throw error;
    console.log(JSON.stringify({scenario: "polyfill-warning-free", prdDivergence: error.message}));
}
for (const deviceScaleFactor of [1, 2]) {
try {
    await runBrowserScenario({name: `map-interaction-dpr-${deviceScaleFactor}`, url: target, deviceScaleFactor, scenario: mapInteraction});
} catch (error) {
    if (!isPrd) throw error;
    // The legacy PRD bundle does not expose the current geolocated fixture markers. Keep its
    // failure as a visible, read-only reference result rather than turning it into a dev gate.
    console.log(JSON.stringify({scenario: `map-interaction-dpr-${deviceScaleFactor}`, prdDivergence: error.message}));
}
}
console.log(JSON.stringify({target, prdReference: isPrd, scenarios: ["tab-desync", "tab-desync-no-sw", "map-interaction"]}));
