const {responseBuilder} = require("@randy.tarampi/serverless");
const {AuthInfoSearchParams} = require("../../../lib/authInfoSearchParams.js");
const {TwitterAuthInfo} = require("../../../lib/sources/twitter/authInfo.js");
const logger = require("../../logger.js");
const configureEnvironment = require("../../util/configureEnvironment.js").default || require("../../util/configureEnvironment.js");
const returnErrorResponse = require("../../util/response/returnErrorResponse.js").default || require("../../util/response/returnErrorResponse.js");

module.exports = (event, context, callback) => {
    logger.debug("%s@%s handling request %s", context.functionName, context.functionVersion, context.awsRequestId, event, context);

    configureEnvironment()
        .then(() => {
            const twitterAuthInfo = new TwitterAuthInfo();

            return twitterAuthInfo.client.getRequestToken(new AuthInfoSearchParams({
                    clientId: process.env.TWITTER_API_KEY,
                    clientSecret: process.env.TWITTER_API_SECRET,
                    redirectUri: process.env.TWITTER_AUTH_CALLBACK_URI
                }))
                .then(requestTokenResponse => {
                    callback(null, responseBuilder(null, 302, {
                        Location: `https://api.twitter.com/oauth/authorize?oauth_token=${requestTokenResponse.token}`
                    }));
                });
        })
        .catch(returnErrorResponse(event, context, callback));
};
module.exports.default = module.exports;
