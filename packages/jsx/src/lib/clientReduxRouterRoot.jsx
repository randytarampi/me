import {ConnectedRouter} from "connected-react-router/immutable";
import PropTypes from "prop-types";
import React from "react";
import {metrics} from "react-metrics";
import {renderRoutes} from "react-router-config";
import ClientReduxRoot from "./clientReduxRoot";
import ErrorWrapper from "./containers/errorWrapper";
import metricsConfig from "./metrics/config";

export const ClientReduxRouterRoot = ({store, routes, history, ...props}) => {
    return <ClientReduxRoot store={store} {...props}>
        <ErrorWrapper {...props}>
            <ConnectedRouter history={history}>
                {renderRoutes(routes, props)}
            </ConnectedRouter>
        </ErrorWrapper>
    </ClientReduxRoot>;
};

ClientReduxRouterRoot.propTypes = {
    store: PropTypes.object.isRequired,
    routes: PropTypes.array.isRequired,
    history: PropTypes.object.isRequired
};

export default metrics(metricsConfig)(ClientReduxRouterRoot);
