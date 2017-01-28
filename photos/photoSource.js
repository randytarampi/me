class PhotoSource {
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

	getUserPhotos(params) {
		throw new Error(`Looking for ${params} – Please specify an actual get photo for user implementation`);
	}

	getPhoto(photoId, params) {
		throw new Error(`Looking for ${photoId} with ${params} – Please specify an actual get photo implementation`);
	}

	jsonToPhoto(photoJson) {
		throw new Error(`Trying to turn ${photoJson} into a Photo – Please specify an actual Photo transformation`);
	}

	get isEnabled() {
		return !!process.env[`${this.type.toUpperCase()}_API_KEY`] &&
			!!process.env[`${this.type.toUpperCase()}_API_SECRET`];
	}
}

module.exports = PhotoSource;
