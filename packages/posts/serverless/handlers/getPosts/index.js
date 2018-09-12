import {Photo, Post, sortPostsByDate} from "@randy.tarampi/js";
import _ from "lodash";
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

    const errorHandler = returnErrorResponse(callback);
    let parsedHeaders;
    let parsedQuerystringParameters;

    try {
        parsedHeaders = parseHeaders(event.headers);
        parsedQuerystringParameters = parseQuerystringParameters(event.queryStringParameters);
    } catch (error) {
        return errorHandler(error);
    }

    configureEnvironment()
        .then(() => {
            return Promise.all(
                [Post.name, Photo.name]
                    .map(type => searchPosts(parseQueryStringParametersIntoSearchParams({type})(parsedQuerystringParameters)))
                )
                .then((results) => {
                    const flattenedPosts = _.flatten(results.map(result => result.posts));
                    const sortedPosts = flattenedPosts.sort(sortPostsByDate);
                    const paginatedPosts = sortedPosts.slice(0, parsedQuerystringParameters && parsedQuerystringParameters.perPage || 100);
                    const globalTotal = results.reduce((globalTotal, result) => globalTotal + result.total, 0);
                    const globalFirst = _.sortBy(results, result => result && result.first && result.first.date)[0].first;
                    const globalLast = _.sortBy(results, result => result && result.last && result.last.date)[results.length - 1].last;

                    return {
                        posts: paginatedPosts,
                        total: globalTotal,
                        first: globalFirst,
                        last: globalLast
                    };
                })
                .then(postsResult => {
                    callback(null, buildPostsResponse(parsedHeaders)(postsResult));
                });
        })
        .catch(errorHandler);
};
