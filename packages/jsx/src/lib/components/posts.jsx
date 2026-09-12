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
        this.heightReflowFrame = null;
        this.infiniteLoadReleaseTimer = null;
        this.handleInfiniteScroll = this.handleInfiniteScroll.bind(this);
    }

    componentDidMount() {
        this.scheduleElementHeightReflow();
        if (this.props.shouldFetchPostsOnMount) {
            this.props.fetchPosts();
        }
    }

    componentWillUnmount() {
        if (this.heightReflowFrame) {
            window.cancelAnimationFrame(this.heightReflowFrame);
        }
        if (this.infiniteLoadReleaseTimer) window.clearTimeout(this.infiniteLoadReleaseTimer);
    }

    // Post-paint reconciliation: heights estimated from post data can drift
    // from what actually renders (fonts, image placeholders, measurement
    // racing the body DOM). Re-measure one frame after paint and update only
    // on a real change so react-infinite's window math stays honest without
    // churning every render.
    scheduleElementHeightReflow() {
        if (typeof window === "undefined" || !window.requestAnimationFrame) return;
        if (this.heightReflowFrame) window.cancelAnimationFrame(this.heightReflowFrame);

        this.heightReflowFrame = window.requestAnimationFrame(() => {
            this.heightReflowFrame = null;
            this.setState(state => {
                const elementHeight = this.calculateElementHeight(state, this.props);
                return elementHeight.every((height, index) => height === state.elementHeight[index])
                    && elementHeight.length === state.elementHeight.length
                    ? null
                    : {elementHeight};
            });
        });
    }

    handleInfiniteScroll(scrollable) {
        this.props.handleScroll?.(scrollable);
        const scrollY = window.pageYOffset || document.documentElement.scrollTop || 0;
        const remaining = document.documentElement.scrollHeight - (scrollY + window.innerHeight);
        if (remaining <= window.innerHeight && !this.props.isLoading) {
            this.infiniteLoadGuard.run();
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
        if (previousProps.isLoading && !this.props.isLoading) {
            // React Infinite reconciles its child count after this lifecycle
            // hook. Defer release one tick so its loading=false reconciliation
            // cannot immediately trigger the same edge request again.
            if (this.infiniteLoadReleaseTimer) window.clearTimeout(this.infiniteLoadReleaseTimer);
            this.infiniteLoadReleaseTimer = window.setTimeout(() => {
                this.infiniteLoadReleaseTimer = null;
                this.infiniteLoadGuard.release();
            }, 0);
        }

        if (previousProps.containerWidth !== this.props.containerWidth
            || previousProps.posts !== this.props.posts) {
            this.scheduleElementHeightReflow();
            return this.setState({
                elementHeight: this.calculateElementHeight(this.state, this.props)
            });
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
                handleScroll={this.handleInfiniteScroll}
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
    handleScroll: PropTypes.func,
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
