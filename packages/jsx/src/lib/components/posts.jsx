import {logger} from "@randy.tarampi/browser-logger";
import Dimensions from "@randy.tarampi/react-dimensions";
import SchemaJsonLdComponent from "@randy.tarampi/schema-dot-org-json-ld-components";
import {ItemList as SchemaItemList, ListItem as SchemaListItem} from "@randy.tarampi/schema-dot-org-types";
import {Set} from "immutable";
import PropTypes from "prop-types";
import React, {PureComponent} from "react";
import Infinite from "react-infinite";
import LoadingSpinner from "../components/loadingSpinner";
import {ConnectedErrorWrapper} from "../containers";
import computePostHeight from "../util/computePostHeight";
import getComponentForType from "../util/getComponentForType";
import {
    ErrorENOCONTENTContentComponent,
    ErrorESERVERContentComponent,
    mapErrorCodeToErrorContentComponent as defaultMapErrorCodeToErrorContent
} from "./error";
import PostComponent from "./post";

export const mapPostsErrorCodeToErrorContentComponent = errorCode => {
    switch (errorCode) {
        case "EFETCH":
        case "ESERVER":
            return ErrorESERVERContentComponent;

        case "ENOPOSTS":
            return ErrorENOCONTENTContentComponent;

        default:
            return defaultMapErrorCodeToErrorContent(errorCode);
    }
};

export class PostsComponent extends PureComponent {
    componentDidMount() {
        if (this.props.shouldFetchPostsOnMount) {
            this.props.fetchPosts();
        }
    }

    render() {
        const {posts, containerHeight, containerWidth, fetchPosts, isLoading, postsLimit, ...props} = this.props;

        let postsArray = posts && posts.toArray();

        if (Number.isFinite(postsLimit)) {
            postsArray = postsArray.slice(0, postsLimit);
        }

        const elementHeight = postsArray
            ? postsArray.map(computePostHeight(containerWidth))
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

        return <ConnectedErrorWrapper
            key="posts-error-wrapper"
            mapErrorCodeToErrorContentComponent={mapPostsErrorCodeToErrorContentComponent}
        >
            <SchemaJsonLdComponent markup={itemList}/>
            <Infinite
                useWindowAsScrollContainer={true}
                elementHeight={elementHeight}
                infiniteLoadBeginEdgeOffset={window.innerHeight}
                preloadBatchSize={Infinite.containerHeightScaleFactor(1 / 8)}
                preloadAdditionalHeight={Infinite.containerHeightScaleFactor(8)}
                onInfiniteLoad={fetchPosts}
                isInfiniteLoading={isLoading}
                loadingSpinnerDelegate={<LoadingSpinner/>}
                {...props}
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
                                containerHeight={containerHeight}
                                containerWidth={containerWidth}
                            />;
                        })
                        : <div/>
                }
            </Infinite>
        </ConnectedErrorWrapper>;
    }
}

PostsComponent.propTypes = {
    containerHeight: PropTypes.number,
    containerWidth: PropTypes.number,
    postsLimit: PropTypes.number,
    fetchPosts: PropTypes.func.isRequired,
    isLoading: PropTypes.bool,
    posts: PropTypes.instanceOf(Set)
};

PostsComponent.defaultProps = {
    isLoading: false,
    shouldFetchPostsOnMount: false,
    postsLimit: Infinity
};

export const DimensionsWrappedPosts = Dimensions()(PostsComponent);

export const DimensionsContainerWrappedPosts = props => <div className="dimensions-container--posts">
    <DimensionsWrappedPosts {...props}/>
</div>;

export default DimensionsContainerWrappedPosts;
