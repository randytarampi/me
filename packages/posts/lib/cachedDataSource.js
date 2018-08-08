import CacheClient from "./cacheClient";
import DataSource from "./dataSource";
import {firstResolved} from "./util";

/**
 * A generic data source that fetches [Post(s)]{@link Post} from some service or some cache, whichever returns first
 * @abstract
 */
class CachedDataSource extends DataSource {
    /**
     * Build a data source that fetches [Post(s)]{@link Post} from some service using some client
     * @param type {string} The type of [Posts]{@link Post} returned by this data source
     * @param client {object} A client that wraps some service that serves content to be transformed into [Posts]{@link Post}
     * @param cacheClient {object} A client to the cache
     */
    constructor(type, client, cacheClient = new CacheClient()) {
        super(type, client);
        this.cacheClient = cacheClient;
    }

    /**
     * A hook to do some processing of params before we query the [cache]{@link CachedDataSource.cache} for posts
     * @param params {object} [Client]{@link CachedDataSource.cacheClient} specific query parameters
     * @returns {object} The maybe decorated params to be used by [postsGetter]{@link postsGetter}
     */
    async beforeCachedPostsGetter(params) { // eslint-disable-line no-unused-vars
        return Promise.resolve(params);
    }

    /**
     * The method that actually uses the [cache]{@link CachedDataSource.cache} to query for posts
     * @abstract
     * @param params {object} [Client]{@link CachedDataSource.cacheClient} specific query parameters
     * @returns {Post[]} [Post]{@link Post} entities transformed from data retrieved from the [cacheClient]{@link CachedDataSource.cache}
     */
    async cachedPostsGetter(params) {
        return Promise.reject(new Error(`Looking for ${params} – Please specify an actual cachedPostsGetter implementation`));
    }

    /**
     * A hook to do some processing of [Posts]{@link Post} after they're returned by the client
     * @param posts {Post[]} [Post]{@link Post} entities transformed from data retrieved from the wrapped client
     * @param params {object} [Client]{@link CachedDataSource.cacheClient} specific query parameters
     * @returns {Post[]} The maybe decorated [Posts]{@link Post} from the wrapped client
     */
    async afterCachedPostsGetter(posts, params) { // eslint-disable-line no-unused-vars
        return Promise.resolve(posts);
    }

    /**
     * Set some [Posts]{@link Post} in the cache to be later pulled by [CachedDataSource.cachedPostsGetter]{@link CachedDataSource.cachedPostsGetter}
     * @param posts {Post[]}
     * @returns {Promise<Post[]>}
     */
    async cachePosts(posts) {
        return await this.cacheClient.setPosts(posts)
            .then(cached => cached);
    }

    /**
     * A generic method that returns some [Posts]{@link Post}
     * @param params {object} [Client]{@link CachedDataSource.cacheClient} specific query parameters
     * @returns {Post[]} [Post]{@link Post} entities transformed from data retrieved from the wrapped client
     */
    async getPosts(params) {
        const cachedPostsGetterPromise = this.beforeCachedPostsGetter(params)
            .then(decoratedCachedPostsGetterParams => {
                return this.cachedPostsGetter(decoratedCachedPostsGetterParams)
                    .then(posts => this.afterCachedPostsGetter(posts, decoratedCachedPostsGetterParams))
                    .then(posts => {
                        if (!posts || !posts.length) {
                            throw new Error(`cachedPostsGetterPromise cache miss for ${JSON.stringify(decoratedCachedPostsGetterParams)}`);
                        }

                        return posts;
                    });
            });
        const postsGetterPromise = this.beforePostsGetter(params)
            .then(decoratedPostsGetterParams => {
                return this.postsGetter(decoratedPostsGetterParams)
                    .then(posts => {
                        this.cachePosts(posts);
                        return this.afterPostsGetter(posts, decoratedPostsGetterParams);
                    });
            });

        return await firstResolved([
            postsGetterPromise,
            cachedPostsGetterPromise
        ]);
    }

    /**
     * A hook to do some processing of params before we query the [cache]{@link CachedDataSource.cache} for a post
     * @param postId {string} A single post to retrieve from the [client]{@link CachedDataSource.cacheClient}
     * @param params {object} [Client]{@link CachedDataSource.cacheClient} specific query parameters
     * @returns {object} The maybe decorated params to be used by [postGetter]{@link postGetter}
     */
    async beforeCachedPostGetter(postId, params) { // eslint-disable-line no-unused-vars
        return Promise.resolve(params);
    }

    /**
     * The method that actually uses the [cache]{@link CachedDataSource.cache} to query for a post
     * @abstract
     * @param postId {string} A single post to retrieve from the [client]{@link CachedDataSource.cacheClient}
     * @param params {object} [Client]{@link CachedDataSource.cacheClient} specific query parameters
     * @returns {Post} [Post]{@link Post} entities transformed from data retrieved from the wrapped client
     */
    async cachedPostGetter(postId, params) {
        return Promise.reject(new Error(`Looking for ${postId} with ${params} – Please specify an actual cachedPostGetter implementation`));
    }

    /**
     * A hook to do some processing of a [Post]{@link Post} after it's returned by the client
     * @param post {string} A single post retrieved from the [cache]{@link CachedDataSource.cacheClient}
     * @param params {object} [Client]{@link CachedDataSource.cacheClient} specific query parameters
     * @returns {Post} The maybe decorated [Post]{@link Post} from the wrapped client
     */
    async afterCachedPostGetter(post, params) { // eslint-disable-line no-unused-vars
        return Promise.resolve(post);
    }

    /**
     * Set a [Post]{@link Post} in the cache to be later pulled by [CachedDataSource.cachedPostGetter]{@link CachedDataSource.cachedPostGetter}
     * @param post {Post}
     * @returns {Promise<Post>}
     */
    async cachePost(post) {
        return await this.cacheClient.setPost(post)
            .then(cached => cached);
    }

    /**
     * A generic method that returns some [Post]{@link Post}
     * @param postId {string} A single post to retrieve from the [client]{@link CachedDataSource.cacheClient}
     * @param params {object} [Client]{@link CachedDataSource.cacheClient} specific query parameters
     * @returns {Post} A single [Post]{@link Post} transformed from data retrieved from the wrapped client
     */
    async getPost(postId, params) {
        const cachedPostGetterPromise = this.beforeCachedPostGetter(postId, params)
            .then(decoratedCachedPostGetterParams => {
                return this.cachedPostGetter(postId, decoratedCachedPostGetterParams)
                    .then(post => this.afterCachedPostGetter(post, decoratedCachedPostGetterParams))
                    .then(post => {
                        if (!post) {
                            throw new Error(`cachedPostGetterPromise cache miss for ${postId} and ${JSON.stringify(decoratedCachedPostGetterParams)}`);
                        }
                        return post;
                    });
            });
        const postGetterPromise = this.beforePostGetter(postId, params)
            .then(decoratedPostGetterParams => {
                return this.postGetter(postId, decoratedPostGetterParams)
                    .then(post => {
                        this.cachePost(post);
                        return this.afterPostGetter(post, decoratedPostGetterParams);
                    });
            });

        return await firstResolved([
            postGetterPromise,
            cachedPostGetterPromise
        ]);
    }
}

export default CachedDataSource;
