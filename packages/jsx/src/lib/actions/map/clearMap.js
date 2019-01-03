import {createAction} from "redux-actions";

export const CLEAR_MAP = "CLEAR_MAP";

export const clearMapCreator = id => dispatch => {
    const payload = {id};

    dispatch(clearMap(payload));

    return Promise.resolve(payload);
};

export const clearMap = createAction(CLEAR_MAP);

export default clearMapCreator;
