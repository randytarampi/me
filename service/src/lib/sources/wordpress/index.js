// @ts-check
import {Post} from "@randy.tarampi/js";
import CachedDataSource from "../../cachedDataSource.js";
import {filterPostForOrderingConditionsInSearchParams} from "../util.js";

/** @type {number} */
const WORDPRESS_API_MAX_POSTS_PER_PAGE = 100;

/** WordPress-backed post source. */
class WordPressSource extends CachedDataSource {
    constructor(dataClient, cacheClient) {
        const apiBase = process.env.WORDPRESS_API_BASE || "https://randytarampi.wordpress.com";
        super(dataClient || {apiBase}, cacheClient);
    }

    get isEnabled() {
        return !!process.env.WORDPRESS_USER_NAME || false;
    }

    static get type() {
        return "wordpress";
    }

    static instanceToRecord(json) {
        // NOTE-RT: the featured media URL is deliberately not read here — `Post` has no image field
        // (only `Photo` does), so there is nowhere to put it. It stays reachable via `raw`.
        return Post.fromJS({
            raw: json,
            id: String(json.id),
            source: WordPressSource.type,
            datePublished: json.date_gmt || json.date,
            dateCreated: json.date_gmt || json.date,
            title: json.title?.rendered || json.title,
            body: json.content?.rendered || json.content || json.excerpt?.rendered || null,
            sourceUrl: json.link,
            creator: {
                id: json.author || process.env.WORDPRESS_USER_NAME || "wordpress",
                username: process.env.WORDPRESS_USER_NAME || "wordpress",
                url: json.link
            },
            tags: [
                ...(json.tags || []).map(String),
                ...(json.categories || []).map(String)
            ]
        });
    }

    async allRecordsGetter(searchParams) {
        let posts = await this.recordsGetter(searchParams);

        if (posts.length) {
            posts = posts.concat(await this.allRecordsGetter(
                searchParams
                    .set("all", true)
                    .set("page", searchParams.page + 1)
            ));
        }

        return posts;
    }

    async recordsGetter(searchParams) {
        const apiBase = this.client.apiBase;
        const authorName = process.env.WORDPRESS_USER_NAME;
        const page = searchParams.page;
        const perPage = Math.min(searchParams.perPage, WORDPRESS_API_MAX_POSTS_PER_PAGE);

        const url = new URL(`${apiBase}/wp/v2/posts`);
        url.searchParams.set("page", String(page));
        url.searchParams.set("per_page", String(perPage));
        url.searchParams.set("_embed", "1");

        if (authorName) {
            url.searchParams.set("author_name", authorName);
        }

        const response = await fetch(url.toString());

        if (!response.ok) {
            return [];
        }

        const posts = await response.json();

        return (posts || [])
            .map(WordPressSource.instanceToRecord)
            .filter(post => filterPostForOrderingConditionsInSearchParams(post, searchParams));
    }
}

/** @type {typeof WordPressSource} */
export default WordPressSource;

export {WORDPRESS_API_MAX_POSTS_PER_PAGE};
