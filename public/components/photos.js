import Posts from "me.common.jsx/lib/posts";

class PhotosComponent extends Posts {
	get fetchUrl() {
		return `/photos?page=${this.page}`;
	}
}

export default PhotosComponent;
