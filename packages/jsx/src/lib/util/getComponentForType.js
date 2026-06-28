// @ts-check
import "../reactShim.js";
import {Gallery, LinkPost, Photo, Post} from "@randy.tarampi/js";
import {GalleryComponent} from "../components/gallery.js";
import {LinkPostComponent} from "../components/linkPost.js";
import {ProgressiveImageWrappedPhotoComponent as PhotoComponent} from "../components/photo.js";
import {PostComponent} from "../components/post.js";

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
