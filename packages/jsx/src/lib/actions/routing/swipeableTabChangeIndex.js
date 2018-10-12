import {push} from "connected-react-router";
import {createAction} from "redux-actions";
import selectors from "../../data/selectors";

export const SWIPEABLE_TAB_CHANGE_INDEX = "SWIPEABLE_TAB_CHANGE_INDEX";

export const swipeableTabChangeIndexCreator = tabIndex => (dispatch, getState) => {
    const index = Number(tabIndex);
    dispatch(swipeableTabChangeIndex({index}));

    const state = getState();
    const routeForIndex = selectors.getRouteForIndex(state, index);
    const path = routeForIndex ? routeForIndex.path : null;

    if (path) {
        dispatch(push({
            pathname: path.split(":")[0]
        }));
    }
};

export const swipeableTabChangeIndex = createAction(SWIPEABLE_TAB_CHANGE_INDEX);

export default swipeableTabChangeIndexCreator;
