import {connect} from "react-redux";
import {withRouter} from "react-router";
import SwipeableViews from "react-swipeable-views";
import {bindKeyboard} from "react-swipeable-views-utils";
import {swipeableChangeIndexCreator} from "../actions";
import selectors from "../data/selectors";

export const ConnectedSwipeableRoutes = withRouter(connect(
    (state, {routes, location: routerLocation}) => {
        const swipeableIndex = selectors.getSwipeableIndex(state);
        const location = selectors.getLocation(state);
        const indexForRouterLocation = selectors.getIndexForRoute(state, routerLocation.pathname);
        const indexForRoute = Number.isInteger(indexForRouterLocation)
            ? indexForRouterLocation
            : routes.length - 1;
        const index = swipeableIndex !== null
            ? swipeableIndex
            : indexForRoute !== -1
                ? indexForRoute
                : routes.length - 1;

        return {
            location,
            index,
            resistance: true,
            ignoreNativeScroll: true,
            enableMouseEvents: true
        };
    },
    {
        onChangeIndex: swipeableChangeIndexCreator
    }
)(bindKeyboard(SwipeableViews)));

export default ConnectedSwipeableRoutes;
