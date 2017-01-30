class WordSource {
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

	getWordPosts(params) {
		return Promise.reject(new Error(`Looking for ${params} – Please specify an actual get word posts implementation`));
	}

	getWordPost(postId, params) {
		return Promise.reject(new Error(`Looking for ${postId} with ${params} – Please specify an actual get word post implementation`));
	}

	jsonToPost(postJson) {
		throw new Error(`Trying to turn ${postJson} into a Post – Please specify an actual Post transformation`);
	}

	isEnabled() {
		throw new Error("Trying to verify if this WordSource is enabled – Please specify an actual isEnabled check");
	}
}

module.exports = WordSource;
