import {CLEAR_ERROR} from "../actions/clearError";
import {SET_ERROR} from "../actions/setError";

export default (state = {}, action) => {
    switch (action.type) {
        case SET_ERROR: {
            return {
                ...state,
                error: action.payload.error,
                errorMessage: action.payload.errorMessage,
                errorCode: action.payload.errorCode
            };
        }

        case CLEAR_ERROR: {
            return {};
        }

        default:
            return state;
    }
};

export const hasError = state => !!state;
export const getErrorState = state => state;
export const getError = state => getErrorState(state).error;
export const getErrorMessage = state => getErrorState(state).errorMessage;
export const getErrorCode = state => getErrorState(state).errorCode;
