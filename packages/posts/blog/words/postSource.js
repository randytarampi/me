import {Post} from "@randy.tarampi/js";
import genericClient from "../me.service.client";
import PostSource from "../postSource";

class WordsPostSource extends PostSource {
    constructor() {
        super("Words", genericClient);
    }

    get isEnabled() {
        return true;
    }

    getPosts(params) {
        return this.client(process.env.WORDS_URL, params.page)
            .then(posts => posts.map(this.jsonToPost));
    }

    jsonToPost(postJson) {
        return Post.fromJSON(postJson);
    }
}

export default WordsPostSource;
