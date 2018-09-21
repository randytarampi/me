import {Map} from "immutable";
import {CLEAR_EMOJI} from "../actions/emoji/clearEmoji";
import {INSTANTIATE_EMOJI} from "../actions/emoji/instantiateEmoji";
import {UPDATE_EMOJI} from "../actions/emoji/updateEmoji";

export const emojiReducer = (state = Map(), action) => {
    switch (action.type) {
        case INSTANTIATE_EMOJI:
        case UPDATE_EMOJI:
            return state.set(action.payload.id, action.payload);

        case CLEAR_EMOJI:
            return state.delete(action.payload.id);

        default:
            return state;
    }
};

export default emojiReducer;

export const getEmoji = (state, emojiId) => state.get(emojiId);
export const hasEmoji = (state, emojiId) => !!getEmoji(state, emojiId);
