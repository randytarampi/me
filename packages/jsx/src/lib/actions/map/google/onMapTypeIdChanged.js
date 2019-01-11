import {createAction} from "redux-actions";
import {updateMap} from "../updateMap";

export const HANDLE_GOOGLE_MAP_TYPE_CHANGED = "HANDLE_GOOGLE_MAP_TYPE_CHANGED";

export const onGoogleMapMapTypeIdChangedCreator = (getGoogleMap, id) => dispatch => { // eslint-disable-line no-unused-vars
    const googleMap = getGoogleMap();

    if (googleMap) {
        const type = googleMap.getMapTypeId();
        const payload = {
            id,
            type
        };

        dispatch(onGoogleMapMapTypeIdChanged(payload));
        dispatch(updateMap(payload));

        return Promise.resolve(payload);
    }

    return Promise.resolve();
};

export const onGoogleMapMapTypeIdChanged = createAction(HANDLE_GOOGLE_MAP_TYPE_CHANGED);

export default onGoogleMapMapTypeIdChangedCreator;
