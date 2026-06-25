import {createAction} from "redux-actions";
import {updateMap} from "../updateMap.js";

export const HANDLE_GOOGLE_MAP_TYPE_CHANGED = "HANDLE_GOOGLE_MAP_TYPE_CHANGED";

export const onGoogleMapMapTypeIdChangedCreator = (getGoogleMap, id) => dispatch => {  
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
