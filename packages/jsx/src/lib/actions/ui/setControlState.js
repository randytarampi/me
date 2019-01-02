import {createAction} from "redux-actions";

export const SET_CONTROL_STATE = "SET_CONTROL_STATE";

export const setControlStateCreator = (id, controlState) => dispatch => {
    dispatch(setControlState({
        id,
        ...controlState
    }));
};

export const setControlState = createAction(SET_CONTROL_STATE);

export default setControlStateCreator;
