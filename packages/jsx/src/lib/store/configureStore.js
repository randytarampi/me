import {connectRouter, routerMiddleware} from "connected-react-router/immutable";
import Immutable, {Map} from "immutable";
import {applyMiddleware, createStore} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import {combineReducers} from "redux-immutable";
import thunk from "redux-thunk";
import {
    errorMiddleware,
    metricsMiddleware,
    ravenMiddleware,
    routerMiddleware as meRouterMiddleware,
    uiMiddleware
} from "../middleware";

export const configureStore = (initialState = Map(), history, reducers, middleware = []) => {
    const combinedMiddleware = [thunk, metricsMiddleware, routerMiddleware(history), meRouterMiddleware, uiMiddleware, errorMiddleware, ...middleware];

    if (typeof window !== "undefined" && window.SENTRY_DSN && window.LOGGER && window.LOGGER.streams.sentry) {
        combinedMiddleware.unshift(ravenMiddleware());
    }

    const store = createStore(
        combineReducers({
            router: connectRouter(history),
            ...reducers
        }),
        initialState,
        composeWithDevTools({serialize: {immutable: Immutable}})(applyMiddleware(...combinedMiddleware))
    );

    return store;
};

export default configureStore;
