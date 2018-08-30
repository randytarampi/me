import {Set} from "immutable";
import PropTypes from "prop-types";
import React, {Component} from "react";
import Dimensions from "react-dimensions";
import Infinite from "react-infinite";
import LoadingSpinner from "../components/loadingSpinner";
import computePostHeight from "../util/computePostHeight";
import getComponentForType from "../util/getComponentForType";

const PostsComponent = props => {
    const postsArray = props.posts && props.posts.toArray();

    return <Infinite
        containerWidth={props.containerWidth}
        useWindowAsScrollContainer={true}
        elementHeight={postsArray ? postsArray.map(computePostHeight(props.containerWidth)) : [0]}
        infiniteLoadBeginEdgeOffset={500}
        preloadBatchSize={Infinite.containerHeightScaleFactor(0.5)}
        preloadAdditionalHeight={Infinite.containerHeightScaleFactor(2)}
        onInfiniteLoad={props.fetchPosts}
        isInfiniteLoading={props.isLoading}
        loadingSpinnerDelegate={<LoadingSpinner/>}
    >
        {
            postsArray
                ? postsArray.map(post => {
                    const Constructor = getComponentForType(post.type);
                    return <Constructor key={post.uid} post={post}/>;
                })
                : <div/>
        }
    </Infinite>;
};

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
