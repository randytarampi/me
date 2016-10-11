const Creator = require("./creator");
const Moment = require("moment");

class Post {
	constructor(id, postSource, dateModified, datePublished, title, body, sourceUrl, creator) {
		this.id = id;
		this.postSource = postSource;
		this.dateModified = dateModified && Moment.utc(dateModified);
		this.datePublished = datePublished && Moment.utc(datePublished) || this.dateModified && this.dateModified.clone();
		this.title = title;
		this.body = body;
		this.sourceUrl = sourceUrl;
		this.creator = creator;
	}

	static fromJSON(json) {
		return new Post(
			json.id,
			json.postSource,
			json.dateModified && Moment.utc(json.dateModified),
			json.datePublished && Moment.utc(json.datePublished),
			json.title,
			json.body,
			json.sourceUrl,
			json.creator && Creator.fromJSON(json.creator)
		);
	}
}

module.exports = Post;
