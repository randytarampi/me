import {Gallery as GalleryEntity} from "@randy.tarampi/js";
import SchemaJsonLdComponent from "@randy.tarampi/schema-dot-org-json-ld-components";
import PropTypes from "prop-types";
import React, {Fragment} from "react";
import {Carousel, Col, Row} from "react-materialize";
import ProgressiveImage from "react-progressive-image";
import {WINDOW_LARGE_BREAKPOINT} from "../util";
import {PhotoComponent} from "./photo";
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

    get carouselId() {
        return `${this.props.post.uid}-carousel`;
    }

    render() {
        return window.innerWidth >= WINDOW_LARGE_BREAKPOINT
            ? this._renderLarge()
            : this._renderSmall();
    }

    _renderSmall() {
        const {post} = this.props;

        const rowClassName = ["post post--gallery"];

        return <Row
            className={rowClassName.join(" ")}
            id={post.uid}
        >
            <SchemaJsonLdComponent markup={post.toSchema()}/>
            <Carousel
                options={{fullWidth: true, indicators: true, dist: 0}}
                carouselId={this.carouselId}
                style={{
                    height: this.scaledHeight
                }}
            >
                {
                    post.photos.map((photo, index) => {
                        const placeholder = photo.getSizedPhotoForLoading(this.targetWidth);
                        const selected = photo.getSizedPhotoForDisplay(this.targetWidth);
                        const title = `${this.title} (${index + 1}/${post.photos.size})`;

                        // NOTE-RT: Needs to be a `div` otherwise `react-materialize` can't cling onto these carousel items
                        return <div
                            key={`${post.uid}-${index}`}
                            style={{
                                height: this.scaledHeight
                            }}
                        >
                            <ProgressiveImage
                                src={selected.url}
                                placeholder={placeholder.url}
                            >
                                {
                                    (source, isLoading) => {
                                        const columnClassName = ["post-metadata"];

                                        if (isLoading) {
                                            columnClassName.push("post--loading");
                                        }

                                        return <Col
                                            className={columnClassName.join(" ")}
                                            s={12}
                                            style={{
                                                backgroundImage: `url(${source})`,
                                                height: this.scaledHeight
                                            }}
                                        >
                                            {
                                                index === 0
                                                    ? <Fragment>
                                                        <div className="post-metadata hide-on-med-and-up">
                                                            <PostTitleComponent post={post} title={title}/>
                                                        </div>
                                                        <div
                                                            className="post-metadata hide-on-small-only hide-on-large-only">
                                                            <PostTitleComponent post={post} title={title}/>
                                                            <PostDatePublishedComponent post={post}/>
                                                            <PostDateCreatedComponent post={post} label="Taken:"/>
                                                            <PostBodyAsStringComponent post={post}/>
                                                            <PostBodyAsArrayComponent post={post}/>
                                                        </div>
                                                    </Fragment>
                                                    : <div className="post-metadata">
                                                        <PostTitleComponent post={post} title={title}/>
                                                    </div>
                                            }

                                        </Col>;
                                    }
                                }
                            </ProgressiveImage>
                        </div>;
                    })
                }
            </Carousel>
        </Row>;
    }

    _renderLarge() {
        const {post} = this.props;
        const placeholder = post.largestPhoto.getSizedPhotoForLoading(this.targetWidth).url;

        const rowClassName = ["post post--gallery"];

        return <Row
            className={rowClassName.join(" ")}
            id={post.uid}
            style={{
                backgroundImage: `linear-gradient(to top right,rgba(0,0,0,0.67),rgba(0,0,0,0.33)),url(${placeholder})`
            }}
        >
            <SchemaJsonLdComponent markup={post.toSchema()}/>
            <Fragment>
                <Col
                    className="post-metadata"
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
                    className="post-content"
                    l={8}
                    style={{
                        height: this.scaledHeight
                    }}
                >
                    <Carousel options={{fullWidth: true, indicators: true, dist: 0}}
                              carouselId={this.carouselId}>
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

    resizeCarouselHeight() {
        const carouselElement = document.getElementById(this.carouselId); // NOTE-RT: `react-materialize` won't let me pass a `style` prop to `Carousel`, so we need to manually set this ourselves...
        const expectedCarouselElementHeight = `${this.scaledHeight}px`;

        if (carouselElement && carouselElement.style.height !== expectedCarouselElementHeight) {
            carouselElement.style.height = `${this.scaledHeight}px`;
        }
    }

    componentDidMount() {
        this.resizeCarouselHeight();
    }

    componentDidUpdate() {
        this.resizeCarouselHeight();
    }
}

GalleryComponent.propTypes = {
    post: PropTypes.instanceOf(GalleryEntity).isRequired
};

export default GalleryComponent;
