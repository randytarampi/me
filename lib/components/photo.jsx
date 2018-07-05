/* global window */

import {Photo as PhotoEntity} from "me.common.js";
import PropTypes from "prop-types";
import React from "react";
import Dimensions from "react-dimensions";
import {Col, Row} from "react-materialize";
import {PostComponent} from "./post";

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
				className="photo-metadata hide-on-large-only"
			>
				<h1 className="photo-title">
					<a className="photo-title__link" href={this.props.post.sourceUrl}><span
						className="photo-text">{this.title}</span></a>
				</h1>
			</Col>
			<Col
				className="photo-metadata hide-on-small-and-down"
				l={4}
			>
				<h1 className="photo-title">
					<a className="photo-title__link" href={this.props.post.sourceUrl}><span
						className="photo-text">{this.title}</span></a>
				</h1>
				{
					typeof this.props.post.body === "string" && this.props.post.body !== "" ?
						<p className="photo-body">
							<span className="photo-text" dangerouslySetInnerHTML={{__html: this.props.post.body}}/>
						</p> :
						null
				}
				{
					Array.isArray(this.props.post.body) ?
						this.props.post.body.map((htmlString, index) => {
							return <p className="photo-body"
							          key={`${this.props.post.id}:${this.props.post.type}:body:${index}`}>
								<span className="photo-text" dangerouslySetInnerHTML={{__html: htmlString}}/>
							</p>;
						}) :
						null
				}
				{
					this.props.post.dateCreated && this.props.post.dateCreated.valueOf() !== this.props.post.datePublished.valueOf() ?
						<p className="photo-date-taken">
							<strong className="photo-text">Taken:</strong>
							<span className="photo-text">{this.props.post.dateCreated.format("LL")}</span>
						</p> :
						null
				}
				{
					this.props.post.datePublished ?
						<p className="photo-date-published">
							<strong className="photo-text">Posted:</strong>
							<span className="photo-text">{this.props.post.datePublished.format("LL")}</span>
						</p> :
						null
				}
				<p className="photo-source">
					<strong className="photo-text">More:</strong>
					<a className="photo-source__link" href={this.selected.url}><span
						className="photo-text">Source</span></a>
					{
						this.props.post.creator ?
							<a className="photo-source__link" href={this.props.post.creator.sourceUrl}><span
								className="photo-text">{this.props.post.creator.username} on {this.props.post.source}</span></a> :
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
