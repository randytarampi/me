import PropTypes from "prop-types";
import React from "react";
import {Provider} from "react-redux";
import {renderRoutes} from "react-router-config";
import {StaticRouter} from "react-router-dom";

const ServerReduxRoot = ({store, context, routes, ...props}) => <Provider store={store}>
    <StaticRouter context={context}>
        {renderRoutes(routes, props)}
    </StaticRouter>
</Provider>;

ServerReduxRoot.propTypes = {
    store: PropTypes.object.isRequired,
    context: PropTypes.object.isRequired,
    routes: PropTypes.array.isRequired
};

ServerReduxRoot.defaultProps = {
    context: {}
};

export default ServerReduxRoot;
