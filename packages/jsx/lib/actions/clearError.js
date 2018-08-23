import {createAction} from "redux-actions";

export const CLEAR_ERROR = "CLEAR_ERROR";

export default () => dispatch => {
    dispatch(clearError());
};

export const clearError = createAction(CLEAR_ERROR);
