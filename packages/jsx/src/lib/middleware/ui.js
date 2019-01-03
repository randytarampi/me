import {LOCATION_CHANGE} from "connected-react-router";
import $ from "jquery";
import clearError from "../actions/error/clearError";
import {SWIPEABLE_CHANGE_INDEX, SWIPEABLE_TAB_CHANGE_INDEX} from "../actions/routing";
import selectors from "../data/selectors";
import {formatIndexForMaterializeTabs} from "../util";

export const uiMiddleware = store => next => action => {
    switch (action.type) {
        case LOCATION_CHANGE: {
            const swipeableTabs = $(".nav-tabs__swipeable");

            if (swipeableTabs.tabs) {
                const state = store.getState();
                const location = action.payload.location || action.payload;
                const index = selectors.getIndexForRoute(state, location.pathname);
                const expectedTabIndex = formatIndexForMaterializeTabs(index);

                if (swipeableTabs.length) {
                    swipeableTabs.tabs("select_tab", `tab_${expectedTabIndex}`);
                } else {
                    setTimeout(() => $(".nav-tabs__swipeable").tabs("select_tab", `tab_${expectedTabIndex}`), 50);
                }
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
