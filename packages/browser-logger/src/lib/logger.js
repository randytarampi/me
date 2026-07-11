// @ts-check
import * as Sentry from "@sentry/browser";
import pino from "pino";
import ConsoleStream from "./consoleStream.js";

/** The browser globals this logger cares about. */
const getWindowVariables = () => {
    if (typeof window !== "undefined" && window) {
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

/** @returns {object} Sentry config for the browser. */
export const buildSentryConfiguration = () => {
    const {windowName, windowEnvironment, windowVersion, windowLogger} = getWindowVariables();

    return {
        logger: windowName,
        environment: windowEnvironment,
        release: windowVersion,
        debug: windowLogger
            ? ["trace", "debug"].includes(windowLogger.level)
            : false
    };
};

/** @returns {object} Pino config for the browser. */
export const buildPinoConfiguration = () => {
    const {windowName, windowEnvironment, windowVersion, windowSentryDsn, windowLogger} = getWindowVariables();

    if (windowLogger) {
        const pinoStreams = [];
        const enabledStreams = windowLogger.streams;
        const minimumLevel = windowLogger.level;

        if (enabledStreams.console) {
            pinoStreams.push({
                stream: new ConsoleStream(),
                level: minimumLevel
            });
        }

        if (enabledStreams.sentry) {
            if (windowSentryDsn) {
                Sentry.init({
                    dsn: windowSentryDsn,
                    ...buildSentryConfiguration()
                });
                pinoStreams.push({
                    level: "warn",
                    stream: {
                        write(data) {
                            try {
                                const record = typeof data === "string" ? JSON.parse(data) : data;
                                if (record.err) {
                                    Sentry.captureException(record.err, {extra: record});
                                } else if (record.level >= 50) {
                                    Sentry.captureException(new Error(record.msg), {extra: record});
                                } else {
                                    Sentry.captureMessage(record.msg, {level: "warning", extra: record});
                                }
                            } catch (e) {
                                console.error("Failed to send to Sentry:", e);
                            }
                        }
                    }
                });
            }
        }

        return {
            name: windowName || "jsx",
            level: minimumLevel,
            ...(pinoStreams.length > 0 ? {stream: pino.multistream(pinoStreams)} : {}),
            version: windowVersion,
            environment: windowEnvironment
        };
    }

    return {
        name: "jsx"
    };
};

/** @returns {*} A browser logger. */
export const createLogger = () => {
    return pino(buildPinoConfiguration());
};

/** The shared browser logger. */
export const logger = createLogger();

/** @type {typeof logger} */
export default logger;
