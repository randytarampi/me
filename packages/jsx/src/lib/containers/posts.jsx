import PropTypes from "prop-types";
import {connect} from "react-redux";
import fetchPosts from "../actions/fetchPosts";
import Posts from "../components/posts";
import {createGetErrorForUrlSelector, createIsLoadingUrlSelector} from "../data/api";
import selectors from "../data/selectors";

export const ConnectedPosts = connect(
    (state, ownProps) => {
        const isLoadingUrlSelector = createIsLoadingUrlSelector();
        const errorForUrlSelector = createGetErrorForUrlSelector();
        let postsSelector = selectors.getPostsSortedByDate;

        switch (ownProps.type) {
            case "Photo":
                postsSelector = selectors.getPhotoPostsSortedByDate;
                break;

            case "Post":
                postsSelector = selectors.getWordPostsSortedByDate;
                break;
        }

        return {
            isLoading: isLoadingUrlSelector(state, ownProps.fetchUrl),
            error: errorForUrlSelector(state, ownProps.fetchUrl),
            posts: postsSelector(state)
        };
    },
    (dispatch, ownProps) => {
        return {
            fetchPosts: () => dispatch(fetchPosts(ownProps.fetchUrl, ownProps.type))
        };
    }
)(Posts);

ConnectedPosts.propTypes = {
    fetchUrl: PropTypes.string.isRequired,
    type: PropTypes.oneOf([
        "Post",
        "Photo"
    ])
};

ConnectedPosts.defaultProps = {
    fetchUrl: "/posts"
};

export default ConnectedPosts;
