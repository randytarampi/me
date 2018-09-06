import PropTypes from "prop-types";
import React, {Component} from "react";
import {metrics} from "react-metrics";
import {Provider} from "react-redux";
import {renderRoutes} from "react-router-config";
import {ConnectedRouter} from "react-router-redux";
import ErrorWrapper from "./containers/errorWrapper";
import logger from "./logger";
import metricsConfig from "./metrics/config";
import Sniffr from "sniffr";

class ClientReduxRoot extends Component {
    constructor(props) {
        super(props);

        logger.info("Hey! I see you looking over there.");
        logger.info("Looking for this?\n\t\thttps://www.randytarampi.ca/resume");
        logger.info("Or was it this?\n\t\thttps://github.com/randytarampi/me/#readme");
        logger.info("Or maybe even this?\n\t\thttps://waffle.io/randytarampi/randytarampi.github.io");

        const sniffr = new Sniffr();
        sniffr.sniff();

        if (sniffr.browser) {
            if (sniffr.browser.name === "firefox") {
                logger.info("If you don't already have them, these should make your analysis a bit more interesting.\n\t\thttps://addons.mozilla.org/en-US/firefox/addon/react-devtools\n\t\thttps://addons.mozilla.org/en-US/firefox/addon/remotedev");
            } else if (sniffr.browser.name === "chrome") {
                logger.info("If you don't already have them, these should make your analysis a bit more interesting.\n\t\thttps://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi\n\t\thttps://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd");
            } else if (sniffr.browser.name === "ie") {
                logger.warn("Do yourself a favour and go here before you do anything else:\n\t\thttp://outdatedbrowser.com");
            } else {
                logger.warn("If you're a developer and you're reading this message, do the right thing, give me a fair shake and come back in Chrome or Firefox.\n\t\thttps://www.mozilla.org/firefox\n\t\thttps://www.google.com/chrome");
            }
        }
    }

    render() {
        const {store, history, routes, ...props} = this.props;

        return <Provider store={store}>
            <ErrorWrapper {...props}>
                <ConnectedRouter history={history}>
                    {renderRoutes(routes, props)}
                </ConnectedRouter>
            </ErrorWrapper>
        </Provider>;
    }
}

ClientReduxRoot.propTypes = {
    store: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
    routes: PropTypes.array.isRequired
};

export default metrics(metricsConfig)(ClientReduxRoot);
