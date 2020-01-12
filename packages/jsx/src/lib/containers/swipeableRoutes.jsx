import {connect} from "react-redux";
import {withRouter} from "react-router";
import SwipeableViews from "react-swipeable-views";
import {bindKeyboard} from "react-swipeable-views-utils";
import {compose} from "redux";
import {swipeableChangeIndexCreator} from "../actions";
import selectors from "../data/selectors";

export const mapStateToProps = (state, {location}) => {
    const swipeableIndex = selectors.getSwipeableIndex(state);
    const indexForRouterLocation = selectors.getIndexForRoute(state, location.pathname);
    const indexForRoute = Number.isInteger(indexForRouterLocation)
        ? indexForRouterLocation
        : undefined;
    const index = swipeableIndex !== null
        ? swipeableIndex
        : indexForRoute !== -1
            ? indexForRoute
            : undefined;

    return {
        location,
        index,
        resistance: true,
        ignoreNativeScroll: true
    };
};

export const mapDispatchToProps = {
    onChangeIndex: swipeableChangeIndexCreator
};

export const ConnectedSwipeableRoutes = compose(
    withRouter,
    connect(mapStateToProps, mapDispatchToProps),
    bindKeyboard,
)(SwipeableViews);

export default ConnectedSwipeableRoutes;
