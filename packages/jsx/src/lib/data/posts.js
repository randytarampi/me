import {
    castDatePropertyToDateTime,
    filterPostsForBoundingBox,
    Gallery,
    Photo,
    Post,
    sortPostsByDate
} from "@randy.tarampi/js";
import {fromJS, Map} from "immutable";
import {REHYDRATE} from "redux-persist/constants";
import {createSelector} from "reselect";
import {FETCHING_POSTS_SUCCESS} from "../actions/posts/fetchPosts";

const postSearchTypes = ["blog", "map"];
const postSearchMetadata = ["oldest", "newest", "oldestFetched", "newestFetched"];

const initialState = Map({
    posts: Map(),
    ...postSearchMetadata.reduce((metadata, metadatum) => {
        metadata[metadatum] = fromJS(postSearchTypes.reduce((metadatum, searchType) => {
            metadatum[searchType] = {};
            return metadatum;
        }, {}));
        return metadata;
    }, {})
});

export const postsReducer = (state = initialState, action) => {
    switch (action.type) {
        case REHYDRATE: {
            if (action.payload.posts) {
                let updatedState = state;
                const loadedPosts = state.get("posts");

                if (loadedPosts instanceof Set) {
                    updatedState = updatedState.set("posts", loadedPosts.reduce((mappedPosts, post) => mappedPosts.set(post.uid, post), Map()));
                }

                postSearchTypes.forEach(searchType => {
                    postSearchMetadata.forEach(searchMetadata => {
                        if (updatedState.hasIn([searchMetadata, searchType])) {
                            updatedState = state
                                .setIn([searchMetadata, searchType], buildOldestOrNewestPostMeta(action.payload.posts.toJS(), searchMetadata));
                        }
                    });
                });

                return updatedState;
            }

            return state;
        }

        case FETCHING_POSTS_SUCCESS: {
            if (action.payload.posts) {
                let updatedState = state;

                action.payload.posts.forEach(post => {
                    updatedState = updatedState.setIn(["posts", post.uid], post);
                });

                if (action.payload.searchParams.tags) {
                    return updatedState;
                }

                postSearchMetadata.forEach(searchMetadata => {
                    if (updatedState.hasIn([searchMetadata, action.payload.searchType])) {
                        updatedState = updatedState
                            .setIn([searchMetadata, action.payload.searchType], buildOldestOrNewestPostMeta(action.payload, searchMetadata));
                    }
                });

                return updatedState;
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

export const getPosts = state => state.get("posts").toList();

export const createFilteredPostsSelector = (...filterOrSelectors) => filterOrSelectors.length > 1
    ? createSelector(...filterOrSelectors)
    : createSelector(getPosts, ...filterOrSelectors);

export const getPostsForBoundingBox = (state, north, east, south, west) => filterPostsForBoundingBox(getPosts(state), north, east, south, west);

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
export const getPostsSortedByDateForBoundingBox = createFilteredPostsSelector(
    getPostsForBoundingBox,
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
export const getOldestPostForBoundingBox = createFilteredPostsSelector(
    getPostsSortedByDateForBoundingBox,
    sortedPosts => sortedPosts.last()
);
export const getNewestPostForBoundingBox = createFilteredPostsSelector(
    getPostsSortedByDateForBoundingBox,
    sortedPosts => sortedPosts.first()
);

export const getOldestAvailablePostDateForSearchTypeAndPostType = (state, searchType, postType) => state.getIn(["oldest", searchType, postType]);
export const getNewestAvailablePostDateForSearchTypeAndPostType = (state, searchType, postType) => state.getIn(["newest", searchType, postType]);
export const getOldestFetchedPostDateForSearchTypeAndPostType = (state, searchType, postType) => state.getIn(["oldestFetched", searchType, postType]);
export const getNewestFetchedPostDateForSearchTypeAndPostType = (state, searchType, postType) => state.getIn(["newestFetched", searchType, postType]);
