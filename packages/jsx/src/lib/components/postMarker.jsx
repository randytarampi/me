import {Gallery, Photo, Post} from "@randy.tarampi/js";
import PropTypes from "prop-types";
import React, {PureComponent} from "react";
import {Marker} from "react-google-maps";
import InfoBox from "react-google-maps/lib/components/addons/InfoBox";
import {Col, Row} from "react-materialize";
import ProgressiveImage from "react-progressive-image";
import {getSvgPathForPost, scalePixelValueForWindowDevicePixelRatio} from "../util";
import {
    PostBodyAsArrayComponent,
    PostBodyAsStringComponent,
    PostDateCreatedComponent,
    PostDatePublishedComponent,
    PostTagsComponent,
    PostTitleComponent
} from "./post";

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
            [Photo, Gallery].includes(post.type)
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
    post: PropTypes.oneOfType([Post, Photo, Gallery].map(PropTypes.instanceOf)).isRequired,
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
            options={{
                infoBoxClearance: 20,
                enableEventPropagation: true,
                boxClass: `marker-info-box marker-info-box__${post.type} ${this.postInfoBoxElementId}`,
                pixelOffset: {
                    width: -1 * this.width / 2,
                    height: -1 * this.height / 2
                },
                boxStyle: {
                    backgroundColor: "white"
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
        const placeholder = post.getSizedPhotoForLoading(this.targetWidth);
        const selected = post.getSizedPhotoForDisplay(this.targetWidth);

        return <ProgressiveImage src={selected.url} placeholder={placeholder.url}>
            {
                (source, isLoading) => <InfoBox
                    onCloseClick={onVisibilityToggle}
                    options={{
                        infoBoxClearance: 20,
                        enableEventPropagation: true,
                        boxClass: ["marker-info-box", `marker-info-box__${post.type}`, this.postInfoBoxElementId].join(" "),
                        pixelOffset: {
                            width: -1 * this.scaledWidth / 2,
                            height: -1 * this.scaledHeight / 2
                        },
                        boxStyle: {
                            backgroundImage: isLoading
                                ? `linear-gradient(to top right,rgba(0,0,0,0.67),rgba(0,0,0,0.33)),url(${source})`
                                : `url(${source})`,
                            backgroundColor: isLoading
                                ? "white"
                                : null
                        },
                        maxWidth: this.scaledWidth
                    }}
                    defaultVisible={false}
                    visible={isVisible}
                >
                    <PostMarkerInfoBoxContentComponent
                        isLoading={isLoading}
                        post={post}
                        title={this.title}
                        style={{
                            height: this.scaledHeight,
                            width: this.scaledWidth
                        }}
                    />
                </InfoBox>
            }
        </ProgressiveImage>;
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

export const PostMarkerComponent = ({post, isVisible, onVisibilityToggle, setMapCenter, ...props}) => <Marker
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
    onClick={() => {
        setMapCenter({
            lat: post.lat,
            lng: post.long
        });
        onVisibilityToggle(!isVisible);
    }}
>
    {renderPostMarkerInfoBoxComponentForPost({post, isVisible, onVisibilityToggle, ...props})}
</Marker>;

PostMarkerComponent.defaultProps = {
    isVisible: false
};

PostMarkerComponent.propTypes = {
    post: PropTypes.oneOfType([Post, Photo, Gallery].map(PropTypes.instanceOf)).isRequired,
    isVisible: PropTypes.bool.isRequired,
    onVisibilityToggle: PropTypes.func.isRequired,
    setMapCenter: PropTypes.func.isRequired
};

export default PostMarkerComponent;
