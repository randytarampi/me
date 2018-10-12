import {ConnectedRouter} from "connected-react-router/immutable";
import PropTypes from "prop-types";
import React from "react";
import {metrics} from "react-metrics";
import {renderRoutes} from "react-router-config";
import {ClientRoot} from "./clientRoot";
import ErrorWrapper from "./containers/errorWrapper";
import metricsConfig from "./metrics/config";
import ReduxRoot from "./reduxRoot";

export class ClientReduxRouterRoot extends ClientRoot {
    render() {
        const {store, routes, history, ...props} = this.props;

        return <ReduxRoot store={store} {...props}>
            <main>
                <ErrorWrapper {...props}>
                    <ConnectedRouter history={history}>
                        {renderRoutes(routes, props)}
                    </ConnectedRouter>
                </ErrorWrapper>
            </main>
        </ReduxRoot>;
    }
}

ClientReduxRouterRoot.propTypes = {
    store: PropTypes.object.isRequired,
    routes: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired
};

export default metrics(metricsConfig)(ClientReduxRouterRoot);
