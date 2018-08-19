import {Record} from "immutable";
import {Photo, util} from "@randy.tarampi/js";

/**
 * Turn some generic search parameters into a query parameters for [Posts]{@link Post} for some services
 */
class SearchParams extends Record({
    type: null,
    perPage: 100,
    page: 1,
    orderBy: null,
    orderOperator: null,
    orderCompartor: null,
    width: null,
    height: null,
    crop: null,
    id: null,
    uid: null,
    source: null
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
            limit: this.perPage,
            page: this.page,
            offset: this.perPage * (this.page - 1)
        };
    }

    get Dynamoose() {
        if (this.uid) {
            return {
                uid: {eq: this.uid}
            };
        }

        if (this.type) {
            if (this.source) {
                return {
                    hash: {type: {eq: this.type}},
                    range: {source: {eq: this.source}},
                    options: {indexName: "type-source-index"}
                };
            }

            if (this.orderBy && this.orderOperator && this.orderCompartor) {
                return {
                    hash: {type: {eq: this.type}},
                    range: {[this.orderBy]: {[this.orderOperator]: this.orderCompartor}},
                    options: {indexName: `type-${this.orderBy}-index`}
                };
            }

            return {type: {eq: this.type}};
        }

        if (this.source) {
            if (this.id) {
                return {
                    uid: {eq: `${this.source}${util.compositeKeySeparator}${this.id}`}
                };
            }

            if (this.orderBy && this.orderOperator && this.orderCompartor) {
                return {
                    hash: {source: {eq: this.source}},
                    range: {[this.orderBy]: {[this.orderOperator]: this.orderCompartor}},
                    options: {indexName: `source-${this.orderBy}-index`}
                };
            }

            return {source: {eq: this.source}};
        }

        // throw new Error(`Cannot transform search parameters ${JSON.stringify(this)} for ${this.type}`); // FIXME-RT: This should actually throw;
        return {};
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
