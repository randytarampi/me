import {BlogPosting as SchemaBlogPosting} from "@randy.tarampi/schema-dot-org-types";
import {List, Record} from "immutable";
import Place from "./place";
import Profile from "./profile";
import {augmentUrlWithTrackingParams, castDatePropertyToDateTime, compositeKeySeparator} from "./util";

export const POST_OVERRIDING_TAG_SENTINEL_REGEX = /❕([\w.]+)❔/;

const overridableTagProperties = {
    dateCreated: tagValue => castDatePropertyToDateTime(Number(tagValue)),
    lat: tagValue => Number(tagValue),
    long: tagValue => Number(tagValue),
    geohash: tagValue => tagValue,
    title: tagValue => tagValue
};

export const POST_STATUS = {
    visible: "VISIBLE",
    hidden: "HIDDEN",
    archived: "ARCHIVED"
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
    locationCreated: null,
    ...otherProperties
}) {
    constructor({dateCreated, datePublished, tags, locationCreated, geohash, lat, long, ...properties} = {}) {
        if (!locationCreated && (geohash || Number.isFinite(lat) && Number.isFinite(long))) {
            locationCreated = Place.fromJS({geo: {latitude: lat, longitude: long, geohash}});
        }

        if (tags) {
            Object.keys(overridableTagProperties).forEach(overridableTagProperty => {
                const overridingTagSentinel = `❕${overridableTagProperty}❔`;
                const overridingTag = tags.find(tag => tag.startsWith(overridingTagSentinel));

                if (overridingTag) {
                    const overridingTagValue = overridingTag.replace(overridingTagSentinel, "");

                    switch (overridableTagProperty) {
                        case "lat":
                            locationCreated = locationCreated || Place.fromJS({geo: {}});
                            locationCreated = locationCreated.setIn(["geo", "latitude"], overridableTagProperties[overridableTagProperty](overridingTagValue));
                            break;

                        case "long":
                            locationCreated = locationCreated || Place.fromJS({geo: {}});
                            locationCreated = locationCreated.setIn(["geo", "longitude"], overridableTagProperties[overridableTagProperty](overridingTagValue));
                            break;

                        case "geohash":
                            locationCreated = locationCreated || Place.fromJS({geo: {}});
                            locationCreated = locationCreated.setIn(["geo", overridableTagProperty], overridableTagProperties[overridableTagProperty](overridingTagValue));
                            break;

                        default:
                            properties[overridableTagProperty] = overridableTagProperties[overridableTagProperty](overridingTagValue);
                            break;
                    }
                }
            });
        }

        super({
            dateCreated: castDatePropertyToDateTime(dateCreated),
            datePublished: castDatePropertyToDateTime(datePublished),
            tags,
            locationCreated,
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
        return this.locationCreated && this.locationCreated.lat;
    }

    get long() {
        return this.locationCreated && this.locationCreated.long;
    }

    get geohash() {
        return this.locationCreated && this.locationCreated.geohash;
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

    static parsePropertiesFromJs({tags, creator, geohash, lat, long, locationCreated, ...js}) {
        const locationJs = locationCreated
            ? locationCreated
            : (geohash || Number.isFinite(lat) && Number.isFinite(long))
                ? {geo: {latitude: lat, longitude: long, geohash}}
                : null;

        return {
            ...js,
            locationCreated: locationJs ? Place.fromJS(locationJs) : null,
            creator: creator ? Profile.fromJS(creator) : null,
            tags: tags ? List(tags) : null
        };
    }

    static fromJS(js = {}) {
        return new this(this.parsePropertiesFromJs(js));
    }

    static parsePropertiesFromJson({tags, creator, geohash, lat, long, locationCreated, ...json}) {
        const locationJson = locationCreated
            ? locationCreated
            : (geohash || Number.isFinite(lat) && Number.isFinite(long))
                ? {geo: {latitude: lat, longitude: long, geohash}}
                : null;

        return {
            ...json,
            locationCreated: locationJson ? Place.fromJSON(locationJson) : null,
            creator: creator ? Profile.fromJSON(creator) : null,
            tags: tags ? List(tags) : null
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
            locationCreated: this.locationCreated ? this.locationCreated.toSchema() : null,
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
