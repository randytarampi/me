import {emojiReducer, errorReducer, uiReducer} from "@randy.tarampi/jsx/src/lib/index.jsx";
import api from "./api";
import resume from "./resume.js";

export const reducers = {
    api,
    resume,
    emoji: emojiReducer,
    error: errorReducer,
    ui: uiReducer
};

export default reducers;
