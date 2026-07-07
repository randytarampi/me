import {Gallery, Photo, Post, POST_ENTITIES} from "@randy.tarampi/js";
import PropTypes from "prop-types";
import React, {PureComponent, useCallback, useState} from "react";
import {InfoWindow, Marker} from "@vis.gl/react-google-maps";
import {Col, Row} from "react-materialize";
import ProgressiveImage from "react-progressive-image";
import {Provider, ReactReduxContext} from "react-redux";
import {getSvgPathForPost, scalePixelValueForWindowDevicePixelRatio} from "../util/index.js";
import {
    PostBodyAsArrayComponent,
    PostBodyAsStringComponent,
    PostDateCreatedComponent,
    PostDatePublishedComponent,
    PostTagsComponent,
    PostTitleComponent
} from "./post.jsx";

export const PostMarkerInfoBoxContentComponent = ({post, title, style, isLoading}) => {
    const rowClassName = ["marker-info-box-post"];

    if (isLoading) {
        rowClassName.push("marker-info-box-post--loading");
    }

    return <Row className={rowClassName.join(" ")} style={style}>
        <Col className="marker-info-box-post-metadata" s={12}>
            <PostTitleComponent post={post} title={title}/>
        </Col>
        <Col className="marker-info-box-post-metadata hide-on-med-and-down" s={6}>
            <PostDatePublishedComponent post={post}/>
            <PostDateCreatedComponent post={post} label="Taken:"/>
        </Col>
        <Col className="marker-info-box-post-metadata hide-on-med-and-down" s={6}>
            <PostTagsComponent tagLinkBase={`${__MAP_APP_URL__}/tags`} post={post}/>
        </Col>
        {
            [Photo, Gallery].map(postConstructor => postConstructor.type).includes(post.type)
                ? <Col className="marker-info-box-post-content hide-on-med-and-down" s={12}>
                    <PostBodyAsStringComponent post={post}/>
                    <PostBodyAsArrayComponent post={post}/>
                </Col>
                : <Col className="marker-info-box-post-content" s={12}>
                    <PostBodyAsStringComponent post={post}/>
                    <PostBodyAsArrayComponent post={post}/>
                </Col>
        }
    </Row>;
};

PostMarkerInfoBoxContentComponent.propTypes = {
    post: PropTypes.oneOfType(POST_ENTITIES.map(PropTypes.instanceOf)).isRequired,
    title: PropTypes.string.isRequired,
    style: PropTypes.object,
    isLoading: PropTypes.bool
};

export class PostMarkerInfoBoxComponent extends PureComponent {
    get postInfoBoxElementId() {
        return `marker-info-box--${this.props.post.uid}`;
    }

    get postInfoBoxElement() {
        return document.getElementsByClassName(this.postInfoBoxElementId)[0];
    }

    get width() {
        const postElement = this.postInfoBoxElement;
        return postElement
            ? postElement.clientWidth
            : Math.round(window.innerWidth * 3 / 4);
    }

    get height() {
        const postElement = this.postInfoBoxElement;
        return postElement
            ? postElement.clientHeight
            : Math.round(window.innerHeight * 3 / 4);
    }

    get scaledHeight() {
        return this.height;
    }

    get title() {
        return this.props.post.title || "Untitled";
    }

    render() {
        const {onVisibilityToggle, post, store, anchor} = this.props;

        if (!anchor) {
            return null;
        }

        return <InfoWindow
            anchor={anchor}
            onCloseClick={onVisibilityToggle}
            pixelOffset={[-1 * this.width / 2, -1 * this.height / 2]}
            maxWidth={Math.round(window.innerWidth * 3 / 4)}
        >
            <div
                className={`marker-info-box marker-info-box__${post.type} ${this.postInfoBoxElementId}`}
                style={{backgroundColor: "white"}}
            >
                <Provider store={store}>
                    <PostMarkerInfoBoxContentComponent
                        post={post}
                        title={this.title}
                        style={{
                            maxWidth: Math.round(window.innerWidth * 3 / 4)
                        }}
                    />
                </Provider>
            </div>
        </InfoWindow>;
    }
}

PostMarkerInfoBoxComponent.propTypes = {
    post: PropTypes.oneOfType(POST_ENTITIES.map(PropTypes.instanceOf)).isRequired,
    isVisible: PropTypes.bool.isRequired,
    onVisibilityToggle: PropTypes.func.isRequired,
    store: PropTypes.object.isRequired,
    anchor: PropTypes.object
};

export class PhotoMarkerInfoBoxComponent extends PostMarkerInfoBoxComponent {
    get selected() {
        return this.props.post.getSizedPhotoForDisplay(this.targetWidth);
    }

    get scaledHeight() {
        return Math.min(
            Math.round(this.width * this.selected.height / this.selected.width),
            Math.round(window.innerHeight * 3 / 4)
        );
    }

    get scaledWidth() {
        return Math.round(this.scaledHeight * this.selected.width / this.selected.height);
    }

    get targetWidth() {
        return Math.round(scalePixelValueForWindowDevicePixelRatio(this.width));
    }

