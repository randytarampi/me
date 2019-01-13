import {DateTime} from "luxon";
import {createComplexPostsSelector, getBasePostsSelectorForType, selectors} from "../../data/selectors";
import {generateFilterFunctionForFilterName} from "../../util/posts";
import {FETCHING_POSTS_PER_PAGE, fetchingPostsCancelled, fetchPostsCreator} from "./fetchPosts";

const selectOldestFilteredPostDate = (postType, filter, filterValue, state) => {
    const postsFilters = [generateFilterFunctionForFilterName[filter](filterValue)];
    const postsSelector = createComplexPostsSelector(postsFilters, [getBasePostsSelectorForType(postType)]);
    const posts = postsSelector(state);

    return posts && posts.last() && posts.last().date;
};

export const fetchPostsForBlogCreator = (fetchUrl, postType = "global", {filter, filterValue, perPage = FETCHING_POSTS_PER_PAGE, ...params} = {}) => (dispatch, getState) => {
    const state = getState();
    const searchType = "blog";
    const oldestLoadedPostDateString = selectors.getOldestFetchedPostDateForSearchTypeAndPostType(state, searchType, postType);
    const oldestLoadedPostDate = filter && filterValue
        ? selectOldestFilteredPostDate(postType, filter, filterValue, state)
        : oldestLoadedPostDateString && DateTime.fromISO(oldestLoadedPostDateString);
    const oldestPostAvailableDateString = selectors.getOldestAvailablePostDateForSearchTypeAndPostType(state, searchType, postType);
    const oldestPostAvailableDate = oldestPostAvailableDateString && DateTime.fromISO(oldestPostAvailableDateString);

    const searchParams = {
        perPage,
        ...params,
        ...(
            oldestLoadedPostDate
                ? {
                    orderBy: "datePublished",
                    orderOperator: "lt",
                    orderComparator: oldestLoadedPostDateString,
                    orderComparatorType: "String"
                }
                : null
        )
    };

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
