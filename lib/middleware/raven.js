import ReduxRavenMiddleware from "redux-raven-middleware";
import {ravenConfiguration} from "../logger";

export default () => {
	if (window.SENTRY_DSN) {
		return new ReduxRavenMiddleware(window.SENTRY_DSN, ravenConfiguration);
	}
};
