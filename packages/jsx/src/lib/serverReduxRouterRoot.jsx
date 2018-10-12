import PropTypes from "prop-types";
import React from "react";
import {renderRoutes} from "react-router-config";
import {StaticRouter} from "react-router-dom";
import ErrorWrapper from "./containers/errorWrapper";
import ReduxRoot from "./reduxRoot";

export const ServerReduxRouterRoot = ({store, context, routes, ...props}) =>
    <ReduxRoot store={store} {...props}>
        <main>
            <ErrorWrapper {...props}>
                <StaticRouter context={context}>
                    {renderRoutes(routes, props)}
                </StaticRouter>
            </ErrorWrapper>
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
