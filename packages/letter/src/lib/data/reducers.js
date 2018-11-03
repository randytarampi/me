import {emojiReducer, errorReducer, uiReducer} from "@randy.tarampi/jsx";
import api from "./api";
import letter from "./letter";

export const reducers = {
    api,
    letter,
    emoji: emojiReducer,
    error: errorReducer,
    ui: uiReducer
};

export default reducers;
