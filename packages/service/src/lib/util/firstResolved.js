// NOTE-RT: Lifted from https://stackoverflow.com/a/37235274/1786400
export const firstResolved = promises => {
    // If a request fails, count that as a resolution so it will keep
    // waiting for other possible successes. If a request succeeds,
    // treat it as a rejection so Promise.all immediately bails out.
    return Promise.all(promises.map(promise => {
            return promise.then(
                value => Promise.reject(value),
                error => Promise.resolve(error)
            );
        }))
        .then(
            // If '.all' resolved, we've just got an array of errors.
            errors => {
                const errorOfErrors = new Error(`\`firstResolved\` failed and returned ${errors.length} errors (${JSON.stringify(errors.map(error => error.message))})`);
                errorOfErrors.errors = errors;
                return Promise.reject(errorOfErrors);
            },
            // If '.all' rejected, we've got the result we wanted.
            value => Promise.resolve(value)
        );
};

export default firstResolved;
