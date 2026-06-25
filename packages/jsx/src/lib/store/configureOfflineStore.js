import {createBlacklistFilter, createFilter, createWhitelistFilter} from "@actra-development-oss/redux-persist-transform-filter-immutable";
import {logger} from "@randy.tarampi/browser-logger";
import {
    Bear,
    Character,
    DeadBear,
    DisBear,
    DoubtBear,
    Emoji,
    HelloBear,
    LennyBear,
    Organization,
    Person,
    Photo,
    Place,
    Post,
    PostalAddress,
    Profile,
    ShrugBear,
    SizedPhoto
} from "@randy.tarampi/js";
import {offlineStateLens, persist, persistAutoRehydrate} from "@randy.tarampi/redux-offline-immutable-config";
import {offline} from "@redux-offline/redux-offline";
import defaultReduxOfflineConfig from "@redux-offline/redux-offline/lib/defaults/index.js";
import * as Immutable from "immutable";
import {applyMiddleware, createStore} from "redux";
import {thunk} from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";
import {createReduxHistoryContext} from "redux-first-history";
import {combineReducers} from "redux-immutable";
import {
    errorMiddleware,
    metricsMiddleware,
    ravenMiddleware,
    routerMiddleware as meRouterMiddleware,
    uiMiddleware
} from "../middleware/index.js";

export const reduxOfflineImmutableTransformRecords = [
    Bear,
    DeadBear,
    DisBear,
    DoubtBear,
    HelloBear,
    LennyBear,
    ShrugBear,
    Emoji,
    Character,
    Organization,
    Person,
    Photo,
    Place,
    Post,
    PostalAddress,
    Profile,
    SizedPhoto
];

const errorStateBlacklistFilter = createBlacklistFilter("error", ["error", "errorMessage", "errorCode", "errorTimeoutHandler"]);

export const reduxOfflineConfig = {
    ...defaultReduxOfflineConfig,
    persist,
    persistAutoRehydrate: () => persistAutoRehydrate({log: __BUILD_IS_DEVELOPMENT__}),
    persistOptions: {
        records: reduxOfflineImmutableTransformRecords,
        transforms: [
            errorStateBlacklistFilter
        ]
    },
    persistCallback: () => logger.warn("Rehydrated state, but did anything else dispatch before this? 🤔"),
    offlineStateLens,
    returnPromises: true
};

export const createImmutableBlacklistFilter = createBlacklistFilter;
export const createImmutableFilter = createFilter;
export const createImmutableWhitelistFilter = createWhitelistFilter;

export const buildReduxOfflineConfig = (overrides = {}, otherTransforms = []) => {
    const transforms = (overrides.persistOptions && overrides.persistOptions.transforms && [...overrides.persistOptions.transforms]) || [];

    transforms.push(errorStateBlacklistFilter);
    transforms.push.apply(transforms, otherTransforms);

    return {
        ...reduxOfflineConfig,
        ...overrides,
        persistOptions: {
            ...reduxOfflineConfig.persistOptions,
            ...(overrides && overrides.persistOptions),
            transforms
        }
    };
};

export const configureOfflineStore = (initialState = Immutable.Map(), history, reducers, middleware = [], offlineConfig = buildReduxOfflineConfig()) => {
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
            immutable: Immutable,
            refs: offlineConfig && offlineConfig.persistOptions && offlineConfig.persistOptions.records
        }
    };
    const store = createStore(
        combineReducers({
            router: routerReducer,
            ...reducers
        }),
        initialState,
        composeWithDevTools(reduxDevToolsOptions)(applyMiddleware(...combinedMiddleware), offline(offlineConfig))
    );

    store.history = createReduxHistory(store);

    return store;
};

export default configureOfflineStore;
