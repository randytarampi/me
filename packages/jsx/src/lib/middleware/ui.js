import {LOCATION_CHANGE} from "redux-first-history";
import clearError, {CLEAR_ERROR} from "../actions/error/clearError.js";
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
    const stateLocation = selectors.getLocation(state);
    const actionLocation = action?.payload?.location || action?.payload;
    const location = actionLocation?.pathname ? actionLocation : stateLocation;

    return selectors.getIndexForRoute(state, location?.pathname);
};

const getSwipeableTabsExpectedTabId = (swipeableTabs, state, action) => {
    const expectedTabIndex = getSwipeableTabsExpectedTabIndex(state, action);
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
    const expectedTabId = getSwipeableTabsExpectedTabId(swipeableTabs, state, action);

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

export const uiMiddleware = store => {
    let lastSyncedTabs = null;

    return next => action => {
        const shouldSyncAfterAction = ![LOCATION_CHANGE, SET_ROUTES, CLEAR_ERROR, SWIPEABLE_CHANGE_INDEX, SWIPEABLE_TAB_CHANGE_INDEX].includes(action.type);

        switch (action.type) {
            case LOCATION_CHANGE:
            case SET_ROUTES: {
                const swipeableTabs = getSwipeableTabs();

                if (swipeableTabs) {
                    setSwipeableTabsIndex(swipeableTabs, store, action);
                    lastSyncedTabs = swipeableTabs;
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

    // Rehydration can render the tabs after the route actions have already run.
    // Check after every action until the current Materialize instance has been
    // synced once, while continuing to handle subsequent route changes above.
        const swipeableTabs = getSwipeableTabs();
        if (swipeableTabs && (shouldSyncAfterAction || swipeableTabs !== lastSyncedTabs)) {
            setSwipeableTabsIndex(swipeableTabs, store, action);
            lastSyncedTabs = swipeableTabs;
        }
    };
};

export default uiMiddleware;
