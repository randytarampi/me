import {reducers as jsxReducers} from "@randy.tarampi/jsx";
import {reducers as letterReducers} from "@randy.tarampi/letter";
import {reducers as resumeReducers} from "@randy.tarampi/resume";
import api from "./api";

export const reducers = {
    ...jsxReducers,
    ...resumeReducers,
    ...letterReducers,
    api
};

export default reducers;
