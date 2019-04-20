/* global M */

import {LOCATION_CHANGE} from "connected-react-router/immutable";
import clearError from "../actions/error/clearError";
import {SWIPEABLE_CHANGE_INDEX, SWIPEABLE_TAB_CHANGE_INDEX} from "../actions/routing";

export const uiMiddleware = store => next => action => {
    switch (action.type) {
        case LOCATION_CHANGE: {
            const swipeableTabsElement = document.getElementsByClassName("nav-tabs__swipeable")[0];
            const swipeableTabs = swipeableTabsElement && M.Tabs.getInstance(swipeableTabsElement);

            if (swipeableTabs) {
                setTimeout(() => swipeableTabs.updateTabIndicator(), 50);
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
