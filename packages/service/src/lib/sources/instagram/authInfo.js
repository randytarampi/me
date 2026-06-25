const AuthInfoModel = require("../../../db/models/authInfo.js");
const {AUTH_INFO_TYPE, AuthInfo} = require("../../authInfo.js");
const CacheClient = require("../../cacheClient.js");
const CachedDataSource = require("../../cachedDataSource.js");
const {OAuth2Client} = require("../oAuth2Client.js");
const {baseUrl} = require("./service.js");
const {type} = require("./util.js");

const INSTAGRAM_TOKEN_URL = `${baseUrl}/oauth/authorize`;

class InstagramAuthInfo extends CachedDataSource {
    constructor(dataClient, cacheClient) {
        super(
            dataClient || new OAuth2Client(INSTAGRAM_TOKEN_URL),
            cacheClient || new CacheClient(undefined, AuthInfoModel)
        );
    }

    static get type() {
        return type;
    }

    static instanceToRecord(tokenJson) {
        const {access_token, user_id, ...restOfTokenJson} = tokenJson;

        return new AuthInfo({
            ...restOfTokenJson,
            type: AUTH_INFO_TYPE.oAuth2,
            token: access_token,
            source: InstagramAuthInfo.type,
            id: user_id,
            raw: tokenJson
        });
    }

    recordsGetter() {
        return Promise.resolve([]);
    }

    recordGetter(id, searchParams) {
        if (!searchParams || !searchParams.code) {
            return Promise.resolve(null); // NOTE-RT: Need a `code` to request a token per the OAuth2 spec
        }

        return this.client.getAccessToken(searchParams)
            .then(tokenJson => tokenJson && this.constructor.instanceToRecord(tokenJson));
    }
}

module.exports = InstagramAuthInfo;
module.exports.INSTAGRAM_TOKEN_URL = INSTAGRAM_TOKEN_URL;
module.exports.InstagramAuthInfo = InstagramAuthInfo;
module.exports.default = module.exports;
