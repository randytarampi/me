import Moment from "moment";
import Creator from "./creator";

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

    get uid() {
        return `${this.source}-${this.id}`;
    }

    get datePublished() {
        return this._datePublished || this._dateCreated;
    }

    get dateCreated() {
        return this._dateCreated || this._datePublished;
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

    toJSON() {
        return {
            ...this,
            dateCreated: this.dateCreated,
            datePublished: this.datePublished
        };
    }
}

module.exports = Post;
