import {getAuthTokenForCode} from "../../../sources/instagram/client";
import configureEnvironment from "../../util/configureEnvironment";
import RequestError, {codes} from "../../util/request/requestError";
import responseBuilder from "../../util/response/responseBuilder";
import returnErrorResponse from "../../util/response/returnErrorResponse";

export default (event, context, callback) => {
    const errorHandler = returnErrorResponse(callback);

    configureEnvironment()
        .then(() => {
            if (event.queryStringParameters && event.queryStringParameters.code) {
                return getAuthTokenForCode(event.queryStringParameters.code)
                    .then(token => {
                        callback(null, responseBuilder(token));
                    });
            } else {
                return errorHandler(new RequestError("Tried to handle Instagram authentication response, but no `code` was received", codes.badRequest));
            }
        })
        .catch(errorHandler);
};
