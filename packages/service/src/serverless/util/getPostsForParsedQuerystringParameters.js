import {Gallery, Photo, POST_TYPES, sortPostsByDate} from "@randy.tarampi/js";
import _ from "lodash";
import searchPosts from "../../lib/sources/searchPosts";
import parseQueryStringParametersIntoSearchParams from "./parseQueryStringParametersIntoSearchParams";
import {checkHeader as checkMeVersionHeader} from "./request/headers/version";

export const getPostsForParsedQuerystringParameters = ({type, ...queryParameters} = {}, headers) => {
    let postTypesToFetch = [];

    if (
        [1, 2, 3].some(expectedHeaderVersion => checkMeVersionHeader(headers, expectedHeaderVersion))
    ) {
        postTypesToFetch = POST_TYPES.filter(postType => type
            ? postType === type
            : true
        );
    } else if (
        [4].some(expectedHeaderVersion => checkMeVersionHeader(headers, expectedHeaderVersion))
    ) {
        postTypesToFetch = POST_TYPES.filter(postType => type
            ? postType === type
            : false
        );
    }

    switch (type) {
        case Photo.type:
        case Gallery.type:
            postTypesToFetch = [Gallery.type, Photo.type];
            break;
    }

    const postFetchSearchParams = postTypesToFetch.length
        ? postTypesToFetch.map(postType => parseQueryStringParametersIntoSearchParams({type: postType})(queryParameters))
        : [parseQueryStringParametersIntoSearchParams()(queryParameters)];

    return Promise.all(postFetchSearchParams.map(searchPosts))
        .then(results => {
            const flattenedPosts = _.flatten(results.map(result => result.posts));
            const uniquePosts = Object.values(flattenedPosts.reduce((keyedPosts, post) => {
                if (post) {
                    keyedPosts[post.uid] = post;
                }
                return keyedPosts;
            }, {}));
            const sortedPosts = uniquePosts.sort(sortPostsByDate);
            const paginatedPosts = sortedPosts.slice(0, queryParameters && queryParameters.perPage || 100);
            const relevantResults = results.filter(result => result.total > 0);
            const firstResults = _.sortBy(relevantResults, result => result && result.first && result.first.date);
            const lastResults = _.sortBy(relevantResults, result => result && result.last && result.last.date);

            return {
                posts: paginatedPosts,
                total: {
                    global: relevantResults.reduce((globalTotal, result) => globalTotal + result.total, 0),
                    ...(_.zipObject(postTypesToFetch, results.map(result => result && result.total)))
                },
                first: {
                    global: firstResults && firstResults[0] && firstResults[0].first,
                    ...(_.zipObject(postTypesToFetch, results.map(result => result && result.first)))
                },
                last: {
                    global: lastResults && lastResults[relevantResults.length - 1] && lastResults[relevantResults.length - 1].last,
                    ...(_.zipObject(postTypesToFetch, results.map(result => result && result.last)))
                },
                firstFetched: {
                    global: firstResults && firstResults[0] && firstResults[0].firstFetched,
                    ...(_.zipObject(postTypesToFetch, results.map(result => result && result.firstFetched)))
                },
                lastFetched: {
                    global: lastResults && lastResults[relevantResults.length - 1] && lastResults[relevantResults.length - 1].lastFetched,
                    ...(_.zipObject(postTypesToFetch, results.map(result => result && result.lastFetched)))
                }
            };
        });
};

export default getPostsForParsedQuerystringParameters;
