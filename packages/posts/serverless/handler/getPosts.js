import searchPosts from "../../blog/searchPosts";
import configureEnvironment from "../util/configureEnvironment";
import responseBuilder from "../util/responseBuilder";
import returnErrorResponse from "../util/returnErrorResponse";

export default (event, context, callback) => {
    if (event.source === "serverless-plugin-warmup") {
        return callback(null, "Lambda is warm!");
    }

    configureEnvironment()
        .then(() => {
            return searchPosts(event.queryStringParameters)
                .then(sortedPosts => callback(null, responseBuilder(sortedPosts)));
        })
        .catch(returnErrorResponse(callback));
};
