import {Set} from "immutable";
import PropTypes from "prop-types";
import React, {Component} from "react";
import Dimensions from "react-dimensions";
import Infinite from "react-infinite";
import LoadingSpinner from "../components/loadingSpinner";
import computePostHeight from "../util/computePostHeight";
import getComponentForType from "../util/getComponentForType";

export class PostsComponent extends Component {
    render() {
        return <Infinite
            useWindowAsScrollContainer={true}
            elementHeight={this.props.posts ? this.props.posts.toArray().map(computePostHeight(this.props.containerWidth)) : [500]}
            infiniteLoadBeginEdgeOffset={50}
            onInfiniteLoad={this.props.fetchPosts}
            isInfiniteLoading={this.props.isLoading}
            loadingSpinnerDelegate={<LoadingSpinner/>}
        >
            {
                this.props.posts
                    ? this.props.posts.toArray().map(post => {
                        const Constructor = getComponentForType(post.type);
                        return <Constructor key={post.uid} post={post}/>;
                    })
                    : <div/>
            }
        </Infinite>;
    }
}

PostsComponent.propTypes = {
    containerHeight: PropTypes.number,
    containerWidth: PropTypes.number,
    fetchPosts: PropTypes.func.isRequired,
    isLoading: PropTypes.bool,
    posts: PropTypes.instanceOf(Set)
};

PostsComponent.defaultProps = {
    isLoading: false
};

const DimensionWrappedPosts = Dimensions({
    elementResize: true
})(PostsComponent);
const Posts = props => <div className="dimensions-container--posts">
    <DimensionWrappedPosts {...props}/>
</div>;

export default Posts;
