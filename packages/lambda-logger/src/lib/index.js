import bunyan from "bunyan";
import bunyanFormat from "bunyan-format";
import bunyanSentryStream from "bunyan-sentry-stream";
import raven from "raven";

const getLoggerNameForPackageAndLambda = packageJson => `${packageJson.name}-${process.env.AWS_LAMBDA_FUNCTION_NAME}`;

const configureRaven = packageJson => Promise.resolve()
    .then(() => {
        if (process.env.SENTRY_DSN) {
            raven.config(
                process.env.SENTRY_DSN,
                {
                    logger: getLoggerNameForPackageAndLambda(packageJson),
                    autoBreadcrumbs: true,
                    captureUnhandledRejections: true,
                    maxBreadcrumbs: 100,
                    environment: process.env.SERVERLESS_STAGE,
                    release: packageJson.version,
                    tags: {
                        lambda: process.env.AWS_LAMBDA_FUNCTION_NAME,
                        version: process.env.AWS_LAMBDA_FUNCTION_VERSION,
                        memory_size: process.env.AWS_LAMBDA_FUNCTION_MEMORY_SIZE,
                        log_group: process.env.AWS_LAMBDA_LOG_GROUP_NAME,
                        log_stream: process.env.AWS_LAMBDA_LOG_STREAM_NAME,
                        service_name: process.env.SERVERLESS_SERVICE,
                        stage: process.env.SERVERLESS_STAGE,
                        region: process.env.AWS_REGION
                    }
                }
            );
            raven.on("error", error => console.error(error, "Raven failed to capture message")); // eslint-disable-line no-console

            if (!process.env.IS_OFFLINE) {
                raven.install();
            }
        }
    });

export const configureLogger = packageJson => configureRaven(packageJson);

const bunyanStreams = [];

if (process.env.LOGGER_ENABLED === "true") {
    const minimumLevel = process.env.LOGGER_LEVEL;

    if (process.env.LOGGER_STREAM_HUMAN_ENABLED === "true") {
        bunyanStreams.push({
            stream: bunyanFormat({outputMode: "long"}),
            level: minimumLevel
        });
    }

    if (process.env.LOGGER_STREAM_STDOUT_ENABLED === "true") {
        bunyanStreams.push({
            stream: process.stdout,
            level: minimumLevel
        });
    }

    if (process.env.LOGGER_STREAM_SENTRY_ENABLED === "true") {
        bunyanStreams.push({
            level: "warn",
            type: "raw",
            stream: new bunyanSentryStream.SentryStream(raven)
        });
    }
}

export const createLogger = packageJson => bunyan.createLogger({
    name: getLoggerNameForPackageAndLambda(packageJson),
    streams: bunyanStreams,
    src: process.env.LOGGER_SRC_ENABLED === "true",
    version: packageJson.version,
    environment: process.env.SERVERLESS_STAGE,
    serializers: bunyan.stdSerializers
});

export default createLogger;
