import {LOCATION_CHANGE} from "redux-first-history";
import clearError from "../actions/error/clearError";

export const routerMiddleware = store => next => action => {
    if (action.type === LOCATION_CHANGE) {
        store.dispatch(clearError());
    }

    next(action);
};

export default routerMiddleware;
