import {createAction} from "redux-actions";

export const CRISP_USER_NICKNAME_CHANGED = "CRISP_USER_NICKNAME_CHANGED";

export const crispUserNicknameChangedCreator = nickname => dispatch => {
    dispatch(userNicknameChanged(nickname));
};

export const userNicknameChanged = createAction(CRISP_USER_NICKNAME_CHANGED);

export default crispUserNicknameChangedCreator;
