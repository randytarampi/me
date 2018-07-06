import searchPosts from "../../blog/searchPosts";
import responseBuilder from "../util/responseBuilder";
import returnErrorResponse from "../util/returnErrorResponse";

export default (event, context, callback) => {
    searchPosts(event.queryStringParameters)
        .then(sortedPosts => callback(null, responseBuilder(sortedPosts)))
        .catch(returnErrorResponse(callback));
};
