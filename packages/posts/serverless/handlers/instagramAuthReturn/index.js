import {getAuthTokenForCode} from "../../../auth/instagram/client";
import configureEnvironment from "../../util/configureEnvironment";
import responseBuilder from "../../util/response/responseBuilder";
import returnErrorResponse from "../../util/response/returnErrorResponse";

export default (event, context, callback) => {
    const errorHandler = returnErrorResponse(callback);

    configureEnvironment()
        .then(() => {
            if (event.queryStringParameters.code) {
                return getAuthTokenForCode(event.queryStringParameters.code)
                    .then(token => {
                        callback(null, responseBuilder(token));
                    });
            } else {
                return errorHandler(new Error("Tried to handle Instagram authentication response, but no `code` was received"));
            }
        })
        .catch(errorHandler);
};
