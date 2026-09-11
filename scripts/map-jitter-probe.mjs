import puppeteer from "puppeteer";
import {mkdir, writeFile} from "node:fs/promises";

const targetUrl = process.argv[2];
const dprIndex = process.argv.indexOf("--dpr");
const deviceScaleFactor = dprIndex === -1 ? 1 : Number(process.argv[dprIndex + 1]);
if (!targetUrl || ![1, 2].includes(deviceScaleFactor)) {
    console.error("Usage: node scripts/map-jitter-probe.mjs <targetUrl> [--dpr 1|2]");
    process.exit(2);
}

const label = new URL(targetUrl).hostname.includes("localhost") ? "local" : "live";
const outputPath = `/tmp/map-jitter/${label}-dpr${deviceScaleFactor}.json`;
const sleep = milliseconds => new Promise(resolve => setTimeout(resolve, milliseconds));

const installMapEventProbe = () => {
    window.__mapEvents = [];
    window.__mapEventSequence = 0;
    const install = () => {
        const maps = window.google?.maps;
        const Map = maps?.Map;
        if (!Map?.prototype || Map.prototype.__jitterProbeWrapped) return !!Map?.prototype;
        const original = Map.prototype.addListener;
        Map.prototype.addListener = function(name, ...args) {
            const callback = args[0];
            if (typeof callback === "function") {
                args[0] = (...callbackArgs) => {
                    const now = performance.now();
                    window.__mapEvents.push({name, timestamp: now, sequence: ++window.__mapEventSequence});
                    if (name === "center_changed") window.__mapCenterChanges.push(now);
                    return callback.apply(this, callbackArgs);
                };
            }
            return original.call(this, name, ...args);
        };
        Map.prototype.__jitterProbeWrapped = true;
        return true;
    };
    window.__mapCenterChanges = [];
    const timer = setInterval(() => { if (install()) clearInterval(timer); }, 0);
    install();
};

