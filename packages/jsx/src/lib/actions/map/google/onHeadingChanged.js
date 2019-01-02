import {createAction} from "redux-actions";
import {updateGoogleMap} from "./updateMap";

export const HANDLE_GOOGLE_MAP_HEADING_CHANGED = "HANDLE_GOOGLE_MAP_HEADING_CHANGED";

export const onGoogleMapHeadingChangedCreator = (getGoogleMap, id) => dispatch => { // eslint-disable-line no-unused-vars
    const googleMap = getGoogleMap();

    if (googleMap) {
        const heading = googleMap.getHeading();
        const payload = {
            id,
            heading
        };

        dispatch(onGoogleMapHeadingChanged(payload));
        dispatch(updateGoogleMap(payload));

        return Promise.resolve(payload);
    }

    return Promise.resolve();
};

export const onGoogleMapHeadingChanged = createAction(HANDLE_GOOGLE_MAP_HEADING_CHANGED);

export default onGoogleMapHeadingChangedCreator;
