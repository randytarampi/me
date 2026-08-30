import {responseBuilder} from "@randy.tarampi/serverless";
import cachePosts from "../../../lib/sources/cachePosts.js";
import logger from "../../logger.js";
import configureEnvironment from "../../util/configureEnvironment.js";
import parseQueryStringParametersIntoSearchParams from "../../util/parseQueryStringParametersIntoSearchParams.js";
import parseQuerystringParameters from "../../util/request/parseQuerystringParameters.js";
import returnErrorResponse from "../../util/response/returnErrorResponse.js";

// NOTE-RT: async, no `callback` parameter - AWS Lambda's Node.js 24 runtime has removed
// callback-based function handlers entirely (`Runtime.CallbackHandlerDeprecated`); the handler
// must `return` a value (or a promise of one) instead.
export default async (event, context) => {
    logger.debug("%s@%s handling request %s", context.functionName, context.functionVersion, context.awsRequestId, event, context);

    const {sources: postSources, ...eventParameters} = event.queryStringParameters || event.postsSearchParameters || event;

    try {
        await configureEnvironment();
        const sortedPosts = await cachePosts(parseQueryStringParametersIntoSearchParams({})(
            parseQuerystringParameters(eventParameters)), postSources
        );

        return responseBuilder(sortedPosts);
    } catch (error) {
        return returnErrorResponse(event, context)(error);
    }
};
