import CacheClient from "./cacheClient";

/**
 * Search the [Post]{@link Post} cache for some given search parameters and return the found posts and some metadata
 * @function searchPosts
 * @param searchParams {SearchParams}
 * @returns {Promise<{posts: Post[], total: Number, first: Post, last: Post} | never | {posts: null, total: null, first: null, last: null, error: any}>}
 */
const searchPosts = searchParams => {
    const cacheClient = new CacheClient();

    return Promise.all([
            cacheClient.getPosts(searchParams),
            cacheClient.getPostCount(searchParams
                .delete("orderOperator")
                .delete("orderComparator")
                .delete("orderComparatorType")
            ),
            cacheClient.getPost(searchParams
                .delete("orderOperator")
                .delete("orderComparator")
                .delete("orderComparatorType")
                .set("orderBy", "ascending")
            ),
            cacheClient.getPost(searchParams
                .delete("orderOperator")
                .delete("orderComparator")
                .delete("orderComparatorType")
                .set("orderBy", "descending")
            ),
        ])
        .then(([posts, total, first, last]) => {
            return {
                posts,
                total,
                first,
                last
            };
        });
};

export default searchPosts;
