import {Gallery, Photo, Post} from "@randy.tarampi/js";
import {DateTime} from "luxon";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {FETCHING_POSTS_PER_PAGE} from "../actions/posts/fetchPosts";
import {fetchPostsForBlogCreator} from "../actions/posts/fetchPostsForBlog";
import {DimensionsContainerWrappedPosts} from "../components/posts";
import {createGetErrorForUrlSelector, createIsLoadingUrlSelector} from "../data/api";
import {createComplexPostsSelector, getBasePostsSelectorForType, selectors} from "../data/selectors";
import {generateFilterFunctionForFilterName} from "../util";

export const connectPosts = connect(
    (state, ownProps) => {
        const searchType = "blog";
        const isLoadingUrlSelector = createIsLoadingUrlSelector();
        const errorForUrlSelector = createGetErrorForUrlSelector();
        const {type = "global", fetchUrl} = ownProps;
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
    (dispatch, {fetchUrl, type, match, fetchPostsParams}) => {
        return {
            fetchPosts: passedParams => {
                const searchParams = {
                    ...(match && match.params),
                    ...fetchPostsParams,
                    perPage: FETCHING_POSTS_PER_PAGE,
                    ...passedParams
                };
                return dispatch(fetchPostsForBlogCreator(fetchUrl, type, searchParams));
            }
        };
    }
);

export const ConnectedPosts = connectPosts(DimensionsContainerWrappedPosts);

ConnectedPosts.propTypes = {
    fetchUrl: PropTypes.string.isRequired,
    type: PropTypes.oneOf([Post.type, Photo.type, Gallery.type])
};

ConnectedPosts.defaultProps = {
    fetchUrl: "/posts"
};

export default ConnectedPosts;
