import PhotoComponent from "../components/photo";
import PostComponent from "../components/post";

export default type => {
    switch (type) {
        case "Photo":
            return PhotoComponent;

        default:
        case "Post":
            return PostComponent;
    }
};
