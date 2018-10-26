import {fromJS, Map} from "immutable";
import {
    FETCHING_RESUME,
    FETCHING_RESUME_CANCELLED,
    FETCHING_RESUME_FAILURE_RECOVERY,
    FETCHING_RESUME_FAILURE,
    FETCHING_RESUME_SUCCESS
} from "../actions/fetchResume";

export const apiReducer = (state = Map(), action) => {
    switch (action.type) {
        case FETCHING_RESUME: {
            const currentFetchUrlState = state.get(action.payload.fetchUrl) || Map();

            return state.set(action.payload.fetchUrl, fromJS({
                ...currentFetchUrlState.toJS(),
                isLoading: true
            }));
        }

        case FETCHING_RESUME_CANCELLED:
        case FETCHING_RESUME_FAILURE_RECOVERY: {
            const currentFetchUrlState = state.get(action.payload.fetchUrl) || Map();

            return state.set(action.payload.fetchUrl, fromJS({
                ...currentFetchUrlState.toJS(),
                isLoading: false
            }));
        }

        case FETCHING_RESUME_FAILURE: {
            const currentFetchUrlState = state.get(action.payload.fetchUrl) || Map();

            return state.set(action.payload.fetchUrl, fromJS({
                ...currentFetchUrlState.toJS(),
                error: action.payload.error,
                isLoading: false
            }));
        }

        case FETCHING_RESUME_SUCCESS: {
            const currentFetchUrlState = state.get(action.payload.fetchUrl) || Map();

            return state.set(action.payload.fetchUrl, fromJS({
                ...currentFetchUrlState.toJS(),
                isLoading: false
            }));
        }

        default:
            return state;
    }
};

export default apiReducer;
