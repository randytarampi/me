import {Map} from "immutable";
import {CLEAR_EMOJI} from "../actions/emoji/clearEmoji";
import {INSTANTIATE_EMOJI} from "../actions/emoji/instantiateEmoji";
import {UPDATE_EMOJI} from "../actions/emoji/updateEmoji";

export default (state = Map(), {type, payload = {}} = {}) => {
    switch (type) {
        case INSTANTIATE_EMOJI:
        case UPDATE_EMOJI:
            return state.set(payload.id, payload);

        case CLEAR_EMOJI:
            return state.delete(payload.id);

        default:
            return state;
    }
};

export const getEmoji = (state, emojiId) => state.get(emojiId);
export const hasEmoji = (state, emojiId) => !!getEmoji(state, emojiId);
