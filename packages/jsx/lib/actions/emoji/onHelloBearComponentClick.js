import {createAction} from "redux-actions";
import selectors from "../../data/selectors";
import onComponentClick from "./onComponentClick";
import updateEmoji from "./updateEmoji";

export const HANDLE_HELLO_BEAR_COMPONENT_CLICK = "HANDLE_HELLO_BEAR_COMPONENT_CLICK";

export default (emojiId, componentId, event) => (dispatch, getState) => {
    dispatch(onComponentClick(emojiId, componentId, event));

    const state = getState();
    const emoji = selectors.getEmoji(state, emojiId);
    const rightLeaningLeftArm = ["components", "rightLeaningLeftArm", "character"];
    const leftEye = ["components", "leftEye", "character"];
    const rightEye = ["components", "rightEye", "character"];
    const rightLeaningRightArm = ["components", "rightLeaningRightArm", "character"];
    const rightAction = ["components", "rightAction", "character"];
    const noseClickCount = ["components", "nose", "meta", "clicks"];
    let noseClicks = emoji.getIn(noseClickCount) || 0;

    dispatch(onHelloBearComponentClick({
        emojiId,
        componentId,
        noseClicks
    }));

    switch (noseClicks % 38) {
        case 1:
            dispatch(updateEmoji(
                emoji
                    .setIn(rightLeaningLeftArm, null)
                    .setIn(rightLeaningRightArm, null)
                    .setIn(rightAction, null)
            ));
            break;

        case 2:
            dispatch(updateEmoji(
                emoji
                    .setIn(leftEye, "ಠಿ")
                    .setIn(rightEye, "ಠ")
            ));
            break;

        case 3:
            dispatch(updateEmoji(
                emoji
                    .setIn(leftEye, "ಠ")
                    .setIn(rightEye, "ಠ")
            ));
            break;

        case 5:
            dispatch(updateEmoji(
                emoji
                    .setIn(leftEye, "◕")
                    .setIn(rightEye, "◕")
            ));
            break;

        case 8:
            dispatch(updateEmoji(
                emoji
                    .setIn(leftEye, "°")
                    .setIn(rightEye, "°")
            ));
            break;

        case 13:
            dispatch(updateEmoji(
                emoji
                    .setIn(rightLeaningLeftArm, null)
                    .setIn(leftEye, "–")
                    .setIn(rightEye, "–")
                    .setIn(rightLeaningRightArm, null)
                    .setIn(rightAction, null)
            ));
            break;

        case 21:
            dispatch(updateEmoji(
                emoji
                    .setIn(rightLeaningLeftArm, null)
                    .setIn(leftEye, " ͡°")
                    .setIn(rightEye, " ͡°")
                    .setIn(rightLeaningRightArm, null)
                    .setIn(rightAction, null)
            ));
            break;

        case 34:
            dispatch(updateEmoji(
                emoji
                    .setIn(rightLeaningRightArm, "ﾉ゛")
            ));
            window.open("mailto:rt@randytarampi.ca?subject=ʕ•ᴥ•ʔﾉ゛&body=I got to the end and couldn't stop clicking!", "_blank");
            break;

        case 35:
            window.open("mailto:rt@randytarampi.ca?subject=ʕಠᴥಠʔﾉ゛&body=These windows won't stop popping up!", "_blank");
            break;

        case 36:
            window.open("mailto:rt@randytarampi.ca?subject=Hey there…&body=I reached the end of the line and finally stopped at " + noseClicks + " clicks. What is this?", "_blank");
            break;
    }
};

export const onHelloBearComponentClick = createAction(HANDLE_HELLO_BEAR_COMPONENT_CLICK);
