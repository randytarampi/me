import {fromJS, Map} from "immutable";
import {CLEAR_MAP, INSTANTIATE_GOOGLE_MAP, UPDATE_GOOGLE_MAP} from "../actions/map";

export const mapReducer = (state = Map(), action) => {
    switch (action.type) {
        case INSTANTIATE_GOOGLE_MAP:
        case UPDATE_GOOGLE_MAP: {
            const mapState = state.get(action.payload.id) || Map();
            return state.set(action.payload.id, mapState.mergeDeep(fromJS(action.payload)));
        }

        case CLEAR_MAP:
            return state.delete(action.payload.id);

        default:
            return state;
    }
};

export default mapReducer;

export const getMap = (state, mapId) => state.get(mapId);
export const hasMap = (state, mapId) => !!getMap(state, mapId);
