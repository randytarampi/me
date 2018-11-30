import {createAction} from "redux-actions";
import fetchPosts from "../api/fetchPosts";
import {isUrlStateLoading} from "../data/api";
import selectors from "../data/selectors";
import setError from "./setError";

export const FETCHING_POSTS_FAILURE = "FETCHING_POSTS_FAILURE";
export const FETCHING_POSTS_FAILURE_RECOVERY = "FETCHING_POSTS_FAILURE_RECOVERY";
export const FETCHING_POSTS_SUCCESS = "FETCHING_POSTS_SUCCESS";
export const FETCHING_POSTS_CANCELLED = "FETCHING_POSTS_CANCELLED";
export const FETCHING_POSTS = "FETCHING_POSTS";

export const FETCHING_POSTS_PER_PAGE = 4;

export const fetchPostsCreator = (fetchUrl, type = "global", {params: {filter, filterValue} = {}} = {}) => (dispatch, getState) => {
    const state = getState();
    const urlState = selectors.getApiStateForUrl(state, fetchUrl);
    const isLoading = isUrlStateLoading(urlState);

    if (isLoading) {
        dispatch(fetchingPostsCancelled({
            fetchUrl,
            isLoading
        }));
        return Promise.resolve();
    }

    const oldestLoadedPost = selectors.getOldestPost(state);
    const oldestLoadedPostDate = oldestLoadedPost && oldestLoadedPost.datePublished;
    const oldestPostAvailableDate = selectors.getPostsState(state).getIn(["oldest", type]);

    const searchParams = {
        perPage: FETCHING_POSTS_PER_PAGE,
        ...(
            oldestLoadedPostDate
                ? {
                    orderBy: "datePublished",
                    orderOperator: "lt",
                    orderComparator: oldestLoadedPostDate && oldestLoadedPostDate.toISO(),
                    orderComparatorType: "String"
                }
                : null
        )
    };

    if (type && type !== "global") {
        searchParams.type = type;
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

    dispatch(fetchingPosts({
        searchParams,
        fetchUrl
    }));

    return fetchPosts(fetchUrl, searchParams)
        .then(postsResponse => {
            dispatch(fetchingPostsSuccess({
                searchParams,
                fetchUrl,
                ...postsResponse
            }));

            if (!oldestLoadedPostDate && (!postsResponse || !postsResponse.posts || !postsResponse.posts.length)) {
                dispatch(setError(undefined, "ENOPOSTS"));
            }
        })
        .catch(error => {
            dispatch(fetchingPostsFailure({
                searchParams,
                fetchUrl,
                error
            }));

            if (!oldestLoadedPostDate) {
                dispatch(setError(error, "EFETCH"));
            } else {
                dispatch(fetchingPostsFailureRecovery({
                    searchParams,
                    fetchUrl,
                    oldestPostAvailableDate,
                    oldestLoadedPostDate
                }));
            }

            throw error;
        });
};

export const fetchingPosts = createAction(FETCHING_POSTS);
export const fetchingPostsCancelled = createAction(FETCHING_POSTS_CANCELLED);
export const fetchingPostsSuccess = createAction(FETCHING_POSTS_SUCCESS);
export const fetchingPostsFailure = createAction(FETCHING_POSTS_FAILURE);
export const fetchingPostsFailureRecovery = createAction(FETCHING_POSTS_FAILURE_RECOVERY);

export default fetchPostsCreator;
