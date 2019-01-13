import {ensurePostsHaveUniqueLocation, filterPostsForBoundingBox, Gallery, Photo, Post} from "@randy.tarampi/js";
import {DateTime} from "luxon";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {FETCHING_POSTS_PER_PAGE} from "../actions/posts/fetchPosts";
import {fetchPostsForBlogCreator} from "../actions/posts/fetchPostsForBlog";
import {DimensionsContainerWrappedPosts} from "../components/posts";
import {createGetErrorForUrlSelector, createIsLoadingUrlSelector} from "../data/api";
import {createFilteredPostsSelector} from "../data/posts";
import selectors from "../data/selectors";

export const createPostsSelector = (filters, selectors) => createFilteredPostsSelector(
    ...selectors,
    selected => filters.reduce((filtered, filter) => filter(filtered), selected)
);

export const generateFilterFunctionForFilterName = {
    tags: commaSeparatedTags => posts => {
        const filteringTags = commaSeparatedTags.split(",");
        return posts.filter(post => post.tags && post.tags.find(tag => filteringTags.includes(tag)));
    },
    earlierThan: earlierThanDate => posts => posts.filter(post => post.date.diff(earlierThanDate) >= 0),
    location: () => posts => posts.filter(post => Number.isFinite(post.lat) && Number.isFinite(post.long)),
    boundingBox: (north, east, south, west) => posts => filterPostsForBoundingBox(posts, north, east, south, west)
};

export const generateTransformFunctionForTransformName = {
    location: (offsetPrecision, minimumOffset) => posts => ensurePostsHaveUniqueLocation(posts, offsetPrecision, minimumOffset)
};

const getBasePostsSelectorForType = type => {
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
        const postsSelector = createPostsSelector(postsFilters, [getBasePostsSelectorForType(type)]);
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
    type: PropTypes.oneOf([
        Post.type,
        Photo.type
    ])
};

ConnectedPosts.defaultProps = {
    fetchUrl: "/posts"
};

export default ConnectedPosts;
