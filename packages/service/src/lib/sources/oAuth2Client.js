import FormData from "form-data";

class OAuth2Client {
    constructor(tokenUrl) {
        this.tokenUrl = tokenUrl;
    }

    async getAccessToken(searchParams) {
        const formData = new FormData();
        const oAuthParams = searchParams.OAuth2;

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

export default OAuth2Client;

export {OAuth2Client};
