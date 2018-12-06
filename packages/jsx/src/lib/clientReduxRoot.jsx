import PropTypes from "prop-types";
import React from "react";
import {metrics} from "react-metrics";
import {ClientRoot} from "./clientRoot";
import {config as metricsConfig} from "@randy.tarampi/redux-metrics";
import ReduxRoot from "./reduxRoot";

export class ClientReduxRoot extends ClientRoot {
    render() {
        const {store, children, ...props} = this.props;

        return <ReduxRoot store={store} {...props}>
            <main>
                {children}
            </main>
        </ReduxRoot>;
    }
}

ClientReduxRoot.propTypes = {
    store: PropTypes.object.isRequired
};

export default metrics(metricsConfig)(ClientReduxRoot);
