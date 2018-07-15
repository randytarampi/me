import Creator from "@randy.tarampi/js/lib/creator";
import Photo from "@randy.tarampi/js/lib/photo";
import SizedPhoto from "@randy.tarampi/js/lib/sizedPhoto";
import _ from "lodash";
import Moment from "moment";
import tumblr from "tumblr.js";
import PhotoSource from "../photoSource";
import SearchParams from "../searchParams";

class TumblrSource extends PhotoSource {
    constructor() {
        super("Tumblr", tumblr.createClient({
            consumer_key: process.env.TUMBLR_API_KEY,
            consumer_secret: process.env.TUMBLR_API_SECRET,
            returnPromises: true
        }));
    }

    getUserPhotos(params) {
        params = params instanceof SearchParams ? params : new SearchParams(params);
        const that = this;

        return this.client.blogPosts(process.env.TUMBLR_USER_NAME, params.Tumblr)
            .then((response) => {
                return _.flatten(response.posts.map(postJson =>
                    postJson.photos.map(photoJson =>
                        that.jsonToPhoto(photoJson, postJson, response.blog)
                    )
                ));
            });
    }

    getPhoto(photoId, params) {
        const that = this;

        return this.client.blogPosts(process.env.TUMBLR_USER_NAME, _.extend({id: photoId}, params.Tumblr))
            .then((response) => {
                return _.flatten(response.posts.map(postJson =>
                    postJson.photos.map(photoJson =>
                        that.jsonToPhoto(photoJson, postJson, response.blog)
                    )
                ));
            });
    }

    jsonToPhoto(photoJson, postJson, blogJson) {
        const sizedPhotos = photoJson.alt_sizes.map((photo) => {
            return new SizedPhoto(photo.url, photo.width, photo.height);
        });

        return new Photo(
            postJson.id,
            null,
            this.type,
            Moment(postJson.date),
            null,
            _.last(_.sortBy(sizedPhotos, ["width"])).width,
            _.last(_.sortBy(sizedPhotos, ["height"])).height,
            sizedPhotos,
            postJson.post_url,
            null,
            photoJson.caption || postJson.caption,
            new Creator(
                blogJson.name,
                blogJson.name,
                blogJson.title,
                blogJson.url
            )
        );
    }
}

export default TumblrSource;
