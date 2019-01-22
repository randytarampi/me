import {compositeKeySeparator} from "@randy.tarampi/js";
import {Record} from "immutable";

/**
 * @typedef {Object} searchParamsRecordDefinition
 * @property orderBy {String} One of `ascending` or `descending`.
 */
const searchParamsRecordDefinition = {
    // NOTE-RT: For OAuth services
    clientId: undefined,
    redirectUri: undefined,
    requestToken: undefined,
    requestTokenSecret: undefined,
    requestTokenVerifier: undefined,
    accessToken: undefined,
    accessTokenSecret: undefined,

    // NOTE-RT: For OAuth2 services
    code: undefined,
    clientSecret: undefined,
    grantType: "authorization_code",
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
            access_token_key: this.accessToken,
            access_token_secret: this.accessTokenSecret,
            oauth_token: this.requestToken,
            oauth_token_secret: this.requestTokenSecret,
            oauth_verifier: this.requestTokenVerifier,
            oauth_consumer_key: this.clientId,
            oauth_consumer_secret: this.clientSecret,
            oauth_callback: this.redirectUri
        };
    }

    get OAuth2() {
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
