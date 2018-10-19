import {createAction} from "redux-actions";

export const CRISP_CHAT_OPENED = "CRISP_CHAT_OPENED";

export const crispChatOpenedCreator = () => dispatch => {
    dispatch(chatOpened());
};

export const chatOpened = createAction(CRISP_CHAT_OPENED);

export default crispChatOpenedCreator;
