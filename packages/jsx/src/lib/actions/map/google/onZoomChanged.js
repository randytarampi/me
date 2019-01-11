import {createAction} from "redux-actions";
import {updateMap} from "../updateMap";

export const HANDLE_GOOGLE_MAP_ZOOM_CHANGED = "HANDLE_GOOGLE_MAP_ZOOM_CHANGED";

export const onGoogleMapZoomChangedCreator = (getGoogleMap, id) => dispatch => { // eslint-disable-line no-unused-vars
    const googleMap = getGoogleMap();

    if (googleMap) {
        const zoom = googleMap.getZoom();
        const payload = {
            id,
            zoom
        };

        dispatch(onGoogleMapZoomChanged(payload));
        dispatch(updateMap(payload));

        return Promise.resolve(payload);
    }

    return Promise.resolve();
};

export const onGoogleMapZoomChanged = createAction(HANDLE_GOOGLE_MAP_ZOOM_CHANGED);

export default onGoogleMapZoomChangedCreator;
