import {config as metricsConfig} from "@randy.tarampi/redux-metrics";
import PropTypes from "prop-types";
import React from "react";
import {metrics} from "react-metrics";
import {HistoryRouter} from "redux-first-history/rr6";
import ClientReduxRoot from "./clientReduxRoot";
import {ConnectedErrorWrapper} from "./containers/error";
import {renderRoutes} from "./util/renderRoutes";

export const ClientReduxRouterRoot = ({store, routes, history, ...props}) => {
    return <ClientReduxRoot store={store} {...props}>
        <ConnectedErrorWrapper {...props}>
            <HistoryRouter history={store.history || history}>
                {renderRoutes(routes, props)}
            </HistoryRouter>
        </ConnectedErrorWrapper>
    </ClientReduxRoot>;
};

ClientReduxRouterRoot.propTypes = {
    store: PropTypes.object.isRequired,
    routes: PropTypes.array.isRequired,
    history: PropTypes.object.isRequired
};

export default metrics(metricsConfig)(ClientReduxRouterRoot);
