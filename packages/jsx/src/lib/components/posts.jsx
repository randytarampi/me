import {logger} from "@randy.tarampi/browser-logger";
// NOTE-RT: `@randy.tarampi/schema-dot-org-json-ld-components` is an old, Babel-6-era CJS build
// NOTE-RT: that sets `exports.default = JsonLd` but Node's ESM loader wraps the entire `module.exports`
// NOTE-RT: as the default export, so `import X from "..."` gives `{default: JsonLd}` instead of `JsonLd`.
import SchemaJsonLdComponentModule from "@randy.tarampi/schema-dot-org-json-ld-components";
import {ItemList as SchemaItemList, ListItem as SchemaListItem} from "@randy.tarampi/schema-dot-org-types";
import {List} from "immutable";
import PropTypes from "prop-types";
import React, {PureComponent} from "react";
import Infinite from "react-infinite";
import LoadingSpinner from "./loadingSpinner.jsx";
import {ConnectedErrorWrapper} from "../containers/index.jsx";
import computePostHeight from "../util/computePostHeight.js";
import createInfiniteLoadGuard from "../util/createInfiniteLoadGuard.js";
import getComponentForType from "../util/getComponentForType.js";
import useMeasure from "../hooks/useMeasure.js";
import {
    ErrorENOCONTENTContentComponent,
    ErrorESERVERContentComponent,
    mapErrorCodeToErrorContentComponent as defaultMapErrorCodeToErrorContent
} from "./error/index.jsx";
import PostComponent from "./post.jsx";
const SchemaJsonLdComponent = SchemaJsonLdComponentModule && SchemaJsonLdComponentModule.default
    ? SchemaJsonLdComponentModule.default
    : SchemaJsonLdComponentModule;

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
    static defaultProps = {
        isLoading: false,
        shouldFetchPostsOnMount: false,
        postsLimit: Infinity
    };

    constructor(props) {
        super(props);

        this.state = {};
        this.state.elementHeight = this.calculateElementHeight(this.state, props);
        this.infiniteLoadGuard = createInfiniteLoadGuard(() => this.props.fetchPosts());
    }

    componentDidMount() {
        if (this.props.shouldFetchPostsOnMount) {
            this.props.fetchPosts();
        }
    }

    calculateElementHeight({elementHeight: elementHeightState}, props) {
        const {posts, postsLimit, containerWidth} = props;

        let postsArray = posts && posts.toArray();

        if (Number.isFinite(postsLimit)) {
            postsArray = postsArray.slice(0, postsLimit);
        }

        return postsArray
            ? postsArray.map((post, index) => {
                const cachedPostHeight = elementHeightState && elementHeightState[index];

                return computePostHeight(containerWidth)(post, cachedPostHeight);
            })
            : [window.innerHeight];
    }

    componentDidUpdate(previousProps) {
        if (previousProps.containerWidth !== this.props.containerWidth
            || previousProps.posts !== this.props.posts) {
            return this.setState({
                elementHeight: this.calculateElementHeight(this.state, this.props)
            });
        }

        if (previousProps.isLoading && !this.props.isLoading) {
            // Redux has committed the response by this point, so the next
            // scroll can legitimately start another page request. Releasing
            // here prevents react-infinite's loading=false transition from
            // double-firing the same edge while a request is still being
            // committed.
            this.infiniteLoadGuard.release();
        }
    }

    render() {
        const {posts, containerHeight, containerWidth, isLoading, postsLimit, ...props} = this.props;

        let postsArray = posts && posts.toArray();

        if (Number.isFinite(postsLimit)) {
            postsArray = postsArray.slice(0, postsLimit);
        }

        const itemList = postsArray
            ? new SchemaItemList({
                numberOfItems: postsArray.length,
                itemListOrder: "Descending",
                itemListElement: postsArray.map((post, index) => new SchemaListItem({
                    item: post.toSchema(),
                    position: index + 1,
                    url: `${window.location.origin}${window.location.pathname}#${post.uid}`
                }))
            })
            : [];

        return <ConnectedErrorWrapper
            key="posts-error-wrapper"
            mapErrorCodeToErrorContentComponent={mapPostsErrorCodeToErrorContentComponent}
        >
            <SchemaJsonLdComponent markup={itemList}/>
            <Infinite
                useWindowAsScrollContainer={true}
                elementHeight={
                    postsArray && postsArray.length === this.state.elementHeight.length
                        ? this.state.elementHeight
                        : this.calculateElementHeight(this.state, this.props)
                }
                infiniteLoadBeginEdgeOffset={window.innerHeight}
                preloadBatchSize={Infinite.containerHeightScaleFactor(1 / 8)}
                preloadAdditionalHeight={Infinite.containerHeightScaleFactor(8)}
                onInfiniteLoad={this.infiniteLoadGuard.run}
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
    shouldFetchPostsOnMount: PropTypes.bool.isRequired,
    posts: PropTypes.instanceOf(List)
};


export const MeasuredPostsComponent = props => {
    const {height, ref, width} = useMeasure();

    return <div className="dimensions-container--posts" ref={ref}>
        <PostsComponent
            {...props}
            containerHeight={height}
            containerWidth={width}
        />
    </div>;
};

MeasuredPostsComponent.propTypes = PostsComponent.propTypes;

export default MeasuredPostsComponent;
