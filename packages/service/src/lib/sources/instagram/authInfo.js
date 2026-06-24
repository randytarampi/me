import AuthInfoModel from "../../../db/models/authInfo.js";
import {AUTH_INFO_TYPE, AuthInfo} from "../../authInfo.js";
import CacheClient from "../../cacheClient.js";
import CachedDataSource from "../../cachedDataSource.js";
import {OAuth2Client} from "../oAuth2Client.js";
import {baseUrl} from "./service.js";
import {type} from "./util.js";

export const INSTAGRAM_TOKEN_URL = `${baseUrl}/oauth/authorize`;

export class InstagramAuthInfo extends CachedDataSource {
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

export default InstagramAuthInfo;
