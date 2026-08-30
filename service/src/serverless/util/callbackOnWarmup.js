import logger from "../logger.js";

// NOTE-RT: keeps its old name even though it no longer takes or calls a `callback` - two handlers
// still import it by this path. AWS Lambda's Node.js 24 runtime has removed callback-based function
// handlers entirely (`Runtime.CallbackHandlerDeprecated`), so this just returns the response and the
// handler `return`s it in turn.
const callbackOnWarmup = (event, context) => {
    logger.debug("%s@%s warmed up request %s", context.functionName, context.functionVersion, context.awsRequestId, event, context);
    return "Lambda is warm!";
};

export default callbackOnWarmup;

export {callbackOnWarmup};
