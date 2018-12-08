import {Photo as PhotoEntity} from "@randy.tarampi/js";
import SchemaJsonLdComponent from "@randy.tarampi/schema-dot-org-json-ld-components";
import PropTypes from "prop-types";
import React from "react";
import {Col, Row} from "react-materialize";
import ProgressiveImage from "react-progressive-image";
import {WINDOW_LARGE_BREAKPOINT, WINDOW_LARGE_PHOTO_SCALE} from "../util";
import {
    PostBodyAsArrayComponent,
    PostBodyAsStringComponent,
    PostComponent,
    PostDateCreatedComponent,
    PostDatePublishedComponent,
    PostTagsComponent,
    PostTitleComponent
} from "./post";

export class PhotoComponent extends PostComponent {
    get selected() {
        return this.props.post.getSizedPhotoForDisplay(this.targetWidth);
    }

    get scaledHeight() {
        return computeScaledHeight({
            containerWidth: this.props.containerWidth,
            photoHeight: this.selected.height,
            photoWidth: this.selected.width,
            postHtmlId: this.props.post.uid
        });
    }

    get targetWidth() {
        return computeTargetWidth(this.props);
    }

    render() {
        const {post, isLoading, source} = this.props;

        const rowClassName = ["post post--photo"];

        if (isLoading) {
            rowClassName.push("post--loading");
        }

        return <Row
            className={rowClassName.join(" ")}
            id={post.uid}
            style={{
                backgroundImage: `linear-gradient(to top right,rgba(0,0,0,0.67),rgba(0,0,0,0.33)),url(${source})`
            }}
        >
            <SchemaJsonLdComponent markup={post.toSchema()}/>
            <Col
                className="post-metadata hide-on-med-and-up"
                s={12}
                style={{
                    backgroundImage: `url(${source})`,
                    height: this.scaledHeight
                }}
            >
                <PostTitleComponent post={post} title={this.title}/>
            </Col>
            <Col
                className="post-metadata hide-on-small-only hide-on-large-only"
                m={12}
                style={{
                    backgroundImage: `url(${source})`,
                    height: this.scaledHeight
                }}
            >
                <PostTitleComponent post={post} title={this.title}/>
                <PostDatePublishedComponent post={post}/>
                <PostDateCreatedComponent post={post} label="Taken:"/>
                <PostBodyAsStringComponent post={post}/>
                <PostBodyAsArrayComponent post={post}/>
            </Col>
            <Col
                className="post-metadata hide-on-med-and-down"
                l={4}
            >
                <PostTitleComponent post={post} title={this.title}/>
                <PostBodyAsStringComponent post={post}/>
                <PostBodyAsArrayComponent post={post}/>
                <PostDatePublishedComponent post={post}/>
                <PostDateCreatedComponent post={post} label="Taken:"/>
                <PostTagsComponent post={post}/>
            </Col>
            <Col
                className="post-content hide-on-med-and-down"
                l={8}
                style={{
                    backgroundImage: `url(${source})`,
                    height: this.scaledHeight
                }}
            >
            </Col>
        </Row>;
    }
}

PhotoComponent.propTypes = {
    post: PropTypes.instanceOf(PhotoEntity).isRequired,
    source: PropTypes.string.isRequired,
    isLoading: PropTypes.bool.isRequired
};

export const computeScaledHeight = ({containerWidth, photoHeight, photoWidth, postHtmlId}) => {
    let scaledHeight = containerWidth * photoHeight / photoWidth;

    if (window.innerWidth >= WINDOW_LARGE_BREAKPOINT) {
        const photoElement = document.getElementById(postHtmlId);

        if (photoElement) {
            const metadataColumnElement = photoElement.querySelector(".post-metadata.l4");
            scaledHeight = Math.max(
                scaledHeight * WINDOW_LARGE_PHOTO_SCALE,
                photoElement && metadataColumnElement ? metadataColumnElement.clientHeight : 0
            );
        }
    }

    return scaledHeight;
};

export const computeTargetWidth = ({containerWidth}) => {
    return window.devicePixelRatio ?
        containerWidth * window.devicePixelRatio :
        containerWidth;
};

export const ProgressiveImageWrappedPhotoComponent = props => {
    const targetWidth = computeTargetWidth(props);
    const placeholder = props.post.getSizedPhotoForLoading(targetWidth);
    const selected = props.post.getSizedPhotoForDisplay(targetWidth);

    return <ProgressiveImage src={selected.url} placeholder={placeholder.url}>
        {
            (source, isLoading) => <PhotoComponent
                {...props}
                source={source}
                isLoading={isLoading}
            />
        }
    </ProgressiveImage>;
};

ProgressiveImageWrappedPhotoComponent.propTypes = {
    containerWidth: PropTypes.number.isRequired,
    post: PropTypes.instanceOf(PhotoEntity).isRequired
};

export default ProgressiveImageWrappedPhotoComponent;
