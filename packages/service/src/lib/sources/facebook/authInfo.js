import AuthInfoModel from "../../../db/models/authInfo";
import {AUTH_INFO_TYPE, AuthInfo} from "../../authInfo";
import CacheClient from "../../cacheClient";
import CachedDataSource from "../../cachedDataSource";
import {OAuth2Client} from "../oAuth2Client";
import {buildFacebookApiEdge, fetchFacebookEdge, type} from "./util";

export const FACEBOOK_TOKEN_URL = buildFacebookApiEdge("oauth/access_token");

export class FacebookAuthInfo extends CachedDataSource {
    constructor(dataClient, cacheClient) {
        super(
            dataClient || new OAuth2Client(FACEBOOK_TOKEN_URL),
            cacheClient || new CacheClient(undefined, AuthInfoModel)
        );
    }

    static get type() {
        return type;
    }

    static instanceToRecord(combinedResponse) {
        const {tokenJson, userJson} = combinedResponse;
        const {access_token, ...restOfTokenJson} = tokenJson;

        return new AuthInfo({
            ...restOfTokenJson,
            type: AUTH_INFO_TYPE.oAuth2,
            token: access_token,
            source: FacebookAuthInfo.type,
            id: userJson.id,
            raw: combinedResponse
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
            .then(tokenJson => {
                if (tokenJson && tokenJson.access_token) {
                    return fetchFacebookEdge("me", tokenJson.access_token)
                        .then(userJson => this.constructor.instanceToRecord({
                            userJson,
                            tokenJson
                        }));
                }

                throw new Error(`Failed to get access token with error: ${tokenJson}`);
            });
    }
}

export default FacebookAuthInfo;
