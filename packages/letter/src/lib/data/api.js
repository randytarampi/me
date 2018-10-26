import {fromJS, Map} from "immutable";
import {
    FETCHING_LETTER,
    FETCHING_LETTER_CANCELLED,
    FETCHING_LETTER_FAILURE,
    FETCHING_LETTER_FAILURE_RECOVERY,
    FETCHING_LETTER_SUCCESS
} from "../actions/fetchLetter";

export const apiReducer = (state = Map(), action) => {
    switch (action.type) {
        case FETCHING_LETTER: {
            const currentFetchUrlState = state.get(action.payload.fetchUrl) || Map();

            return state.set(action.payload.fetchUrl, fromJS({
                ...currentFetchUrlState.toJS(),
                isLoading: true
            }));
        }

        case FETCHING_LETTER_CANCELLED:
        case FETCHING_LETTER_FAILURE_RECOVERY: {
            const currentFetchUrlState = state.get(action.payload.fetchUrl) || Map();

            return state.set(action.payload.fetchUrl, fromJS({
                ...currentFetchUrlState.toJS(),
                isLoading: false
            }));
        }

        case FETCHING_LETTER_FAILURE: {
            const currentFetchUrlState = state.get(action.payload.fetchUrl) || Map();

            return state.set(action.payload.fetchUrl, fromJS({
                ...currentFetchUrlState.toJS(),
                error: action.payload.error,
                isLoading: false
            }));
        }

        case FETCHING_LETTER_SUCCESS: {
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
