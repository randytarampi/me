import {createAction} from "redux-actions";

export const HANDLE_GOOGLE_MAP_IDLE = "HANDLE_GOOGLE_MAP_IDLE";

export const onGoogleMapIdleCreator = (getGoogleMap, id) => dispatch => { // eslint-disable-line no-unused-vars
    const googleMap = getGoogleMap();

    if (googleMap) {
        const payload = {
            id
        };

        dispatch(onGoogleMapIdle(payload));

        return Promise.resolve(payload);
    }

    return Promise.resolve();
};

export const onGoogleMapIdle = createAction(HANDLE_GOOGLE_MAP_IDLE);

export default onGoogleMapIdleCreator;
