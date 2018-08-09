import {Photo} from "@randy.tarampi/js";
import CachedDataSource from "../lib/cachedDataSource";

/**
 * A [Photo]{@link Photo} specific data source that fetches from some service or some cache, whichever returns first
 * @abstract
 */
class PhotoSource extends CachedDataSource {
    /**
     * The method that actually uses the [cache]{@link CachedDataSource.cache} to query for [Photos]{@link Photo}
     * @abstract
     * @param params {object} [Client]{@link CachedDataSource.cacheClient} specific query parameters
     * @returns {Post[]} [Post]{@link Post} entities transformed from data retrieved from the [cacheClient]{@link CachedDataSource.cache}
     */
    async cachedPostsGetter(params) { // eslint-disable-line no-unused-vars
        return this.cacheClient.getPosts({type: {eq: Photo.name}, source: {eq: this.type}});
    }

    /**
     * The method that actually uses the [cache]{@link CachedDataSource.cache} to query for a post
     * @abstract
     * @param postId {string} A single post to retrieve from the [client]{@link CachedDataSource.cacheClient}
     * @param params {object} [Client]{@link CachedDataSource.cacheClient} specific query parameters
     * @returns {Post} [Post]{@link Post} entities transformed from data retrieved from the wrapped client
     */
    async cachedPostGetter(postId, params) { // eslint-disable-line no-unused-vars
        return this.cacheClient.getPost({id: {eq: postId}, type: {eq: Photo.name}, source: {eq: this.type}});
    }
}

export default PhotoSource;
