import {createRequire} from "module";
const require = createRequire(import.meta.url);
const {expect} = require("chai");
const {
    INFO_WINDOW_OPTIONS,
    buildInfoWindowOptions,
    getNextVisibleMarkerId
} = require("../../../../../src/lib/components/infoWindowOptions.js");

describe("post marker InfoWindow state", function () {
    it("keeps native InfoWindow options stable while a photo loads", function () {
        expect(buildInfoWindowOptions()).to.equal(INFO_WINDOW_OPTIONS);
        expect(buildInfoWindowOptions()).to.equal(buildInfoWindowOptions());
        expect(INFO_WINDOW_OPTIONS).to.include({
            disableAutoPan: true,
            shouldFocus: false,
            headerDisabled: true
        });
        expect(INFO_WINDOW_OPTIONS).to.not.have.property("pixelOffset");
    });

    it("clears the active marker when the native window closes", function () {
        expect(getNextVisibleMarkerId("marker-a", "marker-a")).to.equal(null);
    });

    it("allows only one marker window to be visible", function () {
        expect(getNextVisibleMarkerId("marker-a", "marker-b")).to.equal("marker-b");
        expect(getNextVisibleMarkerId(null, "marker-b")).to.equal("marker-b");
    });
});
