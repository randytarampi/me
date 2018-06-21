import fetch from "isomorphic-fetch";
import _ from "lodash";
import {Photo, Post} from "me.common.js";
import PropTypes from "prop-types";
import React, {Component} from "react";
import Dimensions from "react-dimensions";
import Infinite from "react-infinite";
import PhotoComponent from "./photo";
import PostComponent from "./post";

export class PostsComponent extends Component {
	constructor(props, context, updater) {
		super(props, context, updater);

		this.state = {
			page: 1,
			isLoading: false,
			posts: []
		};
		this.fetch = null;

		this.load = this.load.bind(this);
		this.elementInfiniteLoad = this.elementInfiniteLoad.bind(this);
	}

	load() {
		if (this.fetch) {
			return;
		}

		this.isLoading = true;
		this.fetch = fetch(this.fetchUrl) // NOTE-RT: Something like `/posts?page=${this.page}`
			.then((response) => {
				return response.json();
			})
			.then((posts) => {
				this.setState({
					posts: _.uniqBy(this.posts.concat(posts.map((postJson) => {
						const Constructor = getEntityForType(postJson.type);
						return Constructor.fromJSON(postJson);
					})), "uid"),
					page: this.state.page + 1,
					isLoading: false
				});
				this.fetch = null;
			});
	}

	get fetchUrl() {
		return `/posts?page=${this.page}`;
	}

	get page() {
		return this.state.page;
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
		return this.posts.map((post) => {

			if (post.height && post.width) {
				return this.props.containerWidth * post.height / post.width;
			}

			if (post._lastHeight && post._lastWidth) {
				return this.props.containerWidth * post._lastHeight / post._lastWidth;
			}

			if (document.getElementById(post.uid)) {
				return document.getElementById(post.uid).clientHeight;
			}

			return window.innerHeight;
		});
	}

	elementInfiniteLoad () {
		return <div className="infinite-list-item">
			Loading...
		</div>;
	}

	render() {
		return <div>
			<Infinite
				useWindowAsScrollContainer={true}
				elementHeight={this.elementHeights}
				infiniteLoadBeginEdgeOffset={Infinite.containerHeightScaleFactor(0.05).amount}
				onInfiniteLoad={this.load}
				isInfiniteLoading={this.isLoading}
				loadingSpinnerDelegate={this.elementInfiniteLoad()}
			>
				{
					this.posts.map((post) => {
						const Constructor = getComponentForType(post.type);
						return <Constructor
							key={post.uid}
							post={post}
						/>;
					})
				}
			</Infinite>
		</div>;
	}
}
PostsComponent.propTypes = {
	containerWidth: PropTypes.number
};

//FIXME-RT: This and `getComponentForType`, strike me as inelegant. Are there other ways of doing this?
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
