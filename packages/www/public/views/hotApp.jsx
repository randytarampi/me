import {ClientSwipeableReduxRouterRoot, configureStore, setRoutesCreator} from "@randy.tarampi/jsx";
import {createBrowserHistory} from "history";
import React from "react";
import {hot} from "react-hot-loader";
import {combinedReducers} from "../data/reducers";
import routes from "../routes";

const history = createBrowserHistory();
const store = configureStore(undefined, history, combinedReducers);

store.dispatch(setRoutesCreator(routes));

export const App = () => <ClientSwipeableReduxRouterRoot history={history} routes={routes} store={store}/>;

export default hot(module)(App);
