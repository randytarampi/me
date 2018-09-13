import {apiReducer as jsxApiReducer} from "@randy.tarampi/jsx";
import {Map} from "immutable";
import {apiReducer as resumeApiReducer} from "jsonresume-theme-randytarampi/lib";

export const apiReducer = (state = Map(), action) => {
    state = jsxApiReducer(state, action);
    state = resumeApiReducer(state, action);

    return state;
};

export default apiReducer;
