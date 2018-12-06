import {Post as PostEntity} from "@randy.tarampi/js";
import SchemaJsonLdComponent from "@randy.tarampi/schema-dot-org-json-ld-components";
import {Record} from "immutable";
import isHtml from "is-html";
import {DateTime} from "luxon";
import PropTypes from "prop-types";
import React, {Component, Fragment} from "react";
import {Col, Row} from "react-materialize";
import {CampaignLink, getBrandedLinkForNetwork, InternalLink} from "./link";

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
        const {post} = this.props;

        return <Row
            className="post post--words"
            id={post.uid}
        >
            <SchemaJsonLdComponent markup={post.toSchema()}/>
            <Col
                className="post-metadata"
                s={12}
                l={4}
            >
                <PostTitleComponent post={post} title={this.title}/>
                <PostDatePublishedComponent post={post}/>
                <PostDateCreatedComponent post={post}/>
                <PostTagsComponent post={post}/>
            </Col>
            <Col
                className="post-content"
                s={12}
                l={8}
            >
                <PostBodyAsStringComponent post={post}/>
                <PostBodyAsArrayComponent post={post}/>
            </Col>
        </Row>;
    }
}

PostComponent.propTypes = {
    post: PropTypes.instanceOf(PostEntity).isRequired,
    containerWidth: PropTypes.number,
    containerHeight: PropTypes.number
};

export const PostTitleComponent = ({post, title}) =>
    <h1 className="post-title">
        {
            post.sourceUrl ?
                <CampaignLink className="post-title__link"
                              href={post.sourceUrl}>{title}</CampaignLink> :
                <span className="post-title__text">{title}</span>
        }
    </h1>;

PostTitleComponent.propTypes = {
    post: PropTypes.instanceOf(Record).isRequired,
    title: PropTypes.string.isRequired
};

export const PostBodyAsStringComponent = ({post}) => {
    return typeof post.body === "string" && post.body !== ""
        ? <div className="post-body">
            {
                isHtml(post.body)
                    ? <div className="post-body__html">
                        <div dangerouslySetInnerHTML={{__html: post.body}}/>
                    </div>
                    : <p>
                        <span className="post-body__text" dangerouslySetInnerHTML={{__html: post.body}}/>
                    </p>
            }
        </div>
        : null;
};

PostBodyAsStringComponent.propTypes = {
    post: PropTypes.instanceOf(Record).isRequired
};

export const PostBodyAsArrayComponent = ({post}) => {
    return Array.isArray(post.body)
        ? <Fragment>
            {
                post.body.map((htmlString, index) => {
                    return <div className="post-body"
                                key={`${post.id}:${post.type}:body:${index}`}>
                        {
                            isHtml(htmlString)
                                ? <div className="post-body__html">
                                    <div dangerouslySetInnerHTML={{__html: htmlString}}/>
                                </div>
                                : <p>
                                    <span className="post-body__text" dangerouslySetInnerHTML={{__html: htmlString}}/>
                                </p>
                        }
                    </div>;
                })
            }
        </Fragment>
        : null;
};

PostBodyAsArrayComponent.propTypes = {
    post: PropTypes.instanceOf(Record).isRequired
};

export const PostDatePublishedComponent = ({post}) => {
    let postSourceLink = null;

    if (post.creator) {
        const PostSourceLinkComponent = getBrandedLinkForNetwork(post.source);

        if (PostSourceLinkComponent) {
            postSourceLink = <PostSourceLinkComponent
                className="post-source__link"
                href={post.creator.url}
                username={post.creator.username}
            />;
        } else {
            postSourceLink = <CampaignLink className="post-source__link" href={post.creator.url}>
                {post.creator.username} on {post.source}
            </CampaignLink>;
        }
    }

    return post.datePublished
        ? <p className="post-date">
            <strong
                className="post-date__label post-date__label--published">Posted:</strong>
            <span
                className="post-date__date post-date__date--published">{post.datePublished.toLocaleString(DateTime.DATE_MED)}</span>
            {
                postSourceLink
            }
        </p>
        : null;
};

PostDatePublishedComponent.propTypes = {
    post: PropTypes.instanceOf(Record).isRequired
};

export const PostDateCreatedComponent = ({post, label = "Drafted:"}) => {
    return post.dateCreated && post.dateCreated.valueOf() !== post.datePublished.valueOf()
        ? <p className="post-date">
            <strong className="post-date__label post-date__label--created">{label}</strong>
            <span className="post-date__date post-date__date--created">
                    {post.dateCreated.toLocaleString(DateTime.DATETIME_MED)}
                </span>
        </p>
        : null;
};

PostDateCreatedComponent.propTypes = {
    post: PropTypes.instanceOf(Record).isRequired,
    label: PropTypes.string
};

export const PostTagsComponent = ({post}) => {
    return post.tags && post.tags.size
        ? <p className="post-tags hide-on-med-and-down">
            <strong className="post-tags__label">Tags:</strong>
            {
                post.tags.map(
                    tag => <Fragment key={tag}><InternalLink
                        className="post-tags__tag"
                        href={`${__POSTS_APP_URL__}/tags/${tag}`}
                    >
                        {tag}
                    </InternalLink> </Fragment> // NOTE-RT: We need this ` ` between the `</InternalLink>` and the `</Fragment>` because Safari (Webkit?) seems to collapse `&#0032;` and not insert line breaks between each `<Fragment>` but doesn't with ` `
                )
            }
        </p>
        : null;
};

PostTagsComponent.propTypes = {
    post: PropTypes.instanceOf(Record).isRequired
};

export default PostComponent;
