import createBrowserHistory from "history/createBrowserHistory";
import {configureStore, reducers, ReduxRoot} from "me.common.jsx";
import React from "react";
import {render} from "react-dom";
import routes from "../routes";

const history = createBrowserHistory();
const store = configureStore(undefined, history, reducers);

render(
	<ReduxRoot store={store} history={history} routes={routes}/>,
	document.querySelector(".content")
);
