import SearchParams from "../../../lib/searchParams";
import cachePhotos from "../../../sources/cachePosts";
import configureEnvironment from "../../util/configureEnvironment";
import responseBuilder from "../../util/response/responseBuilder";
import returnErrorResponse from "../../util/response/returnErrorResponse";

export default (event, context, callback) => {
    configureEnvironment()
        .then(() => {
            return cachePhotos(SearchParams.fromJS({
                ...(event.body || event.queryStringParameters)
            }))
                .then(sortedPhotos => callback(null, responseBuilder(sortedPhotos)));
        })
        .catch(returnErrorResponse(callback));
};
