import {Photo, Post, SizedPhoto, util} from "@randy.tarampi/js";
import _ from "lodash";
import {DateTime} from "luxon";
import tumblr from "tumblr.js";
import CachedDataSource from "../../lib/cachedDataSource";

class TumblrSource extends CachedDataSource {
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
            .then(response => _.flatten(response.posts.map(postJson => this.jsonToPost(postJson, response.blog))));
    }

    async allPostsGetter(searchParams) {
        let posts = await this.postsGetter(searchParams);

        if (posts.length) {
            posts = posts.concat(await this.allPostsGetter(
                searchParams
                    .set("all", true)
                    .set("beforeDate", posts[posts.length - 1].datePublished)
            ));
        }

        return posts;
    }

    async postGetter(id, searchParams) {
        return this.client.blogPosts(process.env.TUMBLR_USER_NAME, searchParams.set("id", id).Tumblr)
            .then(response => _.flatten(response.posts.map(postJson => this.jsonToPost(postJson, response.blog)))[0]);
    }

    jsonToPost(postJson, blogJson) {
        switch (postJson.type) {
            case "photo":
                return postJson.photos.map(photoJson => this._jsonToPhoto(photoJson, postJson, blogJson));

            default:
                return this._jsonToPost(postJson, blogJson);
        }
    }

    _jsonToPhoto(photoJson, postJson, blogJson) {
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

    _jsonToPost(postJson, blogJson) {
        const dateString = postJson.date;
        const dateStringWithoutTimezone = dateString.slice(0, -4);
        const timezone = dateString.slice(-3);
        const date = DateTime.fromSQL(dateStringWithoutTimezone, {zone: timezone});

        return Post.fromJS({
            id: postJson.id,
            source: this.type,
            datePublished: date,
            title: postJson.title,
            body: postJson.body && processCaptionHtml(postJson.body),
            sourceUrl: postJson.post_url,
            creator: blogJson && {
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
