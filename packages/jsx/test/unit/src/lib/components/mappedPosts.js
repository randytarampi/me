import {createRequire} from "module";
const require = createRequire(import.meta.url);
const {expect} = require("chai");
const {
    hasMaterialViewportChange,
    hasReachedMapInteractionCenter,
    shouldFetchForMapIdle
} = require("../../../../../src/lib/components/mapViewport.js");

describe("mapped posts viewport fetching", function () {
    it("does not fetch when an idle event has no material viewport change", function () {
        const viewport = {north: 1, east: 1, south: 0, west: 0};

        expect(hasMaterialViewportChange(viewport, viewport)).to.equal(false);
        expect(shouldFetchForMapIdle(viewport, viewport, false)).to.equal(false);
    });

    it("does not fetch when an idle event was caused by opening a card", function () {
        expect(shouldFetchForMapIdle(
            {north: 2, east: 2, south: 1, west: 1},
            {north: 1, east: 1, south: 0, west: 0},
            true
        )).to.equal(false);
    });

    it("keeps interaction suppression active until the requested pan reaches its centre", function () {
        const target = {lat: 52.5, lng: 13.4};
        const map = {getCenter: () => ({lat: () => 52.6, lng: () => 13.4})};

        expect(hasReachedMapInteractionCenter(map, target)).to.equal(false);
        expect(hasReachedMapInteractionCenter({getCenter: () => target}, target)).to.equal(true);
    });

    it("stops fetching after the terminal page", function () {
        expect(shouldFetchForMapIdle(null, null, false, {hasMore: false})).to.equal(false);
        expect(shouldFetchForMapIdle(null, null, false, {hasMore: true})).to.equal(true);
    });
});
