import {
    castDatePropertyToDateTime,
    compositeKeySeparator,
    convertLatLongToGeohash,
    Gallery,
    getGeohashesForBoundingBox,
    getGeohashesForRadiusAroundGeohash,
    getGeohashesForRadiusAroundPoint,
    getHaversineDistance,
    Photo,
    Post,
    POST_STATUS
} from "@randy.tarampi/js";
import {Record} from "immutable";
import _ from "lodash";
import {DateTime, Duration} from "luxon";

/**
 * @typedef {Object} searchParamsRecordDefinition
 * @type {{type: string, perPage: number, page: number, orderBy: string, orderOperator: string, orderComparator: string, orderComparatorType: string, relativeOrderComparatorAdjustmentOperator: string, relativeOrderComparatorAdjustment: string, relativeOrderComparatorAdjustmentType: string, width: number, height: number, crop: undefined, id: string, uid: string, source: string, all: boolean, beforeDate: DateTime, beforeId: string, afterId: string, continuationToken: string, tags: string, status: boolean}}
 * @property orderBy {String} One of `ascending` or `descending`.
 */
const searchParamsRecordDefinition = {
    // NOTE-RT: For either
    type: undefined,
    source: undefined,
    geohash: undefined,
    lat: undefined,
    long: undefined,
    south: undefined,
    west: undefined,
    north: undefined,
    east: undefined,
    geoRadius: undefined,
    geohashPrecision: undefined, // NOTE-RT: A `6` would be about 7km^2, er the table in http://www.movable-type.co.uk/scripts/geohash.html

    // NOTE-RT: For lists
    perPage: 100,
    page: 1,
    orderBy: "descending",
    orderOperator: undefined,
    orderComparator: undefined,
    orderComparatorType: undefined,
    relativeOrderComparatorAdjustmentOperator: undefined,
    relativeOrderComparatorAdjustment: undefined,
    relativeOrderComparatorAdjustmentType: undefined,
    relativeOrderComparatorBasis: undefined,
    relativeOrderComparatorBasisType: undefined,
    all: false,
    beforeDate: null,
    afterDate: null,
    beforeId: null,
    afterId: null,
    continuationToken: null,
    tags: null,
    status: POST_STATUS.visible,

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
    constructor({beforeDate, width, height, page, perPage, lat, long, north, east, south, west, ...properties} = {}) {
        super({
            ...properties,
            beforeDate: castDatePropertyToDateTime(beforeDate),
            width: width && Number(width),
            height: height && Number(height),
            perPage: perPage ? Number(perPage) : 100,
            page: page ? Number(page) : 1,
            lat: lat && Number(lat),
            long: long && Number(long),
            north: north && Number(north),
            east: east && Number(east),
            south: south && Number(south),
            west: west && Number(west)
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

        switch (this.type) {
            case Post.type:
                baseRequest.type = "text";
                break;

            case Gallery.type:
            case Photo.type:
                baseRequest.type = "photo";
                break;

            default: {
                if (this.type) {
                    baseRequest.type = this.type.toLowerCase();
                }
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
                options.indexName = "status-datePublished-index";
                break;

            case "ascending":
                options.descending = false;
                options.indexName = "status-datePublished-index";
                break;

            // NOTE-RT: Assume all other cases will have `orderComparator` defined, which takes care of any ambiguity here
        }

        let castOrderComparator = this.orderComparator;

        if (this.orderComparator instanceof DateTime) {
            castOrderComparator = castOrderComparator.toJSDate();
        }

        const filters = {
            status: this.status
        };

        if (Number.isFinite(this.perPage)) {
            options.limit = this.perPage;
        } else {
            options.all = true;
        }

        if (this.type) {
            filters.type = this.type;
        }

        if (this.source) {
            filters.source = this.source;
        }

        if (this.hasOrderingConditions) {
            filters[this.orderBy] = {[this.orderOperator]: castOrderComparator};
        }

        if (this.tags) { // FIXME-RT: Ideally this would do a filtered query on an index, but let's save that for when I blow this up and move the logic into db/models/post
            filters.tags = {
                contains: this.tags
                    .split(",")
                    .map(string => string.toLowerCase())
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
                },
                _filter: filters
            };
        }

        if (this.source && this.id) {
            return {
                _query: {
                    hash: {uid: {eq: `${this.source}${compositeKeySeparator}${this.id}`}}
                },
                _options: {
                    ...options,
                    indexName: "uid-index"
                },
                _filter: filters
            };
        }

        if (this.type) {
            const typeIndiciesRangeKeys = ["datePublished", "geohash"];

            if (typeIndiciesRangeKeys.includes(this.orderBy)) {
                options.indexName = `type-${this.orderBy}-index`;
            }

            if (this.geohashQueries) {
                return this.geohashQueries.map(geohashQuery => {
                    return {
                        _query: {
                            hash: {type: {eq: this.type}},
                            range: {geohash: {begins_with: geohashQuery}}
                        },
                        _options: {
                            ...options,
                            indexName: "type-geohash-index"
                        },
                        _filter: filters
                    };
                });
            }

            if (this.geohash) {
                return {
                    _query: {
                        hash: {type: {eq: this.type}},
                        range: {geohash: {begins_with: this.geohash}}
                    },
                    _options: {
                        ...options,
                        indexName: "type-geohash-index"
                    },
                    _filter: filters
                };
            }

            if (typeIndiciesRangeKeys.includes(this.orderBy) && this.hasOrderingConditions) {
                return {
                    _query: {
                        hash: {type: {eq: this.type}},
                        range: {[this.orderBy]: {[this.orderOperator]: castOrderComparator}}
                    },
                    _options: options
                };
            }

            return {
                _query: {
                    hash: {type: {eq: this.type}}
                },
                _options: {
                    ...options,
                    indexName: "type-datePublished-index"
                },
                _filter: filters
            };
        }

        if (this.status) {
            const statusIndiciesRangeKeys = ["dateCreated", "datePublished", "geohash"];

            if (statusIndiciesRangeKeys.includes(this.orderBy)) {
                options.indexName = `status-${this.orderBy}-index`;
            }

            if (this.geohashQueries) {
                return this.geohashQueries.map(geohashQuery => {
                    return {
                        _query: {
                            hash: {status: {eq: this.status}},
                            range: {geohash: {begins_with: geohashQuery}}
                        },
                        _options: {
                            ...options,
                            indexName: "status-geohash-index"
                        },
                        _filter: filters
                    };
                });
            }

            if (this.geohash) {
                return {
                    _query: {
                        hash: {status: {eq: this.status}},
                        range: {geohash: {begins_with: this.geohash}}
                    },
                    _options: {
                        ...options,
                        indexName: "status-geohash-index"
                    },
                    _filter: filters
                };
            }

            if (statusIndiciesRangeKeys.includes(this.orderBy) && this.hasOrderingConditions) {
                return {
                    _query: {
                        hash: {status: {eq: this.status}},
                        range: {[this.orderBy]: {[this.orderOperator]: castOrderComparator}}
                    },
                    _options: options,
                    _filter: filters
                };
            }

            return {
                _query: {
                    hash: {status: {eq: this.status}}
                },
                _options: options,
                _filter: filters
            };
        }

        return { // NOTE-RT: Just scan the entire table until we know enough of what we'd want to scan (instead of query) for
            _filter: filters,
            _options: options
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

    get geoRadius() {
        if (this.get("geoRadius")) {
            return this.get("geoRadius");
        }

        if ([this.north, this.east, this.south, this.west].every(Number.isFinite)) {
            return getHaversineDistance(this.north, this.east, this.south, this.west) / 2;
        }

        return undefined;
    }

    get geohash() {
        if (this.get("geohash")) {
            return this.get("geohash");
        }

        if ([this.lat, this.long].every(Number.isFinite)) {
            return convertLatLongToGeohash(this.lat, this.long, this.geohashPrecision);
        }

        return undefined;
    }

    get geohashPrecision() {
        const geohashPrecision = this.get("geohashPrecision");

        if (geohashPrecision) {
            return geohashPrecision;
        }

        if (this.get("geohash")) {
            return this.get("geohash").length;
        }

        return undefined;
    }

    get geohashQueries() {
        const geoRadius = this.geoRadius;
        const geohashQuery = this.geohash;
        const geohashQueryPrecision = this.get("geohashPrecision");

        if ([this.north, this.east, this.south, this.west].every(Number.isFinite)) {
            return getGeohashesForBoundingBox(this.north, this.east, this.south, this.west, geohashQueryPrecision);
        }

        if (geoRadius) {
            if ([this.lat, this.long].every(Number.isFinite)) {
                return getGeohashesForRadiusAroundPoint(this.lat, this.long, geoRadius, geohashQueryPrecision);
            } else if (geohashQuery) {
                return getGeohashesForRadiusAroundGeohash(geohashQuery, geoRadius, geohashQueryPrecision);
            }
        }

        return undefined;
    }

    get orderComparator() {
        if (this.hasRelativeOrderComparator) {
            return computeOrderComparatorFromRelativeOrderComparatorAdjustment(this.relativeOrderComparatorAdjustmentOperator, this.relativeOrderComparatorBasis, this.relativeOrderComparatorAdjustment);
        }

        return castOrderComparator(this.get("orderComparator"), this.orderComparatorType);
    }

    get relativeOrderComparatorBasis() {
        return castOrderComparator(this.get("relativeOrderComparatorBasis"), this.relativeOrderComparatorBasisType);
    }

    get relativeOrderComparatorAdjustment() {
        return castOrderComparator(this.get("relativeOrderComparatorAdjustment"), this.relativeOrderComparatorAdjustmentType);
    }

    get hasOrderingConditions() {
        return this.orderBy
            && !_.isUndefined(this.orderOperator)
            && !_.isUndefined(this.orderComparator);
    }

    get hasRelativeOrderComparator() {
        return !_.isUndefined(this.relativeOrderComparatorAdjustmentOperator)
            && !_.isUndefined(this.relativeOrderComparatorAdjustment)
            && !_.isUndefined(this.relativeOrderComparatorBasis);
    }

    computeOrderingComparison(leftSideComparator) {
        return computeOrderingComparison(this.orderOperator, leftSideComparator, this.orderComparator);
    }

    computeOrderingComparisonForEntity(leftSideComparatorEntity) {
        return this.computeOrderingComparison(leftSideComparatorEntity[this.orderBy]);
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

/**
 * Cast an `orderComparator` to the proper JS object as specified by `orderComparatorType`
 * @param orderComparator {*}
 * @param orderComparatorType {string} Defines the intended JS object for `orderComparator`
 * @returns {*}
 */
export const castOrderComparator = (orderComparator, orderComparatorType) => {
    switch (orderComparatorType) {
        case "String":
            return orderComparator && orderComparator.toString();

        case "DateTime": {
            switch (orderComparator) {
                case "now":
                    return DateTime.local();

                default:
                    return orderComparator && DateTime.fromISO(orderComparator);
            }
        }

        case "Duration":
            return orderComparator && Duration.fromISO(orderComparator);

        case "Number":
        default:
            return !Number.isNaN(orderComparator) && Number(orderComparator);
    }
};

/**
 * Compute the comparison of two comparators for a given `orderOperator`
 * @param orderOperator {string} Defines the comparison operation for the comparators
 * @param leftSideComparator {*}
 * @param rightSideComparator {*}
 * @returns {boolean}
 */
export const computeOrderingComparison = (orderOperator, leftSideComparator, rightSideComparator) => {
    switch (orderOperator) {
        case "lt":
            return leftSideComparator < rightSideComparator;

        case "le":
            return leftSideComparator <= rightSideComparator;

        case "eq":
            return leftSideComparator === rightSideComparator;

        case "ge":
            return leftSideComparator >= rightSideComparator;

        case "gt":
            return leftSideComparator > rightSideComparator;
    }
};

/**
 * Compute an `orderComparator` from a `relativeOrderComparatorBasis` and `relativeOrderComparatorAdjustmentOperator`
 * @param relativeOrderComparatorAdjustmentOperator {string} Defines the operation to apply to the `relativeOrderComparatorAdjustment`
 * @param relativeOrderComparatorBasis {*}
 * @param relativeOrderComparatorAdjustment {*}
 * @returns {*}
 */
export const computeOrderComparatorFromRelativeOrderComparatorAdjustment = (relativeOrderComparatorAdjustmentOperator, relativeOrderComparatorBasis, relativeOrderComparatorAdjustment) => {
    switch (relativeOrderComparatorAdjustmentOperator) {
        case "DateTime.minus":
            return relativeOrderComparatorBasis.minus(relativeOrderComparatorAdjustment);

        case "DateTime.plus":
            return relativeOrderComparatorBasis.plus(relativeOrderComparatorAdjustment);
    }
};

export default SearchParams;
