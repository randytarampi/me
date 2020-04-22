import {LOCATION_CHANGE} from "connected-react-router/immutable";
import clearError from "../actions/error/clearError";
import {SWIPEABLE_CHANGE_INDEX, SWIPEABLE_TAB_CHANGE_INDEX} from "../actions/routing";
import selectors from "../data/selectors";

const getSwipeableTabs = () => {
    const swipeableTabsElement = document.getElementsByClassName("nav-tabs__swipeable")[0];

    return swipeableTabsElement && typeof window.M !== "undefined" && window.M && window.M.Tabs.getInstance(swipeableTabsElement);
};

const getSwipeableTabsExpectedTabIndex = (state, action) => {
    const location = action.payload.location || action.payload;

    return selectors.getIndexForRoute(state, location.pathname);
};

const getSwipeableTabsExpectedTabId = (swipeableTabs, store, action) => {
    return swipeableTabs.$tabLinks[getSwipeableTabsExpectedTabIndex(store, action)].hash.slice(1);
};

const setSwipeableTabsIndex = (swipeableTabs, store, action) => {
    const state = store.getState();

    if (swipeableTabs.index !== getSwipeableTabsExpectedTabIndex(state, action)) {
        swipeableTabs.select(getSwipeableTabsExpectedTabId(swipeableTabs, state, action));
    }
};

export const uiMiddleware = store => next => action => {
    switch (action.type) {
        case LOCATION_CHANGE: {
            const swipeableTabs = getSwipeableTabs();

            if (swipeableTabs) {
                setSwipeableTabsIndex(swipeableTabs, store, action);
            } else {
                setTimeout(() => {
                    const swipeableTabs = getSwipeableTabs();

                    if (swipeableTabs) {
                        setSwipeableTabsIndex(swipeableTabs, store, action);
                    }
                }, 60);
            }

            break;
        }

        case SWIPEABLE_CHANGE_INDEX:
        case SWIPEABLE_TAB_CHANGE_INDEX: {
            store.dispatch(clearError());
            break;
        }
    }

    next(action);
};

export default uiMiddleware;
