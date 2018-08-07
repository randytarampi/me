import * as PostModel from "../db/models/post";
import logger from "../logger";

/**
 * A generic class that gets and sets [Posts]{@link Post} in some data store
 */
class CacheClient {
    /**
     *
     * @param type
     * @param dataClient
     */
    constructor(type, dataClient = PostModel) {
        this.type = type;
        this.dataClient = dataClient;
    }

    /**
     * Retrieve some [Posts]{@link Post} from the cache that correspond to the terms in the passed clientParams
     * @param clientParams {Object} [Client]{@link CacheClient.dataClient} specific query parameters
     * @returns {Promise<Post[]>}
     */
    async getPosts(clientParams) {
        return await this.dataClient.getPosts(clientParams)
            .catch(logger.error); // NOTE-RT: Just swallow caching errors
    }

    /**
     * Set some [Posts]{@link Post} in the cache
     * @param posts {Post[]}
     * @returns {Promise<Post[]>}
     */
    async setPosts(posts) {
        return await this.dataClient.createPosts(posts)
            .catch(logger.error); // NOTE-RT: Just swallow caching errors
    }

    /**
     * Retrieve a [Post]{@link Post} from the cache that corresponds to the terms in the passed clientParams
     * @param clientParams {Object} [Client]{@link CacheClient.dataClient} specific query parameters
     * @returns {Promise<Post>}
     */
    async getPost(clientParams) {
        return await this.dataClient.getPost(clientParams)
            .catch(logger.error); // NOTE-RT: Just swallow caching errors
    }

    /**
     * Set a [Post]{@link Post} in the cache
     * @param post {Post}
     * @returns {Promise<Post>}
     */
    async setPost(post) {
        return await this.dataClient.createPost(post)
            .catch(logger.error); // NOTE-RT: Just swallow caching errors
    }
}

export default CacheClient;
