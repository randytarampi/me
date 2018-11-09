import _ from "lodash";
import {sortPostsByDate} from "../../../../js";
import searchPosts from "../../lib/searchPosts";
import {postTypes} from "../../lib/util";
import parseQueryStringParametersIntoSearchParams from "./parseQueryStringParametersIntoSearchParams";

export const getPostsForParsedQuerystringParameters = ({type, ...queryParameters} = {}) => {
    const postTypesToFetch = postTypes.filter(postType => type ? postType === type : true);
    return Promise.all(
        postTypesToFetch
            .map(postType => searchPosts(parseQueryStringParametersIntoSearchParams({type: postType})(queryParameters)))
        )
        .then(results => {
            const flattenedPosts = _.flatten(results.map(result => result.posts));
            const uniquePosts = Object.values(flattenedPosts.reduce((keyedPosts, post) => {
                keyedPosts[post.uid] = post;
                return keyedPosts;
            }, {}));
            const sortedPosts = uniquePosts.sort(sortPostsByDate);
            const paginatedPosts = sortedPosts.slice(0, queryParameters && queryParameters.perPage || 100);

            return {
                posts: paginatedPosts,
                total: {
                    global: results.reduce((globalTotal, result) => globalTotal + result.total, 0),
                    ...(_.zipObject(postTypesToFetch, results.map(result => result.total)))
                },
                first: {
                    global: _.sortBy(results, result => result && result.first && result.first.date)[0].first,
                    ...(_.zipObject(postTypesToFetch, results.map(result => result.first)))
                },
                last: {
                    global: _.sortBy(results, result => result && result.last && result.last.date)[results.length - 1].last,
                    ...(_.zipObject(postTypesToFetch, results.map(result => result.last)))
                }
            };
        });
};

export default getPostsForParsedQuerystringParameters;
