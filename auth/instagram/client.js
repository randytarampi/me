import Request from "request-promise-native";

const INSTAGRAM_TOKEN_URL = "https://api.instagram.com/oauth/access_token";

export const getAuthTokenForCode = code => {
    return Request({
        method: "POST",
        uri: INSTAGRAM_TOKEN_URL,
        form: {
            client_id: process.env.INSTAGRAM_API_KEY,
            client_secret: process.env.INSTAGRAM_API_SECRET,
            grant_type: "authorization_code",
            redirect_uri: process.env.INSTAGRAM_AUTH_REDIRECT_URI,
            code
        }
    });
};
