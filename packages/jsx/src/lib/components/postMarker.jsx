import {Gallery, Photo, Post, POST_ENTITIES} from "@randy.tarampi/js";
import PropTypes from "prop-types";
import React, {PureComponent, useCallback, useState} from "react";
import {Marker} from "@vis.gl/react-google-maps";
import {Col, Row} from "react-materialize";
import ProgressiveImage from "react-progressive-image";
import {Provider, ReactReduxContext} from "react-redux";
import {getSvgPathForPost} from "../util/index.js";
import {
    PostBodyAsArrayComponent,
    PostBodyAsStringComponent,
    PostDateCreatedComponent,
    PostDatePublishedComponent,
    PostTagsComponent,
    PostTitleComponent
} from "./post.jsx";
import GooglePostCardOverlay, {derivePostCardDimensions, derivePostCardTargetWidth} from "./map/google/postCardOverlay.jsx";

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
    get title() {
        return this.props.post.title || "Untitled";
    }

    render() {
        const {onVisibilityToggle, post, store, anchor, dimensions} = this.props;

        if (!anchor) {
            return null;
        }

        return <GooglePostCardOverlay anchor={anchor} {...dimensions}>
            <div
                className={`marker-info-box marker-info-box__${post.type}`}
                style={{backgroundColor: "white", maxWidth: "75vw", maxHeight: "75vh", overflow: "auto"}}
            >
                <button type="button" className="marker-info-box-close" aria-label="Close post card" onClick={() => onVisibilityToggle(false)}>×</button>
                <Provider store={store}>
                    <PostMarkerInfoBoxContentComponent
                        post={post}
                        title={this.title}
                        style={{maxWidth: "75vw", maxHeight: "75vh"}}
                    />
                </Provider>
            </div>
        </GooglePostCardOverlay>;
    }
}

PostMarkerInfoBoxComponent.propTypes = {
    post: PropTypes.oneOfType(POST_ENTITIES.map(PropTypes.instanceOf)).isRequired,
    isVisible: PropTypes.bool.isRequired,
    onVisibilityToggle: PropTypes.func.isRequired,
    store: PropTypes.object.isRequired,
    anchor: PropTypes.object,
    dimensions: PropTypes.shape({width: PropTypes.number, height: PropTypes.number}).isRequired
};

export class PhotoMarkerInfoBoxComponent extends PostMarkerInfoBoxComponent {
    render() {
        const {onVisibilityToggle, post, store, anchor, dimensions, selected, placeholder} = this.props;

        if (!anchor) {
            return null;
        }

        return <ProgressiveImage src={selected.url} placeholder={placeholder.url}>
            {
                (source, isLoading) => <GooglePostCardOverlay anchor={anchor} isPhoto {...dimensions}>
                    <div
                        className={["marker-info-box", `marker-info-box__${post.type}`].join(" ")}
                        style={{
                            width: dimensions.width,
                            height: dimensions.height,
                            backgroundImage: isLoading
                                ? `linear-gradient(to top right,rgba(0,0,0,0.67),rgba(0,0,0,0.33)),url(${source})`
                                : `url(${source})`,
                            backgroundColor: isLoading
                                ? "white"
                                : null
                        }}
                    >
                        <button type="button" className="marker-info-box-close" aria-label="Close post card" onClick={() => onVisibilityToggle(false)}>×</button>
                        <Provider store={store}>
                            <PostMarkerInfoBoxContentComponent
                                isLoading={isLoading}
                                post={post}
                                title={this.title}
                            />
                        </Provider>
                    </div>
                </GooglePostCardOverlay>
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

    const isPhoto = [Gallery.type, Photo.type].includes(post.type);
    const selected = isPhoto
        ? post.getSizedPhotoForDisplay(derivePostCardTargetWidth({
            viewportWidth: window.innerWidth,
            devicePixelRatio: window.devicePixelRatio || 1
        }))
        : null;
    const selectedMedia = selected && {
        url: selected.url,
        width: selected.width > 0 ? selected.width : post.width,
        height: selected.height > 0 ? selected.height : post.height
    };

    switch (post.type) {
        case Gallery.type:
        case Photo.type:
            if (!selectedMedia?.url) {
                return <PostMarkerInfoBoxComponent
                    post={post}
                    visible={isVisible}
                    onVisibilityToggle={() => onVisibilityToggle(!isVisible)}
                    dimensions={derivePostCardDimensions({viewportWidth: window.innerWidth, viewportHeight: window.innerHeight, contentLength: String(post.title || "").length + String(post.body || "").length})}
                    {...props}
                />;
            }

            return <PhotoMarkerInfoBoxComponent
                post={post}
                visible={isVisible}
                onVisibilityToggle={() => onVisibilityToggle(!isVisible)}
                selected={selectedMedia}
                placeholder={post.getSizedPhotoForLoading() || selectedMedia}
                dimensions={derivePostCardDimensions({
                    photo: selectedMedia,
                    viewportWidth: window.innerWidth,
                    viewportHeight: window.innerHeight
                })}
                isPhoto
                {...props}
            />;

        case Post.type:
        default:
            return <PostMarkerInfoBoxComponent
                post={post}
                visible={isVisible}
                onVisibilityToggle={() => onVisibilityToggle(!isVisible)}
                dimensions={derivePostCardDimensions({viewportWidth: window.innerWidth, viewportHeight: window.innerHeight, contentLength: String(post.title || "").length + String(post.body || "").length})}
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
export const PostMarkerComponent = ({post, isVisible = false, onVisibilityToggle, setMapCenter, setMarkerRef, ...props}) => {
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


PostMarkerComponent.propTypes = {
    post: PropTypes.oneOfType(POST_ENTITIES.map(PropTypes.instanceOf)).isRequired,
    isVisible: PropTypes.bool.isRequired,
    onVisibilityToggle: PropTypes.func.isRequired,
    setMapCenter: PropTypes.func.isRequired,
    setMarkerRef: PropTypes.func
};

export default PostMarkerComponent;
