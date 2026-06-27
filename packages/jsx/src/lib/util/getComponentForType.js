// @ts-check
import "../reactShim.js";
import {Gallery, LinkPost, Photo, Post} from "@randy.tarampi/js";
import {GalleryComponent} from "../components/gallery.cjs";
import {LinkPostComponent} from "../components/linkPost.cjs";
import {ProgressiveImageWrappedPhotoComponent as PhotoComponent} from "../components/photo.cjs";
import {PostComponent} from "../components/post.cjs";

/** @param {string} type - The post type. @returns {*} The matching React component. */
export const getComponentForType = type => {
    switch (type) {
        case Gallery.type:
            return GalleryComponent;

        case LinkPost.type:
            return LinkPostComponent;

        case Photo.type:
            return PhotoComponent;

        case Post.type:
            return PostComponent;

        default:
            throw new Error(`Can't \`getComponentForType\` for \`${type}\``);
    }
};

export default getComponentForType;
