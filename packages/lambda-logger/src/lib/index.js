// @ts-check
import * as Sentry from "@sentry/node";
import pino from "pino";

const getLoggerNameForPackageAndLambda = packageJson => `${packageJson.name}-${process.env.AWS_LAMBDA_FUNCTION_NAME}`;

const configureSentry = packageJson => Promise.resolve()
    .then(() => {
        if (process.env.SENTRY_DSN && !process.env.IS_OFFLINE) {
            Sentry.init({
                dsn: process.env.SENTRY_DSN,
                environment: process.env.SERVERLESS_STAGE,
                release: packageJson.version,
                integrations: integrations => integrations.filter(i => i.name !== "OnUncaughtException" && i.name !== "OnUnhandledRejection"),
                beforeSend: (event, hint) => {
                    event.tags = {
                        ...event.tags,
                        lambda: process.env.AWS_LAMBDA_FUNCTION_NAME,
                        version: process.env.AWS_LAMBDA_FUNCTION_VERSION,
                        memory_size: process.env.AWS_LAMBDA_FUNCTION_MEMORY_SIZE,
                        log_group: process.env.AWS_LAMBDA_LOG_GROUP_NAME,
                        log_stream: process.env.AWS_LAMBDA_LOG_STREAM_NAME,
                        service_name: process.env.SERVERLESS_SERVICE,
                        stage: process.env.SERVERLESS_STAGE,
                        region: process.env.AWS_REGION
                    };
                    event.logger = getLoggerNameForPackageAndLambda(packageJson);
                    return event;
                }
            });
        }
    });

/** @param {*} packageJson - The package metadata. @returns {Promise<*>} The sentry setup promise. */
export const configureLogger = packageJson => configureSentry(packageJson);

const sentryStream = {
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
};

const pinoStreams = [];

if (process.env.LOGGER_ENABLED === "true") {
    const minimumLevel = process.env.LOGGER_LEVEL;

    if (process.env.LOGGER_STREAM_HUMAN_ENABLED === "true") {
        pinoStreams.push({
            stream: process.stdout,
            level: minimumLevel
        });
    }

    if (process.env.LOGGER_STREAM_STDOUT_ENABLED === "true") {
        pinoStreams.push({
            stream: process.stdout,
            level: minimumLevel
        });
    }

    if (process.env.LOGGER_STREAM_SENTRY_ENABLED === "true") {
        pinoStreams.push({
            level: "warn",
            stream: sentryStream
        });
    }
}

/** @param {*} packageJson - The package metadata. @returns {*} A pino logger. */
export const createLogger = packageJson => pino({
    name: getLoggerNameForPackageAndLambda(packageJson),
    level: process.env.LOGGER_LEVEL || "info",
    ...(pinoStreams.length > 0 ? {stream: pino.multistream(pinoStreams)} : {}),
    version: packageJson.version,
    environment: process.env.SERVERLESS_STAGE
});

/** @type {typeof createLogger} */
export default createLogger;
