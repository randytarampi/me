import {compositeKeySeparator} from "@randy.tarampi/js";
import {Record} from "immutable";

export const AUTH_INFO_TYPE = {
    oauth: "OAUTH_TOKEN"
};

export class AuthInfo extends Record({
    token: null,
    id: null,
    source: null,
    type: AUTH_INFO_TYPE.oauth,
    raw: null
}) {
    get uid() {
        return `${this.source}${compositeKeySeparator}${this.id}`;
    }
}

export default AuthInfo;
