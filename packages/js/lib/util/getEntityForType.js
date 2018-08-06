import Photo from "../photo";
import Post from "../post";

export default type => {
    switch (type) {
        case "Photo":
            return Photo;

        default:
        case "Post":
            return Post;
    }
};
