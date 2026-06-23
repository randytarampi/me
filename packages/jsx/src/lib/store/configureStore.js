import * as Immutable from "immutable";
import {applyMiddleware, createStore} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import {createReduxHistoryContext} from "redux-first-history";
import {combineReducers} from "redux-immutable";
import {thunk} from "redux-thunk";
import {
    errorMiddleware,
    metricsMiddleware,
    ravenMiddleware,
    routerMiddleware as meRouterMiddleware,
    uiMiddleware
} from "../middleware";

export const configureStore = (initialState = Immutable.Map(), history, reducers, middleware = []) => {
    const {createReduxHistory, routerMiddleware, routerReducer} = createReduxHistoryContext({
        history,
        reduxTravelling: false,
        selectRouterState: state => state.get("router")
    });

    const combinedMiddleware = [thunk, metricsMiddleware, routerMiddleware, meRouterMiddleware, uiMiddleware, errorMiddleware, ...middleware];

    if (typeof window !== "undefined" && window.SENTRY_DSN && window.LOGGER && window.LOGGER.streams.sentry) {
        combinedMiddleware.unshift(ravenMiddleware());
    }

    const reduxDevToolsOptions = {
        serialize: {
            immutable: Immutable
        }
    };
    const store = createStore(
        combineReducers({
            router: routerReducer,
            ...reducers
        }),
        initialState,
        composeWithDevTools(reduxDevToolsOptions)(applyMiddleware(...combinedMiddleware))
    );

    store.history = createReduxHistory(store);

    return store;
};

export default configureStore;
