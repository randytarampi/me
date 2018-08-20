import {getError, getErrorCode, getErrorMessage, getErrorState, hasError} from "./error";
import {postsSelectors} from "./posts";

export const posts = state => postsSelectors(state.posts);

export default {
    hasError: state => hasError(state.error),
    getError: state => getError(state.error),
    getErrorCode: state => getErrorCode(state.error),
    getErrorMessage: state => getErrorMessage(state.error),
    getErrorState: state => getErrorState(state.error),
    posts
};
