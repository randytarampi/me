import {OAuth} from "oauth";

export class OAuthClient {
    constructor(requestUrl, tokenUrl) {
        this.requestUrl = requestUrl;
        this.tokenUrl = tokenUrl;
    }

    getOAuth(searchParams) {
        return new OAuth(
            this.requestUrl,
            this.tokenUrl,
            searchParams.clientId,
            searchParams.clientSecret,
            "1.0a",
            searchParams.redirectUri,
            "HMAC-SHA1"
        );
    }

    async getRequestToken(searchParams) {
        return new Promise((resolve, reject) => {
            try {
                this.getOAuth(searchParams).getOAuthRequestToken((error, token, tokenSecret, body) => {
                    if (error) {
                        return reject(error);
                    }

                    resolve({
                        token,
                        tokenSecret,
                        ...body
                    });
                });
            } catch (error) {
                reject(error);
            }
        });
    }

    async getAccessToken(searchParams) {
        return new Promise((resolve, reject) => {
            try {
                this.getOAuth(searchParams).getOAuthAccessToken(
                    searchParams.requestToken,
                    searchParams.requestTokenSecret,
                    searchParams.requestTokenVerifier,
                    (error, token, tokenSecret, body) => {
                        if (error) {
                            return reject(error);
                        }

                        resolve({
                            token,
                            tokenSecret,
                            ...body
                        });
                    }
                );
            } catch (error) {
                reject(error);
            }
        });
    }
}

export default OAuthClient;
