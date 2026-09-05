import logger from "../../logger.js";
import configureEnvironment from "../../util/configureEnvironment.js";
import getPostsForParsedQuerystringParameters from "../../util/getPostsForParsedQuerystringParameters.js";
import parseHeaders from "../../util/request/parseHeaders.js";
import parseQuerystringParameters from "../../util/request/parseQuerystringParameters.js";
import buildPostsResponse from "../../util/response/buildPostsResponse.js";
import returnErrorResponse from "../../util/response/returnErrorResponse.js";

// NOTE-RT: async, no `callback` parameter - AWS Lambda's Node.js 24 runtime has removed
// callback-based function handlers entirely (`Runtime.CallbackHandlerDeprecated`); the handler
// must `return` a value (or a promise of one) instead.
export default async (event, context) => {
    logger.debug("%s@%s handling request %s", context.functionName, context.functionVersion, context.awsRequestId, event, context);

    const errorHandler = returnErrorResponse(event, context);
    let parsedHeaders;
    let parsedQuerystringParameters;

    try {
        parsedHeaders = parseHeaders(event.headers);
        parsedQuerystringParameters = parseQuerystringParameters(event.queryStringParameters);
    } catch (error) {
        return errorHandler(error);
    }

    try {
        await configureEnvironment();
        const postsResult = await getPostsForParsedQuerystringParameters(parsedQuerystringParameters, parsedHeaders);
        return buildPostsResponse(postsResult, parsedHeaders);
    } catch (error) {
        return errorHandler(error);
    }
};
