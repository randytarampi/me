class WordSource {
	constructor(type, client, initalizerPromise) {
		let that = this;
		this.type = type;
		this.client = client;

		if (initalizerPromise) {
			this.initializing = initalizerPromise
				.then((initializedClient) => {
					that.client = initializedClient;
					return that;
				});
		} else {
			this.initializing = Promise.resolve(this);
		}
	}

	getWordPosts(params) {
		throw new Error(`Looking for ${params} – Please specify an actual get word posts implementation`);
	}

	getWordPost(postId, params) {
		throw new Error(`Looking for ${postId} with ${params} – Please specify an actual get word post implementation`);
	}

	jsonToPhoto(postJson) {
		throw new Error(`Trying to turn ${postJson} into a Post – Please specify an actual Post transformation`);
	}
}

module.exports = WordSource;
