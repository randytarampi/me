import {createAction} from "redux-actions";
import selectors from "../../../data/selectors";

export const INSTANTIATE_GOOGLE_MAP = "INSTANTIATE_GOOGLE_MAP";

export const instantiateGoogleMapCreator = (getGoogleMap, id) => (dispatch, getState) => {
    const state = getState();
    const googleMap = getGoogleMap();
    const googleMapState = selectors.getMap(state, id);
    let payload = {
        id,
        vendor: "google"
    };

    if (googleMapState && googleMapState.size) {
        payload = Object.assign(googleMapState.toJS(), payload);

        const googleMapStateObject = googleMapState.toJS();

        if (googleMap) {
            if (googleMapStateObject.center) {
                googleMap.panTo(googleMapStateObject.center);

                if (googleMapStateObject.zoom) {
                    googleMap.setZoom(googleMapStateObject.zoom);
                }

            } else if (googleMapStateObject.bounds) {
                googleMap.panToBounds(googleMapStateObject.bounds);
            }
        }
    }

    dispatch(instantiateGoogleMap(payload));

    return Promise.resolve(payload);
};

export const instantiateGoogleMap = createAction(INSTANTIATE_GOOGLE_MAP);

export default instantiateGoogleMapCreator;
