import {createAction} from "redux-actions";

export const SET_GOOGLE_MAP_CENTER = "SET_GOOGLE_MAP_CENTER";

export const setGoogleMapCenterCreator = (getGoogleMap, id, newCenter) => dispatch => {
    const googleMap = getGoogleMap();
    const payload = {
        id,
        center: newCenter
    };

    if (googleMap) {
        dispatch(setGoogleMapCenter(payload));

        googleMap.panTo(newCenter);
    }

    return Promise.resolve(newCenter);
};

export const setGoogleMapCenter = createAction(SET_GOOGLE_MAP_CENTER);

export default setGoogleMapCenterCreator;
