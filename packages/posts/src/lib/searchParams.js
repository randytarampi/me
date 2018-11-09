import {Record} from "immutable";
import _ from "lodash";
import {castDatePropertyToDateTime, compositeKeySeparator} from "../../../js";

/**
 * @typedef {Object} searchParamsRecordDefinition
 * @type {{type: string, perPage: number, page: number, orderBy: string, orderOperator: string, orderComparator: string, orderComparatorType: string, width: number, height: number, crop: undefined, id: string, uid: string, source: string, _rawFilter: object, all: boolean, beforeDate: DateTime, beforeId: string, afterId: string, continuationToken: string}}
 * @property orderBy {String} One of `ascending` or `descending`.
 */
const searchParamsRecordDefinition = {
    // NOTE-RT: For either
    type: undefined,
    source: undefined,
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
            extras: "url_o, url_k, url_h, url_c, url_z, url_m, url_n, date_upload, date_taken, owner_name, path_alias, description"
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

        const filter = {
            ...this._rawFilter
        };
        let comparator = this.orderComparator;

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

        if (this.uid) {
            return {
                _query: {
                    uid: {eq: this.uid}
                },
                _options: options
            };
        }

        if (this.type) {
            if (this.source) {
                return {
                    _query: {
                        hash: {type: {eq: this.type}},
                        range: {source: {eq: this.source}}
                    },
                    _options: {
                        ...options,
                        indexName: "type-source-index"
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
                    _query: {uid: {eq: `${this.source}${compositeKeySeparator}${this.id}`}},
                    _options: options
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
                _query: {source: {eq: this.source}},
                _options: options
            };
        }

        return { // NOTE-RT: Just scan the entire table until we know enough of what we'd want to scan (instead of query) for
            _options: options,
            _filter: filter
        };
    }

    get S3() {
        const baseRequest = {
            Bucket: process.env.S3_BUCKET_NAME
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
