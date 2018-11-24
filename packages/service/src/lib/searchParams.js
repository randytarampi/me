import {
    castDatePropertyToDateTime,
    compositeKeySeparator,
    GEOHASH_ADDITIONAL_PRECISION_CHARACTER,
    GEOHASH_CHARACTER_PRECISION
} from "@randy.tarampi/js";
import {Record} from "immutable";
import geohash from "latlon-geohash";
import _ from "lodash";
import padRight from "pad-right";

/**
 * @typedef {Object} searchParamsRecordDefinition
 * @type {{type: string, perPage: number, page: number, orderBy: string, orderOperator: string, orderComparator: string, orderComparatorType: string, width: number, height: number, crop: undefined, id: string, uid: string, source: string, _rawFilter: object, all: boolean, beforeDate: DateTime, beforeId: string, afterId: string, continuationToken: string, tags: string}}
 * @property orderBy {String} One of `ascending` or `descending`.
 */
const searchParamsRecordDefinition = {
    // NOTE-RT: For either
    type: undefined,
    source: undefined,
    geohash: undefined,
    lat: undefined,
    long: undefined,
    geohashPrecision: undefined, // NOTE-RT: A `6` would be about 7km^2, er the table in http://www.movable-type.co.uk/scripts/geohash.html
    _rawFilter: undefined,

    // NOTE-RT: For lists
    perPage: 100,
    page: 1,
    orderBy: "descending",
    orderOperator: undefined,
    orderComparator: undefined,
    orderComparatorType: undefined,
    all: false,
    beforeDate: null,
    beforeId: null,
    afterId: null,
    continuationToken: null,
    tags: null,

    // NOTE-RT: For individual posts
    width: undefined,
    height: undefined,
    crop: undefined,
    id: undefined,
    uid: undefined
};
const SearchParamsRecord = Record(searchParamsRecordDefinition);

/**
 * Turn some generic search parameters into a query parameters for [Posts]{@link Post} for some services
 * @extends SearchParamsRecord
 */
class SearchParams extends SearchParamsRecord {
    constructor({beforeDate, width, height, page, perPage, ...properties} = {}) {
        super({
            ...properties,
            beforeDate: castDatePropertyToDateTime(beforeDate),
            width: width && Number(width),
            height: height && Number(height),
            perPage: perPage ? Number(perPage) : 100,
            page: page ? Number(page) : 1
        });
    }

    get Flickr() {
        return {
            page: this.page,
            per_page: Math.min(this.perPage, 500),
            extras: "url_o, url_k, url_h, url_c, url_z, url_m, url_n, date_upload, date_taken, owner_name, path_alias, description, tags, machine_tags, geo"
        };
    }

    get Unsplash() {
        let order_by = "latest";

        switch (this.orderBy) {
            case "ascending":
                order_by = "oldest";
                break;

            case "descending":
                order_by = "latest";
                break;
        }

        return {
            page: this.page,
            per_page: this.perPage,
            order_by,
            width: this.width,
            height: this.height,
            crop: this.crop
        };
    }

    get Instagram() {
        const baseRequest = {
            page: this.page,
            count: this.perPage
        };

        const filterRequest = {};

        if (this.beforeId) {
            filterRequest.max_id = this.beforeId;
        }

        if (this.afterId) {
            filterRequest.min_id = this.afterId;
        }

        return {
            ...baseRequest,
            ...filterRequest
        };
    }

    get Tumblr() {
        const baseRequest = {
            id: this.id,
            limit: Math.min(this.perPage, 20)
        };

        if (this.type) {
            if (this.type === "Post") {
                baseRequest.type = "text";
            } else {
                baseRequest.type = this.type.toLowerCase();
            }
        }

        const filterRequest = {
            page: this.page,
            offset: baseRequest.limit * (this.page - 1)
        };

        if (this.beforeDate) {
            filterRequest.before = this.beforeDate.valueOf() / 1000 - 1;
        }

        return {
            ...baseRequest,
            ...filterRequest
        };
    }

