// @ts-check
import {Post} from "@randy.tarampi/js";
import CachedDataSource from "../../cachedDataSource.js";
import {filterPostForOrderingConditionsInSearchParams} from "../util.js";

/** @type {number} */
const STACKOVERFLOW_API_MAX_POSTS_PER_PAGE = 100;

/** StackOverflow-backed post source. */
class StackOverflowSource extends CachedDataSource {
    constructor(dataClient, cacheClient) {
        super(dataClient || {}, cacheClient);
    }

    get isEnabled() {
        return !!process.env.STACKOVERFLOW_USER_ID || false;
    }

    static get type() {
        return "stackoverflow";
    }

    static instanceToRecord(json) {
        return Post.fromJS({
            raw: json,
            id: String(json.post_id || json.question_id || json.answer_id || json.id),
            source: StackOverflowSource.type,
            datePublished: (json.creation_date || 0) * 1000,
            dateCreated: (json.creation_date || 0) * 1000,
            title: json.title,
            body: json.body || json.body_markdown || null,
            sourceUrl: json.link,
            creator: {
                id: String(json.owner?.user_id || "stackoverflow"),
                username: json.owner?.display_name || "stackoverflow",
                url: json.owner?.link || `https://stackoverflow.com/users/${json.owner?.user_id || ""}`
            },
            tags: json.tags || []
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
        const apiKey = process.env.STACKOVERFLOW_API_KEY;
        const userId = process.env.STACKOVERFLOW_USER_ID;
        const page = searchParams.page;
        const pageSize = Math.min(searchParams.perPage, STACKOVERFLOW_API_MAX_POSTS_PER_PAGE);

        const url = new URL(`https://api.stackexchange.com/2.3/users/${userId}/posts`);
        url.searchParams.set("order", "desc");
        url.searchParams.set("sort", "activity");
        url.searchParams.set("site", "stackoverflow");
        url.searchParams.set("page", String(page));
        url.searchParams.set("pagesize", String(pageSize));
        url.searchParams.set("filter", "withbody");

        if (apiKey) {
            url.searchParams.set("key", apiKey);
        }

        const response = await fetch(url.toString());

        if (!response.ok) {
            return [];
        }

        const data = await response.json();
        const items = data?.items || [];

        return items
            .map(StackOverflowSource.instanceToRecord)
            .filter(post => filterPostForOrderingConditionsInSearchParams(post, searchParams));
    }
}

/** @type {typeof StackOverflowSource} */
export default StackOverflowSource;

export {STACKOVERFLOW_API_MAX_POSTS_PER_PAGE};
