import Post from "me.common.js/lib/post";
import genericClient from "../me.service.client";
import PostSource from "../postSource";

class PhotosPostSource extends PostSource {
    constructor() {
        super("Photos", genericClient);
    }

    getPosts(params) {
        return this.client(process.env.PHOTOS_URL, params.page)
            .map(this.jsonToPost);
    }

    jsonToPost(postJson) {
        return Post.fromJSON(postJson);
    }

    isEnabled() {
        return true;
    }
}

export default PhotosPostSource;
