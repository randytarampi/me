import _ from "lodash";
import metrics from "../metrics";

export const metricsMiddleware = () => next => action => {
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

export default metricsMiddleware;
