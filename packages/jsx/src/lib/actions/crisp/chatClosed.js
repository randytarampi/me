import {createAction} from "redux-actions";

export const CRISP_CHAT_CLOSED = "CRISP_CHAT_CLOSED";

export const crispChatClosedCreator = () => dispatch => {
    dispatch(chatClosed());
};

export const chatClosed = createAction(CRISP_CHAT_CLOSED);

export default crispChatClosedCreator;
