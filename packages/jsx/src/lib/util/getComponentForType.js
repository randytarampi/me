import {Gallery, LinkPost, Photo, Post} from "@randy.tarampi/js";
import GalleryComponent from "../components/gallery";
import LinkPostComponent from "../components/linkPost";
import PhotoComponent from "../components/photo";
import PostComponent from "../components/post";

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
