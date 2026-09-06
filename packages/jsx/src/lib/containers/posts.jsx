import {Gallery, Photo, Post} from "@randy.tarampi/js";
import {DateTime} from "luxon";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {FETCHING_POSTS_PER_PAGE} from "../actions/posts/fetchPosts.js";
import {fetchPostsForBlogCreator} from "../actions/posts/fetchPostsForBlog.js";
import MeasuredPostsComponent from "../components/posts.jsx";
import {createGetErrorForUrlSelector, createIsLoadingUrlSelector} from "../data/api.js";
import {createComplexPostsSelector, getBasePostsSelectorForType, selectors} from "../data/selectors.js";
import {generateFilterFunctionForFilterName} from "../util/index.js";
import {shouldUsePublicFeedV5} from "../util/publicFeedVersion.js";

// Pages builds use the deployment stage (`dev`/`prd`) rather than NODE_ENV (`production`). Keep the
// V5 rollout dev-only while retaining the existing V4 client for production and local builds.
export const USE_PUBLIC_FEED_V5 = typeof __BUILD_NODE_ENV__ !== "undefined"
    && shouldUsePublicFeedV5(__BUILD_NODE_ENV__);

export const connectPosts = connect(
    (state, ownProps) => {
        const searchType = "blog";
        const isLoadingUrlSelector = createIsLoadingUrlSelector();
        const errorForUrlSelector = createGetErrorForUrlSelector();
        const {type = "global", fetchUrl = "/posts"} = ownProps;
        const {filter, filterValue} = ownProps.match && ownProps.match.params || ownProps;
        const oldestLoadedPostDateString = selectors.getOldestFetchedPostDateForSearchTypeAndPostType(state, searchType, type);
        const oldestLoadedPostDate = oldestLoadedPostDateString && DateTime.fromISO(oldestLoadedPostDateString);
        const props = {
            isLoading: isLoadingUrlSelector(state, fetchUrl),
            error: errorForUrlSelector(state, fetchUrl)
        };
        const postsFilters = [];

        if (filter) {
            postsFilters.push(generateFilterFunctionForFilterName[filter](filterValue));
        } else if (oldestLoadedPostDate) {
            postsFilters.push(generateFilterFunctionForFilterName.earlierThan(oldestLoadedPostDate));
        }
        const postsSelector = createComplexPostsSelector(postsFilters, [getBasePostsSelectorForType(type)]);
        props.posts = postsSelector(state);

        return props;
    },
    (dispatch, {fetchUrl = "/posts", type, match, fetchPostsParams}) => {
        return {
            fetchPosts: passedParams => {
                const searchParams = {
                    ...(match && match.params),
                    ...fetchPostsParams,
                    perPage: FETCHING_POSTS_PER_PAGE,
                    usePublicFeedV5: USE_PUBLIC_FEED_V5,
                    ...passedParams
                };
                return dispatch(fetchPostsForBlogCreator(fetchUrl, type, searchParams));
            }
        };
    }
);

export const ConnectedPosts = connectPosts(MeasuredPostsComponent);

ConnectedPosts.propTypes = {
    fetchUrl: PropTypes.string.isRequired,
    type: PropTypes.oneOf([Post.type, Photo.type, Gallery.type])
};

export default ConnectedPosts;
