import {sortPostsByDate} from "@randy.tarampi/js";
import {sources} from ".";
import CacheClient from "../cacheClient";

const cachedValueToPost = cachedValue => cachedValue
    && sources[cachedValue.source]
    && sources[cachedValue.source].instanceToRecord
    && sources[cachedValue.source].instanceToRecord(cachedValue.raw);

/**
 * Search the [Post]{@link Post} cache for some given search parameters and return the found posts and some metadata
 * @function searchPosts
 * @param searchParams {PostSearchParams}
 * @returns {Promise<{posts: Post[], total: Number, first: Post, last: Post} | never | {posts: null, total: null, first: null, last: null, error: any}>}
 */
export const searchPosts = searchParams => {
    const cacheClient = new CacheClient();

    return Promise.all([
            cacheClient.getRecords(searchParams)
                .then(cachedPosts => cachedPosts.map(cachedValueToPost)),
            cacheClient.getRecordCount(searchParams
                .delete("orderOperator")
                .delete("orderComparator")
                .delete("orderComparatorType")
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
            const postsSortedByDate = posts.sort(sortPostsByDate);

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

export default searchPosts;
