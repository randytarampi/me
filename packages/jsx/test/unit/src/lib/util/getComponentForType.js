import {Gallery, Photo, Post} from "@randy.tarampi/js";
import {expect} from "chai";
import GalleryComponent from "../../../../../src/lib/components/gallery";
import PhotoComponent from "../../../../../src/lib/components/photo";
import PostComponent from "../../../../../src/lib/components/post";
import getComponentForType from "../../../../../src/lib/util/getComponentForType";

describe("getComponentForType", function () {
    it("gets `Gallery`s", function () {
        const stubGallery = Gallery.fromJS({id: "grr", width: -2});

        const GalleryConstructor = getComponentForType(stubGallery.type);

        expect(GalleryConstructor).to.eql(GalleryComponent);
    });

    it("gets `Photo`s", function () {
        const stubPhoto = Photo.fromJS({id: "grr", width: -2});

        const PhotoConstructor = getComponentForType(stubPhoto.type);

        expect(PhotoConstructor).to.eql(PhotoComponent);
    });

    it("gets `Post`s", function () {
        const stubPost = Post.fromJS({id: "grr", width: -2});

        const PostConstructor = getComponentForType(stubPost.type);

        expect(PostConstructor).to.eql(PostComponent);
    });

    it("throws when it encounters an unknown type", function () {
        try {
            const stubPost = Post.fromJS({type: "woof", id: "grr", width: -2});
            getComponentForType(stubPost.type);
            throw new Error("Wtf? This should've thrown");
        } catch (error) {
            expect(error).to.be.ok;
            expect(error.message).to.match(/Can't `getComponentForType` for `woof`/);
        }
    });
});
