const AuthInfoModel = require("../../../db/models/authInfo.js");
const {AUTH_INFO_TYPE, AuthInfo} = require("../../authInfo.js");
const CacheClient = require("../../cacheClient.js");
const CachedDataSource = require("../../cachedDataSource.js");
const {OAuthClient} = require("../oAuthClient.js");
const {type} = require("./util.js");

const TWITTER_REQUEST_TOKEN_URL = "https://api.twitter.com/oauth/request_token";
const TWITTER_ACCESS_TOKEN_URL = "https://api.twitter.com/oauth/access_token";

class TwitterAuthInfo extends CachedDataSource {
    constructor(dataClient, cacheClient) {
        super(
            dataClient || new OAuthClient(TWITTER_REQUEST_TOKEN_URL, TWITTER_ACCESS_TOKEN_URL),
            cacheClient || new CacheClient(undefined, AuthInfoModel)
        );
    }

    static get type() {
        return type;
    }

    static instanceToRecord(tokenJsonResponse) {
        const {token, tokenSecret, user_id: id, ...restOfTokenJson} = tokenJsonResponse;

        return new AuthInfo({
            ...restOfTokenJson,
            type: AUTH_INFO_TYPE.oAuth,
            token,
            tokenSecret,
            source: TwitterAuthInfo.type,
            id,
            raw: tokenJsonResponse
        });
    }

    recordsGetter() {
        return Promise.resolve([]);
    }

    recordGetter(id, searchParams) {
        if (!searchParams || !searchParams.requestTokenVerifier) {
            return Promise.resolve(null); // NOTE-RT: Need a `requestTokenVerifier` to request a token per the OAuth spec
        }

        return this.client.getAccessToken(searchParams)
            .then(tokenJson => tokenJson && this.constructor.instanceToRecord(tokenJson));
    }
}

module.exports = TwitterAuthInfo;
module.exports.TWITTER_REQUEST_TOKEN_URL = TWITTER_REQUEST_TOKEN_URL;
module.exports.TWITTER_ACCESS_TOKEN_URL = TWITTER_ACCESS_TOKEN_URL;
module.exports.TwitterAuthInfo = TwitterAuthInfo;
module.exports.default = module.exports;
