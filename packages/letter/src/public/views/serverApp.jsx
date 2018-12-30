import {configureStore, ServerReduxRoot} from "@randy.tarampi/jsx";
import {createMemoryHistory} from "history";
import PropTypes from "prop-types";
import React from "react";
import {Letter} from "../../lib/letter";
import reducers from "../../lib/data/reducers";
import routes from "../routes";

const history = createMemoryHistory();
const store = configureStore(undefined, history, reducers);

export const ServerApp = ({printable, ...props}) => <ServerReduxRoot
    letter={printable}
    {...props}
    history={history}
    routes={routes}
    store={store}
/>;

ServerApp.propTypes = {
    printable: PropTypes.oneOfType([Letter]).isRequired
};

export default ServerApp;
