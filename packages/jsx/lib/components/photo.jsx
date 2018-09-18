import {Photo as PhotoEntity} from "@randy.tarampi/js";
import SchemaJsonLdComponent from "@randy.tarampi/schema-dot-org-json-ld-components";
import isHtml from "is-html";
import {DateTime} from "luxon";
import PropTypes from "prop-types";
import React, {Fragment} from "react";
import {Col, Row} from "react-materialize";
import ProgressiveImage from "react-progressive-image";
import Link from "./link";
import {PostComponent} from "./post";

export class PhotoComponent extends PostComponent {
    get width() {
        return this.selected.width;
    }

    get height() {
        return this.selected.height;
    }

    get selected() {
        const targetWidth = window.devicePixelRatio ?
            this.containerWidth * window.devicePixelRatio :
            this.containerWidth;
        return this.props.post.getSizedPhotoForDisplay(targetWidth);
    }

    render() {
        const rowClassName = ["post post--photo"];

        if (this.props.isLoading) {
            rowClassName.push("post--loading");
        }

        return <Row
            className={rowClassName.join(" ")}
            id={this.props.post.uid}
            style={{
                backgroundImage: `url(${this.props.source})`,
                height: this.scaledHeight
            }}
        >
            <SchemaJsonLdComponent markup={this.props.post.toSchema()}/>
            <Col
                className="post-metadata hide-on-med-and-up"
            >
                <h1 className="post-title">
                    <Link className="post-title__link" href={this.props.post.sourceUrl}>{this.title}</Link>
                </h1>
            </Col>
            <Col
                className="post-metadata hide-on-small-and-down"
                l={4}
            >
                <h1 className="post-title">
                    <Link className="post-title__link" href={this.props.post.sourceUrl}>{this.title}</Link>
                </h1>
                {
                    typeof this.props.post.body === "string" && this.props.post.body !== "" ?
                        <div className="post-body">
                            {
                                isHtml(this.props.post.body)
                                    ? <div className="post-body__html"><div dangerouslySetInnerHTML={{__html: this.props.post.body}}></div></div>
                                    : <p>
                                        <span className="post-body__text"
                                              dangerouslySetInnerHTML={{__html: this.props.post.body}}/>
                                    </p>
                            }
                        </div> :
                        null
                }
                {
                    Array.isArray(this.props.post.body) ?
                        this.props.post.body.map((htmlString, index) => {
                            return <div className="post-body"
                                        key={`${this.props.post.id}:${this.props.post.type}:body:${index}`}>
                                {
                                    isHtml(htmlString)
                                        ? <div className="post-body__html"><div dangerouslySetInnerHTML={{__html: htmlString}}></div></div>
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
                    this.props.post.datePublished ?
                        <p className="post-date">
                            <strong
                                className="post-date__label post-date__label--published">Posted:</strong>
                            <span
                                className="post-date__date post-date__date--published">{this.props.post.datePublished.toLocaleString(DateTime.DATE_MED)}</span>
                        </p> :
                        null
                }
                {
                    this.props.post.dateCreated && this.props.post.dateCreated.valueOf() !== this.props.post.datePublished.valueOf() ?
                        <p className="post-date">
                            <strong className="post-date__label post-date__label--created">Taken:</strong>
                            <span
                                className="post-date__date post-date__date--created">{this.props.post.dateCreated.toLocaleString(DateTime.DATETIME_MED)}</span>
                        </p> :
                        null
                }
                <p className="post-source">
                    <Link className="post-source__link" href={this.props.post.sourceUrl}>View on {this.props.post.source}</Link>
                    {
                        this.props.post.creator ?
                            <Link className="post-source__link"
                                  href={this.props.post.creator.url}>{this.props.post.creator.username} on {this.props.post.source}</Link> :
                            null
                    }
                </p>
            </Col>
        </Row>;
    }
}

PhotoComponent.propTypes = {
    post: PropTypes.instanceOf(PhotoEntity).isRequired,
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
            (source, isLoading) => <PhotoComponent {...props} source={source} isLoading={isLoading}/>
        }
    </ProgressiveImage>;
};

ProgressiveImageWrappedPhotoComponent.propTypes = {
    containerWidth: PropTypes.number.isRequired,
    post: PropTypes.instanceOf(PhotoEntity).isRequired,
};

export default ProgressiveImageWrappedPhotoComponent;
