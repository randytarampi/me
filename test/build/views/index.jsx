import createBrowserHistory from "history/createBrowserHistory";
import React from "react";
import {render} from "react-dom";
import reducers from "../../../lib/data/reducers";
import ReduxRoot from "../../../lib/reduxRoot";
import configureStore from "../../../lib/store/configureStore";
import routes from "../routes/index";

const history = createBrowserHistory();
const store = configureStore(undefined, history, reducers);

render(
	<ReduxRoot store={store} history={history} routes={routes}/>,
	document.querySelector(".content")
);
