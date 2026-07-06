// @ts-check
import {compositeKeySeparator} from "@randy.tarampi/js";
import {Record} from "immutable";

const AUTH_INFO_TYPE = {
    oAuth: "OAUTH_TOKEN",
    oAuth2: "OAUTH2_TOKEN"
};

/** Auth tokens for a source, with a stable uid getter. */
class AuthInfo extends Record({
    token: null,
    tokenSecret: null,
    id: null,
    source: null,
    type: AUTH_INFO_TYPE.oAuth2,
    raw: null
}) {
    /** @returns {string} The stable record id. */
    get uid() {
        return `${this.source}${compositeKeySeparator}${this.id}`;
    }
}

export default AuthInfo;

export {AUTH_INFO_TYPE, AuthInfo};
