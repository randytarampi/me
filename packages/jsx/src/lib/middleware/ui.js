/* global M */

import {LOCATION_CHANGE} from "connected-react-router/immutable";
import clearError from "../actions/error/clearError";
import {SWIPEABLE_CHANGE_INDEX, SWIPEABLE_TAB_CHANGE_INDEX} from "../actions/routing";

const getSwipeableTabs = () => {
    const swipeableTabsElement = document.getElementsByClassName("nav-tabs__swipeable")[0];
    const swipeableTabs = swipeableTabsElement && M && M.Tabs.getInstance(swipeableTabsElement);

    return swipeableTabs;
};

export const uiMiddleware = store => next => action => {
    switch (action.type) {
        case LOCATION_CHANGE: {
            const swipeableTabs = getSwipeableTabs();

            if (swipeableTabs) {
                swipeableTabs.updateTabIndicator();
            } else {
                setTimeout(() => {
                    const swipeableTabs = getSwipeableTabs();
                    swipeableTabs && swipeableTabs.updateTabIndicator();
                }, 50);
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
