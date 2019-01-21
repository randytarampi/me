import {compositeKeySeparator} from "@randy.tarampi/js";
import {Record} from "immutable";

/**
 * @typedef {Object} searchParamsRecordDefinition
 * @property orderBy {String} One of `ascending` or `descending`.
 */
const searchParamsRecordDefinition = {
    // NOTE-RT: For OAuth services
    code: undefined,
    clientId: undefined,
    clientSecret: undefined,
    grantType: "authorization_code",
    redirectUri: undefined,
    state: undefined,

    // NOTE-RT: For dynamoose
    source: undefined,
    id: undefined,
    uid: undefined,
    type: undefined,
    orderBy: "descending",
    all: false,
    beforeId: null,
    afterId: null,
    continuationToken: null
};
const AuthInfoSearchParamsRecord = Record(searchParamsRecordDefinition);

/**
 * Turn some generic search parameters into a query parameters for [AuthInfo]{@link AuthInfo} for some services
 * @extends AuthInfoSearchParamsRecord
 */
export class AuthInfoSearchParams extends AuthInfoSearchParamsRecord {
    get OAuth() {
        return {
            code: this.code,
            client_id: this.clientId,
            client_secret: this.clientSecret,
            grant_type: this.grantType,
            redirect_uri: this.redirectUri,
            state: this.state
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
        }

        const filters = {};

        if (this.type) {
            filters.type = this.type;
        }

        if (this.source) {
            filters.source = this.source;
        }

        if (this.id) {
            filters.id = this.id;
        }

        if (this.uid) {
            const [source, id] = this.uid.split(compositeKeySeparator);
            return {
                _query: {
                    hash: {source: {eq: source}},
                    range: {id: {eq: id}}
                },
                _options: options,
                _filter: filters
            };
        }

        if (this.source && this.id) {
            return {
                _query: {
                    hash: {source: {eq: this.source}},
                    range: {id: {eq: this.id}}
                },
                _options: options,
                _filter: filters
            };
        }

        if (this.source) {
            return {
                _query: {
                    hash: {source: {eq: this.source}}
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
}

export default AuthInfoSearchParams;
