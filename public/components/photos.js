import Photo from "../../photos/photo";
import PhotoComponent from "./photo";
import autobind from "react-autobind";
import Infinite from "react-infinite";
import Dimensions from "react-dimensions";
import Spinner from "react-spinkit";
import React from "react";
import fetch from "isomorphic-fetch";

class PhotosComponent extends React.Component {
	constructor(props, context, updater) {
		super(props, context, updater);

		this.state = {
			page: 1,
			isLoading: false,
			photos: []
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
		this.fetch = fetch(`/photos?page=${this.state.page}`)
			.then((response) => {
				return response.json();
			})
			.then((photos) => {
				that.setState({
					photos: that.photos.concat(photos.map(Photo.fromJSON)),
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

	get photos() {
		return this.state.photos;
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
			elementHeight={
				this.photos.map((photo) => {
					return this.props.containerWidth * photo.height / photo.width;
				})
			}
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
				this.photos.map((photo) => {
					return <PhotoComponent
						key={`${photo.photoSource}-${photo.id}`}
						photo={photo}
					/>;
				})
			}
		</Infinite>;
	}
}

export default Dimensions({
	elementResize: true
})(PhotosComponent);
