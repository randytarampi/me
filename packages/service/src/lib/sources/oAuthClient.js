import FormData from "form-data";
import fetch from "isomorphic-fetch";

export class OAuthClient {
    constructor(tokenUrl) {
        this.tokenUrl = tokenUrl;
    }

    async getAuthToken(searchParams) {
        const formData = new FormData();
        const oAuthParams = searchParams.OAuth;

        Object.keys(oAuthParams).forEach(key => {
            if (typeof oAuthParams[key] !== "undefined") {
                formData.append(key, oAuthParams[key]);
            }
        });

        return fetch(this.tokenUrl, {
            method: "POST",
            body: formData
        })
            .then(body => body.json());
    }
}

export default OAuthClient;
