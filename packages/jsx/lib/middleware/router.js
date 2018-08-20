import clearError from "../actions/clearError";

export default store => next => action => {
    if (action.type === "@@router/LOCATION_CHANGE") {
        if (!action.payload.pathname.match(/^\/error/)) {
            store.dispatch(clearError());
        }
    }

    next(action);
};
