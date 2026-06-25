const {returnErrorResponseForLogger} = require("@randy.tarampi/serverless");
const logger = require("../../logger.js");

/**
 * @function returnErrorResponse
 * @returns {Function} An actual error handler
 */
module.exports = returnErrorResponseForLogger(logger);
module.exports.default = module.exports;
