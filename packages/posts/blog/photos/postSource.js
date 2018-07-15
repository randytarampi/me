import Photo from "@randy.tarampi/js/lib/photo";
import genericClient from "../me.service.client";
import PostSource from "../postSource";

class PhotosPostSource extends PostSource {
    constructor() {
        super("Photos", genericClient);
    }

    get isEnabled() {
        return true;
    }

    getPosts(params) {
        return this.client(process.env.PHOTOS_URL, params.page)
            .then(posts => posts.map(this.jsonToPost));
    }

    jsonToPost(postJson) {
        return Photo.fromJSON(postJson);
    }
}

export default PhotosPostSource;
