import {push} from "redux-first-history";
import {createAction} from "redux-actions";
import {matchPath} from "react-router";
import selectors from "../../data/selectors.js";

export const SWIPEABLE_TAB_CHANGE_INDEX = "SWIPEABLE_TAB_CHANGE_INDEX";

const getRoutePathForLocation = (route, pathname) => {
    const get = (key, fallback = undefined) => route && route.get
        ? route.get(key)
        : (route && route[key] !== undefined ? route[key] : fallback);
    const childRoutes = get("routes");
    const childRoute = childRoutes && childRoutes.find(candidate => {
        const candidateGet = key => candidate.get ? candidate.get(key) : candidate[key];
        const path = candidateGet("path");
        return path && pathname && matchPath({path, end: !!candidateGet("exact"), caseSensitive: !!candidateGet("sensitive")}, pathname);
    });

    return childRoute ? (childRoute.get ? childRoute.get("path") : childRoute.path) : get("path");
};

export const swipeableTabChangeIndexCreator = onChangeEvent => (dispatch, getState) => {
    const tabIndex = onChangeEvent.currentTarget.getAttribute("href").match(/\d+/g)[0];
    const passedTabIndex = Number(tabIndex);
    // NOTE-RT: We need the un`scoped` value here, per https://github.com/react-materialize/react-materialize/commit/f5d1e0d5b97ae4435d6a709b9fc030458fe30b9e#diff-f8f6138478fd4cda2a0f875f28829252R50.
    const index = passedTabIndex % 10;
    dispatch(swipeableTabChangeIndex({index}));

    const state = getState();
    const routeForIndex = selectors.getRouteForIndex(state, index);
    const location = selectors.getLocation(state);
    const path = routeForIndex ? getRoutePathForLocation(routeForIndex, location && location.pathname) : null;

    if (path) {
        dispatch(push({
            pathname: path.split(":")[0]
        }));
    }
};

export const swipeableTabChangeIndex = createAction(SWIPEABLE_TAB_CHANGE_INDEX);

export default swipeableTabChangeIndexCreator;
