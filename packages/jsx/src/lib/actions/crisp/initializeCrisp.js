import {createAction} from "redux-actions";
import {chatClosed} from "./chatClosed";
import {chatInitiated} from "./chatInitiated";
import {chatOpened} from "./chatOpened";
import {messageComposeReceived} from "./messageComposeReceived";
import {messageComposeSent} from "./messageComposeSent";
import {messageReceived} from "./messageReceived";
import {messageSent} from "./messageSent";
import {sessionLoaded} from "./sessionLoaded";
import {userAvatarChanged} from "./userAvatarChanged";
import {userEmailChanged} from "./userEmailChanged";
import {userNicknameChanged} from "./userNicknameChanged";
import {userPhoneChanged} from "./userPhoneChanged";
import {websiteAvailabilityChanged} from "./websiteAvailabilityChanged";

export const CRISP_INITIALIZING = "CRISP_INITIALIZING";
export const CRISP_INITIALIZED = "CRISP_INITIALIZED";

export const crispNamespaceHandlerMap = {
    "session:loaded": sessionLoaded,
    "chat:initiated": chatInitiated,
    "chat:opened": chatOpened,
    "chat:closed": chatClosed,
    "message:sent": messageSent,
    "message:received": messageReceived,
    "message:compose:sent": messageComposeSent,
    "message:compose:received": messageComposeReceived,
    "user:email:changed": userEmailChanged,
    "user:phone:changed": userPhoneChanged,
    "user:nickname:changed": userNicknameChanged,
    "user:avatar:changed": userAvatarChanged,
    "website:availability:changed": websiteAvailabilityChanged
};

export const initializeCrispCreator = $crisp => dispatch => {
    dispatch(initializingCrisp());

    Object.keys(crispNamespaceHandlerMap).forEach(namespace => {
        $crisp.push(["on", namespace, payload => dispatch(crispNamespaceHandlerMap[namespace](payload))]);
    });

    dispatch(initializedCrisp());
};

export const initializingCrisp = createAction(CRISP_INITIALIZING);
export const initializedCrisp = createAction(CRISP_INITIALIZED);

export default initializeCrispCreator;
