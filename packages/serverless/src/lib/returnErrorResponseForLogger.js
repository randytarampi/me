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
     * @returns {Function} An actual error handler.
     */
        (event, context) =>
        /**
         * Actually handle the error and either return a proper HTTP response, or rethrow so the
         * lambda invocation itself is marked as failed.
         *
         * NOTE-RT: no `callback` parameter/invocation here anymore - AWS Lambda's Node.js 24
         * runtime has removed callback-based function handlers entirely
         * (`Runtime.CallbackHandlerDeprecated`), so handlers (and anything they delegate error
         * handling to) must `return`/`throw` instead. Re-throwing for unexpected errors reproduces
         * the old `callback(error, ...)` behaviour, where the second argument was ignored and the
         * invocation was reported as failed.
         * @param {*} error - The thrown error.
         * @returns {*} A response object for a `RequestError`.
         */
            error => {
            logger.debug("%s@%s handling error on request %s", context.functionName, context.functionVersion, context.awsRequestId, event, context);

            if (error instanceof RequestError) {
                logger.warn(error, `Returning ${error.statusCode} error response`);
                return responseBuilder({
                    error: {
                        message: error.message,
                        code: error.code
                    }
                }, error.statusCode);
            }

            logger.error(error, "Returning 500 error response");

            throw error;
        };
