import Post from "me.common.js/lib/post";
import genericClient from "../me.service.client";
import PostSource from "../postSource";

class WordsPostSource extends PostSource {
    constructor() {
        super("Words", genericClient);
    }

    getPosts(params) {
        return this.client(process.env.WORDS_URL, params.page)
            .then(posts => posts.map(this.jsonToPost));
    }

    jsonToPost(postJson) {
        return Post.fromJSON(postJson);
    }

    get isEnabled() {
        return true;
    }
}

export default WordsPostSource;
