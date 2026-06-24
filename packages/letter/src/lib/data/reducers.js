import {emojiReducer, errorReducer, uiReducer} from "@randy.tarampi/jsx/src/lib/index.jsx";
import api from "./api";
import letter from "./letter.js";

export const reducers = {
    api,
    letter,
    emoji: emojiReducer,
    error: errorReducer,
    ui: uiReducer
};

export default reducers;
