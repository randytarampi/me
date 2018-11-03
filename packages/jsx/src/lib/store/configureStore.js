import {connectRouter, routerMiddleware} from "connected-react-router/immutable";
import {Map} from "immutable";
import {applyMiddleware, createStore} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";
import {
    errorMiddleware,
    metricsMiddleware,
    ravenMiddleware,
    routerMiddleware as meRouterMiddleware,
    uiMiddleware
} from "../middleware";

export const configureStore = (initialState = Map(), history, reducers) => {
    const middlewares = [thunk, metricsMiddleware, routerMiddleware(history), meRouterMiddleware, uiMiddleware, errorMiddleware];

    if (typeof window !== "undefined" && window.SENTRY_DSN && window.LOGGER && window.LOGGER.streams.sentry) {
        middlewares.unshift(ravenMiddleware());
    }

    const store = createStore(
        connectRouter(history)(reducers),
        initialState,
        composeWithDevTools(applyMiddleware(...middlewares))
    );

    return store;
};

export default configureStore;
