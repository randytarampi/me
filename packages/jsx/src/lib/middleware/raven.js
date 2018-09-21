import ReduxRavenMiddleware from "redux-raven-middleware";
import {buildRavenConfiguration} from "../logger";

export const ravenMiddleware = () => new ReduxRavenMiddleware(window.SENTRY_DSN, buildRavenConfiguration());

export default ravenMiddleware;
