import {combineReducers} from "redux-immutable";
import api from "./api";
import emoji from "./emoji";
import error from "./error";
import posts from "./posts";

export const reducers = {
    api,
    error,
    emoji,
    posts
};

export const combinedReducers = combineReducers(reducers);

export default combinedReducers;
