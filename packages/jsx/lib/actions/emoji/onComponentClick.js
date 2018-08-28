import {createAction} from "redux-actions";
import selectors from "../../data/selectors";
import {updateEmoji} from "./updateEmoji";

export const HANDLE_COMPONENT_CLICK = "HANDLE_COMPONENT_CLICK";

export default (emojiId, componentId, event) => (dispatch, getState) => { // eslint-disable-line no-unused-vars
    const state = getState();
    const emoji = selectors.getEmoji(state, emojiId);
    const clickCountPath = ["components", componentId, "meta", "clicks"];
    let clicks = emoji.getIn(clickCountPath) || 0;

    clicks += 1;
    dispatch(onComponentClick({
        emojiId,
        componentId,
        clicks
    }));

    dispatch(updateEmoji(
        emoji.setIn(clickCountPath, clicks)
    ));
};

export const onComponentClick = createAction(HANDLE_COMPONENT_CLICK);
