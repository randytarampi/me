class PostSource {
    constructor(type, client) {
        this.type = type;
        this.client = client;
        this.initializing = Promise.resolve(this);
    }

    get isEnabled() {
        throw new Error("Trying to verify if this PostSource is enabled – Please specify an actual isEnabled check");
    }

    jsonToPost(postJson) {
        throw new Error(`Trying to turn ${postJson} into a Post – Please specify an actual Post transformation`);
    }

    getPosts(params) {
        return Promise.reject(new Error(`Looking for ${params} – Please specify an actual getPosts implementation`));
    }
}

export default PostSource;
