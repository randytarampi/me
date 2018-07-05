import searchPosts from "../../blog/searchPosts";
import loadServerlessSecrets from "../util/loadServerlessSecrets";
import responseBuilder from "../util/responseBuilder";
import returnErrorResponse from "../util/returnErrorResponse";

export default (event, context, callback) => {
    loadServerlessSecrets()
        .then(() => {
            return searchPosts(event.queryStringParameters)
                .then(sortedPosts => callback(null, responseBuilder(sortedPosts)));
        })
        .catch(returnErrorResponse(callback));
};
