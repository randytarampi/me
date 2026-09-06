import {sources} from "./index.js";
import CacheClient from "../cacheClient.js";
import sortPostsByDatePublished from "../sortPostsByDatePublished.js";
import {DateTime} from "luxon";
import logger from "../../serverless/logger.js";

const cachedValueToPost = cachedValue => {
    if (!cachedValue || !sources[cachedValue.source] || !sources[cachedValue.source].instanceToRecord) {
        return null;
    }

    let raw = cachedValue.raw;

    // Older cache writes stored JSON payloads as strings. Preserve those that can still be
    // reconstructed, but never hand an opaque string to a source mapper: source mappers read
    // fields from an object and otherwise create a misleading Post with null identity fields.
    if (typeof raw === "string") {
        try {
            raw = JSON.parse(raw);
        } catch (error) {
            logger.warn(error, `skipping cached ${cachedValue.source} post with invalid raw JSON`);
            return null;
        }
    }

    try {
        const post = sources[cachedValue.source].instanceToRecord(raw);

        if (!post || !post.id || !post.uid) {
            logger.warn(`skipping cached ${cachedValue.source} post without an identity`);
            return null;
        }

        return post
            .set("publicFeedPartition", cachedValue.publicFeedPartition)
            .set("publicFeedSort", cachedValue.publicFeedSort);
    } catch (error) {
        logger.warn(error, `skipping malformed cached ${cachedValue.source} post`);
        return null;
    }
};

const getValidatedPosts = cachedPosts => (cachedPosts || [])
    .map(cachedValueToPost)
    .filter(Boolean);

/**
 * Search the [Post]{@link Post} cache for some given search parameters and return the found posts and some metadata
 * @function searchPosts
 * @param searchParams {PostSearchParams}
 * @returns {Promise<{posts: Post[], total: Number, first: Post, last: Post} | never | {posts: null, total: null, first: null, last: null, error: any}>}
 */
const searchPosts = searchParams => {
    const cacheClient = new CacheClient();
    const hasTieCursor = searchParams.beforeId && searchParams.orderBy === "datePublished" && searchParams.orderOperator === "lt";
    const cacheSearchParams = hasTieCursor ? searchParams.set("orderOperator", "le") : searchParams;
    const cursorDate = hasTieCursor && parseCursorDate(searchParams.orderComparator);
    const isAfterCursor = post => !hasTieCursor
        ? true
        : cursorDate && cursorDate.isValid && (
            post.datePublished < cursorDate
            || (post.datePublished.equals(cursorDate) && String(post.uid).localeCompare(String(searchParams.beforeId)) < 0)
        );
    const getCursorPosts = posts => (posts || []).filter(isAfterCursor);

    return Promise.all([
            cacheClient.getRecords(cacheSearchParams, cachedValueToPost)
                // NOTE-RT: `getRecords` deliberately swallows cache errors and resolves to
                // `undefined` (see docs/CONVENTIONS.md#error-handling) - a schema mismatch,
                // throttling, or any other per-type lookup failure used to crash this whole
                // request with `Cannot read properties of undefined (reading 'map')`, which Lambda
                // then reports as a failed invocation and API Gateway surfaces as a 502. Defaulting
                // to `[]` degrades that one content type to "no cached posts found" instead.
                .then(getValidatedPosts)
                .then(getCursorPosts),
            cacheClient.getRecordCount(searchParams
                .delete("orderOperator")
                .delete("orderComparator")
                .delete("orderComparatorType")
                .set("all", true)
            ),
            cacheClient.getRecord(searchParams
                .delete("orderOperator")
                .delete("orderComparator")
                .delete("orderComparatorType")
                .set("orderBy", "ascending")
            ).then(cachedValueToPost),
            cacheClient.getRecord(searchParams
                .delete("orderOperator")
                .delete("orderComparator")
                .delete("orderComparatorType")
                .set("orderBy", "descending")
            ).then(cachedValueToPost)
        ])
        .then(([posts, total, first, last]) => {
            const postsSortedByDate = posts.sort(sortPostsByDatePublished);

            return {
                posts,
                total,
                first,
                last,
                firstFetched: postsSortedByDate[posts.length - 1],
                lastFetched: postsSortedByDate[0]
            };
        });
};

const parseCursorDate = cursor => {
    if (cursor instanceof DateTime) {
        return cursor;
    }

    if (cursor instanceof Date) {
        return DateTime.fromJSDate(cursor);
    }

    const numericCursor = Number(cursor);

    return Number.isFinite(numericCursor)
        ? DateTime.fromMillis(numericCursor)
        : DateTime.fromISO(String(cursor));
};

export default searchPosts;

export {cachedValueToPost, searchPosts};
