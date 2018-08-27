import PropTypes from "prop-types";
import React from "react";
import {metrics} from "react-metrics";
import {Provider} from "react-redux";
import {renderRoutes} from "react-router-config";
import {ConnectedRouter} from "react-router-redux";
import ErrorWrapper from "./containers/errorWrapper";
import metricsConfig from "./metrics/config";

const ClientReduxRoot = ({store, history, routes, ...props}) => <Provider store={store}>
    <ErrorWrapper {...props}>
        <ConnectedRouter history={history}>
            {renderRoutes(routes, props)}
        </ConnectedRouter>
    </ErrorWrapper>
</Provider>;

ClientReduxRoot.propTypes = {
    store: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    routes: PropTypes.array.isRequired
};

export default metrics(metricsConfig)(ClientReduxRoot);
