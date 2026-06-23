import PropTypes from "prop-types";
import React from "react";
import {StaticRouter} from "react-router";
import {ConnectedErrorWrapper} from "./containers/error";
import ReduxRoot from "./reduxRoot";
import {renderRoutes} from "./util/renderRoutes";

export const ServerReduxRouterRoot = ({store, location, routes, ...props}) =>
    <ReduxRoot store={store} {...props}>
        <main>
            <ConnectedErrorWrapper {...props}>
                <StaticRouter location={location}>
                    {renderRoutes(routes, props)}
                </StaticRouter>
            </ConnectedErrorWrapper>
        </main>
    </ReduxRoot>;

ServerReduxRouterRoot.propTypes = {
    store: PropTypes.object.isRequired,
    location: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.object
    ]),
    routes: PropTypes.array.isRequired
};

ServerReduxRouterRoot.defaultProps = {
    location: "/"
};

export default ServerReduxRouterRoot;
