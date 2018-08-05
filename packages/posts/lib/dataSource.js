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

    getPosts(params) {
        return Promise.reject(new Error(`Looking for ${params} – Please specify an actual getPosts implementation`));
    }

    getPost(postId, params) {
        return Promise.reject(new Error(`Looking for ${postId} with ${params} – Please specify an actual getPost implementation`));
    }

    jsonToPost(postJson) {
        throw new Error(`Trying to turn ${postJson} into a Post – Please specify an actual Post transformation`);
    }
}

export default DataSource;
