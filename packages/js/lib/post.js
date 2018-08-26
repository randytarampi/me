import {Record} from "immutable";
import {DateTime} from "luxon";
import Creator from "./creator";
import {compositeKeySeparator} from "./util";

export const PostClassGenerator = otherProperties => class AbstractPost extends Record({
    id: null,
    type: null,
    source: null,
    datePublished: null,
    dateCreated: null,
    title: null,
    body: null,
    sourceUrl: null,
    creator: null,
    ...otherProperties
}) {
    get uid() {
        return `${this.source}${compositeKeySeparator}${this.id}`;
    }

    get type() {
        if (this.get("type")) {
            return this.get("type");
        }

        return this.constructor.name;
    }

    get date() {
        return this.datePublished || this.dateCreated;
    }

    get datePublished() {
        if (this.get("datePublished")) {
            return this.get("datePublished");
        }

        return this.dateCreated;
    }

    static parsePropertiesFromJs(js) {
        return {
            ...js,
            dateCreated: js.dateCreated && !(js.dateCreated instanceof DateTime)
                ? js.dateCreated.valueOf ? DateTime.fromMillis(js.dateCreated.valueOf()) : null
                : js.dateCreated,
            datePublished: js.datePublished && !(js.datePublished instanceof DateTime)
                ? js.datePublished.valueOf ? DateTime.fromMillis(js.datePublished.valueOf()) : null
                : js.datePublished,
            creator: js.creator ? Creator.fromJS(js.creator) : null
        };
    }

    static fromJS(js) {
        return new this(this.parsePropertiesFromJs(js));
    }

    static parsePropertiesFromJson(json) {
        return {
            ...json,
            dateCreated: json.dateCreated ? DateTime.fromISO(json.dateCreated) : null,
            datePublished: json.datePublished ? DateTime.fromISO(json.datePublished) : null,
            creator: json.creator ? Creator.fromJSON(json.creator) : null
        };
    }

    static fromJSON(json) {
        return new this(this.parsePropertiesFromJson(json));
    }

    toJS() {
        return {
            ...super.toJS(),
            type: this.type,
            datePublished: this.datePublished
        };
    }

    toJSON() {
        return {
            ...super.toJSON(),
            type: this.type,
            datePublished: this.datePublished
        };
    }
};

export const AbstractPost = PostClassGenerator();

class Post extends PostClassGenerator() {
}

export default Post;
