import {createAction} from "redux-actions";

export const SET_ROUTES = "SET_ROUTES";

export const setRoutesCreator = routes => dispatch => {
    dispatch(setRoutes(routes));
};

export const setRoutes = createAction(SET_ROUTES);

export default setRoutesCreator;
