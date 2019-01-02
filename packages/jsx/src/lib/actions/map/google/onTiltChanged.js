import {createAction} from "redux-actions";
import {updateGoogleMap} from "./updateMap";

export const HANDLE_GOOGLE_MAP_TILT_CHANGED = "HANDLE_GOOGLE_MAP_TILT_CHANGED";

export const onGoogleMapTiltChangedCreator = (getGoogleMap, id) => dispatch => { // eslint-disable-line no-unused-vars
    const googleMap = getGoogleMap();

    if (googleMap) {
        const tilt = googleMap.getTilt();
        const payload = {
            id,
            tilt
        };

        dispatch(onGoogleMapTiltChanged(payload));
        dispatch(updateGoogleMap(payload));

        return Promise.resolve(payload);
    }

    return Promise.resolve();
};

export const onGoogleMapTiltChanged = createAction(HANDLE_GOOGLE_MAP_TILT_CHANGED);

export default onGoogleMapTiltChangedCreator;
