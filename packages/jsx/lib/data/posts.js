import {Photo, Post, sortPostsByDate} from "@randy.tarampi/js";
import {Map, Set} from "immutable";
import {createSelector} from "reselect";
import {FETCHING_POSTS_SUCCESS} from "../actions/fetchPosts";

export const postsReducer = (state = Map({posts: Set([])}), action) => {
    switch (action.type) {
        case FETCHING_POSTS_SUCCESS: {
            if (action.payload.posts) {
                return state.set("posts", state.get("posts").union(action.payload.posts));
            }

            return state;
        }

        default:
            return state;
    }
};

export default postsReducer;

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
