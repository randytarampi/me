import {getApiStateForUrl} from "./api";
import {getEmoji, hasEmoji} from "./emoji";
import {getError, getErrorCode, getErrorMessage, getErrorTimeoutHandlerId, hasError} from "./error";
import {
    getNewestPost,
    getOldestPost,
    getPhotoPosts,
    getPhotoPostsSortedByDate,
    getPostsSortedByDate,
    getWordPosts,
    getWordPostsSortedByDate
} from "./posts";
import {getLocation} from "./router";
import {getIndexedRoutes, getIndexForRoute, getRouteForIndex, getSwipeableIndex} from "./ui";

export const selectors = {
    hasError: state => hasError(state.get("error")),
    getError: state => getError(state.get("error")),
    getErrorCode: state => getErrorCode(state.get("error")),
    getErrorMessage: state => getErrorMessage(state.get("error")),
    getErrorTimeoutHandlerId: state => getErrorTimeoutHandlerId(state.get("error")),

    getPhotoPosts: state => getPhotoPosts(state.get("posts")),
    getWordPosts: state => getWordPosts(state.get("posts")),
    getPostsSortedByDate: state => getPostsSortedByDate(state.get("posts")),
    getPhotoPostsSortedByDate: state => getPhotoPostsSortedByDate(state.get("posts")),
    getWordPostsSortedByDate: state => getWordPostsSortedByDate(state.get("posts")),
    getOldestPost: state => getOldestPost(state.get("posts")),
    getNewestPost: state => getNewestPost(state.get("posts")),

    getApiStateForUrl: (state, url) => getApiStateForUrl(state.get("api"), url),

    getLocation: state => getLocation(state.get("router")),

    getSwipeableIndex: state => getSwipeableIndex(state.get("ui")),
    getIndexedRoutes: state => getIndexedRoutes(state.get("ui")),
    getRouteForIndex: (state, index) => getRouteForIndex(state.get("ui"), index),
    getIndexForRoute: (state, route) => getIndexForRoute(state.get("ui"), route),

    getEmoji: (state, emojiId) => getEmoji(state.get("emoji"), emojiId),
    hasEmoji: (state, emojiId) => hasEmoji(state.get("emoji"), emojiId)
};

export default selectors;
