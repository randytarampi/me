import {createAction} from "redux-actions";

export const CRISP_MESSAGE_COMPOSE_RECEIVED = "CRISP_MESSAGE_COMPOSE_RECEIVED";

export const crispMessageComposeReceivedCreator = message => dispatch => {
    dispatch(messageComposeReceived(message));
};

export const messageComposeReceived = createAction(CRISP_MESSAGE_COMPOSE_RECEIVED);

export default crispMessageComposeReceivedCreator;
