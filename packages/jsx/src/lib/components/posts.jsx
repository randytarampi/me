import {logger} from "@randy.tarampi/browser-logger";
import Dimensions from "@randy.tarampi/react-dimensions";
import SchemaJsonLdComponent from "@randy.tarampi/schema-dot-org-json-ld-components";
import {ItemList as SchemaItemList, ListItem as SchemaListItem} from "@randy.tarampi/schema-dot-org-types";
import {Set} from "immutable";
import PropTypes from "prop-types";
import React, {Component, Fragment} from "react";
import Infinite from "react-infinite";
import LoadingSpinner from "../components/loadingSpinner";
import computePostHeight from "../util/computePostHeight";
import getComponentForType from "../util/getComponentForType";
import PostComponent from "./post";

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
                useWindowAsScrollContainer={true}
                elementHeight={elementHeight}
                infiniteLoadBeginEdgeOffset={window.innerHeight}
                preloadBatchSize={Infinite.containerHeightScaleFactor(1 / 8)}
                preloadAdditionalHeight={Infinite.containerHeightScaleFactor(8)}
                onInfiniteLoad={props.fetchPosts}
                isInfiniteLoading={props.isLoading}
                loadingSpinnerDelegate={<LoadingSpinner/>}
            >
                {
                    postsArray
                        ? postsArray.map(post => {
                            let Constructor;

                            try {
                                Constructor = getComponentForType(post.type);
                            } catch (error) {
                                logger.warn(error, `Can't \`getComponentForType\` for \`${post.type}\`, just using \`Post\` instead\``);
                                Constructor = PostComponent;
                            }

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
