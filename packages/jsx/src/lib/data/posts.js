import {castDatePropertyToDateTime, Photo, Post, sortPostsByDate} from "@randy.tarampi/js";
import {Map, Set} from "immutable";
import {REHYDRATE} from "redux-persist/constants";
import {createSelector} from "reselect";
import {FETCHING_POSTS_SUCCESS} from "../actions/fetchPosts";

export const postsReducer = (state = Map({posts: Set([]), oldest: Map(), newest: Map()}), action) => {
    switch (action.type) {
        case REHYDRATE: {
            if (action.payload.posts) {
                return state
                    .set("oldest", buildOldestOrNewestPostMeta(action.payload.posts.toJS(), "oldest"))
                    .set("newest", buildOldestOrNewestPostMeta(action.payload.posts.toJS(), "newest"));
            }

            return state;
        }

        case FETCHING_POSTS_SUCCESS: {
            if (action.payload.posts) {
                return state
                    .set("posts", state.get("posts").union(action.payload.posts))
                    .set("oldest", buildOldestOrNewestPostMeta(action.payload, "oldest"))
                    .set("newest", buildOldestOrNewestPostMeta(action.payload, "newest"));
            }

            return state;
        }

        default:
            return state;
    }
};

const buildOldestOrNewestPostMeta = (payload, key) => payload[key]
    ? Map(Object.keys(payload[key]).reduce((keyest, keyestKey) => {
        keyest[keyestKey] = castDatePropertyToDateTime(payload[key][keyestKey]);
        return keyest;
    }, {}))
    : Map();

export default postsReducer;

export const getPostsState = state => state;
export const getPosts = state => state.get("posts");

export const getPhotoPosts = createSelector(
    getPosts,
    posts => posts.filter(post => post instanceof Photo)
);
export const getWordPosts = createSelector(
    getPosts,
    posts => posts.filter(post => post instanceof Post)
);

export const getPostsSortedByDate = createSelector(
    getPosts,
    posts => posts.sort(sortPostsByDate)
);
export const getPhotoPostsSortedByDate = createSelector(
    getPhotoPosts,
    posts => posts.sort(sortPostsByDate)
);
export const getWordPostsSortedByDate = createSelector(
    getWordPosts,
    posts => posts.sort(sortPostsByDate)
);

export const getOldestPost = createSelector(
    getPostsSortedByDate,
    sortedPosts => sortedPosts.last()
);
export const getNewestPost = createSelector(
    getPostsSortedByDate,
    sortedPosts => sortedPosts.first()
);
