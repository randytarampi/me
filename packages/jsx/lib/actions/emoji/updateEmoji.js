import {createAction} from "redux-actions";
import selectors from "../../data/selectors";

export const UPDATE_EMOJI = "UPDATE_EMOJI";

export default emoji => (dispatch, getState) => {
    const state = getState();

    if (selectors.hasEmoji(state, emoji.id)) {
        dispatch(updateEmoji(emoji));
    }
};

export const updateEmoji = createAction(UPDATE_EMOJI);
