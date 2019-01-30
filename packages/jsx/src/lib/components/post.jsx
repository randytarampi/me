import {Post, POST_ENTITIES, POST_OVERRIDING_TAG_SENTINEL_REGEX} from "@randy.tarampi/js";
import SchemaJsonLdComponent from "@randy.tarampi/schema-dot-org-json-ld-components";
import isHtml from "is-html";
import {DateTime} from "luxon";
import PropTypes from "prop-types";
import React, {Fragment, PureComponent} from "react";
import {Marker} from "react-google-maps";
import {Col, Row} from "react-materialize";
import {connect} from "react-redux";
import {updateMapCreator} from "../actions";
import {CampaignLink, getBrandedLinkForNetwork, InternalLink} from "./link";
import {MapComponent} from "./map";

export class PostComponent extends PureComponent {
    get postElement() {
        return document.getElementById(this.props.post.uid);
    }

    get width() {
        const postElement = this.postElement;
        return postElement ? postElement.clientWidth : this.props.containerHeight;
    }

    get height() {
        const postElement = this.postElement;
        return postElement ? postElement.clientHeight : this.props.containerWidth;
    }

    get metadataWidth() {
        const postElement = this.postElement;
        const metadataColumnElement = postElement && postElement.querySelector(".post-metadata");
        return metadataColumnElement ? metadataColumnElement.clientWidth : this.width;
    }

    get metadataHeight() {
        const postElement = this.postElement;
        const metadataColumnElement = postElement && postElement.querySelector(".post-metadata");
        return metadataColumnElement ? metadataColumnElement.clientHeight : this.height;
    }

