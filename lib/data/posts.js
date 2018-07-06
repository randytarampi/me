import _ from "lodash";
import {FETCHING_POSTS, FETCHING_POSTS_FAILURE, FETCHING_POSTS_SUCCESS} from "../actions/fetchPosts";

export default (state = {}, action) => {
	switch (action.type) {
		case FETCHING_POSTS: {
			const currentFetchUrlState = state && state[action.payload.fetchUrl] || {
				posts: [],
				page: 1
			};

			return {
				...state,
				[action.payload.fetchUrl]: {
					...currentFetchUrlState,
					isLoading: true
				}
			};
		}

		case FETCHING_POSTS_FAILURE: {
			const currentFetchUrlState = state && state[action.payload.fetchUrl] || {
				posts: [],
				page: 1
			};

			return {
				...state,
				[action.payload.fetchUrl]: {
					...currentFetchUrlState,
					isLoading: false
				}
			};
		}

		case FETCHING_POSTS_SUCCESS: {
			const currentFetchUrlState = state && state[action.payload.fetchUrl] || {
				posts: []
			};
			const currentPosts = currentFetchUrlState.posts;
			return {
				...state,
				[action.payload.fetchUrl]: {
					...currentFetchUrlState,
					posts: _.sortBy(_.uniqBy(currentPosts.concat(action.payload.posts), "uid"), post => -1 * (post.dateCreated ? post.dateCreated.valueOf() : post.datePublished.valueOf())),
					page: action.payload.page,
					isLoading: false
				}
			};
		}

		default:
			return state;
	}
};

const selectPostsStateForFetchUrl = state => fetchUrl => state[fetchUrl] || {};
const getPostsForFetchUrl = state => fetchUrl => selectPostsStateForFetchUrl(state)(fetchUrl).posts;
const getPageForFetchUrl = state => fetchUrl => selectPostsStateForFetchUrl(state)(fetchUrl).page || 0;
const isLoadingFetchUrl = state => fetchUrl => selectPostsStateForFetchUrl(state)(fetchUrl).isLoading;

export const postsSelectors = state => {
	return {
		getPostsForFetchUrl: getPostsForFetchUrl(state),
		getPageForFetchUrl: getPageForFetchUrl(state),
		isLoadingFetchUrl: isLoadingFetchUrl(state),
		selectPostsStateForFetchUrl: selectPostsStateForFetchUrl(state)
	};
};
