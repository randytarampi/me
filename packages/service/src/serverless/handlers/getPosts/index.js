import logger from "../../logger";
import callbackOnWarmup from "../../util/callbackOnWarmup";
import configureEnvironment from "../../util/configureEnvironment";
import getPostsForParsedQuerystringParameters from "../../util/getPostsForParsedQuerystringParameters";
import parseHeaders from "../../util/request/parseHeaders";
import parseQuerystringParameters from "../../util/request/parseQuerystringParameters";
import buildPostsResponse from "../../util/response/buildPostsResponse";
import returnErrorResponse from "../../util/response/returnErrorResponse";

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
