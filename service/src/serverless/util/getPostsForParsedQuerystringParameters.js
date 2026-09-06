import {Gallery, Photo, POST_TYPES, sortPostsByDate} from "@randy.tarampi/js";
import _ from "lodash";
import searchPosts from "../../lib/sources/searchPosts.js";
import sortPostsByDatePublished from "../../lib/sortPostsByDatePublished.js";
import parseQueryStringParametersIntoSearchParams from "./parseQueryStringParametersIntoSearchParams.js";
import {checkHeader as checkMeVersionHeader} from "./request/headers/version.js";

const getPostsForParsedQuerystringParameters = ({type, ...queryParameters} = {}, headers) => {
    const isV4 = checkMeVersionHeader(headers, 4);
    const sortPosts = isV4 ? sortPostsByDatePublished : sortPostsByDate;
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
            : true
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
            const sortedPosts = uniquePosts.sort(sortPosts);
            const paginatedPosts = sortedPosts.slice(0, queryParameters && queryParameters.perPage || 100);
            const relevantResults = results.filter(result => result.total > 0);
            const firstResults = isV4
                ? relevantResults
                    .filter(result => result && result.first)
                    .sort((leftResult, rightResult) => sortPosts(rightResult.first, leftResult.first))
                : _.sortBy(relevantResults, result => result && result.first && result.first.date);
            const lastResults = isV4
                ? relevantResults
                    .filter(result => result && result.last)
                    .sort((leftResult, rightResult) => sortPosts(leftResult.last, rightResult.last))
                : _.sortBy(relevantResults, result => result && result.last && result.last.date);
            const firstFetchedResults = isV4
                ? relevantResults
                    .filter(result => result && result.firstFetched)
                    .sort((leftResult, rightResult) => sortPosts(rightResult.firstFetched, leftResult.firstFetched))
                : firstResults;
            const lastFetchedResults = isV4
                ? relevantResults
                    .filter(result => result && result.lastFetched)
                    .sort((leftResult, rightResult) => sortPosts(leftResult.lastFetched, rightResult.lastFetched))
                : lastResults;
            const lastResultIndex = isV4 ? 0 : relevantResults.length - 1;

            return {
                posts: paginatedPosts,
                total: {
                    global: relevantResults.reduce((globalTotal, result) => globalTotal + result.total, 0),
                    ...(_.zipObject(postTypesToFetch, results.map(result => result && result.total)))
                },
                first: {
                    global: firstResults[0] && firstResults[0].first,
                    ...(_.zipObject(postTypesToFetch, results.map(result => result && result.first)))
                },
                last: {
                    global: lastResults[lastResultIndex] && lastResults[lastResultIndex].last,
                    ...(_.zipObject(postTypesToFetch, results.map(result => result && result.last)))
                },
                firstFetched: {
                    global: firstFetchedResults[0] && firstFetchedResults[0].firstFetched,
                    ...(_.zipObject(postTypesToFetch, results.map(result => result && result.firstFetched)))
                },
                lastFetched: {
                    global: lastFetchedResults[lastResultIndex] && lastFetchedResults[lastResultIndex].lastFetched,
                    ...(_.zipObject(postTypesToFetch, results.map(result => result && result.lastFetched)))
                }
            };
        });
};

export default getPostsForParsedQuerystringParameters;

export {getPostsForParsedQuerystringParameters};
