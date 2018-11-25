import {Photo as PhotoEntity} from "@randy.tarampi/js";
import SchemaJsonLdComponent from "@randy.tarampi/schema-dot-org-json-ld-components";
import isHtml from "is-html";
import {DateTime} from "luxon";
import PropTypes from "prop-types";
import React, {Fragment} from "react";
import {Col, Row} from "react-materialize";
import ProgressiveImage from "react-progressive-image";
import {WINDOW_LARGE_BREAKPOINT, WINDOW_LARGE_PHOTO_SCALE} from "../util";
import {CampaignLink, InternalLink} from "./link";
import {PostComponent} from "./post";

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
                backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" version="1.1" style="display:none"><defs><filter id="filter-blur-1"> <feGaussianBlur stdDeviation="5"/></filter></defs></svg>'), linear-gradient(to top right, rgba(0,0,0,0.67), rgba(0,0,0,0.33)), url(${placeholder})`
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
                <h1 className="post-title">
                    <CampaignLink className="post-title__link"
                                  href={post.sourceUrl}>{this.title}</CampaignLink>
                </h1>
            </Col>
            <Col
                className="post-metadata hide-on-small-only hide-on-large-only"
                m={12}
                style={{
                    backgroundImage: `url(${source})`,
                    height: this.scaledHeight
                }}
            >
                <PostMetadataContent post={post} title={this.title}/>
            </Col>
            <Col
                className="post-metadata hide-on-med-and-down"
                l={4}
            >
                <PostMetadataContent post={post} title={this.title}/>
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

export const PostMetadataContent = ({post, title}) => <Fragment>
    <h1 className="post-title">
        <CampaignLink className="post-title__link"
                      href={post.sourceUrl}>{title}</CampaignLink>
    </h1>
    {
        typeof post.body === "string" && post.body !== "" ?
            <div className="post-body">
                {
                    isHtml(post.body)
                        ? <div className="post-body__html">
                            <div dangerouslySetInnerHTML={{__html: post.body}}/>
                        </div>
                        : <p>
                                        <span className="post-body__text"
                                              dangerouslySetInnerHTML={{__html: post.body}}/>
                        </p>
                }
            </div> :
            null
    }
    {
        Array.isArray(post.body) ?
            post.body.map((htmlString, index) => {
                return <div className="post-body"
                            key={`${post.id}:${post.type}:body:${index}`}>
                    {
                        isHtml(htmlString)
                            ? <div className="post-body__html">
                                <div dangerouslySetInnerHTML={{__html: htmlString}}/>
                            </div>
                            : <p>
                                            <span className="post-body__text"
                                                  dangerouslySetInnerHTML={{__html: htmlString}}/>
                            </p>
                    }
                </div>;
            }) :
            null
    }
    {
        post.datePublished
            ? <Fragment>
                <p className="post-date">
                    <strong
                        className="post-date__label post-date__label--published">Posted:</strong>
                    <span
                        className="post-date__date post-date__date--published">{post.datePublished.toLocaleString(DateTime.DATE_MED)}</span>
                    {
                        post.creator ?
                            <CampaignLink className="post-source__link"
                                          href={post.creator.url}>{post.creator.username} on {post.source}</CampaignLink>

                            : null
                    }
                </p>
            </Fragment>
            : null
    }
    {
        post.dateCreated && post.dateCreated.valueOf() !== post.datePublished.valueOf() ?
            <p className="post-date">
                <strong className="post-date__label post-date__label--created">Taken:</strong>
                <span
                    className="post-date__date post-date__date--created">{post.dateCreated.toLocaleString(DateTime.DATETIME_MED)}</span>
            </p> :
            null
    }
    {
        post.tags && post.tags.size
            ? <p className="post-tags hide-on-med-and-down">
                <strong className="post-tags__label">Tags:</strong>
                {
                    post.tags.map(tag => <Fragment key={tag}><InternalLink className="post-tags__tag"
                                                                           href={`${__POSTS_APP_URL__}/tags/${tag}`}>{tag}</InternalLink>
                    </Fragment>)
                }
            </p>
            : null
    }
</Fragment>;

PostMetadataContent.propTypes = {
    post: PropTypes.instanceOf(PhotoEntity).isRequired,
    placeholder: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired
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
