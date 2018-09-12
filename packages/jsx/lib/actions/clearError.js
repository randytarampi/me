import {createAction} from "redux-actions";

export const CLEAR_ERROR = "CLEAR_ERROR";

export const clearErrorCreator = () => dispatch => {
    dispatch(clearError());
};

export const clearError = createAction(CLEAR_ERROR);

export default clearErrorCreator;
