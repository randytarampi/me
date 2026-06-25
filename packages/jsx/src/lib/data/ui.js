import {fromJS, List, Map} from "immutable";
import {LOCATION_CHANGE} from "redux-first-history";
import {createSelector} from "reselect";
import {matchPath} from "../reactRouter.cjs";
import {SET_CONTROL_STATE, SET_ROUTES, SWIPEABLE_CHANGE_INDEX, SWIPEABLE_TAB_CHANGE_INDEX} from "../actions/index.js";

const initialState = Map({
    routes: List(),
    swipeable: Map({
        index: null,
        indexLatest: null,
        meta: null
    }),
    controls: Map()
});

export const uiReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOCATION_CHANGE: {
            const location = action.payload.location || action.payload;

            return state
                .setIn(["swipeable", "index"], getIndexForRoute(state, location.pathname));
        }

        case SWIPEABLE_CHANGE_INDEX:
        case SWIPEABLE_TAB_CHANGE_INDEX:
            return state
                .set("swipeable", fromJS(action.payload));

        case SET_ROUTES:
            return state
                .set("routes", List(action.payload));

        case SET_CONTROL_STATE: {
            const {id, ...updatedControlState} = action.payload;
            const existingControlState = getControlStateForId(state, id) || Map();

            return state
                .setIn(["controls", id], existingControlState.mergeDeep(fromJS(updatedControlState)));
        }

        default:
            return state;

    }
};

export default uiReducer;

export const getRoutes = state => state.get("routes");
export const getIndexedRoutes = createSelector(
    getRoutes,
    routes => routes.filter(route => !!route.tab)
);

export const getSwipeable = state => state.get("swipeable");
export const getSwipeableIndex = createSelector(
    getSwipeable,
    swipeableState => swipeableState
        ? swipeableState.get("index")
        : null
);

export const getRouteForIndex = (state, index) => {
    const indexedRoutes = getIndexedRoutes(state);
    const foundRoute = indexedRoutes && indexedRoutes.get(index);
    return foundRoute || null;
};
// NOTE-RT: `react-router@7` removed `react-router-config`'s `matchRoutes(routes, pathname)`; match each indexed
// NOTE-RT: (tab) route directly with v7's `matchPath`. Paths/pathnames are normalised to a leading slash and
// NOTE-RT: `end` defaults to the v5 `exact` flag (i.e. prefix matching unless `exact` was set).
const normalizeRoutePath = value => {
    if (typeof value !== "string" || value.length === 0) {
        return value;
    }

    return value.startsWith("/")
        ? value
        : `/${value}`;
};
export const getIndexForRoute = (state, pathname) => {
    const indexedRoutes = getIndexedRoutes(state);

    if (!indexedRoutes || indexedRoutes.size === 0 || typeof pathname !== "string") {
        return null;
    }

    const normalizedPathname = normalizeRoutePath(pathname);
    const bestRouteIndex = indexedRoutes.findIndex(route => {
        if (!route.path) {
            return false;
        }

        return !!matchPath({path: normalizeRoutePath(route.path), end: !!route.exact, caseSensitive: !!route.sensitive}, normalizedPathname);
    });

    return bestRouteIndex !== -1
        ? bestRouteIndex
        : null;
};

export const getControlStateForId = (state, id) => state.getIn(["controls", id]);
