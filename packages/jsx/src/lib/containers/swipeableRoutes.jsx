import React from "react";
import {connect} from "react-redux";
import SwipeableViews from "react-swipeable-views";
import {bindKeyboard} from "react-swipeable-views-utils";
import {compose} from "redux";
import {swipeableChangeIndexCreator} from "../actions/index.js";
import selectors from "../data/selectors.js";
import {useLocation} from "react-router";

// NOTE-RT: `react-router@7` removed the `withRouter` HOC, so inject the current `location` via the `useLocation` hook.
export const withLocation = Component => function WithLocation(props) {
    const location = useLocation();

    return <Component {...props} location={location}/>;
};

export const mapStateToProps = (state, {location}) => {
    const indexForRouterLocation = selectors.getIndexForRoute(state, location.pathname);
    const index = Number.isInteger(indexForRouterLocation) && indexForRouterLocation >= 0
        ? indexForRouterLocation
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
    withLocation,
    connect(mapStateToProps, mapDispatchToProps),
    bindKeyboard,
)(SwipeableViews);

export default ConnectedSwipeableRoutes;
