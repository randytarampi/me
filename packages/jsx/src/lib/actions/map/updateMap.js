import {createAction} from "redux-actions";

export const UPDATE_MAP = "UPDATE_MAP";

export const updateMapCreator = map => dispatch => {
    dispatch(updateMap(map));

    return Promise.resolve(map);
};

export const updateMap = createAction(UPDATE_MAP);

export default updateMapCreator;
