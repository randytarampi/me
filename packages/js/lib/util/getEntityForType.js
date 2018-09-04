import Photo from "../photo";
import Post from "../post";

export default type => {
    switch (type) {
        case "Photo":
            return Photo;

        case "Post":
            return Post;

        default:
            throw new Error(`Can't \`getEntityForType\` for \`${type}\``);
    }
};
