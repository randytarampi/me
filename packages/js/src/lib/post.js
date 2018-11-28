import {BlogPosting as SchemaBlogPosting} from "@randy.tarampi/schema-dot-org-types";
import {List, Record} from "immutable";
import geohash from "latlon-geohash";
import Profile from "./profile";
import {
    augmentUrlWithTrackingParams,
    castDatePropertyToDateTime,
    compositeKeySeparator,
    convertLatLongToGeohash
} from "./util";

const overridableTagProperties = {
    dateCreated: tagValue => castDatePropertyToDateTime(Number(tagValue)),
    lat: tagValue => Number(tagValue),
    long: tagValue => Number(tagValue),
    geohash: tagValue => tagValue
};

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
    raw: null,
    tags: List(),
    geohash: null,
    lat: null,
    long: null,
    ...otherProperties
}) {
    constructor({dateCreated, datePublished, ...properties} = {}) {
        if (properties.tags) {
            Object.keys(overridableTagProperties).forEach(overridableTagProperty => {
                const overridingTagSentinel = `❕${overridableTagProperty}❔`;
                const overridingTag = properties.tags.find(tag => tag.startsWith(overridingTagSentinel));

                if (overridingTag) {
                    const overridingTagValue = overridingTag.replace(overridingTagSentinel, "");

                    properties[overridableTagProperty] = overridableTagProperties[overridableTagProperty](overridingTagValue);
                }
            });
        }

        super({
            dateCreated: castDatePropertyToDateTime(dateCreated),
            datePublished: castDatePropertyToDateTime(datePublished),
            ...properties
        });
    }

    get uid() {
        return `${this.source}${compositeKeySeparator}${this.id}`;
    }

    static get type() {
        return "Post";
    }

    get date() {
        return this.datePublished || this.dateCreated;
    }

    get lat() {
        if (this.get("lat")) {
            return this.get("lat");
        }

        if (this.get("geohash")) {
            return geohash.decode(this.get("geohash")).lat;
        }

        return null;
    }

    get long() {
        if (this.get("long")) {
            return this.get("long");
        }

        if (this.get("geohash")) {
            return geohash.decode(this.get("geohash")).lon;
        }

        return null;
    }

    get geohash() {
        if (this.get("geohash")) {
            return this.get("geohash");
        }

        if (this.get("lat") && this.get("long")) {
            return convertLatLongToGeohash(this.get("lat"), this.get("long"));
        }

        return null;
    }

    get datePublished() {
        if (this.get("datePublished")) {
            return this.get("datePublished");
        }

        return this.dateCreated;
    }

    get type() {
        if (this.get("type")) {
            return this.get("type");
        }

        return this.constructor.type;
    }

    static parsePropertiesFromJs(js) {
        return {
            ...js,
            creator: js.creator ? Profile.fromJS(js.creator) : null,
            tags: js.tags ? List(js.tags) : null
        };
    }

    static fromJS(js = {}) {
        return new this(this.parsePropertiesFromJs(js));
    }

    static parsePropertiesFromJson(json) {
        return {
            ...json,
            creator: json.creator ? Profile.fromJSON(json.creator) : null,
            tags: json.tags ? List(json.tags) : null
        };
    }

    static fromJSON(json = {}) {
        return new this(this.parsePropertiesFromJson(json));
    }

    toJS() {
        return {
            ...super.toJS(),
            lat: this.lat,
            long: this.long,
            geohash: this.geohash,
            type: this.type,
            datePublished: this.datePublished
        };
    }

    toJSON() {
        return {
            ...super.toJSON(),
            lat: this.lat,
            long: this.long,
            geohash: this.geohash,
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
            author: this.creator ? `${this.creator.url ? this.creator.url : this.creator.username} (${this.creator.name})` : null,
            lat: this.lat,
            long: this.long
        };
    }
};

export const AbstractPost = PostClassGenerator();

export class Post extends PostClassGenerator() {
}

export default Post;
