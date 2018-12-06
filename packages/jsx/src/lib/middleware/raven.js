import {buildRavenConfiguration} from "@randy.tarampi/browser-logger";
import ReduxRavenMiddleware from "redux-raven-middleware";

export const ravenMiddleware = () => new ReduxRavenMiddleware(window.SENTRY_DSN, buildRavenConfiguration());

export default ravenMiddleware;
