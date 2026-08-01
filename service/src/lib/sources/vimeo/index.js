// @ts-check
import {Post} from "@randy.tarampi/js";
import CachedDataSource from "../../cachedDataSource.js";
import {filterPostForOrderingConditionsInSearchParams} from "../util.js";

/** @type {number} */
const VIMEO_API_MAX_POSTS_PER_PAGE = 50;

/** Vimeo-backed post source. */
class VimeoSource extends CachedDataSource {
    constructor(dataClient, cacheClient) {
        super(dataClient || {}, cacheClient);
    }

    get isEnabled() {
        return !!process.env.VIMEO_ACCESS_TOKEN && !!process.env.VIMEO_USER_ID || false;
    }

    static get type() {
        return "vimeo";
    }

    static instanceToRecord(json) {
        // NOTE-RT: Vimeo's `pictures.sizes` are deliberately not read here — `Post` has no image
        // field (only `Photo` does), so there is nowhere to put them. They stay reachable via `raw`.
        return Post.fromJS({
            raw: json,
            id: String(json.uri?.replace("/videos/", "") || json.id),
            source: VimeoSource.type,
            datePublished: json.created_time,
            dateCreated: json.created_time,
            title: json.name,
            body: json.description || null,
            sourceUrl: json.link,
            creator: {
                id: json.user?.uri?.replace("/users/", "") || json.user?.name || process.env.VIMEO_USER_ID || "vimeo",
                username: json.user?.name || "vimeo",
                url: json.user?.link || `https://vimeo.com/user${process.env.VIMEO_USER_ID}`
            },
            tags: json.tags?.map(t => t.name || t.tag) || []
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
        const accessToken = process.env.VIMEO_ACCESS_TOKEN;
        const userId = process.env.VIMEO_USER_ID;
        const page = searchParams.page;
        const perPage = Math.min(searchParams.perPage, VIMEO_API_MAX_POSTS_PER_PAGE);

        const url = new URL(`https://api.vimeo.com/users/${userId}/videos`);
        url.searchParams.set("page", String(page));
        url.searchParams.set("per_page", String(perPage));

        const response = await fetch(url.toString(), {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                Accept: "application/vnd.vimeo.*+json;version=3.4"
            }
        });

        if (!response.ok) {
            return [];
        }

        const data = await response.json();
        const videos = data?.data || [];

        return videos
            .map(VimeoSource.instanceToRecord)
            .filter(post => filterPostForOrderingConditionsInSearchParams(post, searchParams));
    }
}

/** @type {typeof VimeoSource} */
export default VimeoSource;

export {VIMEO_API_MAX_POSTS_PER_PAGE};
