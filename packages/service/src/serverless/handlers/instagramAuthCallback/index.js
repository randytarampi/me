import {RequestError} from "@randy.tarampi/js";
import {AuthInfoSearchParams} from "../../../lib/authInfoSearchParams";
import logger from "../../../lib/logger";
import {InstagramAuthInfo} from "../../../lib/sources/instagram/authInfo";
import configureEnvironment from "../../util/configureEnvironment";
import responseBuilder from "../../util/response/responseBuilder";
import returnErrorResponse from "../../util/response/returnErrorResponse";

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
