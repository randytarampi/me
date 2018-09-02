import ReduxRavenMiddleware from "redux-raven-middleware";
import {buildRavenConfiguration} from "../logger";

export default () => new ReduxRavenMiddleware(window.SENTRY_DSN, buildRavenConfiguration());
