// @ts-check

/**
 * One-at-a-time gate for edge-triggered infinite loads.
 *
 * `react-infinite` can invoke its load callback again during the
 * loading=false/children reconciliation window, double-firing a page
 * request. The guard admits exactly one call, and the owning component
 * releases it only once Redux has committed the response
 * (isLoading false in componentDidUpdate).
 *
 * @param {() => any} fetchPosts - The load dispatch to gate.
 * @returns {{isInFlight: () => boolean, run: () => boolean, release: () => void}} The guard.
 */
export const createInfiniteLoadGuard = fetchPosts => {
    let inFlight = false;

    return {
        isInFlight: () => inFlight,
        run: () => {
            if (inFlight) {
                return false;
            }

            inFlight = true;
            Promise.resolve(fetchPosts());
            return true;
        },
        release: () => {
            inFlight = false;
        }
    };
};

export default createInfiniteLoadGuard;