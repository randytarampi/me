import {configureStore, reducers, ServerReduxRoot} from "@randy.tarampi/jsx";
import {createMemoryHistory} from "history";
import React from "react";
import routes from "../routes";

const history = createMemoryHistory();
const store = configureStore(undefined, history, reducers);
const ServerApp = () => <ServerReduxRoot history={history} routes={routes} store={store}/>;

export default ServerApp;
