import {routerReducer as routing} from "react-router-redux";
import {combineReducers} from "redux";
import posts from "./posts";

export default combineReducers({
    posts,
    routing
});
