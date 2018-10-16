import React from "react";
import {matchPath, Route} from "react-router";
import {matchRoutes} from "react-router-config";
import {ConnectedSwipeableRoutes} from "../containers";

const renderRoute = (routes, route, extraProps) => props => {
    // FIXME-RT: It'd be nice to not have to compute matches for every route here
    // NOTE-RT: Shamelessly stolen from https://github.com/sanfilippopablo/react-swipeable-routes/blob/master/src/index.js#L132
    const matchedRoutes = matchRoutes(routes, window.location.pathname);
    const bestMatchedRoute = matchedRoutes[0];
    const match = matchPath(window.location.pathname, route);

    if (match.path === bestMatchedRoute.match.path) {
        match.type = "full";
    } else if (matchedRoutes.length) {
        match.type = "outOfView";
    } else {
        match.type = "none";
    }

    props.match = match;

    return props.match && props.match.type === "full"
        ? route.render
            ? route.render({...props, ...extraProps, route: route})
            : <route.component {...props} {...extraProps} route={route}/>
        : null;
};

const buildRouteForRoutes = (extraProps, routes) => (route, i) => <Route // eslint-disable-line react/display-name
    key={route.key || i}
    path={route.path}
    exact={route.exact}
    strict={route.strict}
    render={renderRoute(routes, route, extraProps)}
/>;

// NOTE-RT: Shamelessly stolen from [`react-router-config^1.0.0-beta.4`](https://github.com/ReactTraining/react-router/blob/master/packages/react-router-config/modules/renderRoutes.js#L4)
export const renderSwipeableRoutes = (routes, extraProps = {}, swipeableRoutesProps = {}) => {
    if (routes) {
        const swipeableRoutes = routes.filter(route => !!route.tab);
        const nonSwipeableRoutes = routes.filter(route => !route.tab);

        // NOTE-RT: This needs to be a `div` and not a `Fragment` so we can test this with `shallow`
        return <div className="routes-container routes-container__swipeable">
            <ConnectedSwipeableRoutes routes={routes} {...swipeableRoutesProps}>
                {swipeableRoutes.map(buildRouteForRoutes(extraProps, routes))}
            </ConnectedSwipeableRoutes>
            {nonSwipeableRoutes.map(buildRouteForRoutes(extraProps, routes))}
        </div>;
    }

    return null;
};

export default renderSwipeableRoutes;
