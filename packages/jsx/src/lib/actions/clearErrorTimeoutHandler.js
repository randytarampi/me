import {createAction} from "redux-actions";

export const CLEAR_ERROR_TIMEOUT_HANDLER = "CLEAR_ERROR_TIMEOUT_HANDLER";

export const clearErrorTimeoutHandlerCreator = () => dispatch => {
    dispatch(clearErrorTimeoutHandler());
};

export const clearErrorTimeoutHandler = createAction(CLEAR_ERROR_TIMEOUT_HANDLER);

export default clearErrorTimeoutHandlerCreator;
