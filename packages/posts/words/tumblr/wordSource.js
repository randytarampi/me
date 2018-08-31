import {Post} from "@randy.tarampi/js";
import {DateTime} from "luxon";
import tumblr from "tumblr.js";
import {processCaptionHtml} from "../../photos/tumblr/photoSource";
import WordSource from "../wordSource";

class TumblrWordSource extends WordSource {
    constructor(dataClient, cacheClient) {
        super("Tumblr",
            dataClient || tumblr.createClient({
                consumer_key: process.env.TUMBLR_API_KEY,
                consumer_secret: process.env.TUMBLR_API_SECRET,
                returnPromises: true
            })
            , cacheClient
        );
    }

    get isEnabled() {
        return process.env.TUMBLR_API_KEY && process.env.TUMBLR_API_SECRET && true || false;
    }

    async postsGetter(searchParams) {
        return this.client.blogPosts(process.env.TUMBLR_USER_NAME, searchParams.Tumblr)
            .then(response => response.posts.map(postJson => this.jsonToPost(postJson, response.blog)));
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
            .then(response => response.posts.map(postJson => this.jsonToPost(postJson, response.blog))[0]);
    }

    jsonToPost(postJson, blogJson) {
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

export default TumblrWordSource;
