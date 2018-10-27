import logger from "../../lib/logger";

export const callbackOnWarmup = (event, context, callback) => {
    logger.info("Returning early for %s event", event.source);
    return callback(null, "Lambda is warm!");
};

export default callbackOnWarmup;
