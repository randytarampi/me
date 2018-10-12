import {createAction} from "redux-actions";

export const SET_ERROR_TIMEOUT_HANDLER = "SET_ERROR_TIMEOUT_HANDLER";

export const setErrorTimeoutHandlerCreator = (timeoutHandlerId) => dispatch => {
    dispatch(setErrorTimeoutHandler(timeoutHandlerId));
};

export const setErrorTimeoutHandler = createAction(SET_ERROR_TIMEOUT_HANDLER);

export default setErrorTimeoutHandlerCreator;
