import {
    ClientSwipeableReduxRouterRoot,
    configureStore,
    initializeCrispCreator,
    setRoutesCreator
} from "@randy.tarampi/jsx";
import {createBrowserHistory} from "history";
import React from "react";
import {hot} from "react-hot-loader";
import {combinedReducers} from "../data/reducers";
import routes from "../routes";

const history = createBrowserHistory();
const store = configureStore(undefined, history, combinedReducers);

if (window.$crisp) {
    store.dispatch(initializeCrispCreator(window.$crisp));
}

store.dispatch(setRoutesCreator(routes));

export const App = () => <ClientSwipeableReduxRouterRoot history={history} routes={routes} store={store}/>;

export default hot(module)(App);
