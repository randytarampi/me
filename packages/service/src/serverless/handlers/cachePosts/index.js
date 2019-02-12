import {responseBuilder} from "@randy.tarampi/serverless";
import cachePosts from "../../../lib/sources/cachePosts";
import logger from "../../logger";
import configureEnvironment from "../../util/configureEnvironment";
import parseQueryStringParametersIntoSearchParams from "../../util/parseQueryStringParametersIntoSearchParams";
import parseQuerystringParameters from "../../util/request/parseQuerystringParameters";
import returnErrorResponse from "../../util/response/returnErrorResponse";

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
