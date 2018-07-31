import raven from "raven-js";

export const buildRavenConfiguration = () => {
    return {
        autoBreadcrumbs: true,
        captureUnhandledRejections: true,
        environment: window.ENVIRONMENT,
        release: window.VERSION
    };
};

const configureRaven = () => new Promise((resolve, reject) => {
    try {
        if (window.SENTRY_DSN) {
            raven.config(window.SENTRY_DSN, buildRavenConfiguration()).install();
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
const error = (error, ...rest) => {
    console.error.apply(null, [error, ...rest]); // eslint-disable-line no-console
    raven.captureException(error);
};
const fatal = (error, ...rest) => {
    console.error.apply(null, [error, ...rest]); // eslint-disable-line no-console
    raven.captureException(error, {level: "fatal"});
};

export default {
    debug,
    info,
    warn,
    error,
    fatal
};
