import {createBlacklistFilter} from "@actra-development-oss/redux-persist-transform-filter-immutable";
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
import defaultReduxOfflineConfig from "@redux-offline/redux-offline/lib/defaults";
import {connectRouter, routerMiddleware} from "connected-react-router/immutable";
import {Map} from "immutable";
import {applyMiddleware, createStore} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";
import logger from "../logger";
import {
    errorMiddleware,
    metricsMiddleware,
    ravenMiddleware,
    routerMiddleware as meRouterMiddleware,
    uiMiddleware
} from "../middleware";

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

export const reduxOfflineConfig = {
    ...defaultReduxOfflineConfig,
    persist,
    persistAutoRehydrate: () => persistAutoRehydrate({log: true}),
    persistOptions: {
        records: reduxOfflineImmutableTransformRecords,
        transforms: [
            createBlacklistFilter("error", ["error"])
        ]
    },
    persistCallback: () => logger.warn("Rehydrated state, but did anything else dispatch before this? 🤔"),
    offlineStateLens,
    returnPromises: true
};

export const createImmutableBlacklistFilter = createBlacklistFilter;

export const buildReduxOfflineConfig = (overrides = {}, otherTransforms = []) => {
    const transforms = (overrides.persistOptions && overrides.persistOptions.transforms) || [];

    transforms.push(createBlacklistFilter("error", ["error"]));
    transforms.push.apply(transforms, otherTransforms);

    return {
        ...reduxOfflineConfig,
        ...overrides,
        persistOptions: {
            ...reduxOfflineConfig.persistOptions,
            ...(overrides && overrides.persistOptions),
            transforms: transforms.length ? transforms : reduxOfflineConfig.persistOptions.transforms
        }
    };
};

export const configureStore = (initialState = Map(), history, reducers, offlineConfig = buildReduxOfflineConfig()) => {
    const middlewares = [thunk, metricsMiddleware, routerMiddleware(history), meRouterMiddleware, uiMiddleware, errorMiddleware];

    if (typeof window !== "undefined" && window.SENTRY_DSN && window.LOGGER && window.LOGGER.streams.sentry) {
        middlewares.unshift(ravenMiddleware());
    }

    const store = createStore(
        connectRouter(history)(reducers),
        initialState,
        composeWithDevTools(applyMiddleware(...middlewares), offline(offlineConfig))
    );

    return store;
};

export default configureStore;
