/* global window */

import bunyan from "bunyan";
import {SentryStream} from "bunyan-sentry-stream";
import raven from "raven-js";
import ConsoleStream from "./consoleStream";

const getWindowVariables = () => {
    if (typeof window !== "undefined") {
        return {
            windowName: window.NAME,
            windowEnvironment: window.ENVIRONMENT,
            windowVersion: window.VERSION,
            windowSentryDsn: window.SENTRY_DSN,
            windowLogger: window.LOGGER,
        };
    }

    return {};
};

export const buildRavenConfiguration = () => {
    const {windowName, windowEnvironment, windowVersion, windowLogger} = getWindowVariables();

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

export const buildBunyanConfiguration = () => {
    const {windowName, windowEnvironment, windowVersion, windowSentryDsn, windowLogger} = getWindowVariables();

    if (windowLogger) {
        const bunyanStreams = [];
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
            if (windowSentryDsn) {
                raven.config(windowSentryDsn, buildRavenConfiguration()).install();
                bunyanStreams.push({
                    level: "warn",
                    type: "raw",
                    stream: new SentryStream(raven)
                });
            }
        }

        return {
            name: windowName || "jsx",
            streams: bunyanStreams,
            src: false, // NOTE-RT: Needs to be false because it needs DTrace
            version: windowVersion,
            environment: windowEnvironment,
            serializers: bunyan.stdSerializers
        };
    }

    return null;
};

export const createLogger = () => {
    return bunyan.createLogger(buildBunyanConfiguration());
};

export default createLogger();
