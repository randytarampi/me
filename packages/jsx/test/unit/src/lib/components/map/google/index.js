import {expect} from "chai";
import {shouldShowMapLoading} from "../../../../../../../src/lib/components/map/google/mapLoading.js";

describe("Google map loading state", function () {
    it("shows while the Maps API is loading", function () {
        expect(shouldShowMapLoading({apiLoadingStatus: "LOADING", tilesLoaded: false})).to.equal(true);
    });

    it("shows after the API is ready until the first tilesloaded event", function () {
        expect(shouldShowMapLoading({apiLoadingStatus: "LOADED", tilesLoaded: false})).to.equal(true);
    });

    it("hides after the first tilesloaded event", function () {
        expect(shouldShowMapLoading({apiLoadingStatus: "LOADED", tilesLoaded: true})).to.equal(false);
    });
});