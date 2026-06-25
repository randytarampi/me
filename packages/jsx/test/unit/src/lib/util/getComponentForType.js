const {Gallery, LinkPost, Photo, Post} = require("@randy.tarampi/js");
const {expect} = require("chai");
const getComponentForType = require("../../../../../src/lib/util/getComponentForType.js").default || require("../../../../../src/lib/util/getComponentForType.js");

describe("getComponentForType", function () {
    it("gets `Gallery`s", function () {
        const stubGallery = Gallery.fromJS({id: "grr", width: -2});

        const GalleryConstructor = getComponentForType(stubGallery.type);

        expect(GalleryConstructor.name).to.eql("GalleryComponent");
    });

    it("gets `LinkPost`s", function () {
        const stubLinkPost = LinkPost.fromJS({id: "grr", width: -2});

        const LinkPostConstructor = getComponentForType(stubLinkPost.type);

        expect(LinkPostConstructor.name).to.eql("LinkPostComponent");
    });

    it("gets `Photo`s", function () {
        const stubPhoto = Photo.fromJS({id: "grr", width: -2});

        const PhotoConstructor = getComponentForType(stubPhoto.type);

        expect(PhotoConstructor.name).to.eql("ProgressiveImageWrappedPhotoComponent");
    });

    it("gets `Post`s", function () {
        const stubPost = Post.fromJS({id: "grr", width: -2});

        const PostConstructor = getComponentForType(stubPost.type);

        expect(PostConstructor.name).to.eql("PostComponent");
    });

    it("throws when it encounters an unknown type", function () {
        try {
            const stubPost = Post.fromJS({type: "woof", id: "grr", width: -2});
            getComponentForType(stubPost.type);
            throw new Error("Wtf? This should've thrown");
        } catch (error) {
            expect(error.message).to.match(/Can't `getComponentForType` for `woof`/);
        }
    });
});
