// @ts-check
import {Post} from "@randy.tarampi/js";
import CachedDataSource from "../../cachedDataSource.js";
import {filterPostForOrderingConditionsInSearchParams} from "../util.js";

/** @type {number} */
const YOUTUBE_API_MAX_POSTS_PER_PAGE = 50;

/** YouTube-backed post source. */
class YouTubeSource extends CachedDataSource {
    constructor(dataClient, cacheClient) {
        super(dataClient || {}, cacheClient);
    }

    get isEnabled() {
        return !!process.env.YOUTUBE_API_KEY && !!process.env.YOUTUBE_CHANNEL_ID || false;
    }

    static get type() {
        return "youtube";
    }

    static instanceToRecord(json) {
        const snippet = json.snippet || {};

        // NOTE-RT: `snippet.thumbnails` is deliberately not read here — `Post` has no image field
        // (only `Photo` does), so there is nowhere to put it. It stays reachable via `raw`.
        return Post.fromJS({
            raw: json,
            id: json.id?.videoId || json.id,
            source: YouTubeSource.type,
            datePublished: snippet.publishedAt,
            dateCreated: snippet.publishedAt,
            title: snippet.title,
            body: snippet.description || null,
            sourceUrl: `https://www.youtube.com/watch?v=${json.id?.videoId || json.id}`,
            creator: {
                id: snippet.channelId || process.env.YOUTUBE_CHANNEL_ID || "youtube",
                username: snippet.channelTitle || "youtube",
                url: `https://www.youtube.com/channel/${snippet.channelId || process.env.YOUTUBE_CHANNEL_ID}`
            },
            tags: snippet.tags || []
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
        const apiKey = process.env.YOUTUBE_API_KEY;
        const channelId = process.env.YOUTUBE_CHANNEL_ID;
        const maxResults = Math.min(searchParams.perPage, YOUTUBE_API_MAX_POSTS_PER_PAGE);

        // Step 1: Get the uploads playlist ID from the channel
        const channelUrl = new URL("https://www.googleapis.com/youtube/v3/channels");
        channelUrl.searchParams.set("part", "contentDetails");
        channelUrl.searchParams.set("id", channelId);
        channelUrl.searchParams.set("key", apiKey);

        const channelResponse = await fetch(channelUrl.toString());

        if (!channelResponse.ok) {
            return [];
        }

        const channelData = await channelResponse.json();
        const uploadsPlaylistId = channelData?.items?.[0]?.contentDetails?.relatedPlaylists?.uploads;

        if (!uploadsPlaylistId) {
            return [];
        }

        // Step 2: Get playlist items from the uploads playlist
        const playlistUrl = new URL("https://www.googleapis.com/youtube/v3/playlistItems");
        playlistUrl.searchParams.set("part", "snippet");
        playlistUrl.searchParams.set("playlistId", uploadsPlaylistId);
        playlistUrl.searchParams.set("maxResults", String(maxResults));
        playlistUrl.searchParams.set("key", apiKey);

        const playlistResponse = await fetch(playlistUrl.toString());

        if (!playlistResponse.ok) {
            return [];
        }

        const playlistData = await playlistResponse.json();
        const items = playlistData?.items || [];

        return items
            .map(YouTubeSource.instanceToRecord)
            .filter(post => filterPostForOrderingConditionsInSearchParams(post, searchParams));
    }
}

/** @type {typeof YouTubeSource} */
export default YouTubeSource;

export {YOUTUBE_API_MAX_POSTS_PER_PAGE};
