import {createAction} from "redux-actions";
import fetchPosts from "../../api/fetchPosts";
import {isUrlStateLoading} from "../../data/api";
import selectors from "../../data/selectors";
import setError from "../error/setError";

export const FETCHING_POSTS_FAILURE = "FETCHING_POSTS_FAILURE";
export const FETCHING_POSTS_FAILURE_RECOVERY = "FETCHING_POSTS_FAILURE_RECOVERY";
export const FETCHING_POSTS_SUCCESS = "FETCHING_POSTS_SUCCESS";
export const FETCHING_POSTS_CANCELLED = "FETCHING_POSTS_CANCELLED";
export const FETCHING_POSTS = "FETCHING_POSTS";

export const FETCHING_POSTS_PER_PAGE = 8;

export const fetchPostsCreator = (fetchUrl, type = "global", searchParams, searchType) => (dispatch, getState) => {
    const state = getState();
    const urlState = selectors.getApiStateForUrl(state, fetchUrl);
    const loadedPosts = selectors.getPosts(state);
    const isLoading = isUrlStateLoading(urlState);

    if (type && type !== "global") {
        searchParams.type = type;
    }

    if (isLoading) {
        dispatch(fetchingPostsCancelled({
            fetchUrl,
            searchParams,
            searchType,
            isLoading
        }));
        return Promise.resolve();
    }

    dispatch(fetchingPosts({
        fetchUrl,
        searchParams,
        searchType
    }));

    return fetchPosts(fetchUrl, searchParams)
        .then(postsResponse => {
            dispatch(fetchingPostsSuccess({
                fetchUrl,
                searchParams,
                searchType,
                ...postsResponse
            }));

            if ((!loadedPosts || !loadedPosts.size) && (!postsResponse || !postsResponse.posts || !postsResponse.posts.length)) {
                dispatch(setError(undefined, "ENOPOSTS"));
            }
        })
        .catch(error => {
            dispatch(fetchingPostsFailure({
                searchParams,
                searchType,
                fetchUrl,
                error
            }));

            if (!loadedPosts || !loadedPosts.size) {
                dispatch(setError(error, "EFETCH"));
            } else {
                dispatch(fetchingPostsFailureRecovery({
                    fetchUrl,
                    searchParams,
                    searchType
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
