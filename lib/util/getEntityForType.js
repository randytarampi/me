import {Photo, Post} from "me.common.js";

export default type => {
	switch (type) {
		case "Photo":
			return Photo;

		default:
		case "Post":
			return Post;
	}
};
