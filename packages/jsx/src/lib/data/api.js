import {fromJS, Map} from "immutable";
import {createSelector} from "reselect";
import {REHYDRATE} from "redux-persist";
import {
    FETCHING_POSTS,
    FETCHING_POSTS_CANCELLED,
    FETCHING_POSTS_FAILURE,
    FETCHING_POSTS_FAILURE_RECOVERY,
    FETCHING_POSTS_SUCCESS
} from "../actions/posts/fetchPosts.js";

export const apiReducer = (state = Map(), action) => {
    switch (action.type) {
        // NOTE: redux-persist may rehydrate a stale api slice from a previous
        // session; its cursors predate this page load, so drop them.
        case REHYDRATE:
            return Map();

        case FETCHING_POSTS: {
            const currentFetchUrlState = state.get(action.payload.fetchUrl) || Map();
            const queryFingerprint = buildQueryFingerprintForSearchParams(action.payload.searchParams);
            const storedFingerprint = currentFetchUrlState.get("queryFingerprint") || null;

            // A cursor only continues the query that produced it. When a new
            // fetch issues a different query against the same URL, drop the
            // stored cursor (and the previous query's error) instead of
            // poisoning the new request with it.
            const baseState = storedFingerprint !== queryFingerprint
                ? Map()
                : currentFetchUrlState.delete("error");

            return state.set(action.payload.fetchUrl, fromJS({
                ...baseState.toJS(),
                queryFingerprint,
                isLoading: true
            }));
        }

        case FETCHING_POSTS_CANCELLED:
        case FETCHING_POSTS_FAILURE_RECOVERY: {
            const currentFetchUrlState = state.get(action.payload.fetchUrl) || Map();

            const nextState = {
                ...currentFetchUrlState.toJS(),
                isLoading: false
            };
            if (Object.prototype.hasOwnProperty.call(action.payload, "nextCursor")) nextState.nextCursor = action.payload.nextCursor || null;
            if (Object.prototype.hasOwnProperty.call(action.payload, "hasMore")) nextState.hasMore = action.payload.hasMore;
            return state.set(action.payload.fetchUrl, fromJS(nextState));
        }

        case FETCHING_POSTS_FAILURE: {
            const currentFetchUrlState = state.get(action.payload.fetchUrl) || Map();

            return state.set(action.payload.fetchUrl, fromJS({
                ...currentFetchUrlState.toJS(),
                error: action.payload.error,
                isLoading: false,
                nextCursor: null
            }));
        }

        case FETCHING_POSTS_SUCCESS: {
            const currentFetchUrlState = state.get(action.payload.fetchUrl) || Map();
            const queryFingerprint = buildQueryFingerprintForSearchParams(action.payload.searchParams);
            const nextState = {
                ...currentFetchUrlState.toJS(),
                queryFingerprint,
                isLoading: false
            };

            if (Object.prototype.hasOwnProperty.call(action.payload, "nextCursor")) nextState.nextCursor = action.payload.nextCursor || null;
            if (Object.prototype.hasOwnProperty.call(action.payload, "hasMore")) nextState.hasMore = action.payload.hasMore;

            return state.set(action.payload.fetchUrl, fromJS(nextState));
        }

        default:
            return state;
    }
};

// V5 continuation tokens are bound to the complete DynamoDB query that
// produced them. Reuse a stored cursor only when the next request issues the
// exact same query (page size, filters, ordering — everything but the
// token itself); any difference starts a new query and drops the old cursor.
const buildQueryFingerprintForSearchParams = searchParams => {
    if (!searchParams) {
        return null;
    }

    const fingerprintParams = {...searchParams};
    delete fingerprintParams.continuationToken;
    return JSON.stringify(Object.keys(fingerprintParams).sort().reduce((sorted, key) => {
        sorted[key] = fingerprintParams[key];
        return sorted;
    }, {}));
};

export default apiReducer;

// NOTE-RT: Global selectors
export const getApiState = state => state;
export const getApiStateForUrl = (state, url) => {
    const apiState = getApiState(state);
    return apiState && apiState.get(url);
};

// NOTE-RT: Utility functions
export const isUrlStateLoading = urlState => urlState && urlState.get("isLoading");
export const getErrorForUrlState = urlState => urlState && urlState.get("error");
export const getApiStateForUrlFromGlobalState = (state, url) => getApiStateForUrl(state.get("api"), url);

// NOTE-RT: Private selectors for individual containers
export const createIsLoadingUrlSelector = () => createSelector(
    getApiStateForUrlFromGlobalState,
    isUrlStateLoading
);
export const createGetErrorForUrlSelector = () => createSelector(
    getApiStateForUrlFromGlobalState,
    getErrorForUrlState
);
