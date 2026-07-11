import {responseBuilder} from "@randy.tarampi/serverless";
import cachePosts from "../../../lib/sources/cachePosts.js";
import logger from "../../logger.js";
import configureEnvironment from "../../util/configureEnvironment.js";
import parseQueryStringParametersIntoSearchParams from "../../util/parseQueryStringParametersIntoSearchParams.js";
import parseQuerystringParameters from "../../util/request/parseQuerystringParameters.js";
import returnErrorResponse from "../../util/response/returnErrorResponse.js";

export default (event, context, callback) => {
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
