/**
 * @abstract
 */
class DataSource {
    constructor(type, client, initalizerPromise) {
        this.type = type;
        this.client = client;

        if (initalizerPromise) {
            this.initializing = initalizerPromise
                .then((initializedClient) => {
                    this.client = initializedClient;
                    return this;
                });
        } else {
            this.initializing = Promise.resolve(this);
        }
    }

    get isEnabled() {
        const type = this.type || "";
        return !!process.env[`${type.toUpperCase()}_API_KEY`] &&
            !!process.env[`${type.toUpperCase()}_API_SECRET`];
    }

    async beforePostsGetter(params) { // eslint-disable-line no-unused-vars
        return Promise.resolve(params);
    }

    async postsGetter(params) {
        return Promise.reject(new Error(`Looking for ${params} – Please specify an actual postsGetter implementation`));
    }

    async afterPostsGetter(posts, params) { // eslint-disable-line no-unused-vars
        return Promise.resolve(posts);
    }

    async getPosts(params) {
        const decoratedParams = await this.beforePostsGetter(params);
        const retrievedPosts = await this.postsGetter(decoratedParams);
        const decoratedPosts = await this.afterPostsGetter(retrievedPosts, decoratedParams);

        return decoratedPosts;
    }

    async beforePostGetter(postUid, params) { // eslint-disable-line no-unused-vars
        return Promise.resolve(params);
    }

    async postGetter(postUid, params) {
        return Promise.reject(new Error(`Looking for ${postUid} with ${params} – Please specify an actual postGetter implementation`));
    }

    async afterPostGetter(post, params) { // eslint-disable-line no-unused-vars
        return Promise.resolve(post);
    }

    async getPost(postId, params) {
        const decoratedParams = await this.beforePostGetter(params);
        const retrievedPost = await this.postGetter(postId, decoratedParams);
        const decoratedPost = await this.afterPostGetter(retrievedPost, decoratedParams);

        return decoratedPost;
    }

    jsonToPost(postJson) {
        throw new Error(`Trying to turn ${postJson} into a Post – Please specify an actual Post transformation`);
    }
}

export default DataSource;
