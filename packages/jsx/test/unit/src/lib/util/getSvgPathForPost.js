import {Gallery, Photo, Post} from "@randy.tarampi/js";
import {expect} from "chai";
import {
    cameraSvgPath,
    commentSvgPath,
    flickrSvgPath,
    getSvgPathForPost,
    instagramSvgPath,
    tumblrSvgPath,
    twitterSvgPath
} from "../../../../../src/lib/util/getSvgPathForPost";

describe("getSvgPathForPost", function () {
    it("works for `flickr`", function () {
        const stubPost = Photo.fromJS({source: "flickr"});
        const svgPath = getSvgPathForPost(stubPost);

        expect(svgPath).to.eql(flickrSvgPath);
    });

    it("works for `instagram`", function () {
        const stubPost = Photo.fromJS({source: "instagram"});
        const svgPath = getSvgPathForPost(stubPost);

        expect(svgPath).to.eql(instagramSvgPath);
    });

    it("works for `tumblr`", function () {
        const stubPost = Gallery.fromJS({source: "tumblr"});
        const svgPath = getSvgPathForPost(stubPost);

        expect(svgPath).to.eql(tumblrSvgPath);
    });

    it("works for `twitter`", function () {
        const stubPost = Gallery.fromJS({source: "twitter"});
        const svgPath = getSvgPathForPost(stubPost);

        expect(svgPath).to.eql(twitterSvgPath);
    });

    it("works for `unsplash`", function () {
        const stubPost = Photo.fromJS({source: "unsplash"});
        const svgPath = getSvgPathForPost(stubPost);

        expect(svgPath).to.eql(cameraSvgPath);
    });

    it("works for unsourced `Gallery`s", function () {
        const stubPost = Gallery.fromJS();
        const svgPath = getSvgPathForPost(stubPost);

        expect(svgPath).to.eql(cameraSvgPath);
    });

    it("works for unsourced `Photo`s", function () {
        const stubPost = Photo.fromJS();
        const svgPath = getSvgPathForPost(stubPost);

        expect(svgPath).to.eql(cameraSvgPath);
    });

    it("works for unsourced `Post`s", function () {
        const stubPost = Post.fromJS();
        const svgPath = getSvgPathForPost(stubPost);

        expect(svgPath).to.eql(commentSvgPath);
    });

    it("throws when it encounters an unknown type", function () {
        try {
            const stubPost = Post.fromJS({type: "woof", id: "meow"});
            getSvgPathForPost(stubPost);
            throw new Error("Wtf? This should've thrown");
        } catch (error) {
            expect(error.message).to.match(/Can't `getSvgPathForPost` for woof `meow`/);
        }
    });
});
