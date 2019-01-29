import {Link} from "@randy.tarampi/js";
import SchemaJsonLdComponent from "@randy.tarampi/schema-dot-org-json-ld-components";
import isHtml from "is-html";
import PropTypes from "prop-types";
import React, {Fragment} from "react";
import {Col, Row} from "react-materialize";
import {CampaignLink} from "./link";
import {
    PostBodyAsArrayComponent,
    PostBodyAsStringComponent,
    PostComponent,
    PostDateCreatedComponent,
    PostDatePublishedComponent,
    PostLocationComponent,
    PostTagsComponent,
    PostTitleComponent
} from "./post";

export class LinkPostComponent extends PostComponent {
    get title() {
        return this.props.post.title || "🔗";
    }

    render() {
        const {post} = this.props;

        return <Row
            className="post post--link"
            id={post.uid}
        >
            <SchemaJsonLdComponent markup={post.toSchema()}/>
            <Col
                className="post-metadata"
                s={12}
                l={4}
            >
                <PostTitleComponent post={post} title={this.title}/>
                <PostDatePublishedComponent post={post} label={"Shared:"}/>
                <PostDateCreatedComponent post={post}/>
                <PostLocationComponent post={post}/>
                <PostTagsComponent post={post}/>
            </Col>
            <Col
                className="post-content"
                s={12}
                l={8}
            >
                <LinkPostTitleComponent post={post}/>
                <LinkPostBodyAsStringComponent post={post}/>
                <LinkPostBodyAsArrayComponent post={post}/>
                <PostBodyAsStringComponent post={post}/>
                <PostBodyAsArrayComponent post={post}/>
            </Col>
        </Row>;
    }
}

LinkPostComponent.propTypes = {
    post: PropTypes.oneOfType([Link].map(PropTypes.instanceOf)).isRequired
};

export const LinkPostTitleComponent = ({post}) =>
    <h3 className="post-link-title">
        <CampaignLink className="post-title__link" href={post.linkSourceUrl} text={post.linkTitle}/>
    </h3>;

LinkPostTitleComponent.propTypes = {
    post: PropTypes.oneOfType([Link].map(PropTypes.instanceOf)).isRequired
};

export const LinkPostBodyAsStringComponent = ({post}) => {
    return typeof post.linkBody === "string" && post.linkBody !== ""
        ? <div className="post-link-body">
            {
                isHtml(post.linkBody)
                    ? <div className="post-link-body__html">
                        <div dangerouslySetInnerHTML={{__html: post.linkBody}}/>
                    </div>
                    : <p>
                        <span className="post-link-body__text" dangerouslySetInnerHTML={{__html: post.linkBody}}/>
                    </p>
            }
        </div>
        : null;
};

LinkPostBodyAsStringComponent.propTypes = {
    post: PropTypes.oneOfType([Link].map(PropTypes.instanceOf)).isRequired
};

export const LinkPostBodyAsArrayComponent = ({post}) => {
    return Array.isArray(post.linkBody)
        ? <Fragment>
            {
                post.linkBody.map((htmlString, index) => {
                    return <div className="post-link-body"
                                key={`${post.id}:${post.type}:body:${index}`}>
                        {
                            isHtml(htmlString)
                                ? <div className="post-link-body__html">
                                    <div dangerouslySetInnerHTML={{__html: htmlString}}/>
                                </div>
                                : <p>
                                    <span className="post-link-body__text" dangerouslySetInnerHTML={{__html: htmlString}}/>
                                </p>
                        }
                    </div>;
                })
            }
        </Fragment>
        : null;
};

LinkPostBodyAsArrayComponent.propTypes = {
    post: PropTypes.oneOfType([Link].map(PropTypes.instanceOf)).isRequired
};

export default LinkPostComponent;
