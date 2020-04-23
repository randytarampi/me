import {push} from "connected-react-router/immutable";
import {createAction} from "redux-actions";
import selectors from "../../data/selectors";

export const SWIPEABLE_TAB_CHANGE_INDEX = "SWIPEABLE_TAB_CHANGE_INDEX";

export const swipeableTabChangeIndexCreator = onChangeEvent => (dispatch, getState) => {
    const tabIndex = onChangeEvent.currentTarget.getAttribute("href").match(/\d+/g)[0];
    const passedTabIndex = Number(tabIndex);
    // NOTE-RT: We need the un`scoped` value here, per https://github.com/react-materialize/react-materialize/commit/f5d1e0d5b97ae4435d6a709b9fc030458fe30b9e#diff-f8f6138478fd4cda2a0f875f28829252R50.
    const index = passedTabIndex % Math.min((10 ** Math.floor(Math.log10(passedTabIndex))), 10);
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
