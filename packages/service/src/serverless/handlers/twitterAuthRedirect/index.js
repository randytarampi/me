import {responseBuilder} from "@randy.tarampi/serverless";
import {AuthInfoSearchParams} from "../../../lib/authInfoSearchParams.js";
import {TwitterAuthInfo} from "../../../lib/sources/twitter/authInfo.js";
import logger from "../../logger.js";
import configureEnvironment from "../../util/configureEnvironment.js";
import returnErrorResponse from "../../util/response/returnErrorResponse.js";

export default (event, context, callback) => {
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
