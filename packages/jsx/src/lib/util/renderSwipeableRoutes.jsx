import PropTypes from "prop-types";
import React from "react";
import {matchPath, useLocation} from "react-router";
import {ConnectedSwipeableRoutes} from "../containers";

// NOTE-RT: `react-router@7`'s `matchPath(pattern, pathname)` replaces `react-router@5`'s `matchPath(pathname, options)`;
// NOTE-RT: `react-router@5` prefix-matched unless `exact` was set, so `end` defaults to the route's `exact` flag.
export const matchRouteForPathname = (route, pathname) => route.path
    ? matchPath({path: route.path, end: !!route.exact, caseSensitive: !!route.sensitive}, pathname)
    : null;

export const renderRoute = (route, extraProps, location) => {
    const match = matchRouteForPathname(route, location.pathname);
    const routeProps = {...extraProps, location, match, route};

    if (route.path && !match) {
        return null;
    }

    return route.render
        ? route.render(routeProps)
        : route.component
            ? <route.component {...routeProps}/>
            : null;
};

export const RenderedSwipeableRoutes = ({location, routes, extraProps, swipeableRoutesProps}) => {
    if (!routes) {
        return null;
    }

    const swipeableRoutes = routes.filter(route => !!route.tab);
    const matchedUnswipeableRoutes = routes.filter(route => !route.tab && (!route.path || matchRouteForPathname(route, location.pathname)));

    return <div className="routes-container routes-container__swipeable">
        <ConnectedSwipeableRoutes {...swipeableRoutesProps}>
            {swipeableRoutes.map((route, i) => <div key={route.key || i}>
                {renderRoute(route, extraProps, location)}
            </div>)}
        </ConnectedSwipeableRoutes>
        {matchedUnswipeableRoutes.map((route, i) => <React.Fragment key={route.key || `unswipeable-${i}`}>
            {renderRoute(route, extraProps, location)}
        </React.Fragment>)}
    </div>;
};

RenderedSwipeableRoutes.propTypes = {
    location: PropTypes.object,
    routes: PropTypes.array.isRequired,
    extraProps: PropTypes.object,
    swipeableRoutesProps: PropTypes.object
};

// NOTE-RT: `react-router@7` removed the `withRouter` HOC, so read the current `location` via the `useLocation` hook.
export const RenderedSwipeableRoutesForLocation = function RenderedSwipeableRoutesForLocation(props) {
    const location = useLocation();

    return <RenderedSwipeableRoutes {...props} location={location}/>;
};

export const renderSwipeableRoutes = (routes, extraProps, swipeableRoutesProps) => {
    return <RenderedSwipeableRoutesForLocation
        routes={routes}
        extraProps={extraProps}
        swipeableRoutesProps={swipeableRoutesProps}
    />;
};

export default renderSwipeableRoutes;
