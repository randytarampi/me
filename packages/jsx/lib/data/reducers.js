import {routerReducer as routing} from "react-router-redux";
import {combineReducers} from "redux";
import error from "./error";
import posts from "./posts";

export default combineReducers({
    error,
    posts,
    routing
});
