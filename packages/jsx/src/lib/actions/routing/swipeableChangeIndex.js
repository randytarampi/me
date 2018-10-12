import {push} from "connected-react-router";
import {createAction} from "redux-actions";
import selectors from "../../data/selectors";

export const SWIPEABLE_CHANGE_INDEX = "SWIPEABLE_CHANGE_INDEX";

export const swipeableChangeIndexCreator = (index, indexLatest, meta) => (dispatch, getState) => {
    dispatch(swipeableChangeIndex({index, indexLatest, meta}));

    const state = getState();
    const routeForIndex = selectors.getRouteForIndex(state, index);
    const path = routeForIndex ? routeForIndex.path : null;

    if (path) {
        dispatch(push({
            pathname: path.split(":")[0]
        }));
    }
};

export const swipeableChangeIndex = createAction(SWIPEABLE_CHANGE_INDEX);

export default swipeableChangeIndexCreator;
