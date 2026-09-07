import {LOCATION_CHANGE} from "redux-first-history";
import clearError from "../actions/error/clearError.js";
import {SWIPEABLE_CHANGE_INDEX, SWIPEABLE_TAB_CHANGE_INDEX} from "../actions/routing/index.js";
import {SET_ROUTES} from "../actions/routing/setRoutes.js";
import selectors from "../data/selectors.js";

const getSwipeableTabs = () => {
    if (typeof document === "undefined") {
        return null;
    }

    const swipeableTabsElement = document.getElementsByClassName("nav-tabs__swipeable")[0];

    return swipeableTabsElement && typeof window.M !== "undefined" && window.M && window.M.Tabs.getInstance(swipeableTabsElement);
};

const getSwipeableTabsExpectedTabIndex = (state, action) => {
    const location = action.payload.location || action.payload;

    return selectors.getIndexForRoute(state, location.pathname);
};

const getSwipeableTabsExpectedTabId = (swipeableTabs, store, action) => {
    const expectedTabIndex = getSwipeableTabsExpectedTabIndex(store, action);
    const tabLink = Number.isInteger(expectedTabIndex) && expectedTabIndex >= 0 && swipeableTabs.$tabLinks[expectedTabIndex];

    return tabLink && tabLink.hash ? tabLink.hash.slice(1) : undefined;
};

const syncSwipeableTabsAccessibility = (swipeableTabs, selectedIndex) => {
    swipeableTabs.$tabLinks.forEach((tabLink, index) => {
        if (!tabLink?.setAttribute) return;

        tabLink.setAttribute("role", "tab");
        tabLink.setAttribute("aria-selected", String(index === selectedIndex));
    });
};

const setSwipeableTabsIndex = (swipeableTabs, store, action) => {
    const state = store.getState();

    const expectedTabIndex = getSwipeableTabsExpectedTabIndex(state, action);
    const expectedTabId = getSwipeableTabsExpectedTabId(swipeableTabs, store, action);

    if (!Number.isInteger(expectedTabIndex) || expectedTabIndex < 0 || !expectedTabId) {
        swipeableTabs.$tabLinks.forEach(tabLink => {
            tabLink?.classList?.remove("active");
            tabLink?.parentElement?.classList?.remove("active");
        });
        syncSwipeableTabsAccessibility(swipeableTabs, -1);
        return;
    }

    syncSwipeableTabsAccessibility(swipeableTabs, expectedTabIndex);

    if (swipeableTabs.index !== expectedTabIndex) {
        swipeableTabs.select(expectedTabId);
    }
};

export const uiMiddleware = store => next => action => {
    switch (action.type) {
        case LOCATION_CHANGE:
        case SET_ROUTES: {
            const swipeableTabs = getSwipeableTabs();

            if (swipeableTabs) {
                setSwipeableTabsIndex(swipeableTabs, store, action);
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
