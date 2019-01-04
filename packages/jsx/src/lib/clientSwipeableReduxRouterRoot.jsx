import {config as metricsConfig} from "@randy.tarampi/redux-metrics";
import {ConnectedRouter} from "connected-react-router/immutable";
import PropTypes from "prop-types";
import React, {Fragment} from "react";
import {metrics} from "react-metrics";
import {Provider} from "react-redux";
import {ClientRoot} from "./clientRoot";
import {ConnectedErrorWrapper} from "./containers/error";
import ConnectedSwipeableTabs from "./containers/swipeableTabs";
import {renderSwipeableRoutes} from "./util";

export class ClientSwipeableReduxRouterRoot extends ClientRoot {
    render() {
        const {store, history, routes, swipeableRoutesProps, ...props} = this.props; // eslint-disable-line no-unused-vars

        return <Provider store={store}>
            <Fragment>
                <header className="nav-header nav-header__tabs nav-header__swipeable">
                    <div className="nav-container">
                        <ConnectedSwipeableTabs id="swipeable-nav-tabs" className="nav-tabs nav-tabs__swipeable">
                            {
                                routes
                                    .filter(route => !!route.tab)
                                    .map(route => route.tab)
                            }
                        </ConnectedSwipeableTabs>
                    </div>
                </header>
                <main>
                    <ConnectedErrorWrapper {...props}>
                        <ConnectedRouter history={history}>
                            {renderSwipeableRoutes(routes, props, swipeableRoutesProps)}
                        </ConnectedRouter>
                    </ConnectedErrorWrapper>
                </main>
            </Fragment>
        </Provider>;
    }
}

ClientSwipeableReduxRouterRoot.propTypes = {
    store: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    swipeableRoutesProps: PropTypes.object,
    routes: PropTypes.array.isRequired
};

export default metrics(metricsConfig)(ClientSwipeableReduxRouterRoot);
