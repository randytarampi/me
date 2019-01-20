import * as AuthInfoModel from "../../../db/models/authInfo";
import {AUTH_INFO_TYPE, AuthInfo} from "../../authInfo";
import CacheClient from "../../cacheClient";
import CachedDataSource from "../../cachedDataSource";
import * as InstagramOAuthClient from "./client";
import {type} from "./util";

export class InstagramAuthInfo extends CachedDataSource {
    constructor(dataClient, cacheClient) {
        super(
            dataClient || InstagramOAuthClient,
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

    recordGetter(id, searchParams) {
        if (!searchParams || !searchParams.code) {
            return Promise.resolve(null); // NOTE-RT: Need a `code` to request a token per the OAuth2 spec
        }

        return this.client.getAuthToken(searchParams)
            .then(tokenJson => tokenJson && this.constructor.instanceToRecord(tokenJson));
    }
}

export default InstagramAuthInfo;