// Post markers expose title/aria-label but NOT role='button' in this Maps rendering
// path (proven by residual-probe.mjs/.slim/deepwork live runs). Google's own UI
// controls (zoom/pan/street-view/pegman/fullscreen) DO carry aria-labels, so filter
// them by denylist rather than by requiring a role.
// NOTE: page.evaluate serializes ONLY the passed callback — every in-page check
// must inline the denylist (no Node-scope closure references).
const markerSelector = ".map--google [title], .map--google [aria-label]";
const controlLabelDenylistSource = "^(Zoom in|Zoom out|Pan up|Pan down|Pan left|Pan right|Toggle fullscreen view|Keyboard shortcuts|Street View Pegman Control|Pegman is on top of the Map|Show street map|Show satellite imagery|Show terrain|Show street map with imagery|Show imagery with street names|Map \\d+|Satellite \\d+|Exit fullscreen|Fullscreen)";
const waitForTitledMarker = async page => {
    for (let attempt = 0; attempt < 10; attempt++) {
        if (await page.evaluate((selector, denylistSource) => {
            const denylist = new RegExp(denylistSource, "i");
            return [...document.querySelectorAll(selector)]
                .filter(element => !element.closest("[aria-label='Zoom in'], [aria-label='Zoom out'], .gm-control-active, .gmnoprint > div[role='button']"))
                .some(element => {
                    const title = element.getAttribute("title") || element.getAttribute("aria-label") || "";
                    const box = element.getBoundingClientRect();
                    return title && !/^\d+$/.test(title) && !denylist.test(title)
                        && box.width > 0 && box.height > 0 && box.bottom > 0 && box.right > 0;
                });
        }, markerSelector, controlLabelDenylistSource)) return "titled";
        const clusterPoint = await page.evaluate(() => {
            const mapBox = document.querySelector(".map--google")?.getBoundingClientRect();
            if (!mapBox) return null;
            const centre = {x: mapBox.x + mapBox.width / 2, y: mapBox.y + mapBox.height / 2};
            const clusters = [...document.querySelectorAll(".map--google [role='button'][aria-label]")]
                .filter(element => /^\d+$/.test(element.getAttribute("aria-label")) && element.getBoundingClientRect().width > 0 && element.getBoundingClientRect().right > 0)
                .map(element => {
                    const box = element.getBoundingClientRect();
                    return {x: box.x + box.width / 2, y: box.y + box.height / 2, distance: Math.hypot(box.x + box.width / 2 - centre.x, box.y + box.height / 2 - centre.y)};
                })
                .sort((left, right) => left.distance - right.distance);
            // Click the centre-closest cluster first (fixtures cluster near Berlin centre),
            // falling back to the largest if the closest is ambiguous.
            const point = clusters[0];
            if (!point) return null;
            return {x: point.x, y: point.y, size: Number(document.querySelector(".map--google [role='button'][aria-label]")?.getAttribute("aria-label") || 0)};
        });
        if (!clusterPoint) {
            // Canvas-drawn cluster badges and photo-post markers expose no role='button'
            // elements (the seeded corpus's four geo posts are flickr photos whose
            // markers are untitled canvas/svg icons). Zooming in is the known-good
            // dispersal path: once clusters split into individual markers, the final
            // coordinate-click fallback in markerAndCard() opens a card.
            const zoomedIn = await page.evaluate(() => {
                const zoomButton = [...document.querySelectorAll("[aria-label='Zoom in'], button[aria-label*='zoom' i]")]
                    .find(element => element.getBoundingClientRect().width > 0);
                if (!zoomButton) return false;
                zoomButton.click();
                return true;
            });
            if (!zoomedIn) break;
            await sleep(1500);
            continue;
        }
        await page.mouse.click(clusterPoint.x, clusterPoint.y);
        await sleep(1000);
    }
    // Untitled individual markers may already be visible after zooming. Wait for
    // ANY non-tile marker imagery (data:svg icons) inside the map container.
    await page.waitForFunction(() => [...document.querySelectorAll(".map--google img")]
        .some(element => (element.getAttribute("src") || "").startsWith("data:image/svg")
            && element.getBoundingClientRect().width > 0
            && element.getBoundingClientRect().height > 0), {timeout: 30000});
    return "untitled";
};
const markerAndCard = async page => {
    let lastError;
    const hasTitledMarker = () => page.evaluate((selector, denylistSource) => {
        const denylist = new RegExp(denylistSource, "i");
        return [...document.querySelectorAll(selector)]
            .filter(element => !element.closest("[aria-label='Zoom in'], [aria-label='Zoom out'], .gm-control-active, .gmnoprint > div[role='button']"))
            .some(element => {
                const title = element.getAttribute("title") || element.getAttribute("aria-label") || "";
                const box = element.getBoundingClientRect();
                return title && !/^\d+$/.test(title) && !denylist.test(title)
                    && box.width > 0 && box.height > 0 && box.bottom > 0 && box.right > 0;
            });
    }, markerSelector, controlLabelDenylistSource);
    const clickTitledMarker = async () => {
        const point = await page.evaluate((selector, denylistSource) => {
            const denylist = new RegExp(denylistSource, "i");
            const found = [...document.querySelectorAll(selector)]
                .filter(element => !element.closest("[aria-label='Zoom in'], [aria-label='Zoom out'], .gm-control-active, .gmnoprint > div[role='button']"))
                .find(element => {
                    const title = element.getAttribute("title") || element.getAttribute("aria-label") || "";
                    const box = element.getBoundingClientRect();
                    return title && !/^\d+$/.test(title) && !denylist.test(title)
                        && box.width > 0 && box.height > 0 && box.bottom > 0 && box.right > 0;
                });
            if (!found) return null;
            const box = found.getBoundingClientRect();
            return {x: box.x + box.width / 2, y: box.y + box.height / 2};
        }, markerSelector, controlLabelDenylistSource);
        if (!point) return false;
        // Marker elements (svg imgs) may lack a .click() method — click via real
        // mouse events at the element's coordinates.
        await page.mouse.click(point.x, point.y);
        return true;
    };
    const clickUntitledMarkerByCoordinate = () => page.evaluate(() => {
        // Photo-post markers are canvas/svg icons with no title/aria attributes.
        // Click the centre-most untitled data:svg marker image.
        const candidates = [...document.querySelectorAll(".map--google img")]
            .filter(element => (element.getAttribute("src") || "").startsWith("data:image/svg"))
            .map(element => {
                const box = element.getBoundingClientRect();
                return {x: box.x + box.width / 2, y: box.y + box.height / 2, visible: box.width > 0 && box.height > 0 && box.bottom > 0 && box.right > 0};
            })
            .filter(point => point.visible);
        if (!candidates.length) return false;
        const mapBox = document.querySelector(".map--google")?.getBoundingClientRect();
        if (!mapBox) return false;
        const centre = {x: mapBox.x + mapBox.width / 2, y: mapBox.y + mapBox.height / 2};
        const point = candidates.sort((left, right) =>
            Math.hypot(left.x - centre.x, left.y - centre.y) - Math.hypot(right.x - centre.x, right.y - centre.y))[0];
        document.elementFromPoint(point.x, point.y)?.click();
        return true;
    });
    for (let attempt = 0; attempt < 3; attempt++) {
        if (await hasTitledMarker()) {
            await clickTitledMarker();
        } else {
            // Untitled photo-marker path: click by coordinate. A synthetic .click()
            // may not reach the canvas-drawn/overlay marker, so dispatch a real
            // mouse event via CDP-backed mouse at the located point.
            const clicked = await clickUntitledMarkerByCoordinate();
            if (!clicked) throw new Error("no markers (titled or untitled) available to click");
            const point = await page.evaluate(() => {
                const candidates = [...document.querySelectorAll(".map--google img")]
                    .filter(element => (element.getAttribute("src") || "").startsWith("data:image/svg"))
                    .map(element => {
                        const box = element.getBoundingClientRect();
                        return {x: box.x + box.width / 2, y: box.y + box.height / 2, visible: box.width > 0 && box.height > 0 && box.bottom > 0 && box.right > 0};
                    })
                    .filter(p => p.visible);
                if (!candidates.length) return null;
                const mapBox = document.querySelector(".map--google")?.getBoundingClientRect();
                if (!mapBox) return null;
                const centre = {x: mapBox.x + mapBox.width / 2, y: mapBox.y + mapBox.height / 2};
                return candidates.sort((left, right) =>
                    Math.hypot(left.x - centre.x, left.y - centre.y) - Math.hypot(right.x - centre.x, right.y - centre.y))[0];
            });
            if (point) await page.mouse.click(point.x, point.y);
        }
        try {
            await page.waitForSelector(".marker-info-box", {timeout: 10000});
            return;
        } catch (error) {
            lastError = error;
        }
    }
    throw lastError;
};

