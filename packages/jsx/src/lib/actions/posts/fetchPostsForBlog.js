import {DateTime} from "luxon";
import {createComplexPostsSelector, getBasePostsSelectorForType, selectors} from "../../data/selectors.js";
import {generateFilterFunctionForFilterName} from "../../util/posts.js";
import {FETCHING_POSTS_PER_PAGE, fetchingPostsCancelled, fetchPostsCreator} from "./fetchPosts.js";
import {getApiStateForUrlFromGlobalState} from "../../data/api.js";

const selectOldestFilteredPost = (postType, filter, filterValue, state) => {
    const postsFilters = [generateFilterFunctionForFilterName[filter](filterValue)];
    const postsSelector = createComplexPostsSelector(postsFilters, [getBasePostsSelectorForType(postType)]);
    const posts = postsSelector(state);

    return posts && posts.last();
};

export const fetchPostsForBlogCreator = (fetchUrl, postType = "global", {filter, filterValue, perPage = FETCHING_POSTS_PER_PAGE, usePublicFeedV5, ...params} = {}) => (dispatch, getState) => {
    const state = getState();
    const searchType = "blog";
    const oldestLoadedPostDateString = selectors.getOldestFetchedPostDateForSearchTypeAndPostType(state, searchType, postType);
    const oldestLoadedPostDate = oldestLoadedPostDateString && DateTime.fromISO(oldestLoadedPostDateString);
    const sortedPosts = selectors.getPostsSortedByDate(state);
    const loadedPosts = filter && filterValue
        ? selectOldestFilteredPost(postType, filter, filterValue, state)
        : sortedPosts && sortedPosts
            .filter(post => !oldestLoadedPostDate || post.datePublished.valueOf() === oldestLoadedPostDate.valueOf())
            .last();
    const oldestPostAvailableDateString = selectors.getOldestAvailablePostDateForSearchTypeAndPostType(state, searchType, postType);
    const oldestPostAvailableDate = oldestPostAvailableDateString && DateTime.fromISO(oldestPostAvailableDateString);

    const searchParams = usePublicFeedV5
        ? {
            perPage,
            ...params,
            usePublicFeedV5,
            continuationToken: getApiStateForUrlFromGlobalState(state, fetchUrl)?.get("nextCursor")
        }
        : {
            perPage,
            ...params,
            ...(
                oldestLoadedPostDate
                    ? {
                        orderBy: "datePublished",
                        orderOperator: "lt",
                        orderComparator: oldestLoadedPostDate.toISO(),
                        orderComparatorType: "String",
                        beforeId: loadedPosts && loadedPosts.uid
                    }
                    : null
            )
        };

    if (usePublicFeedV5 && !getApiStateForUrlFromGlobalState(state, fetchUrl)?.get("hasMore") && getApiStateForUrlFromGlobalState(state, fetchUrl)?.has("hasMore")) {
        return dispatch(fetchingPostsCancelled({searchParams, fetchUrl}));
    }

    if (filter) {
        searchParams[filter] = filterValue;
    }

    if (oldestPostAvailableDate && oldestLoadedPostDate && oldestLoadedPostDate.diff(oldestPostAvailableDate) <= 0) {
        dispatch(fetchingPostsCancelled({
            searchParams,
            fetchUrl,
            oldestPostAvailableDate,
            oldestLoadedPostDate
        }));
        return Promise.resolve();
    }

    return fetchPostsCreator(fetchUrl, postType, searchParams, searchType)(dispatch, getState);
};

export default fetchPostsForBlogCreator;
