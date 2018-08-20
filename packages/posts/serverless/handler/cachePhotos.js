import cachePhotos from "../../photos/cachePhotos";
import configureEnvironment from "../util/configureEnvironment";
import responseBuilder from "../util/responseBuilder";
import returnErrorResponse from "../util/returnErrorResponse";
import SearchParams from "../../lib/searchParams";
import {Photo} from "@randy.tarampi/js";

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