const transitionState = page => page.$eval(".marker-info-box", element => {
    const style = getComputedStyle(element.parentElement);
    return {property: style.transitionProperty, duration: style.transitionDuration};
});

const recordPan = async (page, direction) => {
    const start = await page.$eval(".marker-info-box", element => {
        const card = element.getBoundingClientRect();
        const map = element.closest(".map--google").getBoundingClientRect();
        // Begin beside the card, at the marker's map position, so the overlay does not
        // consume the gesture while the drag still exercises the card/marker geometry.
        return {x: Math.min(map.right - 20, map.left + map.width / 2 + card.width / 2 + 40), y: map.top + map.height / 2};
    });
    const started = page.evaluate(releaseDirection => new Promise(resolve => {
        const frames = [];
        let previousTime = performance.now();
        const releaseAt = performance.now();
        const markerIds = new WeakMap();
        let nextMarkerId = 1;
        const transitionIsArmed = style => style.transitionDuration.split(",").some(value => parseFloat(value) > 0);
        const sample = now => {
            const card = document.querySelector(".marker-info-box");
            const overlay = card?.parentElement;
            const marker = [...document.querySelectorAll(".map--google [role='button'][title], .map--google [role='button'][aria-label]")].find(element => {
                const title = element.getAttribute("title") || element.getAttribute("aria-label") || "";
                const box = element.getBoundingClientRect();
                return title && !/^\d+$/.test(title) && box.width > 0 && box.height > 0 && box.bottom > 0 && box.right > 0;
            });
            const cardBox = card?.getBoundingClientRect();
            const markerBox = marker?.getBoundingClientRect();
            const style = overlay && getComputedStyle(overlay);
            const eventCursor = window.__mapEvents?.length || 0;
            frames.push({
                timestamp: now,
                frameInterval: now - previousTime,
                card: cardBox && {x: cardBox.x, y: cardBox.y, width: cardBox.width, height: cardBox.height},
                transform: overlay?.style.transform || "",
                transitionProperty: style?.transitionProperty || "",
                transitionDuration: style?.transitionDuration || "",
                transitionArmed: !!style && transitionIsArmed(style),
                marker: markerBox && {x: markerBox.x, y: markerBox.y, width: markerBox.width, height: markerBox.height, nodeId: marker && (markerIds.get(marker) || (markerIds.set(marker, nextMarkerId), nextMarkerId++))},
                relative: cardBox && markerBox && {x: cardBox.x + cardBox.width / 2 - markerBox.x - markerBox.width / 2, y: cardBox.y + cardBox.height / 2 - markerBox.y - markerBox.height / 2},
                eventCursor,
                centreChanges: (window.__mapCenterChanges || []).slice()
            });
            previousTime = now;
            const changes = frames.at(-1).centreChanges;
            const lastChange = changes.at(-1);
            const idle = lastChange && now >= releaseAt && now - lastChange >= 250 ? Math.max(releaseAt, lastChange + 250) : null;
            if (idle && now >= idle + 2500 || now >= releaseAt + 10000) resolve({direction: releaseDirection, releaseAt, idleAt: idle, frames});
            else requestAnimationFrame(sample);
        };
        requestAnimationFrame(sample);
    }), direction);

    await page.mouse.move(start.x, start.y);
    await page.mouse.down();
    const steps = 19;
    for (let index = 1; index <= steps; index++) {
        await page.mouse.move(start.x + direction * 300 * index / steps, start.y, {steps: 1});
        await sleep(16);
    }
    await page.mouse.up();
    return started;
};

