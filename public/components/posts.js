import Post from "../../words/post";
import PostComponent from "./post";
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
		this.fetch = fetch(`/words?page=${this.state.page}`)
			.then((response) => {
				return response.json();
			})
			.then((posts) => {
				that.setState({
					posts: that.posts.concat(posts.map(Post.fromJSON)),
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
			elementHeight={500}
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
					return <PostComponent
						key={`${post.postSource}-${post.id}`}
						post={post}
					/>;
				})
			}
		</Infinite>;
	}
}

export default Dimensions({
	elementResize: true
})(PostsComponent);
