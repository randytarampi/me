import searchCache from "../../lib/searchCache";
import configureEnvironment from "../util/configureEnvironment";
import responseBuilder from "../util/responseBuilder";
import returnErrorResponse from "../util/returnErrorResponse";
import parseQueryStringParametersIntoSearchParams from "../util/parseQueryStringParametersIntoSearchParams";
import {Photo} from "@randy.tarampi/js";

export default (event, context, callback) => {
    if (event.source === "serverless-plugin-warmup") {
        return callback(null, "Lambda is warm!");
    }

    configureEnvironment()
        .then(() => {
            return searchCache(parseQueryStringParametersIntoSearchParams({type: Photo.name})(event.queryStringParameters))
                .then(sortedPhotos => callback(null, responseBuilder(sortedPhotos)));
        })
        .catch(returnErrorResponse(callback));
};
