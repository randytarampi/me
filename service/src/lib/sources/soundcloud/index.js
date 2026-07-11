// @ts-check
import {Post} from "@randy.tarampi/js";
import CachedDataSource from "../../cachedDataSource.js";
import {filterPostForOrderingConditionsInSearchParams} from "../util.js";

/** @type {number} */
const SOUNDCLOUD_API_MAX_POSTS_PER_PAGE = 50;

/** SoundCloud-backed post source. */
class SoundCloudSource extends CachedDataSource {
    constructor(dataClient, cacheClient) {
        super(dataClient || {}, cacheClient);
    }

    get isEnabled() {
        return !!process.env.SOUNDCLOUD_ACCESS_TOKEN && !!process.env.SOUNDCLOUD_USER_ID || false;
    }

    static get type() {
        return "soundcloud";
    }

    static instanceToRecord(json) {
        return Post.fromJS({
            raw: json,
            id: String(json.id),
            source: SoundCloudSource.type,
            datePublished: json.created_at,
            dateCreated: json.created_at,
            title: json.title,
            body: json.description || null,
            sourceUrl: json.permalink_url,
            creator: {
                id: String(json.user?.id || process.env.SOUNDCLOUD_USER_ID || "soundcloud"),
                username: json.user?.username || "soundcloud",
                url: json.user?.permalink_url || `https://soundcloud.com/user${process.env.SOUNDCLOUD_USER_ID}`
            },
            tags: (json.tag_list || "").split(" ").filter(Boolean)
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
        const accessToken = process.env.SOUNDCLOUD_ACCESS_TOKEN;
        const userId = process.env.SOUNDCLOUD_USER_ID;
        const limit = Math.min(searchParams.perPage, SOUNDCLOUD_API_MAX_POSTS_PER_PAGE);
        const offset = (searchParams.page - 1) * limit;

        const url = new URL(`https://api.soundcloud.com/users/${userId}/tracks`);
        url.searchParams.set("limit", String(limit));
        url.searchParams.set("offset", String(offset));

        const response = await fetch(url.toString(), {
            headers: {
                Authorization: `OAuth ${accessToken}`
            }
        });

        if (!response.ok) {
            return [];
        }

        const tracks = await response.json();

        return (tracks || [])
            .map(SoundCloudSource.instanceToRecord)
            .filter(post => filterPostForOrderingConditionsInSearchParams(post, searchParams));
    }
}

/** @type {typeof SoundCloudSource} */
export default SoundCloudSource;

export {SOUNDCLOUD_API_MAX_POSTS_PER_PAGE};
