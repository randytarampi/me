import {Photo, Post} from "@randy.tarampi/js";
import PhotoComponent from "../components/photo";
import PostComponent from "../components/post";

export const getComponentForType = type => {
    switch (type) {
        case Photo.name:
            return PhotoComponent;

        case Post.name:
            return PostComponent;

        default:
            throw new Error(`Can't \`getComponentForType\` for \`${type}\``);
    }
};

export default getComponentForType;
