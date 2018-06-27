import {postsSelectors} from "./posts";

export const posts = state => postsSelectors(state.posts);

export default {
	posts
};
