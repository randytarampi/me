import cachePosts from "../../../sources/cachePosts";
import configureEnvironment from "../../util/configureEnvironment";
import parseQueryStringParametersIntoSearchParams from "../../util/parseQueryStringParametersIntoSearchParams";
import parseQuerystringParameters from "../../util/request/parseQuerystringParameters";
import responseBuilder from "../../util/response/responseBuilder";
import returnErrorResponse from "../../util/response/returnErrorResponse";

export default (event, context, callback) => {
    const {sources: postSources, ...eventParameters} = event.body || event.queryStringParameters || {};

    configureEnvironment()
        .then(() => {
            return cachePosts(parseQueryStringParametersIntoSearchParams({})(
                parseQuerystringParameters(eventParameters)), postSources
            )
                .then(sortedPosts => callback(null, responseBuilder(sortedPosts)));
        })
        .catch(returnErrorResponse(callback));
};
