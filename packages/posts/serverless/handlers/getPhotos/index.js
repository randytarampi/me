import {Photo} from "@randy.tarampi/js";
import searchPosts from "../../../lib/searchPosts";
import configureEnvironment from "../../util/configureEnvironment";
import parseQueryStringParametersIntoSearchParams from "../../util/parseQueryStringParametersIntoSearchParams";
import parseHeaders from "../../util/request/parseHeaders";
import parseQuerystringParameters from "../../util/request/parseQuerystringParameters";
import buildPostsResponse from "../../util/response/buildPostsResponse";
import returnErrorResponse from "../../util/response/returnErrorResponse";

export default (event, context, callback) => {
    if (event.source === "serverless-plugin-warmup") {
        return callback(null, "Lambda is warm!");
    }

    let parsedHeaders;
    let parsedQuerystringParameters;

    try {
        parsedHeaders = parseHeaders(event.headers);
        parsedQuerystringParameters = parseQuerystringParameters(event.queryStringParameters);
    } catch (error) {
        return returnErrorResponse(callback)(error);
    }

    configureEnvironment()
        .then(() => {
            return searchPosts(parseQueryStringParametersIntoSearchParams({type: Photo.name})(parsedQuerystringParameters))
                .then(postsResult => {
                    callback(null, buildPostsResponse(parsedHeaders)(postsResult));
                });
        })
        .catch(returnErrorResponse(callback));
};
