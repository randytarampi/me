import Post from "../../blog/post";
import PostComponent from "./post";
import Photo from "../../blog/photo";
import PhotoComponent from "./photo";
import autobind from "react-autobind";
import Infinite from "react-infinite";
import Dimensions from "react-dimensions";
import Spinner from "react-spinkit";
import React from "react";
import fetch from "isomorphic-fetch";
import _ from "lodash";

class PostsComponent extends React.Component {
	constructor(props, context, updater) {
		super(props, context, updater);

		this.state = {
			page: 1,
			isLoading: false,
			posts: []
		};
		this.fetch = null;

		autobind(this);
	}

	load() {
		if (this.fetch) {
			return;
		}

		const that = this;
		this.isLoading = true;
		this.fetch = fetch(`/blog?page=${this.state.page}`)
			.then((response) => {
				return response.json();
			})
			.then((posts) => {
				that.setState({
					posts: _.uniqBy(that.posts.concat(posts.map((postJson) => {
						const Constructor = getEntityForType(postJson.type);
						return Constructor.fromJSON(postJson);
					})), "uid"),
					page: that.state.page + 1,
					isLoading: false
				});
				that.fetch = null;
			});
	}

	get isLoading() {
		return !!this.state.isLoading;
	}

	set isLoading(isLoading) {
		this.setState({isLoading: isLoading});
	}

	get posts() {
		return this.state.posts;
	}

	get elementHeights() {
		const that = this;
		return this.posts.map((post) => {

			if (post.height && post.width) {
				return that.props.containerWidth * post.height / post.width;
			}

			if (post._lastHeight && post._lastWidth) {
				return that.props.containerWidth * post._lastHeight / post._lastWidth;
			}

			if (document.getElementById(post.uid)) {
				return document.getElementById(post.uid).clientHeight;
			}

			return 0;
		});
	}

	render () {
		const FullPageSpinner = Dimensions({
			elementResize: true,
			containerStyle: {
				margin: 0,
				padding: 0,
				border: 0,
				height: window.innerHeight
			}
		})(Spinner);

		return <Infinite
			useWindowAsScrollContainer={true}
			elementHeight={this.elementHeights}
			infiniteLoadBeginEdgeOffset={Infinite.containerHeightScaleFactor(0.05).amount}
			onInfiniteLoad={this.load}
			isInfiniteLoading={this.isLoading}
			loadingSpinnerDelegate={
				<FullPageSpinner
					spinnerName="rotating-plane"
					noFadeIn
				/>
			}
		>
			{
				this.posts.map((post) => {
					const Constructor = getComponentForType(post.type);
					return <Constructor
						key={post.uid}
						ref={post.uid}
						post={post}
					/>;
				})
			}
		</Infinite>;
	}
}

function getEntityForType(type) {
	switch (type) {
		case "Photo":
			return Photo;

		default:
		case "Post":
			return Post;
	}
}

function getComponentForType(type) {
	switch (type) {
		case "Photo":
			return PhotoComponent;

		default:
		case "Post":
			return PostComponent;
	}
}

export default Dimensions({
	elementResize: true
})(PostsComponent);
