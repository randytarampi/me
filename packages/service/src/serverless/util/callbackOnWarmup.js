const logger = require("../logger.js");

const callbackOnWarmup = (event, context, callback) => {
    logger.debug("%s@%s warmed up request %s", context.functionName, context.functionVersion, context.awsRequestId, event, context);
    return callback(null, "Lambda is warm!");
};

module.exports = callbackOnWarmup;
module.exports.callbackOnWarmup = callbackOnWarmup;
module.exports.default = module.exports;
