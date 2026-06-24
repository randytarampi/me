import {fetchFacebookEdge} from "./util.js";

export class FacebookApiClient {
    constructor(accessToken) {
        this.accessToken = accessToken;
        this.fetch = this.fetch.bind(this);
    }

    fetch(edge, queryParameters, options) {
        return fetchFacebookEdge(edge, this.accessToken, queryParameters, options);
    }

    get(edge, queryParameters, options) {
        return this.fetch(edge, queryParameters, options);
    }
}

export default FacebookApiClient;
