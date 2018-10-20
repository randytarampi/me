import _ from "lodash";
import {
    CRISP_CHAT_CLOSED,
    CRISP_CHAT_OPENED,
    CRISP_MESSAGE_SENT,
    CRISP_SESSION_LOADED,
    CRISP_USER_AVATAR_CHANGED,
    CRISP_USER_EMAIL_CHANGED,
    CRISP_USER_NICKNAME_CHANGED,
    CRISP_USER_PHONE_CHANGED,
    CRISP_WEBSITE_AVAILABILITY_CHANGED
} from "../actions/crisp";
import metrics from "../metrics";

export const metricsMiddleware = () => next => action => {
    next(action);

    const trackReduxAction = metrics
        && metrics.api
        && _.isFunction(metrics.api.trackReduxAction)
        && metrics.api.trackReduxAction;

    if (!trackReduxAction) {
        return;
    }

    switch (action.type) {
        case CRISP_CHAT_CLOSED:
            trackReduxAction([action, {
                crisp: {
                    chat: "closed"
                }
            }]);
            break;

        case CRISP_CHAT_OPENED:
            trackReduxAction([action, {
                crisp: {
                    chat: "open"
                }
            }]);
            break;

        case CRISP_SESSION_LOADED:
            trackReduxAction([action, {
                crisp: {
                    session_id: action.payload
                }
            }]);
            break;

        case CRISP_MESSAGE_SENT:
            trackReduxAction([action, {
                crisp: {
                    user_id: action.payload.user.user_id
                },
                user: {
                    name: action.payload.user.nickname
                }
            }]);
            break;

        case CRISP_USER_AVATAR_CHANGED:
            trackReduxAction([action, {
                user: {
                    avatar: action.payload
                }
            }]);
            break;

        case CRISP_USER_EMAIL_CHANGED:
            trackReduxAction([action, {
                user: {
                    email: action.payload
                }
            }]);
            break;

        case CRISP_USER_NICKNAME_CHANGED:
            trackReduxAction([action, {
                user: {
                    name: action.payload
                }
            }]);
            break;

        case CRISP_USER_PHONE_CHANGED:
            trackReduxAction([action, {
                user: {
                    phone: action.payload
                }
            }]);
            break;

        case CRISP_WEBSITE_AVAILABILITY_CHANGED:
            trackReduxAction([action, {
                app: {
                    availability: action.payload
                }
            }]);
            break;

        default:
            trackReduxAction([action]);
    }
};

export default metricsMiddleware;
