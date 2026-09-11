import {expect} from "chai";
import {Photo, Post} from "@randy.tarampi/js";
import {getSvgPathForPost} from "../../../../../src/lib/util/getSvgPathForPost.js";
import {derivePostCardDimensions, derivePostCardTargetWidth} from "../../../../../src/lib/components/map/google/postCardOverlay.jsx";

describe("post marker memoization", function () {
    it("uses React.memo and memoizes all marker options and handlers", async function () {
        const {default: PostMarkerComponent} = await import("../../../../../src/lib/components/postMarker.jsx");
        expect(PostMarkerComponent.$$typeof).to.equal(Symbol.for("react.memo"));
        expect(PostMarkerComponent.type).to.be.a("function");
    });

    it("changes position for coordinates and icon for post type changes", function () {
        const post = {type: Post.type, source: undefined, lat: 52.5, long: -113.5};
        const movedPost = {...post, lat: 53.5, long: -114.5};
        expect({lat: movedPost.lat, lng: movedPost.long}).not.to.deep.equal({lat: post.lat, lng: post.long});
        expect(getSvgPathForPost(post)).not.to.equal(getSvgPathForPost({...post, type: Photo.type}));
    });

    it("confirms the icon dependency is pure in source and type", function () {
        const post = {type: Post.type, source: undefined, id: "one"};
        const samePathPost = {...post, id: "two"};
        expect(getSvgPathForPost(post)).to.equal(getSvgPathForPost(samePathPost));
    });
});

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

    it("keeps text-card sizing bounded while allowing content measurement", function () {
        const dimensions = derivePostCardDimensions({viewportWidth: 390, viewportHeight: 844});
        expect(dimensions.width).to.be.at.most(Math.ceil(390 * 0.75));
        expect(dimensions.height).to.be.at.most(844 * 0.75);
        expect(dimensions.width).to.be.greaterThan(0);
    });
});
