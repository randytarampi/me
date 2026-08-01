import * as Sentry from "@sentry/browser";

export const ravenMiddleware = () => () => next => action => {
    try {
        const result = next(action);

        Sentry.addBreadcrumb({
            category: "redux",
            message: action.type,
            level: "info",
            data: {
                action: action.type,
                ...(action.payload ? {payload: action.payload} : {})
            }
        });

        return result;
    } catch (err) {
        Sentry.captureException(err, {extra: {action}});
        throw err;
    }
};

export default ravenMiddleware;
