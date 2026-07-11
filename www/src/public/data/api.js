import {apiReducer as jsxApiReducer} from "@randy.tarampi/jsx";
import {apiReducer as letterApiReducer} from "@randy.tarampi/letter";
import {apiReducer as resumeApiReducer} from "@randy.tarampi/resume";
import {Map} from "immutable";

export const apiReducer = (state = Map(), action) => {
    state = jsxApiReducer(state, action);
    state = resumeApiReducer(state, action);
    state = letterApiReducer(state, action);

    return state;
};

export default apiReducer;
