import _ from "lodash";
import metrics from "../metrics";

export default () => next => action => {
    next(action);

    const trackReduxAction = metrics
        && metrics.api
        && _.isFunction(metrics.api.trackReduxAction)
        && metrics.api.trackReduxAction;

    if (!trackReduxAction) {
        return;
    }

    switch (action.type) {
        default:
            trackReduxAction([action]);
    }
};
