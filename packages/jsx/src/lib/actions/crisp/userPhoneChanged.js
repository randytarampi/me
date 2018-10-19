import {createAction} from "redux-actions";

export const CRISP_USER_PHONE_CHANGED = "CRISP_USER_PHONE_CHANGED";

export const crispUserPhoneChangedCreator = phone => dispatch => {
    dispatch(userPhoneChanged(phone));
};

export const userPhoneChanged = createAction(CRISP_USER_PHONE_CHANGED);

export default crispUserPhoneChangedCreator;
