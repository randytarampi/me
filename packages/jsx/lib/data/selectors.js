import {getApiState, getApiStateForUrl} from "./api";
import {getError, getErrorCode, getErrorMessage, getErrorState, hasError} from "./error";
import {
    getNewestPost,
    getOldestPost,
    getPhotoPosts,
    getPhotoPostsSortedByDate,
    getPosts,
    getPostsSortedByDate,
    getWordPosts,
    getWordPostsSortedByDate
} from "./posts";

export default {
    hasError: state => hasError(state.error),
    getError: state => getError(state.error),
    getErrorCode: state => getErrorCode(state.error),
    getErrorMessage: state => getErrorMessage(state.error),
    getErrorState: state => getErrorState(state.error),

    getPosts: state => getPosts(state.posts),
    getPhotoPosts: state => getPhotoPosts(state.posts),
    getWordPosts: state => getWordPosts(state.posts),
    getPostsSortedByDate: state => getPostsSortedByDate(state.posts),
    getPhotoPostsSortedByDate: state => getPhotoPostsSortedByDate(state.posts),
    getWordPostsSortedByDate: state => getWordPostsSortedByDate(state.posts),
    getOldestPost: state => getOldestPost(state.posts),
    getNewestPost: state => getNewestPost(state.posts),

    getApiState: state => getApiState(state.api),
    getApiStateForUrl: (state, url) => getApiStateForUrl(state.api, url)
};
