import Photo from "../photo";
import Post from "../post";

export default type => {
    switch (type) {
        case Photo.name:
        case "Photo":
            console.log("Photo.name", Photo.name); // eslint-disable-line no-console
            return Photo;

        case Post.name:
        case "Post":
            console.log("Post.name", Post.name); // eslint-disable-line no-console
            return Post;

        default:
            throw new Error(`Can't \`getEntityForType\` for \`${type}\``);
    }
};
