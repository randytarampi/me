import PropTypes from "prop-types";
import React from "react";
import {Provider} from "react-redux";
import {renderRoutes} from "react-router-config";
import {StaticRouter} from "react-router-dom";
import ErrorWrapper from "./containers/errorWrapper";

const ServerReduxRoot = ({store, context, routes, ...props}) => <Provider store={store}>
    <StaticRouter context={context}>
        <ErrorWrapper {...props}>
            {renderRoutes(routes, props)}
        </ErrorWrapper>
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
