import {Photo as PhotoEntity} from "@randy.tarampi/js";
import Link from "./link";
import PropTypes from "prop-types";
import React, {Fragment} from "react";
import Dimensions from "react-dimensions";
import {Col, Row} from "react-materialize";
import {PostComponent} from "./post";
import isHtml from "is-html";

export class PhotoComponent extends PostComponent {
    get width() {
        return this.selected.width;
    }

    get height() {
        return this.selected.height;
    }

    get scaledHeight() {
        return this.containerWidth * this.height / this.width;
    }

    get selected() {
        const targetWidth = window.devicePixelRatio ?
            this.containerWidth * window.devicePixelRatio :
            this.containerWidth;
        return this.props.post.getSizedPhoto(targetWidth);
    }

    render() {
        return <Row
            className="photo"
            id={this.props.post.uid}
            style={{
                backgroundImage: `url(${this.selected.url})`,
                backgroundSize: "cover",
                height: this.scaledHeight
            }}
        >
            <Col
                className="photo-metadata hide-on-med-and-up"
            >
                <h1 className="photo-title">
                    <Link className="photo-title__link" href={this.props.post.sourceUrl}><span
                        className="photo-text">{this.title}</span></Link>
                </h1>
            </Col>
            <Col
                className="photo-metadata hide-on-small-and-down"
                l={4}
            >
                <h1 className="photo-title">
                    <Link className="photo-title__link" href={this.props.post.sourceUrl}><span
                        className="photo-text">{this.title}</span></Link>
                </h1>
                {
                    typeof this.props.post.body === "string" && this.props.post.body !== "" ?
                        <p className="photo-body">
                            {
                                isHtml(this.props.post.body)
                                    ? <div dangerouslySetInnerHTML={{__html: this.props.post.body}}></div>
                                    : <span className="photo-text" dangerouslySetInnerHTML={{__html: this.props.post.body}}/>
                            }
                        </p> :
                        null
                }
                {
                    Array.isArray(this.props.post.body) ?
                        this.props.post.body.map((htmlString, index) => {
                            return <p className="photo-body"
                                      key={`${this.props.post.id}:${this.props.post.type}:body:${index}`}>
                                    {
                                        isHtml(htmlString)
                                            ? <div dangerouslySetInnerHTML={{__html: htmlString}}></div>
                                            : <span className="photo-text" dangerouslySetInnerHTML={{__html: htmlString}}/>
                                    }
                            </p>;
                        }) :
                        null
                }
                {
                    this.props.post.datePublished || this.props.post.dateCreated ?
                        <p className="photo-date">
                            {
                                this.props.post.dateCreated && this.props.post.dateCreated.valueOf() !== this.props.post.datePublished.valueOf() ?
                                    <Fragment>
                                        <strong className="photo-text">Taken:</strong>
                                        <span className="photo-text">{this.props.post.dateCreated.format("LL")}</span>
                                    </Fragment> :
                                    null
                            }
                            {
                                this.props.post.datePublished ?
                                    <Fragment>
                                        <strong className="photo-text">Posted:</strong>
                                        <span className="photo-text">{this.props.post.datePublished.format("LL")}</span>
                                    </Fragment> :
                                    null
                            }
                        </p> :
                        null
                }
                <p className="photo-source">
                    <strong className="photo-text">More:</strong>
                    <Link className="photo-source__link" href={this.selected.url}><span
                        className="photo-text">Source</span></Link>
                    {
                        this.props.post.creator ?
                            <Link className="photo-source__link" href={this.props.post.creator.sourceUrl}><span
                                className="photo-text">{this.props.post.creator.username} on {this.props.post.source}</span></Link> :
                            null
                    }
                </p>
            </Col>
        </Row>;
    }
}

PhotoComponent.propTypes = {
    post: PropTypes.instanceOf(PhotoEntity).isRequired
};

export default Dimensions({
    elementResize: true
})(PhotoComponent);
