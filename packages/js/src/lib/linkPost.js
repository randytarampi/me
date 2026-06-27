// @ts-check
import {PostClassGenerator} from "./post.js";

/** A post that points somewhere else. */
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
