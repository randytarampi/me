/**
 * A generic data source that fetches [Post(s)]{@link Post} from some service
 * @abstract
 */
class DataSource {
    /**
     * Build a data source that fetches [Post(s)]{@link Post} from some service using some client
     * @param type {string} The type of [Posts]{@link Post} returned by this data source
     * @param client {object} A client that wraps some service that serves content to be transformed into [Posts]{@link Post}
     */
    constructor(type, client) {
        this.type = type;
        this.client = client;
        this.initializing = Promise.resolve(this);
    }

    /**
     * A convenience function that returns `true` if we should care about this data source
     * @returns {boolean}
     */
    get isEnabled() {
        const type = this.type.toUpperCase();
        return !!process.env[`${type}_API_KEY`] &&
            !!process.env[`${type}_API_SECRET`];
    }

    /**
     * A hook to do some processing of searchParams before we query the client for posts
     * @param searchParams {SearchParams} [Client]{@link DataSource.client} specific query parameters
     * @returns {object} The maybe decorated searchParams to be used by [postsGetter]{@link postsGetter}
     */
    async beforePostsGetter(searchParams) {
        return Promise.resolve(searchParams);
    }

    /**
     * The method that actually uses the [client]{@link DataSource.client} to query for raw data for transformation into [Posts]{@link Post}
     * @abstract
     * @param searchParams {SearchParams} [Client]{@link DataSource.client} specific query parameters
     * @returns {Post[]} [Post]{@link Post} entities transformed from data retrieved from the wrapped client
     */
    async postsGetter(searchParams) {
        return Promise.reject(new Error(`Looking for ${searchParams} – Please specify an actual postsGetter implementation`));
    }

    /**
     * A hook to do some processing of [Posts]{@link Post} after they're returned by the client
     * @param posts {Post[]} [Post]{@link Post} entities transformed from data retrieved from the wrapped client
     * @param searchParams {SearchParams} [Client]{@link DataSource.client} specific query parameters
     * @returns {Post[]} The maybe decorated [Posts]{@link Post} from the wrapped client
     */
    async afterPostsGetter(posts, searchParams) { // eslint-disable-line no-unused-vars
        return Promise.resolve(posts);
    }

    /**
     * A generic method that returns some [Posts]{@link Post}
     * @param searchParams {SearchParams} [Client]{@link DataSource.client} specific query parameters
     * @returns {Post[]} [Post]{@link Post} entities transformed from data retrieved from the wrapped client
     */
    async getPosts(searchParams) {
        const decoratedParams = await this.beforePostsGetter(searchParams);
        const retrievedPosts = await this.postsGetter(decoratedParams);
        const decoratedPosts = await this.afterPostsGetter(retrievedPosts, decoratedParams);

        return decoratedPosts;
    }

    /**
     * The method that actually uses the [client]{@link DataSource.client} to query for raw data for transformation into [Posts]{@link Post}
     * @abstract
     * @param searchParams {SearchParams} [Client]{@link DataSource.client} specific query parameters
     * @returns {Post[]} [Post]{@link Post} entities transformed from data retrieved from the wrapped client
     */
    async allPostsGetter(searchParams) {
        return Promise.reject(new Error(`Looking for ${searchParams} – Please specify an actual allPostsGetter implementation`));
    }

    /**
     * A generic method that returns all available [Posts]{@link Post}
     * @param searchParams {SearchParams} [Client]{@link DataSource.client} specific query parameters
     * @returns {Post[]} [Post]{@link Post} entities transformed from data retrieved from the wrapped client
     */
    async getAllPosts(searchParams) {
        const decoratedParams = await this.beforePostsGetter(searchParams);
        const retrievedPosts = await this.allPostsGetter(decoratedParams);
        const decoratedPosts = await this.afterPostsGetter(retrievedPosts, decoratedParams);

        return decoratedPosts;
    }

    /**
     * A hook to do some processing of searchParams before we query the client for a post
     * @param postId {string} A single post to retrieve from the [client]{@link DataSource.client}
     * @param searchParams {SearchParams} [Client]{@link DataSource.client} specific query parameters
     * @returns {object} The maybe decorated searchParams to be used by [postGetter]{@link postGetter}
     */
    async beforePostGetter(postId, searchParams) {
        return Promise.resolve(searchParams);
    }

    /**
     * The method that actually uses the [client]{@link DataSource.client} to query for raw data for transformation into a [Post]{@link Post}
     * @abstract
     * @param postId {string} A single post to retrieve from the [client]{@link DataSource.client}
     * @param searchParams {SearchParams} [Client]{@link DataSource.client} specific query parameters
     * @returns {Post} [Post]{@link Post} entities transformed from data retrieved from the wrapped client
     */
    async postGetter(postId, searchParams) {
        return Promise.reject(new Error(`Looking for ${postId} with ${searchParams} – Please specify an actual postGetter implementation`));
    }

    /**
     * A hook to do some processing of [Post]{@link Post} after they're returned by the client
     * @param post {Post} A single [Post]{@link Post} transformed from data retrieved from the wrapped client
     * @param searchParams {SearchParams} [Client]{@link DataSource.client} specific query parameters
     * @returns {Post} The maybe decorated [Post]{@link Post} from the wrapped client
     */
    async afterPostGetter(post, searchParams) { // eslint-disable-line no-unused-vars
        return Promise.resolve(post);
    }

    /**
     * A generic method that returns some [Post]{@link Post}
     * @param postId {string} A single post to retrieve from the [client]{@link DataSource.client}
     * @param searchParams {SearchParams} [Client]{@link DataSource.client} specific query parameters
     * @returns {Post} A single [Post]{@link Post} transformed from data retrieved from the wrapped client
     */
    async getPost(postId, searchParams) {
        const decoratedParams = await this.beforePostGetter(postId, searchParams);
        const retrievedPost = await this.postGetter(postId, decoratedParams);
        const decoratedPost = await this.afterPostGetter(retrievedPost, decoratedParams);

        return decoratedPost;
    }

    /**
     * Transform some raw JSON response from the [client]{@link DataSource.client} into a single [Post]{@link Post}
     * @param postJson {object} The raw post content returned from the [client]{@link DataSource.client}
     * @returns {Post}
     */
    jsonToPost(postJson) {
        throw new Error(`Trying to turn ${postJson} into a Post – Please specify an actual Post transformation`);
    }
}

export default DataSource;
