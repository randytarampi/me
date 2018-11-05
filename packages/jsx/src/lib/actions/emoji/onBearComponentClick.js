import {defaultBearComponents} from "@randy.tarampi/js";
import {createAction} from "redux-actions";
import selectors from "../../data/selectors";
import onComponentClick from "./onComponentClick";
import updateEmoji from "./updateEmoji";

export const HANDLE_BEAR_COMPONENT_CLICK = "HANDLE_BEAR_COMPONENT_CLICK";

export const onBearComponentClickCreator = (emojiId, componentId, event) => (dispatch, getState) => {
    dispatch(onComponentClick(emojiId, componentId, event));

    const state = getState();
    const emoji = selectors.getEmoji(state, emojiId);
    const leftEye = ["components", "leftEye", "character"];
    const rightEye = ["components", "rightEye", "character"];
    const noseClickCount = ["components", "nose", "meta", "clicks"];
    let noseClicks = emoji.getIn(noseClickCount) || 0;

    dispatch(onBearComponentClick({
        emojiId,
        componentId,
        noseClicks
    }));

    switch (noseClicks % 3) {
        case 1:
            dispatch(updateEmoji(
                emoji
                    .setIn(leftEye, "ಠಿ")
                    .setIn(rightEye, "ಠ")
            ));
            break;

        case 2:
            dispatch(updateEmoji(
                emoji
                    .setIn(leftEye, "ಠ")
                    .setIn(rightEye, "ಠ")
            ));
            break;

        case 0:
            dispatch(updateEmoji(
                emoji
                    .setIn(leftEye, defaultBearComponents.leftEye.character)
                    .setIn(rightEye, defaultBearComponents.rightEye.character)
            ));
            break;
    }
};

export const onBearComponentClick = createAction(HANDLE_BEAR_COMPONENT_CLICK);

export default onBearComponentClickCreator;
