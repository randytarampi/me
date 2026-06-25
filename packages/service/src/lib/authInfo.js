const {compositeKeySeparator} = require("@randy.tarampi/js");
const {Record} = require("immutable");

const AUTH_INFO_TYPE = {
    oAuth: "OAUTH_TOKEN",
    oAuth2: "OAUTH2_TOKEN"
};

class AuthInfo extends Record({
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

module.exports = AuthInfo;
module.exports.AUTH_INFO_TYPE = AUTH_INFO_TYPE;
module.exports.AuthInfo = AuthInfo;
module.exports.default = module.exports;
