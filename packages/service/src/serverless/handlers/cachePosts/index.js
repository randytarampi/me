const {responseBuilder} = require("@randy.tarampi/serverless");
const cachePosts = require("../../../lib/sources/cachePosts.js").default || require("../../../lib/sources/cachePosts.js");
const logger = require("../../logger.js");
const configureEnvironment = require("../../util/configureEnvironment.js").default || require("../../util/configureEnvironment.js");
const parseQueryStringParametersIntoSearchParams = require("../../util/parseQueryStringParametersIntoSearchParams.js").default || require("../../util/parseQueryStringParametersIntoSearchParams.js");
const parseQuerystringParameters = require("../../util/request/parseQuerystringParameters.js").default || require("../../util/request/parseQuerystringParameters.js");
const returnErrorResponse = require("../../util/response/returnErrorResponse.js").default || require("../../util/response/returnErrorResponse.js");

module.exports = (event, context, callback) => {
    logger.debug("%s@%s handling request %s", context.functionName, context.functionVersion, context.awsRequestId, event, context);

    const {sources: postSources, ...eventParameters} = event.queryStringParameters || event.postsSearchParameters || event;

    configureEnvironment()
        .then(() => {
            return cachePosts(parseQueryStringParametersIntoSearchParams({})(
                parseQuerystringParameters(eventParameters)), postSources
            )
                .then(sortedPosts => callback(null, responseBuilder(sortedPosts)));
        })
        .catch(returnErrorResponse(event, context, callback));
};
module.exports.default = module.exports;
