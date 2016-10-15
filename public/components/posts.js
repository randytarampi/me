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
					posts: that.posts.concat(posts.map((postJson) => {
						const Constructor = getEntityForType(postJson.type);
						return Constructor.fromJSON(postJson);
					})),
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

	render () {
		const that = this;
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
			elementHeight={
				this.posts.map((post) => {
					if (post.height && post.width) {
						return that.props.containerWidth * post.height / post.width;
					}

					if (that.refs[post.uid]) {
						return that.refs[post.uid].state.containerHeight;
					}

					return 500;
				})}
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
