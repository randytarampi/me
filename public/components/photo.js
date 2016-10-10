import Dimensions from "react-dimensions";
import React from "react";
import {Grid, Cell} from "react-mdl";

class Photo extends React.Component {
	constructor(props, context, updater) {
		super(props, context, updater);

		this.state = {
			template: this.props.photo
		};
	}

	get width() {
		return this.selected.width;
	}

	get height() {
		return this.selected.height;
	}

	get containerWidth() {
		return this.props.containerWidth;
	}

	get containerHeight() {
		return this.props.containerHeight;
	}

	get scaledHeight() {
		return this.containerWidth * this.height / this.width;
	}

	get template() {
		return this.state.template;
	}

	get selected() {
		const targetWidth = window.devicePixelRatio ?
			this.containerWidth * window.devicePixelRatio :
			this.containerWidth;
		return this.template.getSizedPhoto(targetWidth);
	}

	get name() {
		return this.template.name || "Untitled";
	}

	render () {
		return <Grid
				className="photo"
				id={`${this.template.photoSource}-${this.template.id}`}
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
					<a className="photo-title__link" href={this.template.sourceUrl}><span className="photo-text">{this.name}</span></a>
				</h1>
			</Cell>
			<Cell
				className="photo-metadata"
				hidePhone
				col={4}
			>
				<h1 className="photo-title">
					<a className="photo-title__link" href={this.template.sourceUrl}><span className="photo-text">{this.name}</span></a>
				</h1>
				{
					this.template.dateTaken && this.template.dateTaken.valueOf() !== this.template.datePublished.valueOf() ?
						<p className="photo-date-taken">
							<strong className="photo-text">Taken:</strong>
							<span className="photo-text">{this.template.dateTaken.format("LLLL")}</span>
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
				{
					this.template.description ?
						<p className="photo-description">
							<span className="photo-text">{this.template.description}</span>
						</p> :
						null
				}
				<p className="photo-source">
					<strong className="photo-text">More:</strong>
					<a className="photo-source__link" href={this.selected.url}><span className="photo-text">Source</span></a>
					{
						this.template.creator ?
							<a className="photo-source__profile-link" href={this.template.creator.sourceUrl}><span className="photo-text">{this.template.creator.username} on {this.template.photoSource}</span></a> :
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
