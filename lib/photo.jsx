import {PostComponent} from "./post";
import Dimensions from "react-dimensions";
import React from "react";
import {Col, Row} from "react-materialize";

export class PhotoComponent extends PostComponent {
	constructor(props, context, updater) {
		super(props, context, updater);
	}

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
		return this.template.getSizedPhoto(targetWidth);
	}

	render () {
		return <Row
				className="photo"
				id={this.template.uid}
				style={{
					backgroundImage: `url(${this.selected.url})`,
					backgroundSize: "cover",
					height: this.scaledHeight
				}}
			>
			<Col
				className="photo-metadata show-on-medium-and-down"
				s={4}
				m={8}
			>
				<h1 className="photo-title">
					<a className="photo-title__link" href={this.template.sourceUrl}><span className="photo-text">{this.title}</span></a>
				</h1>
			</Col>
			<Col
				className="photo-metadata hide-on-med-and-down"
				l={4}
			>
				<h1 className="photo-title">
					<a className="photo-title__link" href={this.template.sourceUrl}><span className="photo-text">{this.title}</span></a>
				</h1>
				{
					typeof this.template.body === "string" && this.template.body !== "" ?
						<p className="photo-body">
							<span className="photo-text" dangerouslySetInnerHTML={{__html: this.template.body}}/>
						</p> :
						null
				}
				{
					Array.isArray(this.template.body) ?
						this.template.body.map((htmlString) => {
							return <p className="photo-body">
								<span className="photo-text" dangerouslySetInnerHTML={{__html: htmlString}} />
							</p>;
						}) :
						null
				}
				{
					this.template.dateCreated && this.template.dateCreated.valueOf() !== this.template.datePublished.valueOf() ?
						<p className="photo-date-taken">
							<strong className="photo-text">Taken:</strong>
							<span className="photo-text">{this.template.dateCreated.format("LL")}</span>
						</p> :
						null
				}
				{
					this.template.datePublished ?
						<p className="photo-date-published">
							<strong className="photo-text">Posted:</strong>
							<span className="photo-text">{this.template.datePublished.format("LL")}</span>
						</p> :
						null
				}
				<p className="photo-source">
					<strong className="photo-text">More:</strong>
					<a className="photo-source__link" href={this.selected.url}><span className="photo-text">Source</span></a>
					{
						this.template.creator ?
							<a className="photo-source__profile-link" href={this.template.creator.sourceUrl}><span className="photo-text">{this.template.creator.username} on {this.template.source}</span></a> :
							null
					}
				</p>
			</Col>
		</Row>;
	}
}

export default Dimensions({
	elementResize: true
})(PhotoComponent);
