import {Gallery, Photo, Post} from "@randy.tarampi/js";
import {getLocation} from "connected-react-router/immutable";
import {getApiStateForUrl} from "./api";
import {getEmoji, hasEmoji} from "./emoji";
import {getError, getErrorCode, getErrorMessage, getErrorTimeoutHandlerId, hasError} from "./error";
import {getMap, hasMap} from "./maps";
import {
    createFilteredPostsSelector,
    getNewestAvailablePostDateForSearchTypeAndPostType,
    getNewestFetchedPostDateForSearchTypeAndPostType,
    getNewestPost,
    getNewestPostForBoundingBox,
    getOldestAvailablePostDateForSearchTypeAndPostType,
    getOldestFetchedPostDateForSearchTypeAndPostType,
    getOldestPost,
    getOldestPostForBoundingBox,
    getPhotoPosts,
    getPhotoPostsSortedByDate,
    getPosts,
    getPostsForBoundingBox,
    getPostsSortedByDate,
    getWordPosts,
    getWordPostsSortedByDate
} from "./posts";
import {getControlStateForId, getIndexedRoutes, getIndexForRoute, getRouteForIndex, getSwipeableIndex} from "./ui";

export const selectors = {
    hasError: state => hasError(state.get("error")),
    getError: state => getError(state.get("error")),
    getErrorCode: state => getErrorCode(state.get("error")),
    getErrorMessage: state => getErrorMessage(state.get("error")),
    getErrorTimeoutHandlerId: state => getErrorTimeoutHandlerId(state.get("error")),

    getPosts: state => getPosts(state.get("posts")),
    getPhotoPosts: state => getPhotoPosts(state.get("posts")),
    getWordPosts: state => getWordPosts(state.get("posts")),
    getPostsForBoundingBox: (state, north, east, south, west) => getPostsForBoundingBox(state.get("posts"), north, east, south, west),
    getPostsSortedByDate: state => getPostsSortedByDate(state.get("posts")),
    getPhotoPostsSortedByDate: state => getPhotoPostsSortedByDate(state.get("posts")),
    getWordPostsSortedByDate: state => getWordPostsSortedByDate(state.get("posts")),
    getOldestPost: state => getOldestPost(state.get("posts")),
    getNewestPost: state => getNewestPost(state.get("posts")),
    getOldestPostForBoundingBox: (state, north, east, south, west) => getOldestPostForBoundingBox(state.get("posts"), north, east, south, west),
    getNewestPostForBoundingBox: (state, north, east, south, west) => getNewestPostForBoundingBox(state.get("posts"), north, east, south, west),
    getOldestAvailablePostDateForSearchTypeAndPostType: (state, searchType, postType) => getOldestAvailablePostDateForSearchTypeAndPostType(state.get("posts"), searchType, postType),
    getNewestAvailablePostDateForSearchTypeAndPostType: (state, searchType, postType) => getNewestAvailablePostDateForSearchTypeAndPostType(state.get("posts"), searchType, postType),
    getOldestFetchedPostDateForSearchTypeAndPostType: (state, searchType, postType) => getOldestFetchedPostDateForSearchTypeAndPostType(state.get("posts"), searchType, postType),
    getNewestFetchedPostDateForSearchTypeAndPostType: (state, searchType, postType) => getNewestFetchedPostDateForSearchTypeAndPostType(state.get("posts"), searchType, postType),

    getApiStateForUrl: (state, url) => getApiStateForUrl(state.get("api"), url),

    getLocation,

    getSwipeableIndex: state => getSwipeableIndex(state.get("ui")),
    getIndexedRoutes: state => getIndexedRoutes(state.get("ui")),
    getRouteForIndex: (state, index) => getRouteForIndex(state.get("ui"), index),
    getIndexForRoute: (state, route) => getIndexForRoute(state.get("ui"), route),
    getControlStateForId: (state, id) => getControlStateForId(state.get("ui"), id),

    getEmoji: (state, emojiId) => getEmoji(state.get("emoji"), emojiId),
    hasEmoji: (state, emojiId) => hasEmoji(state.get("emoji"), emojiId),

    getMap: (state, mapId) => getMap(state.get("maps"), mapId),
    hasMap: (state, mapId) => hasMap(state.get("maps"), mapId)
};

export const getBasePostsSelectorForType = type => {
    switch (type) {
        case Photo.type:
        case Gallery.type:
            return selectors.getPhotoPostsSortedByDate;

        case Post.type:
            return selectors.getWordPostsSortedByDate;

        default:
            return selectors.getPostsSortedByDate;
    }
};

export const createComplexPostsSelector = (filters, postsSelectors) => createFilteredPostsSelector(
    ...postsSelectors,
    selected => filters.reduce((filtered, filter) => filter(filtered), selected)
);

export default selectors;
