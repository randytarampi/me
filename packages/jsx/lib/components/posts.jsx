import {Post as PostEntity} from "@randy.tarampi/js";
import PropTypes from "prop-types";
import React, {Component} from "react";
import Dimensions from "react-dimensions";
import Infinite from "react-infinite";
import {Col, Row} from "react-materialize";
import LoadingSpinner from "../components/loadingSpinner";
import computePostHeight from "../util/computePostHeight";
import getComponentForType from "../util/getComponentForType";

export class PostsComponent extends Component {
	render() {
		return <Infinite
			useWindowAsScrollContainer={true}
			elementHeight={this.props.posts ? this.props.posts.map(computePostHeight(this.props.containerWidth)) : [500]}
			infiniteLoadBeginEdgeOffset={Infinite.containerHeightScaleFactor(0.05).amount}
			onInfiniteLoad={this.props.fetchPosts}
			isInfiniteLoading={this.props.isLoading}
			loadingSpinnerDelegate={<Row className="loading-spinner-row valign-wrapper">
				<Col className="loading-spinner-col center" s={12}>
					<LoadingSpinner/>
				</Col>
			</Row>}
		>
			{
				this.props.posts
					? this.props.posts.map(post => {
						const Constructor = getComponentForType(post.type);
						return <Constructor key={post.uid} post={post}/>;
					})
					: <div/>
			}
		</Infinite>;
	}
}

PostsComponent.propTypes = {
	containerWidth: PropTypes.number,
	fetchPosts: PropTypes.func.isRequired,
	isLoading: PropTypes.bool,
	posts: PropTypes.arrayOf(PostEntity)
};

PostsComponent.defaultProps = {
	isLoading: false
};

export default Dimensions({
	elementResize: true
})(PostsComponent);
