import PropTypes from "prop-types";
import {connect} from "react-redux";
import fetchPosts, {FETCHING_POSTS_PER_PAGE} from "../actions/fetchPosts";
import Posts from "../components/posts";
import {createGetErrorForUrlSelector, createIsLoadingUrlSelector} from "../data/api";
import selectors from "../data/selectors";

const ConnectedPosts = connect(
    (state, ownProps) => {
        const isLoadingUrlSelector = createIsLoadingUrlSelector();
        const errorForUrlSelector = createGetErrorForUrlSelector();

        return {
            isLoading: isLoadingUrlSelector(state, ownProps.fetchUrl),
            error: errorForUrlSelector(state, ownProps.fetchUrl),
            posts: selectors.getPostsSortedByDate(state),
            postsPerFetch: FETCHING_POSTS_PER_PAGE
        };
    },
    (dispatch, ownProps) => {
        return {
            fetchPosts: () => dispatch(fetchPosts(ownProps.fetchUrl))
        };
    }
)(Posts);

ConnectedPosts.propTypes = {
    fetchUrl: PropTypes.string.isRequired
};

ConnectedPosts.defaultProps = {
    fetchUrl: "/posts"
};

export default ConnectedPosts;
