import {combinedReducers, configureStore, ServerReduxRoot} from "@randy.tarampi/jsx";
import {createMemoryHistory} from "history";
import React from "react";
import routes from "../routes";

const history = createMemoryHistory();
const store = configureStore(undefined, history, combinedReducers);
const ServerApp = props => <ServerReduxRoot {...props} history={history} routes={routes} store={store}/>;

export default ServerApp;
