import {Map} from "immutable";
import {LOCATION_CHANGE} from "react-router-redux";

const initialState = Map({
    location: null,
    action: null
});

// NOTE-RT: Lifted directly from https://github.com/gajus/redux-immutable/pull/71/files#diff-04c6e90faac2675aa89e2176d2eec7d8R105
export default (state = initialState, {type, payload = {}} = {}) => {
    if (type === LOCATION_CHANGE) {
        const location = payload.location || payload;
        const action = payload.action;

        return state
            .set("location", location)
            .set("action", action);
    }

    return state;
};

export const getLocation = state => state.get("location");
