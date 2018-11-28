import {Photo, Post} from "@randy.tarampi/js";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import fetchPosts from "../actions/fetchPosts";
import Posts from "../components/posts";
import {createGetErrorForUrlSelector, createIsLoadingUrlSelector} from "../data/api";
import {createFilteredPostsSelector} from "../data/posts";
import selectors from "../data/selectors";

const createPostsSelector = (filters, selectors) => createFilteredPostsSelector(
    ...selectors,
    selected => filters.reduce((filtered, filter) => filter(filtered), selected)
);

const filterNameToFilterFunction = {
    tags: commaSeparatedTags => posts => {
        const filteringTags = commaSeparatedTags.split(",");
        return posts.filter(post => post.tags && post.tags.find(tag => filteringTags.includes(tag)));
    }
};

export const ConnectedPosts = connect(
    (state, ownProps) => {
        const isLoadingUrlSelector = createIsLoadingUrlSelector();
        const errorForUrlSelector = createGetErrorForUrlSelector();
        const {type, fetchUrl} = ownProps;
        const {filter, filterValue} = ownProps.match && ownProps.match.params || ownProps;
        let postsSelector = selectors.getPostsSortedByDate;

        if (type) {
            switch (type) {
                case Photo.name:
                    postsSelector = selectors.getPhotoPostsSortedByDate;
                    break;

                case Post.name:
                    postsSelector = selectors.getWordPostsSortedByDate;
                    break;
            }
        }

        if (filter) {
            postsSelector = createPostsSelector(
                [filterNameToFilterFunction[filter](filterValue)],
                [postsSelector]
            );
        }

        return {
            isLoading: isLoadingUrlSelector(state, fetchUrl),
            error: errorForUrlSelector(state, fetchUrl),
            posts: postsSelector(state)
        };
    },
    (dispatch, {fetchUrl, type, match}) => {
        return {
            fetchPosts: () => dispatch(fetchPosts(fetchUrl, type, match))
        };
    }
)(Posts);

ConnectedPosts.propTypes = {
    fetchUrl: PropTypes.string.isRequired,
    type: PropTypes.oneOf([
        Post.name,
        Photo.name
    ])
};

ConnectedPosts.defaultProps = {
    fetchUrl: "/posts"
};

export default ConnectedPosts;
