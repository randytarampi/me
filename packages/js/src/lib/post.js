import {BlogPosting as SchemaBlogPosting} from "@randy.tarampi/schema-dot-org-types";
import {Record} from "immutable";
import Profile from "./profile";
import {augmentUrlWithTrackingParams, castDatePropertyToDateTime, compositeKeySeparator} from "./util";

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
    constructor({dateCreated, datePublished, ...properties} = {}) {
        super({
            dateCreated: castDatePropertyToDateTime(dateCreated),
            datePublished: castDatePropertyToDateTime(datePublished),
            ...properties
        });
    }

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
            creator: js.creator ? Profile.fromJS(js.creator) : null
        };
    }

    static fromJS(js = {}) {
        return new this(this.parsePropertiesFromJs(js));
    }

    static parsePropertiesFromJson(json) {
        return {
            ...json,
            creator: json.creator ? Profile.fromJSON(json.creator) : null
        };
    }

    static fromJSON(json = {}) {
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

    toSchema() {
        const {type, body, sourceUrl, ...js} = this.toJS(); // eslint-disable-line no-unused-vars

        return new SchemaBlogPosting({
            ...js,
            accessMode: "textual",
            creator: this.creator && this.creator.toSchema(),
            author: this.creator && this.creator.toSchema(),
            publisher: this.creator && this.creator.toSchema(),
            sharedContent: this.sourceUrl,
            articleBody: this.body,
            text: this.body,
            headline: this.title,
            name: this.title,
            articleSection: this.type,
            dateCreated: this.dateCreated ? this.dateCreated.toISO() : null,
            datePublished: this.datePublished ? this.datePublished.toISO() : null,
            dateModified: this.datePublished ? this.datePublished.toISO() : null,
            mainEntityOfPage: this.sourceUrl
        });
    }

    toRss({campaign} = {}) {
        return {
            title: this.title,
            description: this.body,
            url: this.sourceUrl ? augmentUrlWithTrackingParams(this.sourceUrl, campaign) : null,
            guid: this.uid,
            date: this.date ? this.date.toJSDate() : null,
            author: this.creator ? `${this.creator.url ? augmentUrlWithTrackingParams(this.creator.url, campaign) : this.creator.username} (${this.creator.name})` : null
        };
    }
};

export const AbstractPost = PostClassGenerator();

export class Post extends PostClassGenerator() {
}

export default Post;
