import {Photo, Post, SizedPhoto, sortPhotosByWidth} from "@randy.tarampi/js";
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
            .then(response => _.flatten(response.posts.map(postJson => this.jsonToPost(postJson))));
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
            .then(response => _.flatten(response.posts.map(postJson => this.jsonToPost(postJson)))[0]);
    }

    jsonToPost(postJson) {
        switch (postJson.type) {
            case "photo":
                return this._jsonToPhoto(postJson);

            default:
                return this._jsonToPost(postJson);
        }
    }

    _jsonToPhoto(postJson) {
        const photoJson = postJson.photos[0]; // FIXME-RT: Support galleries of photos per #133.
        const sizedPhotos = photoJson.alt_sizes.map((photo) => {
            return SizedPhoto.fromJSON(photo);
        });
        const dateString = postJson.date;
        const dateStringWithoutTimezone = dateString.slice(0, -4);
        const timezone = dateString.slice(-3);
        const date = DateTime.fromSQL(dateStringWithoutTimezone, {zone: timezone});
        const biggestPhoto = sizedPhotos.sort(sortPhotosByWidth)[sizedPhotos.length - 1];

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
                id: postJson.blog.name,
                username: postJson.blog.name,
                name: postJson.blog.title,
                url: postJson.blog.url
            }
        });
    }

    _jsonToPost(postJson) {
        const dateString = postJson.date;
        const dateStringWithoutTimezone = dateString.slice(0, -4);
        const timezone = dateString.slice(-3);
        const date = DateTime.fromSQL(dateStringWithoutTimezone, {zone: timezone});

        return Post.fromJS({
            id: postJson.id,
            source: this.type,
            datePublished: date,
            title: postJson.title,
            body: postJson.body,
            sourceUrl: postJson.post_url,
            creator: {
                id: postJson.blog.name,
                username: postJson.blog.name,
                name: postJson.blog.title,
                url: postJson.blog.url
            }
        });
    }
}

// # NOTE-RT: This is pretty gross modifying the HTML we're passing along, but I think this'll be more common than not for other post providers going forwards, especially the more sophisticated platforms.
export const processCaptionHtml = caption => {
    const tags = ["p", "ol", "ul"];

    return tags.reduce((processedCaption, tag) => processedCaption
        .replace(new RegExp(`<${tag}>`, "g"), `<${tag}><span class="photo-text">`)
        .replace(new RegExp(`</${tag}>`, "g"), `</span></${tag}>`), caption);
};

export default TumblrSource;
