import searchCache from "../../lib/searchCache";
import configureEnvironment from "../util/configureEnvironment";
import responseBuilder from "../util/responseBuilder";
import returnErrorResponse from "../util/returnErrorResponse";
import parseQueryStringParametersIntoSearchParams from "../util/parseQueryStringParametersIntoSearchParams";
import {Post} from "@randy.tarampi/js";

export default (event, context, callback) => {
    if (event.source === "serverless-plugin-warmup") {
        return callback(null, "Lambda is warm!");
    }

    configureEnvironment()
        .then(() => {
            return searchCache(parseQueryStringParametersIntoSearchParams({type: Post.name})(event.queryStringParameters))
                .then(sortedWords => callback(null, responseBuilder(sortedWords)));
        })
        .catch(returnErrorResponse(callback));
};
