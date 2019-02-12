import {returnErrorResponseForLogger} from "@randy.tarampi/serverless";
import logger from "../../../lib/logger";

/**
 * @function returnErrorResponse
 * @returns {Function} An actual error handler
 */
export default returnErrorResponseForLogger(logger);
