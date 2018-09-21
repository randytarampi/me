import PhotoComponent from "../components/photo";
import PostComponent from "../components/post";

export const getComponentForType = type => {
    switch (type) {
        case "Photo":
            return PhotoComponent;

        case "Post":
            return PostComponent;

        default:
            throw new Error(`Can't \`getComponentForType\` for \`${type}\``);
    }
};

export default getComponentForType;
