import {createAction} from "redux-actions";

export const CRISP_SESSION_LOADED = "CRISP_SESSION_LOADED";

export const crispSessionLoadedCreator = sessionId => dispatch => {
    dispatch(sessionLoaded(sessionId));
};

export const sessionLoaded = createAction(CRISP_SESSION_LOADED);

export default crispSessionLoadedCreator;
