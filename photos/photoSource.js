/**
 * @abstract
 */
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
		return Promise.reject(new Error(`Looking for ${params} – Please specify an actual get photo for user implementation`));
	}

	getPhoto(photoId, params) {
		return Promise.reject(new Error(`Looking for ${photoId} with ${params} – Please specify an actual get photo implementation`));
	}

	jsonToPhoto(photoJson) {
		throw new Error(`Trying to turn ${photoJson} into a Photo – Please specify an actual Photo transformation`);
	}

	get isEnabled() {
		const type = this.type || "";
		return !!process.env[`${type.toUpperCase()}_API_KEY`] &&
			!!process.env[`${type.toUpperCase()}_API_SECRET`];
	}
}

module.exports = PhotoSource;
