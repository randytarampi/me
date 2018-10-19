import {createAction} from "redux-actions";

export const CRISP_MESSAGE_RECEIVED = "CRISP_MESSAGE_RECEIVED";

export const crispMessageReceivedCreator = message => dispatch => {
    dispatch(messageReceived(message));
};

export const messageReceived = createAction(CRISP_MESSAGE_RECEIVED);

export default crispMessageReceivedCreator;
