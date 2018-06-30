import {getAuthTokenForCode} from "../../auth/instagram/client";
import loadServerlessSecrets from "../util/loadServerlessSecrets";
import responseBuilder from "../util/responseBuilder";
import returnErrorResponse from "../util/returnErrorResponse";

export default (event, context, callback) => {
    const errorHandler = returnErrorResponse(callback);

    loadServerlessSecrets()
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
