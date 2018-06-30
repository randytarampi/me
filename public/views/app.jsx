import createBrowserHistory from "history/createBrowserHistory";
import {configureStore, reducers, ReduxRoot} from "me.common.jsx";
import React from "react";
import routes from "../routes";

const history = createBrowserHistory();
const store = configureStore(undefined, history, reducers);
const App = () => <ReduxRoot fetchUrl={`${__PHOTOS_URL__}`} history={history} routes={routes} store={store}/>;

export default App;
