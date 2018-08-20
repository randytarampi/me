import {push} from "react-router-redux";
import {createAction} from "redux-actions";
import fetchPosts from "../api/fetchPosts";
import setError from "./setError";

export const FETCHING_POSTS_FAILURE = "FETCHING_POSTS_FAILURE";
export const FETCHING_POSTS_SUCCESS = "FETCHING_POSTS_SUCCESS";
export const FETCHING_POSTS = "FETCHING_POSTS";

export default (selectors, fetchUrl) => (dispatch, getState) => {
    const state = getState();

    if (selectors.posts(state).isLoadingFetchUrl(fetchUrl)) {
        return;
    }

    const currentPage = selectors.posts(state).getPageForFetchUrl(fetchUrl);
    const nextPage = currentPage + 1;

    dispatch(fetchingPosts({fetchUrl, nextPage}));

    return fetchPosts(fetchUrl, nextPage)
        .then(posts => {
            dispatch(fetchingSuccess({fetchUrl, posts, page: nextPage}));

            if (!posts || !posts.length) {
                dispatch(setError(undefined, "ENOPOSTS"));
                dispatch(push("./error"));
            }
        })
        .catch(error => {
            dispatch(fetchingFailure({fetchUrl, error, page: currentPage}));

            throw error;
        });
};

const fetchingPosts = createAction(FETCHING_POSTS);
const fetchingSuccess = createAction(FETCHING_POSTS_SUCCESS);
const fetchingFailure = createAction(FETCHING_POSTS_FAILURE);
