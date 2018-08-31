import cachePhotos from "../../../sources/cachePosts";
import configureEnvironment from "../../util/configureEnvironment";
import parseQueryStringParametersIntoSearchParams from "../../util/parseQueryStringParametersIntoSearchParams";
import parseQuerystringParameters from "../../util/request/parseQuerystringParameters";
import responseBuilder from "../../util/response/responseBuilder";
import returnErrorResponse from "../../util/response/returnErrorResponse";

export default (event, context, callback) => {
    configureEnvironment()
        .then(() => {
            return cachePhotos(parseQueryStringParametersIntoSearchParams({})(
                parseQuerystringParameters(event.body || event.queryStringParameters)
            ))
                .then(sortedPosts => callback(null, responseBuilder(sortedPosts)));
        })
        .catch(returnErrorResponse(callback));
};
