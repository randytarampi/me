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
        const targetWidth = window.devicePixelRatio ?
            this.props.containerWidth * window.devicePixelRatio :
            this.props.containerWidth;
        return this.props.post.getSizedPhotoForDisplay(targetWidth);
    }

    get scaledHeight() {
        let scaledHeight = this.props.containerWidth * this.selected.height / this.selected.width;

        if (window.innerWidth >= WINDOW_LARGE_BREAKPOINT) {
            const photoElement = document.getElementById(this.props.post.uid);
            scaledHeight = Math.max(scaledHeight * WINDOW_LARGE_PHOTO_SCALE, photoElement ? photoElement.querySelector(".post-metadata.l4").clientHeight : 0);
        }

        return scaledHeight;
    }

    render() {
        const {post, isLoading, source, placeholder} = this.props;

        const rowClassName = ["post post--photo"];

        if (isLoading) {
            rowClassName.push("post--loading");
        }

        return <Row
            className={rowClassName.join(" ")}
            id={post.uid}
            style={{
                backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" version="1.1" style="display:none"><defs><filter><feGaussianBlur stdDeviation="5"/></filter></defs></svg>'),linear-gradient(to top right,rgba(0,0,0,0.67),rgba(0,0,0,0.33)),url(${placeholder})`
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
    placeholder: PropTypes.string.isRequired,
    source: PropTypes.string.isRequired,
    isLoading: PropTypes.bool.isRequired
};

export const ProgressiveImageWrappedPhotoComponent = props => {
    const targetWidth = window.devicePixelRatio ?
        props.containerWidth * window.devicePixelRatio :
        props.containerWidth;
    const placeholder = props.post.getSizedPhotoForLoading(targetWidth);
    const selected = props.post.getSizedPhotoForDisplay(targetWidth);

    return <ProgressiveImage src={selected.url} placeholder={placeholder.url}>
        {
            (source, isLoading) => <PhotoComponent {...props} placeholder={placeholder.url} source={source}
                                                   isLoading={isLoading}/>
        }
    </ProgressiveImage>;
};

ProgressiveImageWrappedPhotoComponent.propTypes = {
    containerWidth: PropTypes.number.isRequired,
    post: PropTypes.instanceOf(PhotoEntity).isRequired
};

export default ProgressiveImageWrappedPhotoComponent;
