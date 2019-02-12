import {returnErrorResponseForLogger} from "@randy.tarampi/serverless";
import logger from "../../logger";

/**
 * @function returnErrorResponse
 * @returns {Function} An actual error handler
 */
export default returnErrorResponseForLogger(logger);