    get contentHeight() {
        const postElement = this.postElement;
        const contentColumnElement = postElement && postElement.querySelector(".post-content");
        return contentColumnElement ? contentColumnElement.clientHeight : this.height;
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
                <PostLocationComponent post={post}/>
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
    post: PropTypes.instanceOf(Post).isRequired,
    containerWidth: PropTypes.number,
    containerHeight: PropTypes.number
};

export const PostTitleComponent = ({post, title}) =>
    <h1 className="post-title">
        {
            post.sourceUrl ?
                <CampaignLink className="post-title__link" href={post.sourceUrl} text={title}/> :
                <span className="post-title__text">{title}</span>
        }
    </h1>;

PostTitleComponent.propTypes = {
    post: PropTypes.oneOfType(POST_ENTITIES.map(PropTypes.instanceOf)).isRequired,
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
    post: PropTypes.oneOfType(POST_ENTITIES.map(PropTypes.instanceOf)).isRequired
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
    post: PropTypes.oneOfType(POST_ENTITIES.map(PropTypes.instanceOf)).isRequired
};

export const PostDatePublishedComponent = ({post, label}) => {
    let postSourceLink = null;

    if (post.creator) {
        const PostSourceLinkComponent = getBrandedLinkForNetwork(post.source);
        const sourceName = post.creator.username || post.creator.name;
        const sourceAttribution = `${sourceName} on ${post.source}`;

        if (PostSourceLinkComponent) {
            postSourceLink = <PostSourceLinkComponent
                className="post-source__link"
                href={post.creator.url}
                username={post.creator.username}
                text={sourceAttribution}
            >
                {sourceName} on <span className="post-source__source-name">{post.source}</span>
            </PostSourceLinkComponent>;
        } else {
            postSourceLink = <CampaignLink
                className="post-source__link"
                href={post.creator.url}
                text={sourceAttribution}
            />;
        }
    }

    return post.datePublished
        ? <p className="post-date">
            <strong
                className="post-date__label post-date__label--published">{label}</strong>
            <span
                className="post-date__date post-date__date--published">{post.datePublished.toLocaleString(DateTime.DATE_MED)}</span>
            {
                postSourceLink
            }
        </p>
        : null;
};

PostDatePublishedComponent.propTypes = {
    label: PropTypes.string.isRequired,
    post: PropTypes.oneOfType(POST_ENTITIES.map(PropTypes.instanceOf)).isRequired
};

PostDatePublishedComponent.defaultProps = {
    label: "Posted:"
};

export const PostDateCreatedComponent = ({post, label}) => {
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
    post: PropTypes.oneOfType(POST_ENTITIES.map(PropTypes.instanceOf)).isRequired,
    label: PropTypes.string.isRequired
};

PostDateCreatedComponent.defaultProps = {
    label: "Drafted:"
};

export const PostTagsComponent = ({post, tagLinkBase = `${__POSTS_APP_URL__}/tags`}) => {
    return post.tags && post.tags.size
        ? <p className="post-tags hide-on-med-and-down">
            <strong className="post-tags__label">Tags:</strong>
            {
                post.tags
                    .filter(tag => !tag.match(POST_OVERRIDING_TAG_SENTINEL_REGEX))
                    .map(
                        tag => <Fragment key={tag}><InternalLink
                            className="post-tags__tag"
                            href={`${tagLinkBase}/${tag}`}
                        >
                            {tag}
                        </InternalLink> </Fragment> // NOTE-RT: We need this ` ` between the `</InternalLink>` and the `</Fragment>` because Safari (Webkit?) seems to collapse `&#0032;` and not insert line breaks between each `<Fragment>` but doesn't with ` `
                    )
            }
        </p>
        : null;
};

PostTagsComponent.propTypes = {
    tagLinkBase: PropTypes.string,
    post: PropTypes.oneOfType(POST_ENTITIES.map(PropTypes.instanceOf)).isRequired
};

export const PostMapComponent = ({post, mapContainerHeight, children, ...props}) => {
    return Number.isFinite(post.lat) && Number.isFinite(post.long)
        ? <div className="post-map">
            <MapComponent
                mapContainerHeight={mapContainerHeight}
                defaultZoom={17}
                defaultCenter={{lat: post.lat, lng: post.long}}
                {...props}
            >
                {
                    children
                        ? children
                        : <Marker position={{lat: post.lat, lng: post.long}}/>
                }
            </MapComponent>
        </div>
        : null;
};

PostMapComponent.propTypes = {
    post: PropTypes.oneOfType(POST_ENTITIES.map(PropTypes.instanceOf)).isRequired,
    mapContainerHeight: PropTypes.number,
    contentHeight: PropTypes.number,
    metadataHeight: PropTypes.number
};

const PostLocationComponentInternal = ({post, setMapPostsCenter}) => {
    if (post.locationCreated) {
        const postCoordinates = post.locationCreated.coordinates && post.locationCreated.coordinates.toString();
        const postLocationName = post.locationCreated.name;
        const postAddress = post.locationCreated.address;

        return <p className="post-location hide-on-med-and-down">
            <InternalLink
                className="link--branded post-location__link"
                href="/map"
                onClick={setMapPostsCenter}
                serviceName={
                    postLocationName
                    || postAddress
                    || postCoordinates
                }
                serviceType="map-post"
            />
        </p>;
    }

    return null;
};

PostLocationComponentInternal.propTypes = {
    post: PropTypes.oneOfType(POST_ENTITIES.map(PropTypes.instanceOf)).isRequired,
    setMapPostsCenter: PropTypes.func.isRequired
};

export const PostLocationComponent = connect(
    null,
    (dispatch, {post, mapId}) => {
        return {
            setMapPostsCenter: () => dispatch(updateMapCreator({
                id: mapId,
                center: {
                    lat: post.lat,
                    lng: post.long
                },
                bounds: null,
                zoom: 18
            }))
        };
    }
)(PostLocationComponentInternal);

PostLocationComponent.propTypes = {
    post: PropTypes.oneOfType(POST_ENTITIES.map(PropTypes.instanceOf)).isRequired,
    mapId: PropTypes.string.isRequired
};

PostLocationComponent.defaultProps = {
    mapId: "map-posts"
};

export default PostComponent;
