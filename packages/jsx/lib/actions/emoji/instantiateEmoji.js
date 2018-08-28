import {createAction} from "redux-actions";
import selectors from "../../data/selectors";

export const INSTANTIATE_EMOJI = "INSTANTIATE_EMOJI";

export default emoji => (dispatch, getState) => {
    const state = getState();

    if (!selectors.hasEmoji(state, emoji.id)) {
        dispatch(instantiateEmoji(emoji));
    }
};

export const instantiateEmoji = createAction(INSTANTIATE_EMOJI);
