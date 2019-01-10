import {sortPostsByDate} from "@randy.tarampi/js";
import {sources} from ".";
import CacheClient from "../cacheClient";

const cachedValueToPost = cachedValue => cachedValue
    && sources[cachedValue.source]
    && sources[cachedValue.source].jsonToPost
    && sources[cachedValue.source].jsonToPost(cachedValue.raw);

/**
 * Search the [Post]{@link Post} cache for some given search parameters and return the found posts and some metadata
 * @function searchPosts
 * @param searchParams {SearchParams}
 * @returns {Promise<{posts: Post[], total: Number, first: Post, last: Post} | never | {posts: null, total: null, first: null, last: null, error: any}>}
 */
export const searchPosts = searchParams => {
    const cacheClient = new CacheClient();

    return Promise.all([
            cacheClient.getPostCount(searchParams
                .delete("orderOperator")
                .delete("orderComparator")
                .delete("orderComparatorType")
            ),
            cacheClient.getPosts(searchParams)
                .then(cachedPosts => cachedPosts.map(cachedValueToPost))
        ])
        .then(([total, posts]) => {
            if (total) {
                const postsSortedByDate = posts.sort(sortPostsByDate);

                return Promise.all([
                        postsSortedByDate,
                        total,
                        (total <= posts.length)
                            ? postsSortedByDate[posts.length - 1]
                            : cacheClient.getPost(searchParams.delete("orderOperator").delete("orderComparator").delete("orderComparatorType").set("orderBy", "ascending"))
                            .then(cachedValueToPost),
                        (total <= posts.length)
                            ? postsSortedByDate[0]
                            : cacheClient.getPost(searchParams.delete("orderOperator").delete("orderComparator").delete("orderComparatorType").set("orderBy", "descending"))
                            .then(cachedValueToPost)
                    ])
                    .then(([posts, total, first, last]) => {
                        return {
                            posts,
                            total,
                            first,
                            last,
                            firstFetched: posts[posts.length - 1],
                            lastFetched: posts[0]
                        };
                    });
            }

            return {
                posts: posts,
                total: total,
                first: null,
                last: null,
                firstFetched: null,
                lastFetched: null
            };
        });
};

export default searchPosts;
