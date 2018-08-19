import * as PostModel from "../db/models/post";
import logger from "../lib/logger";

/**
 * A generic class that gets and sets [Posts]{@link Post} in some data store
 */
class CacheClient {
    /**
     * Build a wrapper around a data store we want to use as a cache
     * @param type
     * @param dataClient
     */
    constructor(type = "Dynamoose", dataClient = PostModel) {
        this.type = type;
        this.dataClient = dataClient;
    }

    /**
     * Retrieve some [Posts]{@link Post} from the cache that correspond to the terms in the passed searchParams
     * @param searchParams {SearchParams} A combination of attributes that we're looking for
     * @returns {Promise<Post[]>}
     */
    async getPosts(searchParams) {
        logger.debug(`[cacheClient.getPosts] getting posts (${JSON.stringify(searchParams)}) from cache`);
        return this.dataClient.getPosts(searchParams[this.type])
            .catch(error => {
                logger.error(error, `[cacheClient.getPosts] error for (${JSON.stringify(searchParams)})`);
            }); // NOTE-RT: Just swallow caching errors
    }

    /**
     * Set some [Posts]{@link Post} in the cache
     * @param posts {Post[]}
     * @returns {Promise<Post[]>}
     */
    async setPosts(posts) {
        logger.debug(`[cacheClient.setPosts] setting posts (${JSON.stringify(posts.map(post => post.uid))}}) in cache`);
        return this.dataClient.createPosts(posts)
            .catch(error => {
                logger.error(error, `[cacheClient.setPosts] error for (${JSON.stringify(posts.map(post => post.uid))})`);
            }); // NOTE-RT: Just swallow caching errors
    }

    /**
     * Retrieve a [Post]{@link Post} from the cache that corresponds to the terms in the passed searchParams
     * @param searchParams {SearchParams} A combination of attributes that we're looking for
     * @returns {Promise<Post>}
     */
    async getPost(searchParams) {
        logger.debug(`[cacheClient.getPost] getting post (${JSON.stringify(searchParams)}) from cache`);
        return this.dataClient.getPost(searchParams[this.type])
            .catch(error => {
                logger.error(error, `[cacheClient.getPost] error for (${JSON.stringify(searchParams)})`);
            }); // NOTE-RT: Just swallow caching errors
    }

    /**
     * Set a [Post]{@link Post} in the cache
     * @param post {Post}
     * @returns {Promise<Post>}
     */
    async setPost(post) {
        logger.debug(`[cacheClient.setPost] setting post (${post.uid}) in cache`);
        return this.dataClient.createPost(post)
            .catch(error => {
                logger.error(error, `[cacheClient.setPost] error for (${post.uid})`);
            }); // NOTE-RT: Just swallow caching errors
    }
}

export default CacheClient;
