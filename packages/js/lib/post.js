import {DateTime} from "luxon";
import Creator from "./creator";
import {compositeKeySeparator} from "./util";

class Post {
    constructor(id, type, source, dateCreated, datePublished, title, body, sourceUrl, creator) {
        this.id = id;
        this.type = type || Post.name;
        this.source = source;
        this._datePublished = datePublished && DateTime.fromISO(datePublished);
        this._dateCreated = dateCreated && DateTime.fromISO(dateCreated);
        this.title = title;
        this.body = body;
        this.sourceUrl = sourceUrl;
        this.creator = creator;
    }

    get uid() {
        return `${this.source}${compositeKeySeparator}${this.id}`;
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
            json.dateCreated && DateTime.fromISO(json.dateCreated),
            json.datePublished && DateTime.fromISO(json.datePublished),
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

export default Post;