const score = run => {
    const {frames, idleAt, releaseAt} = run;
    if (!idleAt) return {verdict: "INVALID", reasons: ["no post-release idle observed"], invalid: true};
    const after = frames.filter(frame => frame.timestamp >= idleAt + 150);
    const duringOrAfter = frames.some(frame => frame.timestamp >= releaseAt && frame.transitionArmed);
    const settled = frames.filter(frame => frame.timestamp >= idleAt + 150 && frame.timestamp <= idleAt + 650 && frame.card);
    const xs = settled.map(frame => frame.card.x), ys = settled.map(frame => frame.card.y);
    const span = Math.max((Math.max(...xs) - Math.min(...xs)), (Math.max(...ys) - Math.min(...ys)));
    const median = values => values.sort((a, b) => a - b)[Math.floor(values.length / 2)];
    const smoothed = after.map((frame, index, list) => {
        const window = list.slice(Math.max(0, index - 1), index + 2).map(item => item.card?.x).filter(Number.isFinite);
        return {timestamp: frame.timestamp, x: median(window)};
    });
    let reversals = 0, previousSign = 0, leg = 0;
    for (let index = 1; index < smoothed.length; index++) {
        const delta = smoothed[index].x - smoothed[index - 1].x;
        const sign = Math.sign(delta);
        if (Math.abs(delta) >= 0.75) {
            if (sign && previousSign && sign !== previousSign && smoothed[index].timestamp - smoothed[index - 1].timestamp <= 1000) reversals++;
            previousSign = sign;
            leg = 0;
        } else leg += Math.abs(delta);
    }
    const relativeJumps = after.slice(2).some((frame, index) => {
        const a = after[index].relative, b = after[index + 1].relative, c = frame.relative;
        return a && b && c && Math.hypot(b.x - a.x, b.y - a.y) > 1.5 && Math.hypot(c.x - b.x, c.y - b.y) > 1.5;
    });
    const settledMovement = after.filter(frame => frame.timestamp >= idleAt + 250).some((frame, index, list) => index && frame.card && list[index - 1].card && Math.hypot(frame.card.x - list[index - 1].card.x, frame.card.y - list[index - 1].card.y) > 0.1);
    const intervals = frames.slice(1).map((frame, index) => frame.frameInterval || frame.timestamp - frames[index].timestamp);
    const invalid = intervals.filter(interval => interval > 34).length > intervals.length * 0.1 || intervals.some(interval => interval > 100);
    const reasons = [];
    if (duringOrAfter) reasons.push("transition armed during drag/post-idle");
    if (span > 1) reasons.push(`post-idle 500ms span ${span.toFixed(2)}px`);
    if (reversals >= 2) reasons.push(`${reversals} direction reversals`);
    if (relativeJumps) reasons.push("relative vector moved >1.5px for 2 frames");
    if (settledMovement) reasons.push("movement after idle+250ms");
    if (invalid) reasons.push("frame cadence invalid");
    return {verdict: reasons.length ? "FAIL" : "PASS", reasons, invalid, releaseAt, idleAt, span: Number(span.toFixed(3)), reversals, frameCount: frames.length, maxFrameInterval: Math.max(...intervals)};
};

