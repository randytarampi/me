import {createAction} from "redux-actions";

export const CRISP_MESSAGE_SENT = "CRISP_MESSAGE_SENT";

export const crispMessageSentCreator = message => dispatch => {
    dispatch(messageSent(message));
};

export const messageSent = createAction(CRISP_MESSAGE_SENT);

export default crispMessageSentCreator;
