import {configureStore, ServerReduxRoot} from "@randy.tarampi/jsx";
import {createMemoryHistory} from "history";
import PropTypes from "prop-types";
import React from "react";
import {Resume} from "../../lib/resume";
import reducers from "../../lib/data/reducers";
import routes from "../routes";

const history = createMemoryHistory();
const store = configureStore(undefined, history, reducers);

export const ServerApp = ({printable, ...props}) => <ServerReduxRoot
    resume={printable}
    {...props}
    history={history}
    routes={routes}
    store={store}
/>;

ServerApp.propTypes = {
    printable: PropTypes.oneOfType([Resume]).isRequired
};

export default ServerApp;
