import {fromJS, Map} from "immutable";
import {LOCATION_CHANGE} from "react-router-redux";

const initialState = Map({
    location: null,
    action: null
});

// NOTE-RT: Lifted directly from https://github.com/gajus/redux-immutable/pull/71/files#diff-04c6e90faac2675aa89e2176d2eec7d8R105
export default (state = initialState, action) => {
    switch (action.type) {
        case LOCATION_CHANGE: {
            const location = action.payload.location || action.payload;
            const action = action.payload.action;

            return state
                .set("location", fromJS(location))
                .set("action", fromJS(action));
        }

        default:
            return state;

    }
};

export const getLocation = state => state.get("location");
