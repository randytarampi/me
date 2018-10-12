import {ConnectedRouter} from "connected-react-router/immutable";
import PropTypes from "prop-types";
import React, {Fragment} from "react";
import {Tab} from "react-materialize";
import {metrics} from "react-metrics";
import {Provider} from "react-redux";
import {ClientRoot} from "./clientRoot";
import ErrorWrapper from "./containers/errorWrapper";
import ConnectedSwipeableTabs from "./containers/swipeableTabs";
import metricsConfig from "./metrics/config";
import {renderSwipeableRoutes} from "./util";

export class ClientSwipeableReduxRouterRoot extends ClientRoot {
    render() {
        const {store, history, routes, ...props} = this.props; // eslint-disable-line no-unused-vars

        return <Provider store={store}>
            <Fragment>
                <header>
                    <div className="nav-container">
                        <ConnectedSwipeableTabs id="swipeable-nav-tabs" className="nav-tabs nav-tabs__swipeable">
                            <Tab title={
                                <Fragment>
                                    <i className="far fa-hand-paper"></i>
                                    <span className="hide-on-med-and-down">&nbsp;–&nbsp;Hey!</span>
                                </Fragment>
                            }></Tab>
                            <Tab title={
                                <Fragment>
                                    <i className="fas fa-rss-square"></i>
                                    <span className="hide-on-med-and-down">&nbsp;–&nbsp;Blog</span>
                                </Fragment>
                            }/>
                            <Tab title={
                                <Fragment>
                                    <i className="far fa-images"></i>
                                    <span className="hide-on-med-and-down">&nbsp;–&nbsp;Photos</span>
                                </Fragment>
                            }/>
                            <Tab title={
                                <Fragment>
                                    <i className="far fa-file-alt"></i>
                                    <span className="hide-on-med-and-down">&nbsp;–&nbsp;Words</span>
                                </Fragment>
                            }/>
                            <Tab title={
                                <Fragment>
                                    <i className="fas fa-file-signature"></i>
                                    <span className="hide-on-med-and-down">&nbsp;–&nbsp;Readme</span>
                                </Fragment>
                            }/>
                            <Tab title={
                                <Fragment>
                                    <i className="fas fa-id-card"></i>
                                    <span className="hide-on-med-and-down">&nbsp;–&nbsp;Resume</span>
                                </Fragment>
                            }/>
                        </ConnectedSwipeableTabs>
                    </div>
                </header>
                <main>
                    <ErrorWrapper {...props}>
                        <ConnectedRouter history={history}>
                            {renderSwipeableRoutes(routes, props)}
                        </ConnectedRouter>
                    </ErrorWrapper>
                </main>
            </Fragment>
        </Provider>;
    }
}

ClientSwipeableReduxRouterRoot.propTypes = {
    store: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    routes: PropTypes.array.isRequired
};

export default metrics(metricsConfig)(ClientSwipeableReduxRouterRoot);
