import {compositeKeySeparator} from "@randy.tarampi/js";
import {Record} from "immutable";

export const AUTH_INFO_TYPE = {
    oAuth: "OAUTH_TOKEN",
    oAuth2: "OAUTH2_TOKEN"
};

export class AuthInfo extends Record({
    token: null,
    tokenSecret: null,
    id: null,
    source: null,
    type: AUTH_INFO_TYPE.oAuth2,
    raw: null
}) {
    get uid() {
        return `${this.source}${compositeKeySeparator}${this.id}`;
    }
}

export default AuthInfo;
