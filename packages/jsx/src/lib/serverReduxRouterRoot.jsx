import PropTypes from "prop-types";
import React from "react";
import {renderRoutes} from "react-router-config";
import {StaticRouter} from "react-router-dom";
import {ConnectedErrorWrapper} from "./containers/error";
import ReduxRoot from "./reduxRoot";

export const ServerReduxRouterRoot = ({store, context, routes, ...props}) =>
    <ReduxRoot store={store} {...props}>
        <main>
            <ConnectedErrorWrapper {...props}>
                <StaticRouter context={context}>
                    {renderRoutes(routes, props)}
                </StaticRouter>
            </ConnectedErrorWrapper>
        </main>
    </ReduxRoot>;

ServerReduxRouterRoot.propTypes = {
    store: PropTypes.object.isRequired,
    context: PropTypes.object.isRequired,
    routes: PropTypes.array.isRequired
};

ServerReduxRouterRoot.defaultProps = {
    context: {}
};

export default ServerReduxRouterRoot;