const run = async () => {
    const disableSandbox = process.env.PUPPETEER_NO_SANDBOX === "1" || process.getuid?.() === 0;
    const headed = process.env.JITTER_PROBE_HEADED === "1";
    const browser = await puppeteer.launch({headless: headed ? false : "new", args: disableSandbox ? ["--no-sandbox", "--disable-setuid-sandbox"] : []});
    try {
        const page = await browser.newPage();
        await page.setViewport({width: 1440, height: 900, deviceScaleFactor});
        if (label === "live") await page.setBypassServiceWorker(true);
        await page.evaluateOnNewDocument(installMapEventProbe);
        await page.goto(targetUrl, {waitUntil: "networkidle2", timeout: 60000});
        await page.waitForSelector(".map--google", {timeout: 30000});
        await waitForTitledMarker(page);
        await markerAndCard(page);
        let revealTransition;
        try {
            await page.waitForFunction(() => {
                const card = document.querySelector(".marker-info-box");
                return card && getComputedStyle(card.parentElement).transitionDuration.split(",").every(value => parseFloat(value) === 0);
            }, {timeout: 1500});
            await sleep(500);
            revealTransition = await transitionState(page);
        } catch {
            revealTransition = await transitionState(page);
        }
        const pans = [];
        for (const direction of [1, -1, 1, -1, 1]) {
            let scored, recording;
            for (let attempt = 0; attempt < 2; attempt++) {
                recording = await recordPan(page, direction);
                scored = score(recording);
                if (!scored.invalid || attempt) break;
            }
            pans.push({...scored, direction, frames: recording.frames});
            console.log(`${label} DPR${deviceScaleFactor} pan ${pans.length}: ${scored.verdict}${scored.reasons.length ? ` (${scored.reasons.join(", ")})` : ""}`);
        }
        const result = {targetUrl, label, deviceScaleFactor, revealTransition, pans, overall: pans.some(pan => pan.verdict !== "PASS") ? "FAIL" : "PASS", mapEvents: await page.evaluate(() => window.__mapEvents || [])};
        await mkdir("/tmp/map-jitter", {recursive: true});
        await writeFile(outputPath, JSON.stringify(result, null, 2));
        console.log(`${label} DPR${deviceScaleFactor} overall: ${result.overall} (${outputPath})`);
        process.exitCode = result.overall === "FAIL" ? 1 : 0;
    } finally {
        await browser.close();
    }
};

run().catch(async error => {
    console.error(error.stack || error);
    await mkdir("/tmp/map-jitter", {recursive: true});
    await writeFile(outputPath, JSON.stringify({targetUrl, label, deviceScaleFactor, overall: "INVALID", error: error.message}, null, 2));
    process.exitCode = 1;
});
