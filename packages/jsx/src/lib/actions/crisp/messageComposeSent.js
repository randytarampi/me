import {createAction} from "redux-actions";

export const CRISP_MESSAGE_COMPOSE_SENT = "CRISP_MESSAGE_COMPOSE_SENT";

export const crispMessageComposeSentCreator = message => dispatch => {
    dispatch(messageComposeSent(message));
};

export const messageComposeSent = createAction(CRISP_MESSAGE_COMPOSE_SENT);

export default crispMessageComposeSentCreator;
