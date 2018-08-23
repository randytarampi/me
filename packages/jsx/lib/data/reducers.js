import {routerReducer as routing} from "react-router-redux";
import {combineReducers} from "redux";
import api from "./api";
import error from "./error";
import posts from "./posts";

export default combineReducers({
    api,
    error,
    posts,
    routing
});
