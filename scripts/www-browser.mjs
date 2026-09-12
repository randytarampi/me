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
    const clickMarkerAndWaitForCard = async title => {
        const markerSelector = `[title='${title}'], [aria-label='${title}']`;
        let marker;
        let lastError;
        for (let attempt = 0; attempt < 3; attempt++) {
            marker = await page.waitForSelector(markerSelector, {timeout: 30000});
            await marker.evaluate(element => element.click());
            try {
                await page.waitForSelector(".marker-info-box", {timeout: 10000});
                break;
            } catch (error) {
                lastError = error;
                if (attempt === 2) throw lastError;
            }
        }
        return marker;
    };
    const openAndCheckMarker = async (title, expectedRatio) => {
        const marker = await clickMarkerAndWaitForCard(title);
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
        // Opening a card pans only as far as needed to keep the complete overlay
        // in the map viewport. This also covers the null-map-ref path where the
        // overlay's direct one-shot pan is the only available correction.
        const mapBox = await page.$eval(".map--google", element => { const box = element.getBoundingClientRect(); return {x: box.x, y: box.y, width: box.width, height: box.height}; });
        if (afterBox.x < mapBox.x - 1 || afterBox.y < mapBox.y - 1 || afterBox.x + afterBox.width > mapBox.x + mapBox.width + 1 || afterBox.y + afterBox.height > mapBox.y + mapBox.height + 1) throw new Error("map card is not fully inside the map viewport");
        // The overlay arms a 250ms ease-out transition for the reveal only (60506d118 design):
        // it is disarmed to `none` ~300ms after the card opens so pans never re-animate the card.
        // At this point (≥1.2s after open) the transition must already be disarmed — assert that,
        // since a permanently-armed transition is the jitter bug this suite guards against.
        const transition = await window.evaluate(element => {
            const style = getComputedStyle(element.parentElement);
            return {property: style.transitionProperty, duration: style.transitionDuration};
        });
        if (transition.duration.split(",").some(value => parseFloat(value) > 0)) throw new Error("map card transition is still armed after the reveal window (jitter risk)");
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
        if (box.x < mapBox.x - 1 || box.y < mapBox.y - 1 || box.x + box.width > mapBox.x + mapBox.width + 1 || box.y + box.height > mapBox.y + mapBox.height + 1) {
            throw new Error(`${title} text card is not fully inside the map container`);
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
    await openAndCheckMarker("Landscape 3:2", 1.5);
    // Narrow portrait maps legitimately settle a changed viewport after the
    // requested pan; the desktop interaction is the no-fetch regression guard.
    if (page.viewport().width > 500 && postsRequests(requests.slice(requestsAtOpenSettle), target).length) throw new Error("opening a map card issued a feed request");
    const cardTitles = await page.$$eval(".marker-info-box .post-title", titles => titles.map(title => title.textContent.trim()));
    if (new Set(cardTitles).size !== cardTitles.length) throw new Error("map window rendered duplicate card titles");
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
    await clickMarkerAndWaitForCard("Landscape 3:2");
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

const mapPanDrag = async ({page}) => {
    await page.goto(`${target.replace(/\/$/, "")}/map`, {waitUntil: "networkidle2", timeout: 30000});
    await page.waitForFunction(() => [...document.querySelectorAll("[title], [aria-label]")].some(element => (element.getAttribute("title") || element.getAttribute("aria-label")) === "Landscape 3:2"), {timeout: 30000});
    const markerSelector = "[title='Landscape 3:2'], [aria-label='Landscape 3:2']";
    const clickMarker = async () => {
        for (let attempt = 0; attempt < 3; attempt++) {
            await page.waitForSelector(markerSelector, {timeout: 30000});
            await page.$eval(markerSelector, element => element.click());
            try {
                await page.waitForSelector(".marker-info-box", {timeout: 10000});
                return;
            } catch (error) {
                if (attempt === 2) throw error;
            }
        }
    };
    await clickMarker();
    await page.waitForFunction(() => {
        const card = document.querySelector(".marker-info-box");
        return card && getComputedStyle(card.parentElement).transitionDuration.split(",").every(value => parseFloat(value) === 0);
    }, {timeout: 30000});
    await sleep(500);

    const recordPan = async direction => {
        await page.evaluate(() => { window.__panReleaseAt = null; });
        const start = await page.$eval(".map--google", (element, sign) => {
            const box = element.getBoundingClientRect();
            return {x: sign > 0 ? box.left + 80 : box.right - 80, y: box.top + box.height / 2};
        }, direction);
        const recording = page.evaluate(title => new Promise(resolve => {
            const frames = [];
            let lastCard, lastMovement;
            let previous = performance.now();
            const sample = timestamp => {
                const card = document.querySelector(".marker-info-box");
                const marker = [...document.querySelectorAll(".map--google [title], .map--google [aria-label]")].find(element => (element.getAttribute("title") || element.getAttribute("aria-label")) === title);
                const cardBox = card?.getBoundingClientRect(), markerBox = marker?.getBoundingClientRect();
                const overlay = card?.parentElement, style = overlay && getComputedStyle(overlay);
                frames.push({timestamp, interval: timestamp - previous, transitionArmed: !!style && style.transitionDuration.split(",").some(value => parseFloat(value) > 0), card: cardBox && {x: cardBox.x, y: cardBox.y}, relative: cardBox && markerBox && {x: cardBox.x + cardBox.width / 2 - markerBox.x - markerBox.width / 2, y: cardBox.y + cardBox.height / 2 - markerBox.y - markerBox.height / 2}});
                if (cardBox && (!lastCard || Math.hypot(cardBox.x - lastCard.x, cardBox.y - lastCard.y) > 0.1)) lastMovement = timestamp;
                lastCard = cardBox && {x: cardBox.x, y: cardBox.y};
                previous = timestamp;
                const releaseAt = window.__panReleaseAt;
                const last = frames.at(-1);
                const idleAt = releaseAt && lastMovement && lastMovement >= releaseAt && timestamp - lastMovement >= 250 ? lastMovement + 250 : null;
                if (idleAt && timestamp >= idleAt + 650 || releaseAt && last.timestamp - releaseAt >= 10000) resolve({releaseAt, idleAt, frames});
                else window.requestAnimationFrame(sample);
            };
            window.requestAnimationFrame(sample);
        }), "Landscape 3:2");
        await page.mouse.move(start.x, start.y);
        await page.mouse.down();
        for (let step = 1; step <= 19; step++) {
            await page.mouse.move(start.x + direction * 300 * step / 19, start.y, {steps: 1});
            await sleep(16);
        }
        await page.mouse.up();
        await page.evaluate(() => { window.__panReleaseAt = performance.now(); });
        return recording;
    };
    const scorePan = ({releaseAt, idleAt, frames}) => {
        const during = frames.filter(frame => frame.timestamp <= releaseAt + 350);
        if (during.some(frame => frame.transitionArmed)) throw new Error("map card transition re-armed during pan drag");
        const relative = during.map(frame => frame.relative).filter(Boolean);
        const origin = relative[0];
        const relativeDrift = origin && Math.max(...relative.map(value => Math.hypot(value.x - origin.x, value.y - origin.y)));
        if (!origin || relativeDrift > 1.5) throw new Error(`card/marker relative vector was not stable during pan drag: drift=${relativeDrift?.toFixed(2)}px frames=${during.length}`);
        if (!idleAt) throw new Error("map pan did not reach a post-release idle state");
        const idle = frames.filter(frame => frame.timestamp >= idleAt + 150);
        const recent = idle.filter(frame => frame.timestamp <= idleAt + 650).map(frame => frame.card).filter(Boolean);
        const span = Math.max(Math.max(...recent.map(value => value.x)) - Math.min(...recent.map(value => value.x)), Math.max(...recent.map(value => value.y)) - Math.min(...recent.map(value => value.y)));
        let reversals = 0, previousSign = 0;
        for (let index = 1; index < idle.length; index++) {
            const delta = idle[index].card?.x - idle[index - 1].card?.x;
            const sign = Math.sign(delta);
            if (Math.abs(delta) >= 0.75) { if (previousSign && sign !== previousSign) reversals++; previousSign = sign; }
        }
        if (span > 1 || reversals >= 2) throw new Error(`post-pan idle jitter exceeded thresholds: span=${span.toFixed(2)}px reversals=${reversals}`);
        return {span: Number(span.toFixed(3)), reversals, frames: frames.length};
    };
    const results = [];
    for (const direction of [1, -1]) results.push(scorePan(await recordPan(direction)));
    console.log(JSON.stringify({scenario: "map-pan-drag", pans: results}));
    await page.$eval(".marker-info-box button[aria-label='Close post card']", element => element.click());
    await page.waitForFunction(() => !document.querySelector(".marker-info-box"), {timeout: 30000});
};

const mapZoomPan = async ({page, requests}) => {
    await page.goto(`${target.replace(/\/$/, "")}/map`, {waitUntil: "networkidle2", timeout: 30000});
    await page.waitForSelector(".map--google", {timeout: 30000});
    await page.waitForSelector("[title='Landscape 3:2'], [aria-label='Landscape 3:2']", {timeout: 30000});
    let opened = false;
    for (let attempt = 0; attempt < 3 && !opened; attempt++) {
        await page.$eval("[title='Landscape 3:2'], [aria-label='Landscape 3:2']", element => element.click());
        try { await page.waitForSelector(".marker-info-box", {timeout: 10000}); opened = true; } catch (error) { if (attempt === 2) throw error; }
    }
    await sleep(1200);
    const markerGeometry = () => page.$$eval(".map--google [title], .map--google [aria-label]", elements => elements.map(element => { const box = element.getBoundingClientRect(); return {label: element.getAttribute("title") || element.getAttribute("aria-label"), x: box.x, y: box.y, width: box.width, height: box.height}; }).filter(marker => marker.label && !/^\d+$/.test(marker.label)));
    const before = await markerGeometry();
    const zoom = await page.$("[aria-label='Zoom in']");
    if (!zoom) throw new Error("Google map zoom control is unavailable");
    await zoom.click();
    await page.waitForFunction(previous => [...document.querySelectorAll(".map--google [title], .map--google [aria-label]")].some(element => { const label = element.getAttribute("title") || element.getAttribute("aria-label"), old = previous.find(marker => marker.label === label), box = element.getBoundingClientRect(); return old && (Math.abs(box.x - old.x) > 0.5 || Math.abs(box.y - old.y) > 0.5 || Math.abs(box.width - old.width) > 0.5); }), {timeout: 10000}, before);
    const geometry = await page.$eval(".marker-info-box", element => { const card = element.getBoundingClientRect(), map = element.closest(".map--google").getBoundingClientRect(); return {card: {x: card.x, y: card.y, width: card.width, height: card.height}, map: {x: map.x, y: map.y, width: map.width, height: map.height}}; });
    if (geometry.card.x < geometry.map.x - 1 || geometry.card.y < geometry.map.y - 1 || geometry.card.x + geometry.card.width > geometry.map.x + geometry.map.width + 1 || geometry.card.y + geometry.card.height > geometry.map.y + geometry.map.height + 1) throw new Error("zoom moved the open card outside the map viewport");
    const close = await page.$(".marker-info-box button[aria-label='Close post card']");
    if (!close || !await close.evaluate(element => element.offsetParent !== null)) throw new Error("zoomed map card close button is not visible");
    await close.click();
    await page.waitForFunction(() => !document.querySelector(".marker-info-box"), {timeout: 30000});
    const baseline = postsRequests(requests, target).length;
    const map = await page.$eval(".map--google", element => { const box = element.getBoundingClientRect(); return {x: box.x, y: box.y, width: box.width, height: box.height}; });
    await page.mouse.move(map.x + 100, map.y + map.height / 2); await page.mouse.down();
    for (let step = 1; step <= 19; step++) { await page.mouse.move(map.x + 100 + 300 * step / 19, map.y + map.height / 2, {steps: 1}); await sleep(16); }
    await page.mouse.up(); await sleep(500);
    if (postsRequests(requests, target).length !== baseline) throw new Error("map pan issued a feed request");
    console.log(JSON.stringify({scenario: "map-zoom-pan", zoomChanged: true, posts: baseline}));
};

const multiPostOpenClose = async ({page, requests}) => {
    await page.goto(`${target.replace(/\/$/, "")}/map`, {waitUntil: "networkidle2", timeout: 30000});
    await page.waitForSelector(".map--google", {timeout: 30000});
    await page.waitForSelector("[title='Landscape 3:2'], [aria-label='Landscape 3:2']", {timeout: 30000});
    const initialPosts = postsRequests(requests, target).length, openedTitles = [];
    const open = async (title, expectedWidth) => {
        await page.$eval(`[title='${title}'], [aria-label='${title}']`, element => element.click()); await page.waitForSelector(".marker-info-box", {timeout: 30000}); await sleep(1200);
        const result = await page.$eval(".marker-info-box", element => { const box = element.getBoundingClientRect(); return {title: element.querySelector(".post-title")?.textContent?.trim() || element.textContent.trim().slice(0, 40), width: box.width}; });
        openedTitles.push(result.title);
        await page.evaluate(() => { window.__markerCard = document.querySelector(".marker-info-box"); });
        if (!await page.evaluate(() => window.__markerCard === document.querySelector(".marker-info-box"))) throw new Error(`${title} card container remounted while open`);
        if (await page.$$eval(".marker-info-box", cards => cards.length) !== 1) throw new Error(`duplicate ${title} cards rendered`);
        if (expectedWidth && result.width > expectedWidth) throw new Error(`${title} card width ${result.width}px exceeds intrinsic bound`);
        await page.$eval(".marker-info-box button[aria-label='Close post card']", element => element.click()); await page.waitForFunction(() => !document.querySelector(".marker-info-box"), {timeout: 30000});
    };
    await open("Landscape 3:2"); await open("Portrait"); await open("Boundary A", page.viewport().width * 0.75);
    // Marker cards expose no .post[id] in the DOM (postMarker.jsx renders metadata rows only),
    // so identity is asserted via each card's rendered title — 3 distinct, in the clicked order.
    if (openedTitles.length !== 3 || new Set(openedTitles).size !== 3) throw new Error(`multi-post cycle did not open 3 distinct cards: ${JSON.stringify(openedTitles)}`);
    if (postsRequests(requests, target).length !== initialPosts) throw new Error("opening and closing cards issued a feed request");
    console.log(JSON.stringify({scenario: "multi-post-open-close", titles: openedTitles, posts: initialPosts, cards: 0}));
};

const mapCardPanToFit = async ({page}) => {
    await page.goto(`${target.replace(/\/$/, "")}/map`, {waitUntil: "networkidle2", timeout: 30000});
    await page.waitForSelector(".map--google", {timeout: 30000});
    const markerSelector = "[title='Landscape 3:2'], [aria-label='Landscape 3:2']";
    await page.waitForSelector(markerSelector, {timeout: 30000});
    const mapBox = await page.$eval(".map--google", element => {
        const {x, y, width, height} = element.getBoundingClientRect();
        return {x, y, width, height};
    });
    // Move the marker towards an edge before opening it; the overlay must pan
    // by only the amount needed to fit the card, rather than blindly centring
    // on the marker (which is skipped when the map ref is briefly unavailable).
    await page.mouse.move(mapBox.x + mapBox.width / 2, mapBox.y + mapBox.height / 2);
    await page.mouse.down();
    await page.mouse.move(mapBox.x + mapBox.width / 2 + 300, mapBox.y + mapBox.height / 2, {steps: 10});
    await page.mouse.up();
    await page.waitForSelector(markerSelector, {timeout: 30000});
    await page.$eval(markerSelector, element => element.click());
    await page.waitForSelector(".marker-info-box .post-title", {timeout: 30000});
    await sleep(1200);
    const geometry = await page.$eval(".marker-info-box", element => {
        const card = element.getBoundingClientRect();
        const map = element.closest(".map--google").getBoundingClientRect();
        return {card: {left: card.left, top: card.top, right: card.right, bottom: card.bottom}, map: {left: map.left, top: map.top, right: map.right, bottom: map.bottom}, title: element.querySelector(".post-title")?.textContent?.trim()};
    });
    if (geometry.card.left < geometry.map.left - 1 || geometry.card.top < geometry.map.top - 1 || geometry.card.right > geometry.map.right + 1 || geometry.card.bottom > geometry.map.bottom + 1) {
        throw new Error(`opened ${geometry.title} card was not fully inside the map viewport: ${JSON.stringify(geometry)}`);
    }
    console.log(JSON.stringify({scenario: "map-card-pan-to-fit", geometry}));
    await page.$eval(".marker-info-box button[aria-label='Close post card']", element => element.click());
    await page.waitForFunction(() => !document.querySelector(".marker-info-box"), {timeout: 30000});
};

const nestedRouteTitles = async ({page}) => {
    // PRD may retain the parent-title defect; route semantics are asserted for the RC bundle.
    for (const [path, title] of [["/blog/photos", "See (through) me"], ["/blog/words", "Read me"], ["/blog/photos/tags/cats", "See (through) me"]]) {
        await page.goto(`${target.replace(/\/$/, "")}${path}`, {waitUntil: "networkidle2", timeout: 30000});
        await page.waitForFunction(expected => document.title.includes(expected), {timeout: 30000}, title);
    }
};

const blogInfiniteScroll = async ({page}) => {
    await page.goto(`${target.replace(/\/$/, "")}/blog`, {waitUntil: "networkidle2", timeout: 30000});
    await page.waitForSelector(".post", {timeout: 30000});
    const beforeCount = await page.$$eval(".post", posts => posts.length);
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    await page.mouse.wheel({deltaY: 2000});
    await page.evaluate(() => window.dispatchEvent(new Event("scroll")));
    await page.waitForFunction(previousCount => document.querySelectorAll(".post").length > previousCount, {timeout: 30000}, beforeCount);
    const afterCount = await page.$$eval(".post", posts => posts.length);
    if (afterCount <= beforeCount) throw new Error(`blog infinite scroll did not append posts: ${beforeCount} -> ${afterCount}`);
    console.log(JSON.stringify({scenario: "blog-infinite-scroll", beforeCount, afterCount}));
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
for (const [name, scenario] of [["map-pan-drag", mapPanDrag], ["map-zoom-pan", mapZoomPan], ["multi-post-open-close", multiPostOpenClose], ["map-card-pan-to-fit", mapCardPanToFit]]) {
    await runBrowserScenario({name, url: target, scenario});
}
try {
    await runBrowserScenario({name: "blog-infinite-scroll", url: target, scenario: blogInfiniteScroll});
} catch (error) {
    if (!isPrd) throw error;
    console.log(JSON.stringify({scenario: "blog-infinite-scroll", prdDivergence: error.message}));
}
console.log(JSON.stringify({target, prdReference: isPrd, scenarios: ["tab-desync", "tab-desync-no-sw", "map-interaction", "map-pan-drag", "map-zoom-pan", "multi-post-open-close", "map-card-pan-to-fit", "blog-infinite-scroll"]}));
