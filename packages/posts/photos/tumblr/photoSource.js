import {Photo, SizedPhoto, util} from "@randy.tarampi/js";
import _ from "lodash";
import {DateTime} from "luxon";
import tumblr from "tumblr.js";
import PhotoSource from "../photoSource";

class TumblrSource extends PhotoSource {
    constructor(dataClient, cacheClient) {
        super("Tumblr",
            dataClient || tumblr.createClient({
                consumer_key: process.env.TUMBLR_API_KEY,
                consumer_secret: process.env.TUMBLR_API_SECRET,
                returnPromises: true
            }),
            cacheClient
        );
    }

    async postsGetter(searchParams) {
        return this.client.blogPosts(process.env.TUMBLR_USER_NAME, searchParams.Tumblr)
            .then(response =>
                _.flatten(response.posts.map(postJson => postJson.photos.map(photoJson => this.jsonToPost(photoJson, postJson, response.blog))))
            );
    }

    async postGetter(id, searchParams) {
        return this.client.blogPosts(process.env.TUMBLR_USER_NAME, searchParams.set("id", id).Tumblr)
            .then(response =>
                _.flatten(response.posts.map(postJson => postJson.photos.map(photoJson => this.jsonToPost(photoJson, postJson, response.blog))))[0]
            );
    }

    jsonToPost(photoJson, postJson, blogJson) {
        const sizedPhotos = photoJson.alt_sizes.map((photo) => {
            return SizedPhoto.fromJSON(photo);
        });
        const dateString = postJson.date;
        const dateStringWithoutTimezone = dateString.slice(0, -4);
        const timezone = dateString.slice(-3);
        const date = DateTime.fromSQL(dateStringWithoutTimezone, {zone: timezone});
        const biggestPhoto = sizedPhotos.sort(util.sortPhotosByWidth)[sizedPhotos.length - 1];

        return Photo.fromJS({
            id: postJson.id,
            source: this.type,
            datePublished: date,
            width: biggestPhoto.width,
            height: biggestPhoto.height,
            sizedPhotos,
            sourceUrl: postJson.post_url,
            body: processCaptionHtml(photoJson.caption || postJson.caption),
            creator: {
                id: blogJson.name,
                username: blogJson.name,
                name: blogJson.title,
                sourceUrl: blogJson.url
            }
        });
    }
}

// # NOTE-RT: This is pretty gross modifying the HTML we're passing along, but I think this'll be more common than not for other post providers going forwards, especially the more sophisticated platforms.
export const processCaptionHtml = caption => {
    return caption
        .replace(/<p>/g, "<p><span class=\"photo-text\">")
        .replace(/<\/p>/g, "</span></p>");
};

export default TumblrSource;
