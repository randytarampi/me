import PostEntity from "me.common.js/lib/post";
import PropTypes from "prop-types";
import React, {Component} from "react";
import Dimensions from "react-dimensions";
import {Col, Row} from "react-materialize";

export class PostComponent extends Component {
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

	componentWillUnmount() {
		this.template._lastHeight = this.containerHeight;
		this.template._lastWidth = this.containerWidth;
	}

	render() {
		return <Row
			className="post"
			id={this.template.uid}
		>
			<Col
				className="post-metadata"
				s={12}
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
					<span className="post-text">{this.date.format("LL")}</span>
					{
						this.template.dateCreated ?
							<span>
								<strong className="post-text">Modified:</strong>
								<span className="post-text">{this.template.dateCreated.format("LLLL")}</span>
							</span> :
							null
					}
				</p>
				{
					typeof this.template.body === "string" ?
						<div className="post-body" dangerouslySetInnerHTML={{__html: this.template.body}}/> :
						null
				}
				{
					Array.isArray(this.template.body) ?
						this.template.body.map((htmlString, index) => {
							return <div className="post-body" key={index}>
								<span className="post-text" dangerouslySetInnerHTML={{__html: htmlString}}/>
							</div>;
						}) :
						null
				}
			</Col>
		</Row>;
	}
}

PostComponent.propTypes = {
	post: PropTypes.instanceOf(PostEntity).isRequired,
	containerWidth: PropTypes.number,
	containerHeight: PropTypes.number
};

export default Dimensions({
	elementResize: true
})(PostComponent);
