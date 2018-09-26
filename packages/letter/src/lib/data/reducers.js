import {emojiReducer, errorReducer} from "@randy.tarampi/jsx";
import {combineReducers} from "redux-immutable";
import api from "./api";
import letter from "./letter";

export const reducers = {
    api,
    letter,
    emoji: emojiReducer,
    error: errorReducer
};

export const combinedReducers = combineReducers(reducers);

export default combinedReducers;