    get Dynamoose() {
        const options = {
            descending: true,
            all: this.all
        };

        switch (this.orderBy) {
            case "descending":
                options.descending = true;
                break;

            case "ascending":
                options.descending = false;
                break;

            // NOTE-RT: Assume all other cases will have `orderComparator` defined, which takes care of any ambiguity here
        }

        const filters = {
            ...this._rawFilter
        };
        let comparator = this.orderComparator;
        let geohashQuery = this.geohash;
        let geohashQueryPrecision = this.geohashPrecision;

        if (!geohashQuery && this.lat && this.long) {
            geohashQuery = geohash.encode(this.lat, this.long, geohashQueryPrecision || GEOHASH_CHARACTER_PRECISION);
        }

        if (geohashQuery && geohashQueryPrecision) {
            geohashQuery = padRight(geohashQuery, geohashQueryPrecision, GEOHASH_ADDITIONAL_PRECISION_CHARACTER).slice(0, geohashQueryPrecision);
        }

        switch (this.orderComparatorType) {
            case "String":
                break;

            case "Number":
            default:
                comparator = Number(this.orderComparator);
        }

        if (this.perPage) {
            options.limit = this.perPage;
        }

        if (this.tags) { // FIXME-RT: Ideally this would do a filtered query on an index, but let's save that for when I blow this up and move the logic into db/models/post
            filters.tags = {
                contains: this.tags.split(",")
            };

            if (this.type) {
                filters.type = this.type;
            }

            if (this.source) {
                filters.source = this.source;
            }

            if (this.orderBy && this.orderOperator && !_.isUndefined(this.orderComparator)) {
                filters[this.orderBy] = {[this.orderOperator]: comparator};
            }

            return {
                _options: options,
                _filter: filters
            };
        }

        if (this.uid) {
            return {
                _query: {
                    hash: {uid: {eq: this.uid}}
                },
                _options: {
                    ...options,
                    indexName: "uid-index"
                }
            };
        }

        if (this.type) {
            if (this.source) {
                return {
                    _query: {
                        hash: {source: {eq: this.source}},
                        range: {type: {eq: this.type}}
                    },
                    _options: {
                        ...options,
                        indexName: "source-type-index"
                    }
                };
            }

            if (geohashQuery) {
                return {
                    _query: {
                        hash: {type: {eq: this.type}},
                        range: {geohash: {begins_with: geohashQuery}}
                    },
                    _options: {
                        ...options,
                        indexName: "type-geohash-index"
                    }
                };
            }

            if (this.orderBy && this.orderOperator && !_.isUndefined(this.orderComparator)) {
                return {
                    _query: {
                        hash: {type: {eq: this.type}},
                        range: {[this.orderBy]: {[this.orderOperator]: comparator}}
                    },
                    _options: {
                        ...options,
                        indexName: `type-${this.orderBy}-index`
                    }
                };
            }

            return {
                _query: {type: {eq: this.type}},
                _options: options
            };
        }

        if (this.source) {
            if (this.id) {
                return {
                    _query: {
                        hash: {uid: {eq: `${this.source}${compositeKeySeparator}${this.id}`}}
                    },
                    _options: {
                        ...options,
                        indexName: "uid-index"
                    }
                };
            }

            if (geohashQuery) {
                return {
                    _query: {
                        hash: {source: {eq: this.source}},
                        range: {geohash: {begins_with: geohashQuery}}
                    },
                    _options: {
                        ...options,
                        indexName: "source-geohash-index"
                    }
                };
            }

            if (this.orderBy && this.orderOperator && !_.isUndefined(this.orderComparator)) {
                return {
                    _query: {
                        hash: {source: {eq: this.source}},
                        range: {[this.orderBy]: {[this.orderOperator]: comparator}}
                    },
                    _options: {
                        ...options,
                        indexName: `source-${this.orderBy}-index`
                    }
                };
            }

            return {
                _query: {
                    hash: {source: {eq: this.source}}
                },
                _options: options
            };
        }

        return { // NOTE-RT: Just scan the entire table until we know enough of what we'd want to scan (instead of query) for
            _options: options,
            _filter: filters
        };
    }

    get S3() {
        const baseRequest = {
            Bucket: process.env.SERVICE_POSTS_S3_BUCKET_NAME
        };

        if (this.id) {
            return {
                ...baseRequest,
                Key: this.id
            };
        }

        const filterRequest = {};

        if (this.beforeId) {
            filterRequest.StartAfter = this.beforeId;
        }
        if (this.continuationToken) {
            filterRequest.ContinuationToken = this.continuationToken;
        }

        return {
            ...baseRequest,
            ...filterRequest,
            MaxKeys: Math.min(this.perPage, 1000)
        };
    }

    static parsePropertiesFromJs(js) {
        return {
            orderBy: "descending",
            all: false,
            ...js
        };
    }

    static fromJS(js) {
        return new SearchParams(SearchParams.parsePropertiesFromJs(js));
    }

    static parsePropertiesFromJson(json) {
        return {
            orderBy: "descending",
            all: false,
            ...json
        };
    }

    static fromJSON(json) {
        return new SearchParams(SearchParams.parsePropertiesFromJson(json));
    }
}

export default SearchParams;
