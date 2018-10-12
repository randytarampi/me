import {combineReducers} from "redux-immutable";
import api from "./api";
import emoji from "./emoji";
import error from "./error";
import posts from "./posts";
import ui from "./ui";

export const reducers = {
    api,
    error,
    emoji,
    posts,
    ui
};

export const combinedReducers = combineReducers(reducers);

export default combinedReducers;
