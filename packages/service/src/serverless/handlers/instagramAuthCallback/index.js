import {RequestError} from "@randy.tarampi/js";
import {responseBuilder} from "@randy.tarampi/serverless";
import {AuthInfoSearchParams} from "../../../lib/authInfoSearchParams.js";
import {InstagramAuthInfo} from "../../../lib/sources/instagram/authInfo.js";
import logger from "../../logger.js";
import configureEnvironment from "../../util/configureEnvironment.js";
import returnErrorResponse from "../../util/response/returnErrorResponse.js";

export default (event, context, callback) => {
    logger.debug("%s@%s handling request %s", context.functionName, context.functionVersion, context.awsRequestId, event, context);

    const errorHandler = returnErrorResponse(event, context, callback);
    const instagramAuthInfo = new InstagramAuthInfo();

    configureEnvironment()
        .then(() => {
            if (event.queryStringParameters && event.queryStringParameters.code) {
                return instagramAuthInfo.getRecord(event.queryStringParameters.code, new AuthInfoSearchParams({
                        clientId: process.env.INSTAGRAM_API_KEY,
                        clientSecret: process.env.INSTAGRAM_API_SECRET,
                        redirectUri: process.env.INSTAGRAM_AUTH_CALLBACK_URI,
                        code: event.queryStringParameters.code
                    }))
                    .then(token => {
                        callback(null, responseBuilder(token));
                    });
            } else {
                return errorHandler(new RequestError("Tried to handle Instagram authentication response, but no `code` was received", RequestError.codes.badRequest));
            }
        })
        .catch(errorHandler);
};
