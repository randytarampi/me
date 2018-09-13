import {apiReducer as jsxApiReducer} from "@randy.tarampi/jsx";
import {apiReducer as letterApiReducer} from "@randy.tarampi/letter";
import {Map} from "immutable";
import {apiReducer as resumeApiReducer} from "jsonresume-theme-randytarampi/lib";

export const apiReducer = (state = Map(), action) => {
    state = jsxApiReducer(state, action);
    state = resumeApiReducer(state, action);
    state = letterApiReducer(state, action);

    return state;
};

export default apiReducer;
