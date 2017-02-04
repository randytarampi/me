require("dotenv").config();

const PhotoSource = require("../photoSource");
const Photo = require("me.common.js/lib/photo");
const Creator = require("me.common.js/lib/creator");
const SizedPhoto = require("me.common.js/lib/sizedPhoto");
const SearchParams = require("../searchParams");
const F00px = require("500px");

class Five00pxSource extends PhotoSource {
	constructor() {
		super("500px", new F00px(process.env["F00PX_API_KEY"]));
	}

	getUserPhotos(params) {
		params = params instanceof SearchParams ? params : new SearchParams(params);
		const that = this;
		const client = this.client;
		const userId = process.env.FIVE00PX_USER_ID;
		let f00pxRequest = Promise.resolve(userId);

		if (!userId) {
			f00pxRequest = new Promise((resolve, reject) => {
				client.users.getByName(process.env["F00PX_USER_NAME"], (error, response) => {
					if (error) {
						return reject(error);
					}

					resolve(response.user.id);
				});
			});
		}

		return f00pxRequest
			.then((userId) => {
				return new Promise((resolve, reject) => {
					client.photos.getByUserId(userId, params.F00px, (error, response) => {
						if (error) {
							return reject(error);
						}

						resolve(response.photos);
					});
				});
			})
			.then((photos) => {
				return Promise.all(photos.map((photo) => {
					return that.jsonToPhoto(photo);
				}));
			});
	}

	getPhoto(id, params) {
		params = params instanceof SearchParams ? params : new SearchParams(params);
		const that = this;
		const client = this.client;

		return new Promise((resolve, reject) => {
			client.photos.getById(id, params.F00px, (error, response) => {
				if (error) {
					return reject(error);
				}

				resolve(response.photo);
			});
		}).then((photo) => {
			return that.jsonToPhoto(photo);
		});
	}

	jsonToPhoto(json) {
		return new Photo(
			json.id,
			null,
			this.type,
			json.taken_at,
			json.created_at,
			json.width,
			json.height,
			json.images.map((image) => {
				return new SizedPhoto(image.url, image.size);
			}),
			`https://www.500px.com${json.url}`,
			json.name,
			json.description,
			new Creator(
				json.user.id,
				json.user.username,
				json.user.fullname,
				`https://www.500px.com/${json.user.username}`
			)
		);
	}

	get isEnabled() {
		return !!process.env["F00PX_API_KEY"] &&
			!!process.env["F00PX_API_SECRET"];
	}
}

module.exports = Five00pxSource;
