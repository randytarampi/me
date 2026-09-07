const VIEWPORT_EPSILON = 0.0001;

export const hasMaterialViewportChange = (previousBounds, nextBounds) => {
    if (!previousBounds || !nextBounds) return true;
    return ["north", "east", "south", "west"].some(key => Math.abs(previousBounds[key] - nextBounds[key]) > VIEWPORT_EPSILON);
};

export const shouldFetchForMapIdle = (previousBounds, nextBounds, suppressIdle = false, apiState) =>
    !suppressIdle && (!apiState || apiState.hasMore !== false) && hasMaterialViewportChange(previousBounds, nextBounds);
