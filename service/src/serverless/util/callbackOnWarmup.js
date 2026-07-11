import logger from "../logger.js";

const callbackOnWarmup = (event, context, callback) => {
    logger.debug("%s@%s warmed up request %s", context.functionName, context.functionVersion, context.awsRequestId, event, context);
    return callback(null, "Lambda is warm!");
};

export default callbackOnWarmup;

export {callbackOnWarmup};
