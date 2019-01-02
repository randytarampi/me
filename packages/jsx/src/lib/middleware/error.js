import {CLEAR_ERROR} from "../actions/error/clearError";
import selectors from "../data/selectors";

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
