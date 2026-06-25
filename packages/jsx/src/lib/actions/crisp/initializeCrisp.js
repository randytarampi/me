import {createAction} from "redux-actions";
import {chatClosed} from "./chatClosed.js";
import {chatInitiated} from "./chatInitiated.js";
import {chatOpened} from "./chatOpened.js";
import {messageComposeReceived} from "./messageComposeReceived.js";
import {messageComposeSent} from "./messageComposeSent.js";
import {messageReceived} from "./messageReceived.js";
import {messageSent} from "./messageSent.js";
import {sessionLoaded} from "./sessionLoaded.js";
import {userAvatarChanged} from "./userAvatarChanged.js";
import {userEmailChanged} from "./userEmailChanged.js";
import {userNicknameChanged} from "./userNicknameChanged.js";
import {userPhoneChanged} from "./userPhoneChanged.js";
import {websiteAvailabilityChanged} from "./websiteAvailabilityChanged.js";

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
