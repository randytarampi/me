import {Photo, Post} from "@randytarampi/js";

export default type => {
	switch (type) {
		case "Photo":
			return Photo;

		default:
		case "Post":
			return Post;
	}
};
