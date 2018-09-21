import {LOCATION_CHANGE} from "react-router-redux";
import clearError from "../actions/clearError";

export const routerMiddleware = store => next => action => {
    if (action.type === LOCATION_CHANGE) {
        store.dispatch(clearError());
    }

    next(action);
};

export default routerMiddleware;
