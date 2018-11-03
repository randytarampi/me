import {emojiReducer, errorReducer, uiReducer} from "@randy.tarampi/jsx";
import api from "./api";
import resume from "./resume";

export const reducers = {
    api,
    resume,
    emoji: emojiReducer,
    error: errorReducer,
    ui: uiReducer
};

export default reducers;
