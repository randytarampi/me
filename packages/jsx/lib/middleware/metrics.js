import _ from "lodash";
import metricsInstance from "../metrics/instance";

export default () => next => action => {
	next(action);

	const trackReduxAction = metricsInstance
		&& metricsInstance.api
		&& _.isFunction(metricsInstance.api.trackReduxAction)
		&& metricsInstance.api.trackReduxAction;

	if (!trackReduxAction) {
		return;
	}

	switch (action.type) {
		default:
			trackReduxAction([action]);
	}
};
