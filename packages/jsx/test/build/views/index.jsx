import createBrowserHistory from "history/createBrowserHistory";
import React from "react";
import {render} from "react-dom";
import ClientReduxRoot from "../../../src/lib/clientReduxRoot";
import {reducers} from "../../../src/lib/data/reducers";
import configureOfflineStore from "../../../src/lib/store/configureOfflineStore";
import routes from "../routes";

const history = createBrowserHistory();
const store = configureOfflineStore(undefined, history, reducers);

render(
    <ClientReduxRoot store={store} history={history} routes={routes}/>,
    document.querySelector(".content")
);
