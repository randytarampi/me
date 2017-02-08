import {Post} from "./post";
import Dimensions from "react-dimensions";
import React from "react";
import {Grid, Cell} from "react-mdl";

export class Photo extends Post {
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
		return <Grid
				className="photo"
				id={this.template.uid}
				shadow={1}
				style={{
					backgroundImage: `url(${this.selected.url})`,
					backgroundSize: "cover",
					height: this.scaledHeight
				}}
			>
			<Cell
				className="photo-metadata"
				hideDesktop
				hideTablet
				col={4}
			>
				<h1 className="photo-title">
					<a className="photo-title__link" href={this.template.sourceUrl}><span className="photo-text">{this.title}</span></a>
				</h1>
			</Cell>
			<Cell
				className="photo-metadata"
				hidePhone
				col={4}
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
							<span className="photo-text">{this.template.dateCreated.format("LLLL")}</span>
						</p> :
						null
				}
				{
					this.template.datePublished ?
						<p className="photo-date-published">
							<strong className="photo-text">Posted:</strong>
							<span className="photo-text">{this.template.datePublished.format("LLLL")}</span>
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
			</Cell>
		</Grid>;
	}
}

export default Dimensions({
	elementResize: true
})(Photo);
