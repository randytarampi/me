import PropTypes from "prop-types";
import React, {Component} from "react";
import {Provider} from "react-redux";
import {renderRoutes} from "react-router-config";
import {StaticRouter} from "react-router-dom";

class ServerReduxRoot extends Component {
    render() {
        return <Provider store={this.props.store}>
            <StaticRouter context={this.props.context}>
                {renderRoutes(this.props.routes, this.props)}
            </StaticRouter>
        </Provider>;
    }
}

ServerReduxRoot.propTypes = {
    store: PropTypes.object.isRequired,
    context: PropTypes.object.isRequired,
    routes: PropTypes.array.isRequired
};

ServerReduxRoot.defaultProps = {
    context: {}
};

export default ServerReduxRoot;
