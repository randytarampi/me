import {reducers as jsxReducers} from "@randy.tarampi/jsx";
import {reducers as letterReducers} from "@randy.tarampi/letter";
import {reducers as resumeReducers} from "jsonresume-theme-randytarampi/lib";
import {combineReducers} from "redux-immutable";
import api from "./api";

export const reducers = {
    ...jsxReducers,
    ...resumeReducers,
    ...letterReducers,
    api
};

export const combinedReducers = combineReducers(reducers);

export default combinedReducers;
