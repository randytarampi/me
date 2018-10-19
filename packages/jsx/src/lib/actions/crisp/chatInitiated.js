import {createAction} from "redux-actions";

export const CRISP_CHAT_INITIATED = "CRISP_CHAT_INITIATED";

export const crispChatInitiatedCreator = () => dispatch => {
    dispatch(chatInitiated());
};

export const chatInitiated = createAction(CRISP_CHAT_INITIATED);

export default crispChatInitiatedCreator;
