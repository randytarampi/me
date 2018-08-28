import {getApiState, getApiStateForUrl} from "./api";
import {getEmoji, hasEmoji} from "./emoji";
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
import {getLocation} from "./routing";

export default {
    hasError: state => hasError(state.get("error")),
    getError: state => getError(state.get("error")),
    getErrorCode: state => getErrorCode(state.get("error")),
    getErrorMessage: state => getErrorMessage(state.get("error")),
    getErrorState: state => getErrorState(state.get("error")),

    getPosts: state => getPosts(state.get("posts")),
    getPhotoPosts: state => getPhotoPosts(state.get("posts")),
    getWordPosts: state => getWordPosts(state.get("posts")),
    getPostsSortedByDate: state => getPostsSortedByDate(state.get("posts")),
    getPhotoPostsSortedByDate: state => getPhotoPostsSortedByDate(state.get("posts")),
    getWordPostsSortedByDate: state => getWordPostsSortedByDate(state.get("posts")),
    getOldestPost: state => getOldestPost(state.get("posts")),
    getNewestPost: state => getNewestPost(state.get("posts")),

    getApiState: state => getApiState(state.get("api")),
    getApiStateForUrl: (state, url) => getApiStateForUrl(state.get("api"), url),

    getLocation: state => getLocation(state.get("routing")),

    getEmoji: (state, emojiId) => getEmoji(state.get("emoji"), emojiId),
    hasEmoji: (state, emojiId) => hasEmoji(state.get("emoji"), emojiId)
};
