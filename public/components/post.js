import Dimensions from "react-dimensions";
import React from "react";
import {Grid, Cell} from "react-mdl";

class Post extends React.Component {
	constructor(props, context, updater) {
		super(props, context, updater);

		this.state = {
			template: this.props.post
		};
	}

	get width() {
		return this.containerWidth;
	}

	get height() {
		return this.containerHeight;
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

	get title() {
		return this.template.title || "Untitled";
	}

	get date() {
		return this.template.datePublished;
	}

	render () {
		return <Grid
				className="post"
				id={this.template.date}
				shadow={1}
			>
			<Cell
				className="post-metadata"
				col={12}
			>
				<h1 className="post-title">
					{
						this.template.url ?
							<a className="post-text" href={this.template.url}>{this.title}</a> :
							<span className="post-text">{this.title}</span>
					}
				</h1>
				<p className="post-date">
					<strong className="post-text">Posted:</strong>
					<span className="post-text">{this.date.format("LLLL")}</span>
					{
						this.template.dateModified ?
							<span>
								<strong className="post-text">Modified:</strong>
								<span className="post-text">{this.template.dateModified.format("LLLL")}</span>
							</span> :
							null
					}
				</p>
				{
					typeof this.template.body === "string" ?
						<div className="post-body" dangerouslySetInnerHTML={{__html: this.template.body}} /> :
						null
				}
				{
					Array.isArray(this.template.body) ?
						this.template.body.map((htmlString) => {
							return <div className="post-body">
								<span className="post-text" dangerouslySetInnerHTML={{__html: htmlString}} />
							</div>;
						}) :
						null
				}
			</Cell>
		</Grid>;
	}
}

export default Dimensions({
	elementResize: true
})(Post);
