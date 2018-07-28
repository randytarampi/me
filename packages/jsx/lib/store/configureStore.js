import {routerMiddleware} from "react-router-redux";
import {applyMiddleware, createStore} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";
import metrics from "../middleware/metrics";
import reduxRavenMiddleware from "../middleware/raven";

const configureStore = (initialState = {}, history, reducers) => {
    const middlewares = [thunk, metrics, routerMiddleware(history)];

    middlewares.unshift(reduxRavenMiddleware());

    //noinspection UnnecessaryLocalVariableJS
    const store = createStore(
        reducers,
        initialState,
        composeWithDevTools(applyMiddleware(...middlewares))
    );

    return store;
};

export default configureStore;
