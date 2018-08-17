import SearchParams from "../../photos/searchParams";
import searchPhotos from "../../photos/searchPhotos";
import configureEnvironment from "../util/configureEnvironment";
import responseBuilder from "../util/responseBuilder";
import returnErrorResponse from "../util/returnErrorResponse";

export default (event, context, callback) => {
    if (event.source === "serverless-plugin-warmup") {
        return callback(null, "Lambda is warm!");
    }

    configureEnvironment()
        .then(() => {
            const searchParams = new SearchParams({
                page: parseInt(event.queryStringParameters.page, 10),
                perPage: parseInt(event.queryStringParameters.perPage, 10)
            });

            return searchPhotos(searchParams)
                .then(sortedPhotos => callback(null, responseBuilder(sortedPhotos)));
        })
        .catch(returnErrorResponse(callback));
};
