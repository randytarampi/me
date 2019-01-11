import {Gallery, Photo, Post} from "@randy.tarampi/js";
import _ from "lodash";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {fetchPostsForMapCreator} from "../actions";
import {MappedPostsComponent} from "../components/mappedPosts";
import {createGetErrorForUrlSelector, createIsLoadingUrlSelector} from "../data";
import selectors from "../data/selectors";
import {
    createPostsSelector,
    generateFilterFunctionForFilterName,
    generateTransformFunctionForTransformName
} from "./posts";

const getBasePostsSelectorForType = type => {
    switch (type) {
        case Photo.type:
        case Gallery.type:
            return selectors.getPhotoPosts;

        case Post.type:
            return selectors.getWordPosts;

        default:
            return selectors.getPosts;
    }
};

export const MAPPED_POSTS_FETCH_DEBOUNCE_DELAY = 500;

export const connectMappedPosts = connect(
    (state, ownProps) => {
        const isLoadingUrlSelector = createIsLoadingUrlSelector();
        const errorForUrlSelector = createGetErrorForUrlSelector();
        const {type = "global", fetchUrl} = ownProps;
        const {filter, filterValue} = ownProps.match && ownProps.match.params || ownProps;
        const mapState = selectors.getMap(state, ownProps.id);
        const {center, heading, type: mapType, tilt, zoom, bounds} = mapState
            ? mapState.toJS()
            : {};
        const props = {
            isLoading: isLoadingUrlSelector(state, fetchUrl),
            error: errorForUrlSelector(state, fetchUrl),
            defaultCenter: center,
            defaultHeading: heading,
            defaultMapTypeId: mapType,
            defaultTilt: tilt,
            defaultZoom: zoom,
            currentBounds: bounds,
            currentCenter: center,
            currentHeading: heading,
            currentTilt: tilt,
            currentZoom: zoom
        };
        const postsFilters = [generateFilterFunctionForFilterName.location()];

        if (filter) {
            postsFilters.push(generateFilterFunctionForFilterName[filter](filterValue));
        }
        if (bounds) {
            postsFilters.push(generateFilterFunctionForFilterName.boundingBox(bounds.north, bounds.east, bounds.south, bounds.west));
        }
        postsFilters.push(generateTransformFunctionForTransformName.location(undefined, 0.0004));
        const postsSelector = createPostsSelector(postsFilters, [getBasePostsSelectorForType(type)]);
        props.posts = postsSelector(state);

        return props;
    },
    (dispatch, {fetchUrl, type, match, fetchPostsParams, id}) => {
        return {
            fetchPosts: _.debounce(passedParams => {
                const searchParams = {
                    ...(match && match.params),
                    ...fetchPostsParams,
                    perPage: 64,
                    ...passedParams
                };
                return dispatch(fetchPostsForMapCreator(id, fetchUrl, type, searchParams));
            }, MAPPED_POSTS_FETCH_DEBOUNCE_DELAY)
        };
    }
);

export const ConnectedMappedPosts = connectMappedPosts(MappedPostsComponent);

ConnectedMappedPosts.propTypes = {
    id: PropTypes.string.isRequired,
    fetchUrl: PropTypes.string.isRequired,
    type: PropTypes.oneOf([
        Post.type,
        Photo.type
    ])
};

ConnectedMappedPosts.defaultProps = {
    id: "map-posts",
    fetchUrl: "/posts"
};

export default ConnectedMappedPosts;
