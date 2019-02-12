import {
    httpStatusCodeToRequestErrorCode,
    RequestError,
    supportedHttpStatusCodesForRequestError
} from "@randy.tarampi/js";
import fetch from "isomorphic-fetch";
import queryString from "query-string";

export const type = "facebook";

export const FACEBOOK_API_URL = "https://graph.facebook.com/v3.2";
export const buildFacebookApiEdge = edge => `${FACEBOOK_API_URL}/${edge}`;
export const buildFacebookApiUrl = (edge, accessToken, queryParameters) => `${buildFacebookApiEdge(edge)}?${
    queryString.stringify({
        access_token: accessToken,
        ...queryParameters
    })}`;
export const fetchFacebookEdge = (edge, accessToken, queryParameters, options) => fetch(
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
