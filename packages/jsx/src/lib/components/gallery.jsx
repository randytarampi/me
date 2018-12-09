import {Gallery as GalleryEntity} from "@randy.tarampi/js";
import SchemaJsonLdComponent from "@randy.tarampi/schema-dot-org-json-ld-components";
import PropTypes from "prop-types";
import React, {Fragment} from "react";
import {Carousel, Col, Row} from "react-materialize";
import ProgressiveImage from "react-progressive-image";
import {WINDOW_LARGE_BREAKPOINT} from "../util";
import {computeScaledHeight, PhotoComponent} from "./photo";
import {
    PostBodyAsArrayComponent,
    PostBodyAsStringComponent,
    PostDateCreatedComponent,
    PostDatePublishedComponent,
    PostTagsComponent,
    PostTitleComponent
} from "./post";

export class GalleryComponent extends PhotoComponent {
    get selected() {
        return this.props.post.largestPhoto.getSizedPhotoForDisplay(this.targetWidth);
    }

    render() {
        return window.innerWidth >= WINDOW_LARGE_BREAKPOINT
            ? this._renderLarge()
            : this._renderSmall();
    }

    _renderSmall() {
        const {post} = this.props;
        const photo = post.photos.first();

        const rowClassName = ["post post--gallery"];

        const placeholder = photo.getSizedPhotoForLoading(this.targetWidth);
        const selected = photo.getSizedPhotoForDisplay(this.targetWidth);
        const title = `${this.title} (1/${post.photos.size})`;

        return <Row
            className={rowClassName.join(" ")}
            key={`${post.uid}-0`}
            id={`${post.uid}-0`}
            style={{
                backgroundImage: `linear-gradient(to top right,rgba(0,0,0,0.67),rgba(0,0,0,0.33)),url(${this.selected.url})`
            }}
        >
            <SchemaJsonLdComponent markup={post.toSchema()}/>
            <ProgressiveImage src={selected.url} placeholder={placeholder.url}>
                {
                    (source, isLoading) => <Col
                        id={`${post.uid}-1`}
                        className={
                            ["post-metadata hide-on-large-only"]
                                .concat([isLoading ? "post--loading" : ""])
                                .join(" ")
                        }
                        s={12}
                        style={{
                            backgroundImage: `url(${source})`,
                            height: computeScaledHeight({
                                containerWidth: this.containerWidth,
                                photoWidth: selected.width,
                                photoHeight: selected.height,
                                postHtmlId: `${post.uid}-0`
                            })
                        }}
                    >
                        <div className="post-metadata hide-on-med-and-up">
                            <PostTitleComponent post={post} title={title}/>
                        </div>
                        <div className="post-metadata hide-on-small-only hide-on-large-only">
                            <PostTitleComponent post={post} title={title}/>
                            <PostDatePublishedComponent post={post}/>
                            <PostDateCreatedComponent post={post} label="Taken:"/>
                            <PostBodyAsStringComponent post={post}/>
                            <PostBodyAsArrayComponent post={post}/>
                        </div>
                    </Col>
                }
            </ProgressiveImage>
        </Row>;
    }

    _renderLarge() {
        const {post} = this.props;

        const rowClassName = ["post post--gallery"];

        return <Row
            className={rowClassName.join(" ")}
            id={post.uid}
            style={{
                backgroundImage: `linear-gradient(to top right,rgba(0,0,0,0.67),rgba(0,0,0,0.33)),url(${this.selected.url})`
            }}
        >
            <SchemaJsonLdComponent markup={post.toSchema()}/>
            <Fragment>
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
                        height: this.scaledHeight
                    }}
                >
                    <Carousel options={{fullWidth: true, indicators: true, dist: 0}}
                              carouselId={`${post.uid}-carousel`}>
                        {
                            post.photos.map((photo, index) => {
                                const placeholder = photo.getSizedPhotoForLoading(this.targetWidth);
                                const selected = photo.getSizedPhotoForDisplay(this.targetWidth);

                                // NOTE-RT: Needs to be a `div` otherwise `react-materialize` can't cling onto these carousel items
                                return <div key={`${post.uid}-${index}`}>
                                    <ProgressiveImage
                                        src={selected.url}
                                        placeholder={placeholder.url}
                                    >
                                        {
                                            (source, isLoading) => <img
                                                className={isLoading ? "post--loading" : ""}
                                                src={source}
                                                style={{
                                                    height: this.scaledHeight
                                                }}
                                            />
                                        }
                                    </ProgressiveImage>
                                </div>;
                            })
                        }
                    </Carousel>
                </Col>
            </Fragment>
        </Row>;
    }
}

GalleryComponent.propTypes = {
    post: PropTypes.instanceOf(GalleryEntity).isRequired
};

export default GalleryComponent;
