import {createAction} from "redux-actions";

export const SET_ERROR = "SET_ERROR";

export default (error, errorCode, errorMessage) => dispatch => {
    dispatch(setError({error, errorCode, errorMessage}));
};

export const setError = createAction(SET_ERROR);
