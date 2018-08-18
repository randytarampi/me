import {Post, util} from "@randy.tarampi/js";
import CachedDataSource from "../lib/cachedDataSource";

/**
 * A [Post]{@link Post} specific data source that fetches from some service or some cache, whichever returns first
 * @abstract
 */
class WordSource extends CachedDataSource {
    /**
     * The method that actually uses the [cache]{@link CachedDataSource.cache} to query for [Posts]{@link Post}
     * @param params {object} [Client]{@link CachedDataSource.cacheClient} specific query parameters
     * @returns {Post[]} [Post]{@link Post} entities transformed from data retrieved from the [cacheClient]{@link CachedDataSource.cache}
     */
    async cachedPostsGetter(params) { // eslint-disable-line no-unused-vars
        return this.cacheClient.getPosts({
            hash: {type: {eq: Post.name}},
            range: {source: {eq: this.type}},
            options: {indexName: "type-source-index"}
        });
    }

    /**
     * The method that actually uses the [cache]{@link CachedDataSource.cache} to query for a post
     * @param postId {string} A single post to retrieve from the [client]{@link CachedDataSource.cacheClient}
     * @param params {object} [Client]{@link CachedDataSource.cacheClient} specific query parameters
     * @returns {Post} [Post]{@link Post} entities transformed from data retrieved from the wrapped client
     */
    async cachedPostGetter(postId, params) { // eslint-disable-line no-unused-vars
        return this.cacheClient.getPost({uid: {eq: `${this.type}${util.compositeKeySeparator}${postId}`}});
    }
}

export default WordSource;
