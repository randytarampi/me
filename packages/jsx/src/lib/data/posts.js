import {castDatePropertyToDateTime, Gallery, Photo, Post, sortPostsByDate} from "@randy.tarampi/js";
import {Map, Set} from "immutable";
import {REHYDRATE} from "redux-persist/constants";
import {createSelector} from "reselect";
import {FETCHING_POSTS_SUCCESS} from "../actions/fetchPosts";

export const postsReducer = (state = Map({posts: Set(), oldest: Map(), newest: Map()}), action) => {
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
                const updatedState = state
                    .set("posts", state.get("posts").union(action.payload.posts));

                if (action.payload.searchParams.tags) {
                    return updatedState;
                }

                return updatedState
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

export const createFilteredPostsSelector = (...filterOrSelectors) => filterOrSelectors.length > 1
    ? createSelector(...filterOrSelectors)
    : createSelector(getPosts, ...filterOrSelectors);

export const getPhotoPosts = createFilteredPostsSelector(posts => posts.filter(post => post instanceof Photo || post instanceof Gallery));
export const getWordPosts = createFilteredPostsSelector(posts => posts.filter(post => post instanceof Post));

export const getPostsSortedByDate = createFilteredPostsSelector(posts => posts.sort(sortPostsByDate));
export const getPhotoPostsSortedByDate = createFilteredPostsSelector(
    getPhotoPosts,
    posts => posts.sort(sortPostsByDate)
);
export const getWordPostsSortedByDate = createFilteredPostsSelector(
    getWordPosts,
    posts => posts.sort(sortPostsByDate)
);

export const getOldestPost = createFilteredPostsSelector(
    getPostsSortedByDate,
    sortedPosts => sortedPosts.last()
);
export const getNewestPost = createFilteredPostsSelector(
    getPostsSortedByDate,
    sortedPosts => sortedPosts.first()
);
