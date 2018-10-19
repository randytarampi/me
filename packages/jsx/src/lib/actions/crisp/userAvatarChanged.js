import {createAction} from "redux-actions";

export const CRISP_USER_AVATAR_CHANGED = "CRISP_USER_AVATAR_CHANGED";

export const crispUserAvatarChangedCreator = avatar => dispatch => {
    dispatch(userAvatarChanged(avatar));
};

export const userAvatarChanged = createAction(CRISP_USER_AVATAR_CHANGED);

export default crispUserAvatarChangedCreator;
