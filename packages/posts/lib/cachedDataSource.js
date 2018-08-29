import {util} from "@randy.tarampi/js";
import {DateTime} from "luxon";
import CacheClient from "./cacheClient";
import DataSource from "./dataSource";
import logger from "./logger";
import SearchParams from "./searchParams";

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
     * A hook to do some processing of searchParams before we query the [cache]{@link CachedDataSource.cache} for posts
     * @param searchParams {SearchParams} A combination of attributes that we're looking for
     * @returns {object} The maybe decorated searchParams to be used by [postsGetter]{@link postsGetter}
     */
    async beforeCachedPostsGetter(searchParams) {
        return Promise.resolve(searchParams);
    }

    /**
     * The method that actually uses the [cache]{@link CachedDataSource.cache} to query for [Posts]{@link Post}
     * @param searchParams {SearchParams} A combination of attributes that we're looking for
     * @returns {Post[]} [Post]{@link Post} entities transformed from data retrieved from the [cacheClient]{@link CachedDataSource.cache}
     */
    async cachedPostsGetter(searchParams) {
        return this.cacheClient.getPosts(searchParams.set("source", this.type));
    }

    /**
     * A hook to do some processing of [Posts]{@link Post} after they're returned by the client
     * @param posts {Post[]} [Post]{@link Post} entities transformed from data retrieved from the wrapped client
     * @param searchParams {SearchParams} A combination of attributes that we're looking for
     * @returns {Post[]} The maybe decorated [Posts]{@link Post} from the wrapped client
     */
    async afterCachedPostsGetter(posts, searchParams) { // eslint-disable-line no-unused-vars
        return Promise.resolve(posts);
    }

    /**
     * Set some [Posts]{@link Post} in the cache to be later pulled by [CachedDataSource.cachedPostsGetter]{@link CachedDataSource.cachedPostsGetter}
     * @param posts {Post[]}
     * @returns {Promise<Post[]>}
     */
    async cachePosts(posts) {
        if (!posts || !posts.length) {
            return Promise.resolve([]);
        }
        return await this.cacheClient.setPosts(posts)
            .then(cached => cached);
    }

    /**
     * A generic method that returns some [Posts]{@link Post} from the [cache]{@link CachedDataSource.cacheClient}
     * @param searchParams {SearchParams} A combination of attributes that we're looking for
     * @returns {Post[]} [Post]{@link Post} entities transformed from data retrieved from the wrapped client
     */
    async getCachedPosts(searchParams) {
        return this.beforeCachedPostsGetter(searchParams)
            .then(decoratedCachedPostsGetterParams => {
                logger.debug(`[cachedDataSource.getCachedPosts] retrieving post (${JSON.stringify(searchParams)}) from cache at ${DateTime.utc()}`);
                return this.cachedPostsGetter(decoratedCachedPostsGetterParams)
                    .then(posts => this.afterCachedPostsGetter(posts, decoratedCachedPostsGetterParams))
                    .then(posts => {
                        if (!posts || !posts.length) {
                            logger.debug(`[cachedDataSource.getCachedPosts] retrieve posts (${JSON.stringify(searchParams)}) cache miss at ${DateTime.utc()}`);
                            return null;
                        }

                        logger.debug(`[cachedDataSource.getCachedPosts] retrieved posts (${JSON.stringify(posts.map(post => post.id))}) from cache at ${DateTime.utc()}`);
                        return posts;
                    });
            });
    }

    /**
     * The method that actually uses the [cache]{@link CachedDataSource.cache} to query for [Posts]{@link Post}
     * @param searchParams {SearchParams} A combination of attributes that we're looking for
     * @returns {Post[]} [Post]{@link Post} entities transformed from data retrieved from the [cacheClient]{@link CachedDataSource.cache}
     */
    async allCachedPostsGetter(searchParams) {
        return this.cacheClient.getPosts(searchParams.set("source", this.type).set("all", true));
    }

    /**
     * A generic method that returns all available [Posts]{@link Post} from the cache
     * @param searchParams {SearchParams} A combination of attributes that we're looking for
     * @returns {Post[]} [Post]{@link Post} entities transformed from data retrieved from the cache
     */
    async getAllCachedPosts(searchParams) { // eslint-disable-line no-unused-vars
        return this.beforeCachedPostsGetter(searchParams)
            .then(decoratedCachedPostsGetterParams => {
                logger.debug(`[cachedDataSource.getAllCachedPosts] retrieving post (${JSON.stringify(searchParams)}) from cache at ${DateTime.utc()}`);
                return this.allCachedPostsGetter(decoratedCachedPostsGetterParams)
                    .then(posts => this.afterCachedPostsGetter(posts, decoratedCachedPostsGetterParams))
                    .then(posts => {
                        if (!posts || !posts.length) {
                            logger.debug(`[cachedDataSource.getAllCachedPosts] retrieve posts (${JSON.stringify(searchParams)}) cache miss at ${DateTime.utc()}`);
                            return null;
                        }

                        logger.debug(`[cachedDataSource.getAllCachedPosts] retrieved posts (${JSON.stringify(posts.map(post => post.id))}) from cache at ${DateTime.utc()}`);
                        return posts;
                    });
            });
    }

    /**
     * A generic method that returns some [Posts]{@link Post} probably pulled from the [service]{@link CachedDataSource.client}
     * @param searchParams {SearchParams} A combination of attributes that we're looking for
     * @returns {Post[]} [Post]{@link Post} entities transformed from data retrieved from the wrapped client
     */
    async getServicePosts(searchParams) {
        return this.beforePostsGetter(searchParams)
            .then(decoratedPostsGetterParams => {
                logger.debug(`[cachedDataSource.getServicePosts] retrieving post (${JSON.stringify(searchParams)}) from service at ${DateTime.utc()}`);
                return this.postsGetter(decoratedPostsGetterParams)
                    .then(posts => {
                        this.cachePosts(posts);
                        logger.debug(`[cachedDataSource.getServicePosts] retrieved posts (${JSON.stringify(posts.map(post => post.id))}) from service at ${DateTime.utc()}`);
                        return this.afterPostsGetter(posts, decoratedPostsGetterParams);
                    });
            });
    }

    /**
     * A generic method that returns all available [Posts]{@link Post} from the service
     * @param searchParams {SearchParams} A combination of attributes that we're looking for
     * @returns {Post[]} [Post]{@link Post} entities transformed from data retrieved from the wrapped client
     */
    async getAllServicePosts(searchParams) { // eslint-disable-line no-unused-vars
        return this.beforePostsGetter(searchParams)
            .then(decoratedPostsGetterParams => {
                logger.debug(`[cachedDataSource.getAllServicePosts] retrieving post (${JSON.stringify(searchParams)}) from service at ${DateTime.utc()}`);
                return this.allPostsGetter(decoratedPostsGetterParams)
                    .then(posts => {
                        this.cachePosts(posts);
                        logger.debug(`[cachedDataSource.getAllServicePosts] retrieved posts (${JSON.stringify(posts.map(post => post.id))}) from service at ${DateTime.utc()}`);
                        return this.afterPostsGetter(posts, decoratedPostsGetterParams);
                    });
            });
    }

    /**
     * A generic method that returns some [Posts]{@link Post}
     * @param searchParams {SearchParams} A combination of attributes that we're looking for
     * @returns {Post[]} [Post]{@link Post} entities transformed from data retrieved from the wrapped client
     */
    async getPosts(searchParams) {
        let posts = await this.getCachedPosts(searchParams);

        if (!posts || !posts.length) {
            posts = await this.getServicePosts(searchParams);
        }

        return posts;
    }

    /**
     * A generic method that returns all available [Posts]{@link Post}, either from the cache or the service
     * @param searchParams {SearchParams} A combination of attributes that we're looking for
     * @returns {Post[]} [Post]{@link Post} entities transformed from data retrieved from the wrapped client
     */
    async getAllPosts(searchParams) {
        let posts = await this.getAllCachedPosts(searchParams);

        if (!posts || !posts.length) {
            posts = await this.getAllServicePosts(searchParams);
        }

        return posts;
    }

    /**
     * A hook to do some processing of searchParams before we query the [cache]{@link CachedDataSource.cache} for a post
     * @param postId {string} A single post to retrieve from the [client]{@link CachedDataSource.cacheClient}
     * @param searchParams {SearchParams} A combination of attributes that we're looking for
     * @returns {object} The maybe decorated searchParams to be used by [postGetter]{@link postGetter}
     */
    async beforeCachedPostGetter(postId, searchParams) {
        return Promise.resolve(searchParams);
    }

    /**
     * The method that actually uses the [cache]{@link CachedDataSource.cache} to query for a post
     * @param postId {string} A single post to retrieve from the [client]{@link CachedDataSource.cacheClient}
     * @param searchParams {SearchParams} A combination of attributes that we're looking for
     * @returns {Post} [Post]{@link Post} entities transformed from data retrieved from the wrapped client
     */
    async cachedPostGetter(postId, searchParams) {
        let cacheParams = searchParams
            ? searchParams.set("id", postId).set("source", this.type)
            : SearchParams.fromJS({uid: `${this.type}${util.compositeKeySeparator}${postId}`});

        return this.cacheClient.getPost(cacheParams);
    }

    /**
     * A hook to do some processing of a [Post]{@link Post} after it's returned by the client
     * @param post {string} A single post retrieved from the [cache]{@link CachedDataSource.cacheClient}
     * @param searchParams {SearchParams} A combination of attributes that we're looking for
     * @returns {Post} The maybe decorated [Post]{@link Post} from the wrapped client
     */
    async afterCachedPostGetter(post, searchParams) { // eslint-disable-line no-unused-vars
        return Promise.resolve(post);
    }

    /**
     * Set a [Post]{@link Post} in the cache to be later pulled by [CachedDataSource.cachedPostGetter]{@link CachedDataSource.cachedPostGetter}
     * @param post {Post}
     * @returns {Promise<Post>}
     */
    async cachePost(post) {
        if (!post) {
            return Promise.resolve(null);
        }

        return await this.cacheClient.setPost(post)
            .then(cached => cached);
    }

    /**
     * A generic method that returns some [Post]{@link Post} retrieved from the [cache]{@link CachedDataSource.cacheClient}
     * @param postId {string} A single post to retrieve from the [cache]{@link CachedDataSource.cacheClient}
     * @param searchParams {object} [Client]{@link CachedDataSource.client} specific query parameters
     * @returns {Post} A single [Post]{@link Post} transformed from data retrieved from the wrapped client
     */
    async getCachedPost(postId, searchParams) {
        return this.beforeCachedPostGetter(postId, searchParams)
            .then(decoratedCachedPostGetterParams => {
                logger.debug(`[cachedDataSource.getCachedPost] retrieving post (${postId}) from cache at ${DateTime.utc()}`);
                return this.cachedPostGetter(postId, decoratedCachedPostGetterParams)
                    .then(post => this.afterCachedPostGetter(post, decoratedCachedPostGetterParams))
                    .then(post => {
                        if (!post) {
                            logger.debug(`[cachedDataSource.getCachedPost] retrieve post (${postId}) cache miss at ${DateTime.utc()}`);
                            return null;
                        }
                        logger.debug(`[cachedDataSource.getCachedPost] retrieved post (${post && post.uid}) from cache at ${DateTime.utc()}`);
                        return post;
                    });
            });
    }

    /**
     * A generic method that returns some [Post]{@link Post} probably retrieved from the [service]{@link CachedDataSource.client}
     * @param postId {string} A single post to retrieve from the [service]{@link CachedDataSource.client}
     * @param searchParams {object} [Client]{@link CachedDataSource.client} specific query parameters
     * @returns {Post} A single [Post]{@link Post} transformed from data retrieved from the wrapped client
     */
    async getServicePost(postId, searchParams) {
        return this.beforePostGetter(postId, searchParams)
            .then(decoratedPostGetterParams => {
                logger.debug(`[cachedDataSource.getServicePost] retrieving post (${postId}) from service at ${DateTime.utc()}`);
                return this.postGetter(postId, decoratedPostGetterParams)
                    .then(post => {
                        this.cachePost(post);
                        logger.debug(`[cachedDataSource.getServicePost] retrieved post from service ${post && post.uid} at ${DateTime.utc()}`);
                        return this.afterPostGetter(post, decoratedPostGetterParams);
                    });
            });
    }

    /**
     * A generic method that returns some [Post]{@link Post}
     * @param postId {string} A single post to retrieve from the [cache]{@link CachedDataSource.cacheClient} or [service]{@link CachedDataSource.client}
     * @param searchParams {object} [Client]{@link CachedDataSource.client} specific query parameters
     * @returns {Post} A single [Post]{@link Post} transformed from data retrieved from the wrapped client
     */
    async getPost(postId, searchParams) {
        let post = await this.getCachedPost(postId, searchParams);

        if (!post) {
            post = await this.getServicePost(postId, searchParams);
        }

        return post;
    }
}

export default CachedDataSource;
