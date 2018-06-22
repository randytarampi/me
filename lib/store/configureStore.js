import {routerMiddleware} from "react-router-redux";
import {applyMiddleware, createStore} from "redux";
import reduxCatch from "redux-catch";
import {composeWithDevTools} from "redux-devtools-extension";
import thunk from "redux-thunk";

const configureStore = (initialState = {}, history, reducers) => {
	const middlewares = [thunk, routerMiddleware(history)];

	middlewares.unshift(reduxCatch((error, getState, lastAction) => {
		console.error(error); //eslint-disable-line no-console
		console.error("current state", getState()); //eslint-disable-line no-console
		console.error("last action was", lastAction); //eslint-disable-line no-console
	}));

	//noinspection UnnecessaryLocalVariableJS
	const store = createStore(
		reducers,
		initialState,
		composeWithDevTools(applyMiddleware(...middlewares))
	);

	return store;
};

export default configureStore;
