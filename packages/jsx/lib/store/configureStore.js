import {routerMiddleware} from "react-router-redux";
import {applyMiddleware, createStore} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";
import metrics from "../middleware/metrics";
import raven from "../middleware/raven";
import router from "../middleware/router";

const configureStore = (initialState = {}, history, reducers) => {
    const middlewares = [thunk, metrics, routerMiddleware(history), router];

    if (typeof window !== "undefined" && window.SENTRY_DSN) {
        middlewares.unshift(raven());
    }

    //noinspection UnnecessaryLocalVariableJS
    const store = createStore(
        reducers,
        initialState,
        composeWithDevTools(applyMiddleware(...middlewares))
    );

    return store;
};

export default configureStore;
