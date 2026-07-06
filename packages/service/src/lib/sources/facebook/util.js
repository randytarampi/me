import {httpStatusCodeToRequestErrorCode, RequestError, supportedHttpStatusCodesForRequestError} from "@randy.tarampi/js";
import queryString from "query-string";

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
export {type, FACEBOOK_API_URL, buildFacebookApiEdge, buildFacebookApiUrl, fetchFacebookEdge};

export default {type, FACEBOOK_API_URL, buildFacebookApiEdge, buildFacebookApiUrl, fetchFacebookEdge};
