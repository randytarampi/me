import {Map} from "immutable";
import {CLEAR_ERROR} from "../actions/clearError";
import {SET_ERROR} from "../actions/setError";

export default (state = Map(), action) => {
    switch (action.type) {
        case SET_ERROR: {
            return state
                .set("error", action.payload.error)
                .set("errorMessage", action.payload.errorMessage)
                .set("errorCode", action.payload.errorCode);
        }

        case CLEAR_ERROR: {
            return Map();
        }

        default:
            return state;
    }
};

export const hasError = state => !!getError(state) || !!getErrorMessage(state) || !!getErrorCode(state);
export const getErrorState = state => state;
export const getError = state => getErrorState(state).get("error");
export const getErrorMessage = state => getErrorState(state).get("errorMessage");
export const getErrorCode = state => getErrorState(state).get("errorCode");
