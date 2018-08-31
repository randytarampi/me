import {Photo, Post, util} from "@randy.tarampi/js";
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
            return Promise.all(
                [Post.name, Photo.name]
                    .map(type => searchPosts(parseQueryStringParametersIntoSearchParams({type})(parsedQuerystringParameters)))
                )
                .then(([postSearchResult, photoSearchResult]) => {
                    const flattenedPosts = _.flatten([postSearchResult.posts, photoSearchResult.posts]);
                    const sortedPosts = flattenedPosts.sort(util.sortPostsByDate);
                    const paginatedPosts = sortedPosts.slice(0, parsedQuerystringParameters && parsedQuerystringParameters.perPage || 100);
                    const globalTotal = postSearchResult.total + photoSearchResult.total;
                    const globalFirst = _.sortBy([postSearchResult, photoSearchResult], (a, b) => a && b && a.first && b.first && a.first.date && b.first.date && a.first.date < b.first.date)[0].first;
                    const globalLast = _.sortBy([postSearchResult, photoSearchResult], (a, b) => a && b && a.last && b.last && a.last.date && b.last.date && a.last.date > b.last.date)[0].last;

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
        .catch(returnErrorResponse(callback));
};
