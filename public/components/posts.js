import Posts from "me.common.jsx/lib/posts";

class PostsComponent extends Posts {
	get fetchUrl() {
		return `/words?page=${this.page}`;
	}
}

export default PostsComponent;
