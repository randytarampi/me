import FormData from "form-data";
import fetch from "isomorphic-fetch";

const INSTAGRAM_TOKEN_URL = "https://api.instagram.com/oauth/access_token";

export const getAuthToken = searchParams => {
    const formData = new FormData();
    const oAuthParams = searchParams.OAuth;

    Object.keys(oAuthParams).forEach(key => {
        if (typeof oAuthParams[key] !== "undefined") {
            formData.append(key, oAuthParams[key]);
        }
    });

    return fetch(INSTAGRAM_TOKEN_URL, {
        method: "POST",
        body: formData
    })
        .then(body => body.json());
};
