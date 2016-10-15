const Creator = require("./creator");
const Moment = require("moment");

class Post {
	constructor(id, type, source, dateCreated, datePublished, title, body, sourceUrl, creator) {
		this.id = id;
		this.type = type || "Post";
		this.source = source;
		this.dateCreated = dateCreated && Moment.utc(dateCreated);
		this.datePublished = datePublished && Moment.utc(datePublished) || this.dateCreated && this.dateCreated.clone();
		this.title = title;
		this.body = body;
		this.sourceUrl = sourceUrl;
		this.creator = creator;
	}

	static fromJSON(json) {
		return new Post(
			json.id,
			json.type,
			json.source,
			json.dateCreated && Moment.utc(json.dateCreated),
			json.datePublished && Moment.utc(json.datePublished),
			json.title,
			json.body,
			json.sourceUrl,
			json.creator && Creator.fromJSON(json.creator)
		);
	}

	get uid() {
		return `${this.source}-${this.id}`;
	}
}

module.exports = Post;
