import {Post as PostEntity} from "@randy.tarampi/js";
import SchemaJsonLdComponent from "@randy.tarampi/schema-dot-org-json-ld-components";
import isHtml from "is-html";
import {DateTime} from "luxon";
import PropTypes from "prop-types";
import React, {Component} from "react";
import {Col, Row} from "react-materialize";
import {CampaignLink} from "./link";

export class PostComponent extends Component {
    get width() {
        const postElement = document.getElementById(this.props.post.uid);
        return postElement ? postElement.clientWidth : this.props.containerHeight;
    }

    get height() {
        const postElement = document.getElementById(this.props.post.uid);
        return postElement ? postElement.clientHeight : this.props.containerWidth;
    }

    get containerHeight() {
        return this.props.containerHeight;
    }

    get containerWidth() {
        return this.props.containerWidth;
    }

    get scaledHeight() {
        return Math.round(this.containerWidth * this.height / this.width);
    }

    get title() {
        return this.props.post.title || "Untitled";
    }

    get date() {
        return this.props.post.datePublished;
    }

    render() {
        return <Row
            className="post post--words"
            id={this.props.post.uid}
        >
            <SchemaJsonLdComponent markup={this.props.post.toSchema()}/>
            <Col
                className="post-metadata"
                s={12}
                l={4}
            >
                <h1 className="post-title">
                    {
                        this.props.post.sourceUrl ?
                            <CampaignLink className="post-title__link"
                                          href={this.props.post.sourceUrl}>{this.title}</CampaignLink> :
                            <span className="post-title__text">{this.title}</span>
                    }
                </h1>
                <p className="post-date">
                    <strong className="post-date__label post-date__label--published">Posted:</strong>
                    <span
                        className="post-date__date post-date__date--published">{this.date.toLocaleString(DateTime.DATE_MED)}</span>
                </p>
                {
                    this.props.post.dateCreated ?
                        <p className="post-date">
                            <strong className="post-date__label post-date__label--created">Created:</strong>
                            <span
                                className="post-date__date post-date__date--created">{this.props.post.dateCreated.toLocaleString(DateTime.DATETIME_MED)}</span>
                        </p> :
                        null
                }
            </Col>
            <Col
                className="post-content"
                s={12}
                l={8}
            >
                {
                    typeof this.props.post.body === "string"
                        ? <div className="post-body">
                            {
                                isHtml(this.props.post.body)
                                    ? <div className="post-body__html">
                                        <div dangerouslySetInnerHTML={{__html: this.props.post.body}}/>
                                    </div>
                                    : <p><span className="post-body__text">{this.props.post.body}</span></p>
                            }
                        </div> :
                        null
                }
                {
                    Array.isArray(this.props.post.body)
                        ? this.props.post.body.map((maybeHtmlString, index) => {
                            return <div className="post-body" key={index}>
                                {
                                    isHtml(maybeHtmlString)
                                        ? <div className="post-body__html">
                                            <div dangerouslySetInnerHTML={{__html: maybeHtmlString}}/>
                                        </div>
                                        : <p><span className="post-body__text">{maybeHtmlString}</span></p>
                                }
                            </div>;
                        })
                        : null
                }
            </Col>
        </Row>;
    }
}

PostComponent.propTypes = {
    post: PropTypes.instanceOf(PostEntity).isRequired,
    containerWidth: PropTypes.number,
    containerHeight: PropTypes.number
};

export default PostComponent;
