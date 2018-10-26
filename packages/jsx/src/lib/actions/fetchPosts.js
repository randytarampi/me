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

export const FETCHING_POSTS_PER_PAGE = 20;

export const fetchPostsCreator = (fetchUrl, type = "global") => (dispatch, getState) => {
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

    if (oldestPostAvailableDate && oldestLoadedPostDate && oldestLoadedPostDate.diff(oldestPostAvailableDate) <= 0) {
        dispatch(fetchingPostsCancelled({
            fetchUrl,
            oldestPostAvailableDate,
            oldestLoadedPostDate
        }));
        return Promise.resolve();
    }

    const searchParams = {
        perPage: FETCHING_POSTS_PER_PAGE,
        ...(
            oldestLoadedPostDate && (type === "global" || oldestLoadedPost.type === type)
                ? {
                    orderBy: "datePublished",
                    orderOperator: "lt",
                    orderComparator: oldestLoadedPostDate && oldestLoadedPostDate.toISO(),
                    orderComparatorType: "String"
                }
                : null
        )
    };

    dispatch(fetchingPosts({
        fetchUrl,
        searchParams
    }));

    return fetchPosts(fetchUrl, searchParams)
        .then(postsResponse => {
            dispatch(fetchingPostsSuccess({
                fetchUrl,
                ...postsResponse
            }));

            if (!oldestLoadedPostDate && (!postsResponse || !postsResponse.posts || !postsResponse.posts.length)) {
                dispatch(setError(undefined, "ENOPOSTS"));
            }
        })
        .catch(error => {
            dispatch(fetchingPostsFailure({
                fetchUrl,
                error
            }));

            if (!oldestLoadedPostDate) {
                dispatch(setError(error, "EFETCH"));
            } else {
                dispatch(fetchingPostsFailureRecovery({
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
