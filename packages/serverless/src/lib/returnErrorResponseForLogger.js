// @ts-check
import {RequestError} from "@randy.tarampi/js";
import {responseBuilder} from "./responseBuilder.js";

/**
 * @function returnErrorResponseForLogger
 * @param {*} [logger=console] - A logger.
 * @returns {Function} An AWS lambda handler.
 */
export const returnErrorResponseForLogger = (logger = console) =>
    /**
     * @function returnErrorResponse
     * @param {*} event - The AWS lambda event.
     * @param {*} context - The AWS lambda context.
     * @param {Function} callback - The AWS lambda callback.
     * @returns {Function} An actual error handler.
     */
        (event, context, callback) =>
        /**
         * Actually handle the error and send a proper HTTP response
         * @param {*} error - The thrown error.
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