    render() {
        const {onVisibilityToggle, post, store, anchor} = this.props;
        const placeholder = post.getSizedPhotoForLoading(this.targetWidth);
        const selected = post.getSizedPhotoForDisplay(this.targetWidth);

        if (!anchor) {
            return null;
        }

        return <ProgressiveImage src={selected.url} placeholder={placeholder.url}>
            {
                (source, isLoading) => <InfoWindow
                    anchor={anchor}
                    onCloseClick={onVisibilityToggle}
                    pixelOffset={[-1 * this.scaledWidth / 2, -1 * this.scaledHeight / 2]}
                    maxWidth={this.scaledWidth}
                >
                    <div
                        className={["marker-info-box", `marker-info-box__${post.type}`, this.postInfoBoxElementId].join(" ")}
                        style={{
                            backgroundImage: isLoading
                                ? `linear-gradient(to top right,rgba(0,0,0,0.67),rgba(0,0,0,0.33)),url(${source})`
                                : `url(${source})`,
                            backgroundColor: isLoading
                                ? "white"
                                : null
                        }}
                    >
                        <Provider store={store}>
                            <PostMarkerInfoBoxContentComponent
                                isLoading={isLoading}
                                post={post}
                                title={this.title}
                                style={{
                                    height: this.scaledHeight,
                                    width: this.scaledWidth
                                }}
                            />
                        </Provider>
                    </div>
                </InfoWindow>
            }
        </ProgressiveImage>;
    }
}

PhotoMarkerInfoBoxComponent.propTypes = {
    post: PropTypes.oneOfType(POST_ENTITIES.map(PropTypes.instanceOf)).isRequired,
    isVisible: PropTypes.bool.isRequired,
    onVisibilityToggle: PropTypes.func.isRequired,
    anchor: PropTypes.object
};

const renderPostMarkerInfoBoxComponentForPost = ({post, isVisible, onVisibilityToggle, ...props}) => {
    if (!isVisible) {
        return null;
    }

    switch (post.type) {
        case Gallery.type:
        case Photo.type:
            return <PhotoMarkerInfoBoxComponent
                post={post}
                visible={isVisible}
                onVisibilityToggle={() => onVisibilityToggle(!isVisible)}
                {...props}
            />;

        case Post.type:
        default:
            return <PostMarkerInfoBoxComponent
                post={post}
                visible={isVisible}
                onVisibilityToggle={() => onVisibilityToggle(!isVisible)}
                {...props}
            />;
    }
};

renderPostMarkerInfoBoxComponentForPost.propTypes = {
    post: PropTypes.oneOfType(POST_ENTITIES.map(PropTypes.instanceOf)).isRequired,
    isVisible: PropTypes.bool.isRequired,
    onVisibilityToggle: PropTypes.func.isRequired
};

export const buildPostMarkerId = post => `marker--${post.uid}`;

// NOTE-RT: `@vis.gl/react-google-maps`'s `InfoWindow` is anchored to a marker *instance* (a
// sibling, not a `Marker` child like the old `InfoBox`), so the marker instance is captured via
// `ref`/local state here and threaded down into `renderPostMarkerInfoBoxComponentForPost` as
// `anchor`. The same ref callback also reports the marker instance to `setMarkerRef` (when
// present, i.e. when rendered as a child of `GoogleMapMarkerClustererComponent`) for clustering.
export const PostMarkerComponent = ({post, isVisible, onVisibilityToggle, setMapCenter, setMarkerRef, ...props}) => {
    const [markerInstance, setMarkerInstance] = useState(null);
    const handleMarkerRef = useCallback(marker => {
        setMarkerInstance(marker);

        if (setMarkerRef) {
            setMarkerRef(marker, buildPostMarkerId(post));
        }
    }, [setMarkerRef, post]);

    return <ReactReduxContext.Consumer>
        {
            ({store}) => (
                <>
                    <Marker
                        ref={handleMarkerRef}
                        icon={{
                            path: getSvgPathForPost(post),
                            fillColor: "#ec7500",
                            fillOpacity: 1,
                            scale: 0.05,
                            strokeWeight: 1
                        }}
                        title={post.title}
                        position={{
                            lat: post.lat,
                            lng: post.long
                        }}
                        onClick={() => {
                            setMapCenter({
                                lat: post.lat,
                                lng: post.long
                            });
                            onVisibilityToggle(!isVisible);
                        }}
                    />
                    {renderPostMarkerInfoBoxComponentForPost({post, isVisible, onVisibilityToggle, store, anchor: markerInstance, ...props})}
                </>
            )
        }
    </ReactReduxContext.Consumer>;
};

PostMarkerComponent.defaultProps = {
    isVisible: false
};

PostMarkerComponent.propTypes = {
    post: PropTypes.oneOfType(POST_ENTITIES.map(PropTypes.instanceOf)).isRequired,
    isVisible: PropTypes.bool.isRequired,
    onVisibilityToggle: PropTypes.func.isRequired,
    setMapCenter: PropTypes.func.isRequired,
    setMarkerRef: PropTypes.func
};

export default PostMarkerComponent;
