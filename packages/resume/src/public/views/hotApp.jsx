import {ClientReduxRoot, configureStore} from "@randy.tarampi/jsx";
import {createBrowserHistory} from "history";
import React from "react";
import {hot} from "react-hot-loader";
import reducers from "../../lib/data/reducers";
import routes from "../routes";

const history = createBrowserHistory();
const store = configureStore(undefined, history, reducers);
const App = () => <ClientReduxRoot history={history} routes={routes} store={store}/>;

export default hot(module)(App);
