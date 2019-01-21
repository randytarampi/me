import AuthInfoModel from "../../../db/models/authInfo";
import {AUTH_INFO_TYPE, AuthInfo} from "../../authInfo";
import CacheClient from "../../cacheClient";
import CachedDataSource from "../../cachedDataSource";
import {OAuthClient} from "../oAuthClient";
import {type} from "./util";

export const INSTAGRAM_TOKEN_URL = "https://api.instagram.com/oauth/access_token";

export class InstagramAuthInfo extends CachedDataSource {
    constructor(dataClient, cacheClient) {
        super(
            dataClient || new OAuthClient(INSTAGRAM_TOKEN_URL),
            cacheClient || new CacheClient(undefined, AuthInfoModel)
        );
    }

    static get type() {
        return type;
    }

    static instanceToRecord(tokenJson) {
        const {access_token, user, ...restOfTokenJson} = tokenJson;

        return new AuthInfo({
            ...restOfTokenJson,
            type: AUTH_INFO_TYPE.oauth,
            token: access_token,
            source: InstagramAuthInfo.type,
            id: user.id,
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

        return this.client.getAuthToken(searchParams)
            .then(tokenJson => tokenJson && this.constructor.instanceToRecord(tokenJson));
    }
}

export default InstagramAuthInfo;
