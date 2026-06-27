// @ts-check
/**
 * Build a promise that resolves or rejects after a timeout.
 * @param {*} resolution - The value to resolve with.
 * @param {*} rejection - The value to reject with.
 * @param {boolean} [shouldReject=false] - Flip it into a rejector.
 * @returns {(timeout?: number) => Promise<*>} A promise factory.
 */
export const customTimedPromise = (resolution, rejection, shouldReject = false) => (timeout = 50) => new Promise(
    (resolve, reject) => shouldReject
        ? setTimeout(() => reject(rejection), timeout)
        : setTimeout(() => resolve(resolution), timeout)
);

/**
 * Build and immediately run a timed promise.
 * @param {...*} args - Resolution/rejection settings.
 * @returns {Promise<*>} The promise, eventually.
 */
export const timedPromise = (...args) => customTimedPromise(...args)();
