import {createRequire} from "module";
const require = createRequire(import.meta.url);
const {expect} = require("chai");
const {getClusterMarkerChanges} = require("../../../../../../../src/lib/components/map/google/clusterMarkerChanges.js");

describe("Google map marker clusterer", function () {
    it("adds new posts without removing the active anchor", function () {
        const activeMarker = {};
        const existingMarker = {};
        const changes = getClusterMarkerChanges(
            {active: activeMarker, existing: existingMarker},
            {active: activeMarker, existing: existingMarker, added: {}}
        );

        expect(changes.toAdd).to.have.length(1);
        expect(changes.toRemove).to.have.length(0);
    });
});
