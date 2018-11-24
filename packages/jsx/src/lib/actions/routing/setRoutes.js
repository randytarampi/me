import {createAction} from "redux-actions";

export const SET_ROUTES = "SET_ROUTES";

const sanitizeRouteForState = ({routes, tab, component, ...route}) => { // eslint-disable-line no-unused-vars
    const routeProps = {
        ...route,
        tab: !!tab
    };

    if (routes) {
        routeProps.routes = sanitizeRoutesForState(routes);
    }

    return routeProps;
};

const sanitizeRoutesForState = routes => routes.map(sanitizeRouteForState);

export const setRoutesCreator = routes => dispatch => {
    dispatch(setRoutes(sanitizeRoutesForState(routes)));
};

export const setRoutes = createAction(SET_ROUTES);

export default setRoutesCreator;
