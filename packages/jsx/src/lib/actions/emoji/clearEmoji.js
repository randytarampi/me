import {createAction} from "redux-actions";
import selectors from "../../data/selectors";

export const CLEAR_EMOJI = "CLEAR_EMOJI";

export const clearEmojiCreator = emoji => (dispatch, getState) => {
    const state = getState();

    if (selectors.hasEmoji(state, emoji.id)) {
        dispatch(clearEmoji(emoji));
    }
};

export const clearEmoji = createAction(CLEAR_EMOJI);

export default clearEmojiCreator;
