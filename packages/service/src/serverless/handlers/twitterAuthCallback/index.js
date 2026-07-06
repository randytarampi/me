import {RequestError} from "@randy.tarampi/js";
import {responseBuilder} from "@randy.tarampi/serverless";
import {AuthInfoSearchParams} from "../../../lib/authInfoSearchParams.js";
import {TwitterAuthInfo} from "../../../lib/sources/twitter/authInfo.js";
import logger from "../../logger.js";
import configureEnvironment from "../../util/configureEnvironment.js";
import returnErrorResponse from "../../util/response/returnErrorResponse.js";

export default (event, context, callback) => {
    logger.debug("%s@%s handling request %s", context.functionName, context.functionVersion, context.awsRequestId, event, context);

    const errorHandler = returnErrorResponse(event, context, callback);
    const twitterAuthInfo = new TwitterAuthInfo();

    configureEnvironment()
        .then(() => {
            if (event.queryStringParameters && event.queryStringParameters.oauth_verifier) {
                return twitterAuthInfo.getRecord(event.queryStringParameters.oauth_token, new AuthInfoSearchParams({
                        clientId: process.env.TWITTER_API_KEY,
                        clientSecret: process.env.TWITTER_API_SECRET,
                        requestToken: event.queryStringParameters.oauth_token,
                        requestTokenSecret: event.queryStringParameters.oauth_token_secret,
                        requestTokenVerifier: event.queryStringParameters.oauth_verifier
                    }))
                    .then(authTokenResponse => {
                        callback(null, responseBuilder(authTokenResponse));
                    });
            } else {
                return errorHandler(new RequestError("Tried to handle Twitter authentication response, but no `oauth_verifier` was received", RequestError.codes.badRequest));
            }
        })
        .catch(errorHandler);
};
