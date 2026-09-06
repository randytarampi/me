import {Gallery, Photo, POST_TYPES, sortPostsByDate} from "@randy.tarampi/js";
import _ from "lodash";
import searchPosts from "../../lib/sources/searchPosts.js";
import sortPostsByDatePublished from "../../lib/sortPostsByDatePublished.js";
import parseHiddenPostSources from "./parseHiddenPostSources.js";
import getPostsV5 from "./getPostsV5.js";
import parseQueryStringParametersIntoSearchParams from "./parseQueryStringParametersIntoSearchParams.js";
import {checkHeader as checkMeVersionHeader} from "./request/headers/version.js";

const getPostsForParsedQuerystringParameters = ({type, ...queryParameters} = {}, headers) => {
    const isV4 = checkMeVersionHeader(headers, 4);
    if (checkMeVersionHeader(headers, 5)) {
        return getPostsV5({type, ...queryParameters});
    }
    const hiddenPostSources = parseHiddenPostSources();
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

    // A source exclusion can turn a cache page into an under-filled public page. Fetch the full
    // cursor-bounded result in that case so hidden records never consume the visible page budget.
    const searchParams = hiddenPostSources.length
        ? postFetchSearchParams.map(searchParams => searchParams.set("perPage", Infinity))
        : postFetchSearchParams;

    return Promise.all(searchParams.map(searchPosts))
        .then(results => {
            // Apply stage policy before any cross-type operation. This keeps hidden records out of
            // deduplication, ordering, pagination, totals and every boundary exposed as metadata.
            const visibleResults = results.map(result => {
                const posts = (result.posts || []).filter(post => !hiddenPostSources.includes(post.source));
                const orderedPosts = posts.slice().sort((leftPost, rightPost) => sortPosts(rightPost, leftPost));

                return {
                    ...result,
                    posts,
                    total: posts.length,
                    first: orderedPosts[0] || null,
                    last: orderedPosts[orderedPosts.length - 1] || null,
                    firstFetched: orderedPosts[orderedPosts.length - 1] || null,
                    lastFetched: orderedPosts[0] || null
                };
            });
            const flattenedPosts = _.flatten(visibleResults.map(result => result.posts));
            const uniquePosts = Object.values(flattenedPosts.reduce((keyedPosts, post) => {
                if (post) {
                    keyedPosts[post.uid] = post;
                }
                return keyedPosts;
            }, {}));
            const sortedPosts = uniquePosts.sort(sortPosts);
            const paginatedPosts = sortedPosts.slice(0, queryParameters && queryParameters.perPage || 100);
            const globalNewestFetched = isV4 && paginatedPosts[0];
            const globalOldestFetched = isV4 && paginatedPosts[paginatedPosts.length - 1];
            const relevantResults = visibleResults.filter(result => result.total > 0);
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
                    ...(_.zipObject(postTypesToFetch, visibleResults.map(result => result && result.total)))
                },
                first: {
                    global: firstResults[0] && firstResults[0].first,
                    ...(_.zipObject(postTypesToFetch, visibleResults.map(result => result && result.first)))
                },
                last: {
                    global: lastResults[lastResultIndex] && lastResults[lastResultIndex].last,
                    ...(_.zipObject(postTypesToFetch, visibleResults.map(result => result && result.last)))
                },
                firstFetched: {
                    global: globalNewestFetched || (firstFetchedResults[0] && firstFetchedResults[0].firstFetched),
                    ...(_.zipObject(postTypesToFetch, visibleResults.map(result => result && result.firstFetched)))
                },
                lastFetched: {
                    global: globalOldestFetched || (lastFetchedResults[lastResultIndex] && lastFetchedResults[lastResultIndex].lastFetched),
                    ...(_.zipObject(postTypesToFetch, visibleResults.map(result => result && result.lastFetched)))
                }
            };
        });
};

export default getPostsForParsedQuerystringParameters;

export {getPostsForParsedQuerystringParameters};
