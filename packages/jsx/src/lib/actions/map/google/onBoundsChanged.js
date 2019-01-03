import {createAction} from "redux-actions";
import {updateGoogleMap} from "./updateMap";

export const HANDLE_GOOGLE_MAP_BOUNDS_CHANGED = "HANDLE_GOOGLE_MAP_BOUNDS_CHANGED";

export const onGoogleMapBoundsChangedCreator = (getGoogleMap, id) => dispatch => { // eslint-disable-line no-unused-vars
    const googleMap = getGoogleMap();

    if (googleMap) {
        const bounds = googleMap.getBounds();
        const center = bounds.getCenter();
        const sw = bounds.getSouthWest();
        const ne = bounds.getNorthEast();
        const payload = {
            id,
            bounds: bounds.toJSON(),
            center: center.toJSON(),
            sw: sw.toJSON(),
            ne: ne.toJSON()
        };

        dispatch(onGoogleMapBoundsChanged(payload));
        dispatch(updateGoogleMap(payload));

        return Promise.resolve(payload);
    }

    return Promise.resolve();
};

export const onGoogleMapBoundsChanged = createAction(HANDLE_GOOGLE_MAP_BOUNDS_CHANGED);

export default onGoogleMapBoundsChangedCreator;
