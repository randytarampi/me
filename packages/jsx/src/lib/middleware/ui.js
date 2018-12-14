/* global $ */

import {LOCATION_CHANGE} from "connected-react-router";
import clearError from "../actions/clearError";
import {SWIPEABLE_CHANGE_INDEX, SWIPEABLE_TAB_CHANGE_INDEX} from "../actions/routing";
import selectors from "../data/selectors";
import {formatIndexForMaterializeTabs} from "../util";

const SWIPEABLE_TABS_CLASS = ".nav-tabs__swipeable";

const setSwipeableTabForState = (swipeableTabs = $(SWIPEABLE_TABS_CLASS), store, action) => {
    if (swipeableTabs.tabs) {
        const state = store.getState();
        const location = action.payload.location || action.payload;
        const index = selectors.getIndexForRoute(state, location.pathname);
        const expectedTabIndex = formatIndexForMaterializeTabs(index);

        swipeableTabs.tabs("select_tab", `tab_${expectedTabIndex}`);
    } else {
        setTimeout(() => setSwipeableTabForState(swipeableTabs, store, action), 50);
    }
};

export const uiMiddleware = store => next => action => {
    switch (action.type) {
        case LOCATION_CHANGE: {
            const swipeableTabs = $(SWIPEABLE_TABS_CLASS);

            if (swipeableTabs) {
                setSwipeableTabForState(swipeableTabs, store, action);
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
