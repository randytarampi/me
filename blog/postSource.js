class PostSource {
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

    getPosts(params) {
        return Promise.reject(new Error(`Looking for ${params} – Please specify an actual get posts implementation`));
    }

    jsonToPost(postJson) {
        throw new Error(`Trying to turn ${postJson} into a Post – Please specify an actual Post transformation`);
    }

    isEnabled() {
        throw new Error("Trying to verify if this PostSource is enabled – Please specify an actual isEnabled check");
    }
}

module.exports = PostSource;
