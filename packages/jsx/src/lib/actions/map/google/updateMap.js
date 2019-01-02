import {createAction} from "redux-actions";

export const UPDATE_GOOGLE_MAP = "UPDATE_GOOGLE_MAP";

export const updateGoogleMapCreator = map => dispatch => {
    dispatch(updateGoogleMap(map));

    return Promise.resolve(map);
};

export const updateGoogleMap = createAction(UPDATE_GOOGLE_MAP);

export default updateGoogleMapCreator;
