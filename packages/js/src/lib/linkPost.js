import {PostClassGenerator} from "./post.js";

export class LinkPost extends PostClassGenerator({
    linkSourceUrl: null,
    linkTitle: null,
    linkBody: null
}) {
    static get type() {
        return "LinkPost";
    }
}

export default LinkPost;
