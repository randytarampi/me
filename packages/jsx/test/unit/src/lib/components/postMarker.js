import {expect} from "chai";
import {derivePostCardDimensions} from "../../../../../src/lib/components/map/google/postCardOverlay.jsx";

describe("post marker overlay dimensions", function () {
    it("preserves a landscape photo ratio within viewport caps", function () {
        const dimensions = derivePostCardDimensions({photo: {width: 1200, height: 800}, viewportWidth: 1280, viewportHeight: 800});
        expect(dimensions).to.eql({width: 480, height: 320});
    });

    it("preserves a portrait photo ratio in a portrait viewport", function () {
        const dimensions = derivePostCardDimensions({photo: {width: 800, height: 1200}, viewportWidth: 390, viewportHeight: 844});
        expect(dimensions).to.eql({width: 293, height: 439});
    });

    it("caps a portrait photo by viewport height without changing its ratio", function () {
        const dimensions = derivePostCardDimensions({photo: {width: 800, height: 1200}, viewportWidth: 1280, viewportHeight: 600});
        expect(dimensions).to.eql({width: 300, height: 450});
    });
});
