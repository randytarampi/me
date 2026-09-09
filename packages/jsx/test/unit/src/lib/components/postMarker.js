import {expect} from "chai";
import {derivePostCardDimensions, derivePostCardTargetWidth} from "../../../../../src/lib/components/map/google/postCardOverlay.jsx";

describe("post marker overlay dimensions", function () {
    it("preserves the historical landscape viewport sizing", function () {
        const dimensions = derivePostCardDimensions({photo: {width: 1200, height: 800}, viewportWidth: 1024, viewportHeight: 768});
        expect(dimensions).to.eql({width: 768, height: 512});
    });

    for (const devicePixelRatio of [1, 2]) {
        it(`keeps landscape CSS dimensions at DPR ${devicePixelRatio}`, function () {
            const dimensions = derivePostCardDimensions({photo: {width: 1200, height: 800}, viewportWidth: 1440, viewportHeight: 900, devicePixelRatio});
            expect(dimensions).to.eql({width: 1013, height: 675});
        });
        it(`selects a DPR ${devicePixelRatio} media target without changing CSS dimensions`, function () {
            expect(derivePostCardTargetWidth({viewportWidth: 1440, devicePixelRatio})).to.equal(1080 * devicePixelRatio);
        });
    }

    it("preserves a portrait photo ratio in a portrait viewport", function () {
        const dimensions = derivePostCardDimensions({photo: {width: 800, height: 1200}, viewportWidth: 390, viewportHeight: 844});
        expect(dimensions).to.eql({width: 293, height: 439});
    });

    it("caps a portrait photo by viewport height without changing its ratio", function () {
        const dimensions = derivePostCardDimensions({photo: {width: 800, height: 1200}, viewportWidth: 1280, viewportHeight: 600});
        expect(dimensions).to.eql({width: 300, height: 450});
    });

    it("uses top-level dimensions when media metadata is missing", function () {
        const dimensions = derivePostCardDimensions({photo: {url: "photo.jpg", width: 1200, height: 800}, viewportWidth: 1024, viewportHeight: 768});
        expect(dimensions).to.eql({width: 768, height: 512});
    });

    it("sizes text cards when media metadata is absent", function () {
        expect(derivePostCardDimensions({viewportWidth: 390, viewportHeight: 844})).to.eql({width: 293, height: 144});
    });
});
