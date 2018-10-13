import React from "react";
import {Route} from "react-router";
import {ConnectedSwipeableRoutes} from "../containers";

// NOTE-RT: Shamelessly stolen from [`react-router-config^1.0.0-beta.4`](https://github.com/ReactTraining/react-router/blob/master/packages/react-router-config/modules/renderRoutes.js#L4)
export const renderSwipeableRoutes = (routes, extraProps = {}, swipeableRoutesProps = {}) => {
    return routes ? (
        <ConnectedSwipeableRoutes routes={routes} {...swipeableRoutesProps}>
            {
                routes
                    .filter(route => !!route.path)
                    .map((route, i) => (
                        <Route
                            key={route.key || i}
                            path={route.path}
                            exact={route.exact}
                            strict={route.strict}
                            render={props =>
                                route.render ? (
                                    route.render({...props, ...extraProps, route: route})
                                ) : (
                                    <route.component {...props} {...extraProps} route={route}/>
                                )
                            }
                        />
                    ))
            }
        </ConnectedSwipeableRoutes>
    ) : null;
};

export default renderSwipeableRoutes;
