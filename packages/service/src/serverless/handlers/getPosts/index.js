const logger = require("../../logger.js");
const callbackOnWarmup = require("../../util/callbackOnWarmup.js").default || require("../../util/callbackOnWarmup.js");
const configureEnvironment = require("../../util/configureEnvironment.js").default || require("../../util/configureEnvironment.js");
const getPostsForParsedQuerystringParameters = require("../../util/getPostsForParsedQuerystringParameters.js").default || require("../../util/getPostsForParsedQuerystringParameters.js");
const parseHeaders = require("../../util/request/parseHeaders.js").default || require("../../util/request/parseHeaders.js");
const parseQuerystringParameters = require("../../util/request/parseQuerystringParameters.js").default || require("../../util/request/parseQuerystringParameters.js");
const buildPostsResponse = require("../../util/response/buildPostsResponse.js").default || require("../../util/response/buildPostsResponse.js");
const returnErrorResponse = require("../../util/response/returnErrorResponse.js").default || require("../../util/response/returnErrorResponse.js");

module.exports = (event, context, callback) => {
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
module.exports.default = module.exports;
