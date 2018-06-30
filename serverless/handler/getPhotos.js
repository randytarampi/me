import SearchParams from "../../photos/searchParams";
import searchPhotos from "../../photos/searchPhotos";
import loadServerlessSecrets from "../util/loadServerlessSecrets";
import responseBuilder from "../util/responseBuilder";
import returnErrorResponse from "../util/returnErrorResponse";

export default (event, context, callback) => {
    loadServerlessSecrets()
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
