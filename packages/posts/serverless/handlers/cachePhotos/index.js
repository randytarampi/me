import {Photo} from "@randy.tarampi/js";
import SearchParams from "../../../lib/searchParams";
import cachePhotos from "../../../photos/cachePhotos";
import configureEnvironment from "../../util/configureEnvironment";
import responseBuilder from "../../util/response/responseBuilder";
import returnErrorResponse from "../../util/response/returnErrorResponse";

export default (event, context, callback) => {
    configureEnvironment()
        .then(() => {
            return cachePhotos(SearchParams.fromJS({
                type: Photo.name,
                ...(event.body || event.queryStringParameters)
            }))
                .then(sortedPhotos => callback(null, responseBuilder(sortedPhotos)));
        })
        .catch(returnErrorResponse(callback));
};
