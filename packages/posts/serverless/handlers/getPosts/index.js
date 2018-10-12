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
                    const uniquePosts = Object.values(flattenedPosts.reduce((keyedPosts, post) => {
                        keyedPosts[post.uid] = post;
                        return keyedPosts;
                    }, {}));
                    const sortedPosts = uniquePosts.sort(sortPostsByDate);
                    const paginatedPosts = sortedPosts.slice(0, parsedQuerystringParameters && parsedQuerystringParameters.perPage || 100);

                    return {
                        posts: paginatedPosts,
                        total: {
                            global: results.reduce((globalTotal, result) => globalTotal + result.total, 0),
                            [Post.name]: results[0].total,
                            [Photo.name]: results[1].total
                        },
                        first: {
                            global: _.sortBy(results, result => result && result.first && result.first.date)[0].first,
                            [Post.name]: results[0].first,
                            [Photo.name]: results[1].first
                        },
                        last: {
                            global: _.sortBy(results, result => result && result.last && result.last.date)[results.length - 1].last,
                            [Post.name]: results[0].last,
                            [Photo.name]: results[1].last
                        }
                    };
                })
                .then(postsResult => {
                    callback(null, buildPostsResponse(parsedHeaders)(postsResult));
                });
        })
        .catch(errorHandler);
};
