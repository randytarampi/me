import {LOCATION_CHANGE} from "connected-react-router";
import {fromJS, List, Map} from "immutable";
import {createSelector} from "reselect";
import {SET_ROUTES, SWIPEABLE_CHANGE_INDEX, SWIPEABLE_TAB_CHANGE_INDEX} from "../actions";

const initialState = Map({
    routes: List(),
    swipeable: Map({
        index: null,
        indexLatest: null,
        meta: null
    })
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

        default:
            return state;

    }
};

export default uiReducer;

export const getSwipeable = state => state.get("swipeable");
export const getSwipeableIndex = createSelector(
    getSwipeable,
    swipeableState => swipeableState
        ? swipeableState.get("index")
        : null
);

export const getRoutes = state => state.get("routes");
export const getIndexedRoutes = createSelector(
    getRoutes,
    routes => routes.filter(route => !!route.tab)
);
export const getRouteForIndex = (state, index) => {
    const routes = getIndexedRoutes(state);
    const foundRoute = routes && routes.get(index);
    return foundRoute || null;
};
export const getIndexForRoute = (state, pathname) => {
    const indexedRoutes = getIndexedRoutes(state);
    let routes = indexedRoutes
        .filter(route => route.pathRegExp && route.pathRegExp.exec(pathname) !== null)
        .sort((a, b) => {
            const aMatch = a.pathRegExp.exec(pathname).filter(match => match !== null);
            const bMatch = b.pathRegExp.exec(pathname).filter(match => match !== null);

            if (aMatch.length < bMatch.length) {
                return -1;
            }
            if (aMatch.length > bMatch.length) {
                return 1;
            }
            return 0;
        });
    const bestRoute = routes && routes.first();
    const bestRouteIndex = indexedRoutes.indexOf(bestRoute);

    return bestRouteIndex !== -1
        ? bestRouteIndex
        : null;
};
