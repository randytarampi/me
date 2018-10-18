import createBrowserHistory from "history/createBrowserHistory";
import React from "react";
import {render} from "react-dom";
import ClientReduxRoot from "../../../../src/lib/clientReduxRoot";
import combinedReducers from "../../../../src/lib/data/reducers";
import configureStore from "../../../../src/lib/store/configureStore";
import routes from "../routes";

const history = createBrowserHistory();
const store = configureStore(undefined, history, combinedReducers);

render(
    <ClientReduxRoot store={store} history={history} routes={routes}/>,
    document.querySelector(".content")
);
