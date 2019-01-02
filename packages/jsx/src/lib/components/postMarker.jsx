import {Gallery, Photo, Post} from "@randy.tarampi/js";
import PropTypes from "prop-types";
import React, {PureComponent} from "react";
import {Marker} from "react-google-maps";
import InfoBox from "react-google-maps/lib/components/addons/InfoBox";
import {Col, Row} from "react-materialize";
import {getSvgPathForPost, scalePixelValueForWindowDevicePixelRatio} from "../util";
import {
    PostBodyAsArrayComponent,
    PostBodyAsStringComponent,
    PostDateCreatedComponent,
    PostDatePublishedComponent,
    PostTagsComponent,
    PostTitleComponent
} from "./post";

export const PostMarkerInfoBoxContentComponent = ({post, title, style}) => <Row className="marker-info-box-post" style={style}>
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
    <Col className="marker-info-box-post-content" s={12}>
        <PostBodyAsStringComponent post={post}/>
        <PostBodyAsArrayComponent post={post}/>
    </Col>
</Row>;

PostMarkerInfoBoxContentComponent.propTypes = {
    post: PropTypes.oneOfType([Post, Photo, Gallery].map(PropTypes.instanceOf)).isRequired,
    title: PropTypes.string.isRequired,
    style: PropTypes.object
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
            : Math.ceil(window.innerWidth * 3 / 4);
    }

    get height() {
        const postElement = this.postInfoBoxElement;
        return postElement
            ? postElement.clientHeight
            : Math.ceil(window.innerHeight * 3 / 4);
    }

    get scaledHeight() {
        return this.height;
    }

    get title() {
        return this.props.post.title || "Untitled";
    }

    render() {
        const {onVisibilityToggle, isVisible, post} = this.props;

        return <InfoBox
            onCloseClick={onVisibilityToggle}
            defaultOptions={{
                infoBoxClearance: 20,
                enableEventPropagation: true,
                boxClass: `marker-info-box marker-info-box__${post.type} ${this.postInfoBoxElementId}`,
                pixelOffset: {
                    width: 10,
                    height: 10
                }
            }}
            defaultVisible={false}
            visible={isVisible}
        >
            <PostMarkerInfoBoxContentComponent
                post={post}
                title={this.title}
                style={{
                    maxWidth: Math.ceil(window.innerWidth * 3 / 4)
                }}
            />
        </InfoBox>;
    }
}

PostMarkerInfoBoxComponent.propTypes = {
    post: PropTypes.oneOfType([Post, Photo, Gallery].map(PropTypes.instanceOf)).isRequired,
    isVisible: PropTypes.bool.isRequired,
    onVisibilityToggle: PropTypes.func.isRequired
};

export class PhotoMarkerInfoBoxComponent extends PostMarkerInfoBoxComponent {
    get selected() {
        return this.props.post.getSizedPhotoForDisplay(this.targetWidth);
    }

    get scaledHeight() {
        return Math.min(
            Math.ceil(this.width * this.selected.height / this.selected.width),
            Math.ceil(window.innerHeight * 3 / 4)
        );
    }

    get scaledWidth() {
        return Math.ceil(this.scaledHeight * this.selected.width / this.selected.height);
    }

    get targetWidth() {
        return Math.ceil(scalePixelValueForWindowDevicePixelRatio(this.width));
    }

    render() {
        const {onVisibilityToggle, isVisible, post} = this.props;

        return <InfoBox
            onCloseClick={onVisibilityToggle}
            defaultOptions={{
                infoBoxClearance: 20,
                enableEventPropagation: true,
                boxClass: `marker-info-box marker-info-box__${post.type} ${this.postInfoBoxElementId}`,
                pixelOffset: {
                    width: 10,
                    height: 10
                },
                boxStyle: {
                    backgroundImage: `url(${this.selected.url})`
                },
                maxWidth: this.scaledWidth
            }}
            defaultVisible={false}
            visible={isVisible}
        >
            <PostMarkerInfoBoxContentComponent
                post={post}
                title={this.title}
                style={{
                    height: this.scaledHeight,
                    width: this.scaledWidth
                }}
            />
        </InfoBox>;
    }
}

PhotoMarkerInfoBoxComponent.propTypes = {
    post: PropTypes.oneOfType([Post, Photo, Gallery].map(PropTypes.instanceOf)).isRequired,
    isVisible: PropTypes.bool.isRequired,
    onVisibilityToggle: PropTypes.func.isRequired
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

export const buildPostMarkerId = post => `marker--${post.uid}`;

export const PostMarkerComponent = ({post, isVisible, onVisibilityToggle, ...props}) => <Marker
    className={`marker marker__${post.type} ${buildPostMarkerId(post)}`}
    id={buildPostMarkerId(post)}
    icon={{
        path: getSvgPathForPost(post),
        fillColor: "#ec7500",
        fillOpacity: 1,
        scale: 0.05,
        strokeWeight: 1
    }}
    title={post.title}
    defaultPosition={{
        lat: post.lat,
        lng: post.long
    }}
    onClick={() => onVisibilityToggle(!isVisible)}
>
    {renderPostMarkerInfoBoxComponentForPost({post, isVisible, onVisibilityToggle, ...props})}
</Marker>;

PostMarkerComponent.defaultProps = {
    isVisible: false
};

PostMarkerComponent.propTypes = {
    post: PropTypes.oneOfType([Post, Photo, Gallery].map(PropTypes.instanceOf)).isRequired,
    isVisible: PropTypes.bool.isRequired,
    onVisibilityToggle: PropTypes.func.isRequired
};

export default PostMarkerComponent;
