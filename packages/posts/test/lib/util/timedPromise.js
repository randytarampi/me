export const customTimedPromise = (resolution, rejection, shouldReject = false) => (timeout = 50) => new Promise(
    (resolve, reject) => shouldReject
        ? setTimeout(() => reject(rejection), timeout)
        : setTimeout(() => resolve(resolution), timeout)
);

export const timedPromise = (...args) => customTimedPromise(...args)();
