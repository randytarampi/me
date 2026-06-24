import logger from "../../logger.js";
import callbackOnWarmup from "../../util/callbackOnWarmup.js";
import configureEnvironment from "../../util/configureEnvironment.js";
import getPostsForParsedQuerystringParameters from "../../util/getPostsForParsedQuerystringParameters.js";
import parseHeaders from "../../util/request/parseHeaders.js";
import parseQuerystringParameters from "../../util/request/parseQuerystringParameters.js";
import buildPostsResponse from "../../util/response/buildPostsResponse.js";
import returnErrorResponse from "../../util/response/returnErrorResponse.js";

export default (event, context, callback) => {
    logger.debug("%s@%s handling request %s", context.functionName, context.functionVersion, context.awsRequestId, event, context);

    if (event.source === "serverless-plugin-warmup") {
        return callbackOnWarmup(event, context, callback);
    }

    const errorHandler = returnErrorResponse(event, context, callback);
    let parsedHeaders;
    let parsedQuerystringParameters;

    try {
        parsedHeaders = parseHeaders(event.headers);
        parsedQuerystringParameters = parseQuerystringParameters(event.queryStringParameters);
    } catch (error) {
        return errorHandler(error);
    }

    configureEnvironment()
        .then(() => getPostsForParsedQuerystringParameters(parsedQuerystringParameters, parsedHeaders))
        .then(postsResult => callback(null, buildPostsResponse(postsResult, parsedHeaders)))
        .catch(errorHandler);
};
