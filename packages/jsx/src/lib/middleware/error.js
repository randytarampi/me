import {CLEAR_ERROR} from "../actions/error/clearError.js";
import selectors from "../data/selectors.js";

export const errorMiddleware = store => next => action => {
    if (action.type === CLEAR_ERROR) {
        const timeoutId = selectors.getErrorTimeoutHandlerId(store.getState());

        if (timeoutId) {
            clearTimeout(timeoutId);
        }
    }

    next(action);
};

export default errorMiddleware;
