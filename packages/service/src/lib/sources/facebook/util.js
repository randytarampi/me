const {httpStatusCodeToRequestErrorCode, RequestError, supportedHttpStatusCodesForRequestError} = require("@randy.tarampi/js");
const queryString = require("query-string").default || require("query-string");

const type = "facebook";

const FACEBOOK_API_URL = "https://graph.facebook.com/v3.2";
const buildFacebookApiEdge = edge => `${FACEBOOK_API_URL}/${edge}`;
const buildFacebookApiUrl = (edge, accessToken, queryParameters) => `${buildFacebookApiEdge(edge)}?${
    queryString.stringify({
        access_token: accessToken,
        ...queryParameters
    })}`;
const fetchFacebookEdge = (edge, accessToken, queryParameters, options) => fetch(
    buildFacebookApiUrl(edge, accessToken, queryParameters),
    {
        ...options,
        headers: {
            Accept: "application/json",
            "Accept-Charset": "utf-8"
        }
    })
    .then(response => {
        const body = response.json();

        if (supportedHttpStatusCodesForRequestError.includes(response.status)) {
            return body.then(body => {
                throw new RequestError(body.error.message, response.status, httpStatusCodeToRequestErrorCode[response.status]);
            });
        }

        return body;
    });
module.exports.type = type;
module.exports.FACEBOOK_API_URL = FACEBOOK_API_URL;
module.exports.buildFacebookApiEdge = buildFacebookApiEdge;
module.exports.buildFacebookApiUrl = buildFacebookApiUrl;
module.exports.fetchFacebookEdge = fetchFacebookEdge;
module.exports.default = module.exports;
