import Dimensions from "@randy.tarampi/react-dimensions";
import SchemaJsonLdComponent from "@randy.tarampi/schema-dot-org-json-ld-components";
import {ItemList as SchemaItemList, ListItem as SchemaListItem} from "@randy.tarampi/schema-dot-org-types";
import {Set} from "immutable";
import PropTypes from "prop-types";
import React, {Component, Fragment} from "react";
import Infinite from "react-infinite";
import {FETCHING_POSTS_PER_PAGE} from "../actions/fetchPosts";
import LoadingSpinner from "../components/loadingSpinner";
import computePostHeight from "../util/computePostHeight";
import getComponentForType from "../util/getComponentForType";

export class PostsComponent extends Component {
    render() {
        const props = this.props;
        const postsArray = props.posts && props.posts.toArray();
        const elementHeight = postsArray
            ? postsArray.map(computePostHeight(props.containerWidth))
            : [window.innerHeight];
        const itemList = postsArray
            ? new SchemaItemList({
                numberOfItems: postsArray.length,
                itemListOrder: "Descending",
                itemListElement: postsArray
                    ? postsArray.map((post, index) => new SchemaListItem({
                        item: post.toSchema(),
                        position: index + 1,
                        url: `${window.location.origin}${window.location.pathname}#${post.uid}`
                    }))
                    : []
            })
            : [];

        return <Fragment>
            <SchemaJsonLdComponent markup={itemList}/>
            <Infinite
                containerHeight={props.containerHeight}
                useWindowAsScrollContainer={true}
                elementHeight={elementHeight}
                infiniteLoadBeginEdgeOffset={window.innerHeight}
                preloadBatchSize={Infinite.containerHeightScaleFactor(1 / FETCHING_POSTS_PER_PAGE)}
                preloadAdditionalHeight={Infinite.containerHeightScaleFactor(FETCHING_POSTS_PER_PAGE)}
                onInfiniteLoad={props.fetchPosts}
                isInfiniteLoading={props.isLoading}
                loadingSpinnerDelegate={<LoadingSpinner/>}
            >
                {
                    postsArray
                        ? postsArray.map(post => {
                            const Constructor = getComponentForType(post.type);
                            return <Constructor
                                key={post.uid}
                                post={post}
                                containerHeight={props.containerHeight}
                                containerWidth={props.containerWidth}
                            />;
                        })
                        : <div/>
                }
            </Infinite>
        </Fragment>;
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

export const DimensionsWrappedPosts = Dimensions({
    elementResize: true
})(PostsComponent);

export const DimensionsContainerWrappedPosts = props => <div className="dimensions-container--posts">
    <DimensionsWrappedPosts {...props}/>
</div>;

export default DimensionsContainerWrappedPosts;
