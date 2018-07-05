import Post from "me.common.js/lib/post";
import genericClient from "../me.service.client";
import PostSource from "../postSource";

class WordsPostSource extends PostSource {
    constructor() {
        super("Words", genericClient);
    }

    getPosts(params) {
        return genericClient(process.env.WORDS_URL, params.page)
            .map(this.jsonToPost);
    }

    jsonToPost(postJson) {
        return Post.fromJSON(postJson);
    }

    isEnabled() {
        return true;
    }
}

export default WordsPostSource;
