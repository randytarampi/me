import raven from "raven";
import packageJson from "../../package.json";

const configureRaven = () => new Promise((resolve, reject) => {
    try {
        if (process.env.SENTRY_DSN && !process.env.IS_OFFLINE) {
            raven.config(
                process.env.SENTRY_DSN,
                {
                    autoBreadcrumbs: true,
                    captureUnhandledRejections: true,
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
                        alias: process.env.SERVERLESS_ALIAS,
                        region: process.env.SERVERLESS_REGION || process.env.AWS_REGION
                    }
                }
            ).install();
            raven.on("error", error => console.error(error, "Raven failed to capture message")); // eslint-disable-line no-console
        }
        resolve();
    } catch (e) {
        reject(e);
    }
});

export const configureLogger = () => configureRaven();

const debug = (message, ...rest) => {
    console.debug.apply(null, [message, ...rest]); // eslint-disable-line no-console
    raven.captureMessage(message, {level: "debug"});
};
const info = (message, ...rest) => {
    console.log.apply(null, [message, ...rest]); // eslint-disable-line no-console
    raven.captureMessage(message, {level: "info"});
};
const warn = (warning, ...rest) => {
    console.warn.apply(null, [warning, ...rest]); // eslint-disable-line no-console
    raven.captureMessage(warning, {level: "warning"});
};
const error = (error, message, ...rest) => {
    console.error.apply(null, [message, error, ...rest]); // eslint-disable-line no-console
    raven.captureException(error);
};
const fatal = (error, message, ...rest) => {
    console.error.apply(null, [message, error, ...rest]); // eslint-disable-line no-console
    raven.captureException(error, {level: "fatal"});
};

export default {
    debug,
    info,
    warn,
    error,
    fatal
};
