import logger from "../../../lib/logger";
import RequestError from "../request/requestError";
import responseBuilder from "./responseBuilder";

/**
 * @function returnErrorResponse
 * @param event {Object} The AWS lambda event
 * @param context {Object} The AWS lambda context
 * @param callback {Function} The AWS lambda callback
 * @returns {Function} An actual error handler
 */
export default (event, context, callback) =>
    /**
     * Actually handle the error and send a proper HTTP response
     * @param error
     */
        error => {
        logger.debug("%s@%s handling error on request %s", context.functionName, context.functionVersion, context.awsRequestId, event, context);

        if (error instanceof RequestError) {
            logger.warn(error, `Returning ${error.statusCode} error response`);
            callback(null, responseBuilder({
                error: {
                    message: error.message,
                    code: error.code
                }
            }, error.statusCode));
        } else {
            logger.error(error, "Returning 500 error response");

            callback(error, responseBuilder({
                error: "An unexpected error occurred"
            }, 500));
        }
    };
