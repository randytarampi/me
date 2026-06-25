import {emojiReducer, errorReducer, uiReducer} from "@randy.tarampi/jsx/src/lib/data/index.js";
import api from "./api.js";
import resume from "./resume.js";

export const reducers = {
    api,
    resume,
    emoji: emojiReducer,
    error: errorReducer,
    ui: uiReducer
};

export default reducers;
