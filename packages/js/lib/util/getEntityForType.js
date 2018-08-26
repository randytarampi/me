import Photo from "../photo";
import Post from "../post";

export default type => {
    switch (type) {
        case Photo.name:
            return Photo;

        case Post.name:
            return Post;

        default:
            throw new Error(`Can't \`getEntityForType\` for \`${type}\``);
    }
};
