const {fetchFacebookEdge} = require("./util.js");

class FacebookApiClient {
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

module.exports = FacebookApiClient;
module.exports.FacebookApiClient = FacebookApiClient;
module.exports.default = module.exports;
