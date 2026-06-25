import PropTypes from "prop-types";
import React from "react";
import {Route, Routes, useLocation, useParams} from "../reactRouter.cjs";

// NOTE-RT: A native `react-router@7` replacement for the removed `react-router-config` `renderRoutes`.
// NOTE-RT: `react-router@5` defaulted to prefix matching unless `exact` was set, whereas `react-router@7` matches
// NOTE-RT: exactly by default, so non-`exact` routes are translated into splat (`/*`) paths to preserve behaviour.
export const toRoutePath = route => {
    if (!route.path) {
        return "*";
    }

    if (route.exact || route.path.endsWith("*")) {
        return route.path;
    }

    return route.path === "/"
        ? "/*"
        : `${route.path}/*`;
};

// NOTE-RT: `react-router@7` no longer injects the v5 `match`/`location` route props that the app's route components
// NOTE-RT: (e.g. `ConnectedLetter` reading `ownProps.match.params.variant`) still expect, so reconstruct them from
// NOTE-RT: the `useParams`/`useLocation` hooks and pass them through.
export const RouteElement = ({route, extraProps = {}}) => {
    const params = useParams();
    const location = useLocation();
    const match = {params, path: route.path, url: location.pathname, isExact: true};
    const routeProps = {...extraProps, route, match, location};

    return route.render
        ? route.render(routeProps)
        : route.component
            ? <route.component {...routeProps}/>
            : null;
};

RouteElement.propTypes = {
    route: PropTypes.object.isRequired,
    extraProps: PropTypes.object
};

export const renderRouteElement = (route, extraProps) => <RouteElement route={route} extraProps={extraProps}/>;

export const RenderedRoutes = ({routes, extraProps = {}, routerProps = {}}) => {
    if (!routes) {
        return null;
    }

    return <Routes {...routerProps}>
        {routes.map((route, index) => <Route
            key={route.key || index}
            path={toRoutePath(route)}
            element={renderRouteElement(route, extraProps)}
        />)}
    </Routes>;
};

RenderedRoutes.propTypes = {
    routes: PropTypes.array,
    extraProps: PropTypes.object,
    routerProps: PropTypes.object
};

export const renderRoutes = (routes, extraProps, routerProps) => <RenderedRoutes
    routes={routes}
    extraProps={extraProps}
    routerProps={routerProps}
/>;

export default renderRoutes;
