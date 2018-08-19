import {Photo, util} from "@randy.tarampi/js";
import {Record} from "immutable";

/**
 * Turn some generic search parameters into a query parameters for [Posts]{@link Post} for some services
 */
class SearchParams extends Record({
    type: undefined,
    perPage: 100,
    page: 1,
    orderBy: undefined,
    orderOperator: undefined,
    orderCompartor: undefined,
    width: undefined,
    height: undefined,
    crop: undefined,
    id: undefined,
    uid: undefined,
    source: undefined,
    _rawFilter: undefined
}) {
    get Flickr() {
        return {
            page: this.page,
            per_page: this.perPage,
            extras: "url_o, url_k, url_h, url_c, url_z, url_m, url_n, date_upload, date_taken, owner_name, path_alias, description"
        };
    }

    get Unsplash() {
        return {
            page: this.page,
            perPage: this.perPage,
            orderBy: this.orderBy,
            width: this.width,
            height: this.height,
            crop: this.crop
        };
    }

    get Instagram() {
        return {
            page: this.page,
            count: this.perPage
        };
    }

    get Tumblr() {
        let type = "text";

        if (this.type === Photo.name) {
            type = "photo";
        }

        return {
            type,
            id: this.id,
            limit: this.perPage,
            page: this.page,
            offset: this.perPage * (this.page - 1)
        };
    }

    get Dynamoose() {
        const options = {
            descending: true
        };
        const filter = {
            ...this._rawFilter
        };

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

            if (this.orderBy && this.orderOperator && this.orderCompartor) {
                return {
                    _query: {
                        hash: {type: {eq: this.type}},
                        range: {[this.orderBy]: {[this.orderOperator]: this.orderCompartor}}
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
                    _query: {uid: {eq: `${this.source}${util.compositeKeySeparator}${this.id}`}},
                    _options: options
                };
            }

            if (this.orderBy && this.orderOperator && this.orderCompartor) {
                return {
                    _query: {
                        hash: {source: {eq: this.source}},
                        range: {[this.orderBy]: {[this.orderOperator]: this.orderCompartor}}
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
        const params = {
            Bucket: process.env.S3_BUCKET_NAME
        };

        if (this.id) {
            return {
                ...params,
                Key: this.id
            };
        }

        return {
            ...params,
            MaxKeys: this.perPage,
            Marker: String(this.perPage * (this.page - 1)), // FIXME-RT: Replace with `StartAfter`
        };
    }

    static fromJS(json) {
        return new SearchParams({
            ...json,
            perPage: json && json.perPage && parseInt(json.perPage, 10),
            page: json && json.page && parseInt(json.page, 10)
        });
    }
}

export default SearchParams;
