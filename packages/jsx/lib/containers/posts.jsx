import PropTypes from "prop-types";
import {connect} from "react-redux";
import fetchPosts from "../actions/fetchPosts";
import Posts from "../components/posts";
import selectors from "../data/selectors";

const ConnectedPosts = connect(
    (state, ownProps) => {
        return {
            isLoading: selectors.posts(state).isLoadingFetchUrl(ownProps.fetchUrl),
            posts: selectors.posts(state).getPostsForFetchUrl(ownProps.fetchUrl)
        };
    },
    (dispatch, ownProps) => {
        return {
            fetchPosts: () => dispatch(fetchPosts(selectors, ownProps.fetchUrl))
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
