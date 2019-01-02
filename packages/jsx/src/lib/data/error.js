import {Map} from "immutable";
import {CLEAR_ERROR} from "../actions/error/clearError";
import {SET_ERROR} from "../actions/error/setError";
import {SET_ERROR_TIMEOUT_HANDLER} from "../actions/error/setErrorTimeoutHandler";

export const errorReducer = (state = Map(), action) => {
    switch (action.type) {
        case SET_ERROR: {
            return state
                .set("error", action.payload.error)
                .set("errorMessage", action.payload.errorMessage)
                .set("errorCode", action.payload.errorCode);
        }

        case SET_ERROR_TIMEOUT_HANDLER: {
            return state
                .set("errorTimeoutHandler", action.payload);
        }

        case CLEAR_ERROR: {
            return Map();
        }

        default:
            return state;
    }
};

export default errorReducer;

export const hasError = state => !!getError(state) || !!getErrorMessage(state) || !!getErrorCode(state);
export const getErrorState = state => state;
export const getError = state => getErrorState(state).get("error");
export const getErrorMessage = state => getErrorState(state).get("errorMessage");
export const getErrorCode = state => getErrorState(state).get("errorCode");
export const getErrorTimeoutHandlerId = state => getErrorState(state).get("errorTimeoutHandler");
