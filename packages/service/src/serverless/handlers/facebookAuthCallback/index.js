import {RequestError} from "@randy.tarampi/js";
import {responseBuilder} from "@randy.tarampi/serverless";
import {AuthInfoSearchParams} from "../../../lib/authInfoSearchParams";
import logger from "../../../lib/logger";
import {FacebookAuthInfo} from "../../../lib/sources/facebook/authInfo";
import configureEnvironment from "../../util/configureEnvironment";
import returnErrorResponse from "../../util/response/returnErrorResponse";

export default (event, context, callback) => {
    logger.debug("%s@%s handling request %s", context.functionName, context.functionVersion, context.awsRequestId, event, context);

    const errorHandler = returnErrorResponse(event, context, callback);
    const facebookAuthInfo = new FacebookAuthInfo();

    configureEnvironment()
        .then(() => {
            if (event.queryStringParameters && event.queryStringParameters.code) {
                return facebookAuthInfo.getRecord(event.queryStringParameters.code, new AuthInfoSearchParams({
                        clientId: process.env.FACEBOOK_API_KEY,
                        clientSecret: process.env.FACEBOOK_API_SECRET,
                        redirectUri: process.env.FACEBOOK_AUTH_CALLBACK_URI,
                        code: event.queryStringParameters.code
                    }))
                    .then(token => {
                        callback(null, responseBuilder(token));
                    });
            } else {
                return errorHandler(new RequestError("Tried to handle Facebook authentication response, but no `code` was received", RequestError.codes.badRequest));
            }
        })
        .catch(errorHandler);
};
