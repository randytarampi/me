import {createAction} from "redux-actions";
import logger from "../logger";

export const SET_ERROR = "SET_ERROR";

export default (error, errorCode, errorMessage) => dispatch => {
    if (error) {
        logger.error(error);
    } else {
        logger.warn(errorCode, errorMessage);
    }
    dispatch(setError({error, errorCode, errorMessage}));
};

export const setError = createAction(SET_ERROR);
