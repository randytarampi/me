require("dotenv").config();

const WordSource = require("../wordSource");
const Creator = require("../creator");
const Post = require("../post");
const tumblr = require("tumblr.js");

class TumblrWordSource extends WordSource {
	constructor() {
		super("Tumblr", tumblr.createClient({
			consumer_key: process.env.TUMBLR_API_KEY,
			consumer_secret: process.env.TUMBLR_API_SECRET,
			returnPromises: true
		}));
	}

	getWordPosts(params) {
		const that = this;
		const options = {
			"type": "text",
			"limit": params.perPage || 20
		};

		if (params.page) {
			options.offset = options.limit * (params.page - 1);
		}

		return this.client.blogPosts(process.env.TUMBLR_USER_NAME)
			.then((response) => {
				return response.posts.map((postJson) => {
					return that.jsonToPost(postJson, response.blog);
				});
			});
	}

	getWordPost(id) {
		const that = this;
		const options = {
			"id": id
		};

		return this.client.blogPosts(process.env.TUMBLR_USER_NAME, options)
			.then((response) => {
				return response.posts.map((postJson) => {
					return that.jsonToPost(postJson, response.blog);
				});
			});
	}

	jsonToPost(postJson, blogJson) {
		return new Post(
			postJson.id,
			this.type,
			null,
			postJson.date,
			postJson.title,
			postJson.body,
			postJson.source_url,
			blogJson && new Creator(blogJson.name, blogJson.name, blogJson.title, blogJson.url)
		);
	}
}

module.exports = TumblrWordSource;
