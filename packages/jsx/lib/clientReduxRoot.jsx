import PropTypes from "prop-types";
import React, {Component} from "react";
import {Provider} from "react-redux";
import {renderRoutes} from "react-router-config";
import {ConnectedRouter} from "react-router-redux";

class ClientReduxRoot extends Component {
    render() {
        return <Provider store={this.props.store}>
            <ConnectedRouter history={this.props.history}>
                {renderRoutes(this.props.routes, this.props)}
            </ConnectedRouter>
        </Provider>;
    }
}

ClientReduxRoot.propTypes = {
    store: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    routes: PropTypes.array.isRequired
};

export default ClientReduxRoot;
