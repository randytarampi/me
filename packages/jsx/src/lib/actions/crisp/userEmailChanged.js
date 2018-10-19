import {createAction} from "redux-actions";

export const CRISP_USER_EMAIL_CHANGED = "CRISP_USER_EMAIL_CHANGED";

export const crispUserEmailChangedCreator = email => dispatch => {
    dispatch(userEmailChanged(email));
};

export const userEmailChanged = createAction(CRISP_USER_EMAIL_CHANGED);

export default crispUserEmailChangedCreator;
