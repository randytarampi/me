import {LOCATION_CHANGE} from "connected-react-router/immutable";
import clearError from "../actions/error/clearError";

export const routerMiddleware = store => next => action => {
    if (action.type === LOCATION_CHANGE) {
        store.dispatch(clearError());
    }

    next(action);
};

export default routerMiddleware;
