import searchCache from "../../lib/searchCache";
import configureEnvironment from "../util/configureEnvironment";
import responseBuilder from "../util/responseBuilder";
import returnErrorResponse from "../util/returnErrorResponse";
import parseQueryStringParametersIntoSearchParams from "../util/parseQueryStringParametersIntoSearchParams";
import {Photo, Post} from "@randy.tarampi/js";
import _ from "lodash";

export default (event, context, callback) => {
    if (event.source === "serverless-plugin-warmup") {
        return callback(null, "Lambda is warm!");
    }

    configureEnvironment()
        .then(() => {
            return Promise.all([
                    searchCache(parseQueryStringParametersIntoSearchParams({type: Photo.name})(event.queryStringParameters)),
                    searchCache(parseQueryStringParametersIntoSearchParams({type: Post.name})(event.queryStringParameters))
                ])
                .then(_.flatten)
                .then(flattenedPosts => {
                    return _.sortBy(flattenedPosts, [
                        post => -1 * (post.dateCreated ? post.dateCreated.valueOf() : post.datePublished ? post.datePublished.valueOf() : 0)
                    ]);
                })
                .then(sortedPosts => callback(null, responseBuilder(sortedPosts)));
        })
        .catch(returnErrorResponse(callback));
};
