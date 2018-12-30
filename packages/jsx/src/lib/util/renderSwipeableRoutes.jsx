import PropTypes from "prop-types";
import React from "react";
import {matchPath, Route, withRouter} from "react-router";
import {matchRoutes} from "react-router-config";
import {ConnectedSwipeableRoutes} from "../containers";

export const renderRoute = (routes, route, extraProps) => props => {
    // FIXME-RT: It'd be nice to not have to compute matches for every route here
    // NOTE-RT: Shamelessly stolen from https://github.com/sanfilippopablo/react-swipeable-routes/blob/master/src/index.js#L132
    const pathname = props.location.pathname;
    const matchedRoutes = matchRoutes(routes, pathname);
    const bestMatchedRoute = matchedRoutes[matchedRoutes.length - 1];
    const matchOptions = {
        path: route.path,
        exact: route.exact,
        strict: route.strict,
        sensitive: route.sensitive
    };
    let match = matchPath(pathname, matchOptions, bestMatchedRoute.route);

    if (match) {
        match.type = "full";
    } else {
        match = bestMatchedRoute.match;
        match.type = "none";
    }

    props.match = match;

    return match.type === "full"
        ? bestMatchedRoute.route.render
            ? bestMatchedRoute.route.render({...props, ...extraProps, ...bestMatchedRoute})
            : <bestMatchedRoute.route.component {...props} {...extraProps} {...bestMatchedRoute}/>
        : null;
};

// NOTE-RT: Shamelessly stolen from [`react-router-config^1.0.0-beta.4`](https://github.com/ReactTraining/react-router/blob/master/packages/react-router-config/modules/renderRoutes.js#L4)
const buildRouteForRoutes = (extraProps, routes) => (route, i) => <Route // eslint-disable-line react/display-name
    key={route.key || i}
    path={route.path}
    exact={route.exact}
    strict={route.strict}
    tab={route.tab}
    render={renderRoute(routes, route, extraProps)}
/>;

export const RenderedSwipeableRoutes = ({location, routes, extraProps, swipeableRoutesProps}) => {
    if (routes) {
        const swipeableRoutes = routes.filter(route => !!route.tab);

        let match = null;
        let matchedUnswipeableRoutes = [];

        routes.forEach(route => {
            if (match === null) {
                match = matchPath(location.pathname, route);

                if (match !== null && !swipeableRoutes.includes(route)) {
                    matchedUnswipeableRoutes.push(route);
                }
            }
        });

        return <div className="routes-container routes-container__swipeable">
            <ConnectedSwipeableRoutes {...swipeableRoutesProps}>
                {swipeableRoutes.map(buildRouteForRoutes(extraProps, routes))}
            </ConnectedSwipeableRoutes>
            {matchedUnswipeableRoutes.map(buildRouteForRoutes(extraProps, routes))}
        </div>;
    }

    return null;
};

RenderedSwipeableRoutes.propTypes = {
    location: PropTypes.object.isRequired,
    routes: PropTypes.array.isRequired,
    extraProps: PropTypes.object,
    swipeableRoutesProps: PropTypes.object
};

export const RenderedSwipeableRoutesForLocation = withRouter(RenderedSwipeableRoutes);

export const renderSwipeableRoutes = (routes, extraProps, swipeableRoutesProps) => {
    return <RenderedSwipeableRoutesForLocation
        routes={routes}
        extraProps={extraProps}
        swipeableRoutesProps={swipeableRoutesProps}
    />;
};

export default renderSwipeableRoutes;
