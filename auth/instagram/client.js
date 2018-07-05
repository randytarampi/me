import FormData from "form-data";
import fetch from "isomorphic-fetch";

const INSTAGRAM_TOKEN_URL = "https://api.instagram.com/oauth/access_token";

export const getAuthTokenForCode = code => {
    const formData = new FormData();
    formData.append("client_id", process.env.INSTAGRAM_API_KEY);
    formData.append("client_secret", process.env.INSTAGRAM_API_SECRET);
    formData.append("grant_type", "authorization_code");
    formData.append("redirect_uri", process.env.INSTAGRAM_AUTH_REDIRECT_URI);
    formData.append("code", code);

    return fetch(INSTAGRAM_TOKEN_URL, {
        method: "POST",
        body: formData
    })
        .then(body => body.json());
};
