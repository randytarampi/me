import {emojiReducer, errorReducer, uiReducer} from "@randy.tarampi/jsx/src/lib/data/index.js";
import api from "./api.js";
import letter from "./letter.js";

export const reducers = {
    api,
    letter,
    emoji: emojiReducer,
    error: errorReducer,
    ui: uiReducer
};

export default reducers;
