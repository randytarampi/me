/* global window */

import bunyan from "bunyan";
import bunyanSentryStream from "bunyan-sentry-stream";
import raven from "raven-js";
import ConsoleStream from "./consoleStream";

const bunyanStreams = [];

let windowName;
let windowEnvironment;
let windowVersion;
let windowSentryDsn;
let windowLogger;

export const buildRavenConfiguration = () => {
    return {
        logger: windowName,
        autoBreadcrumbs: true,
        captureUnhandledRejections: true,
        maxBreadcrumbs: 100,
        environment: windowEnvironment,
        release: windowVersion,
        debug: windowLogger
            ? ["trace", "debug"].includes(windowLogger.level)
            : false
    };
};

if (typeof window !== "undefined") {
    windowName = window.NAME;
    windowEnvironment = window.ENVIRONMENT;
    windowVersion = window.VERSION;
    windowSentryDsn = window.SENTRY_DSN;
    windowLogger = window.LOGGER;

    if (windowSentryDsn) {
        raven.config(windowSentryDsn, buildRavenConfiguration()).install();
    }

    if (windowLogger) {
        const enabledStreams = windowLogger.streams;
        const minimumLevel = windowLogger.level;

        if (enabledStreams.console) {
            bunyanStreams.push({
                stream: new ConsoleStream(),
                level: minimumLevel,
                type: "raw"
            });
        }

        if (enabledStreams.sentry) {
            bunyanStreams.push({
                level: minimumLevel,
                type: "raw",
                stream: new bunyanSentryStream.SentryStream(raven)
            });
        }
    }
}

export default bunyan.createLogger({
    name: windowName || "jsx",
    streams: bunyanStreams,
    src: false, // NOTE-RT: Needs to be false because it needs DTrace
    version: windowVersion,
    environment: windowEnvironment,
    serializers: bunyan.stdSerializers
});
