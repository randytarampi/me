import PhotoComponent from "../components/photo";
import PostComponent from "../components/post";

export default type => {
    switch (type) {
        case "Photo":
            return PhotoComponent;

        case "Post":
            return PostComponent;

        default:
            throw new Error(`Can't \`getComponentForType\` for \`${type}\``);
    }
};
