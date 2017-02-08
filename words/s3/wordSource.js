require("dotenv").config();

const WordSource = require("../wordSource");
const Post = require("me.common.js/lib/post");
const knox = require("knox");
const jsyaml = require("js-yaml");

class S3WordSource extends WordSource {
	constructor() {
		super("S3", knox.createClient({
			key: process.env.AWS_ACCESS_KEY,
			secret: process.env.AWS_ACCESS_SECRET,
			bucket: process.env.S3_BUCKET_NAME
		}));
	}

	getWordPosts(params) {
		const options = {
			"max-keys": params.perPage || 20
		};

		if (params.page) {
			options.marker = options["max-keys"] * (params.page - 1);
		}

		return new Promise((resolve, reject) => {
			this.client.list(options, (error, data) => {
				if (error) {
					return reject(error);
				}

				resolve(Promise.all(data.Contents.map((object) => {
					return this.getWordPost(object.Key);
				})));
			});
		});
	}

	getWordPost(key) {
		return new Promise((resolve, reject) => {
			this.client.getFile(key, (error, response) => {
				if (error) {
					return reject(error);
				}

				let responseYamlString = "";
				response.on("data", (chunk) => {
					responseYamlString += chunk;
				});
				response.on("end", () => {
					resolve(responseYamlString);
				});
			});
		})
			.then((yamlString) => {
				return this.jsonToPost(jsyaml.safeLoad(yamlString));
			});
	}

	jsonToPost(postJson) {
		return new Post(
			postJson.date,
			null,
			this.type,
			postJson.date,
			null,
			postJson.title,
			postJson.body
		);
	}
}

module.exports = S3WordSource;
