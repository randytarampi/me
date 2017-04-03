const Creator = require("./creator");
const Moment = require("moment");

class Post {
	constructor(id, type, source, dateCreated, datePublished, title, body, sourceUrl, creator) {
		this.id = id;
		this.type = type || Post.name;
		this.source = source;
		this._datePublished = datePublished && Moment.utc(datePublished);
		this._dateCreated = dateCreated && Moment.utc(dateCreated);
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
			json._dateCreated && Moment.utc(json._dateCreated),
			json._datePublished && Moment.utc(json._datePublished),
			json.title,
			json.body,
			json.sourceUrl,
			json.creator && Creator.fromJSON(json.creator)
		);
	}

	get uid() {
		return `${this.source}-${this.id}`;
	}

	get datePublished() {
		return this._datePublished || this._dateCreated;
	}

	get dateCreated() {
		return this._dateCreated || this._datePublished;
	}
}

module.exports = Post;
