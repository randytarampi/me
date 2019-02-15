import {LOCATION_CHANGE} from "connected-react-router/immutable";
import {fromJS, List, Map} from "immutable";
import {matchRoutes} from "react-router-config";
import {createSelector} from "reselect";
import {SET_CONTROL_STATE, SET_ROUTES, SWIPEABLE_CHANGE_INDEX, SWIPEABLE_TAB_CHANGE_INDEX} from "../actions";

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
export const getIndexForRoute = (state, pathname) => {
    const indexedRoutes = getIndexedRoutes(state);
    const matchedRoutes = matchRoutes(indexedRoutes, pathname);
    const bestMatchedRoute = matchedRoutes[matchedRoutes.length - 1];
    let routeForIndexSearch = bestMatchedRoute && bestMatchedRoute.route;
    let bestRouteIndex;

    do {
        if (routeForIndexSearch) {
            bestRouteIndex = indexedRoutes.findIndex(indexedRoute => indexedRoute.path === routeForIndexSearch.path);
            routeForIndexSearch = routeForIndexSearch.parent;
        }
    } while (bestRouteIndex === -1 && routeForIndexSearch);

    return Number.isFinite(bestRouteIndex) && bestRouteIndex !== -1
        ? bestRouteIndex
        : null;
};

export const getControlStateForId = (state, id) => state.getIn(["controls", id]);

