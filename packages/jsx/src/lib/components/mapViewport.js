const VIEWPORT_EPSILON = 0.0001;
const CENTER_EPSILON = 0.000001;

export const hasMaterialViewportChange = (previousBounds, nextBounds) => {
    if (!previousBounds || !nextBounds) return true;
    return ["north", "east", "south", "west"].some(key => Math.abs(previousBounds[key] - nextBounds[key]) > VIEWPORT_EPSILON);
};

export const hasReachedMapInteractionCenter = (map, targetCenter) => {
    if (!targetCenter) return true;

    const currentCenter = map?.getCenter?.();
    if (!currentCenter) return true;

    const currentLat = typeof currentCenter.lat === "function" ? currentCenter.lat() : currentCenter.lat;
    const currentLng = typeof currentCenter.lng === "function" ? currentCenter.lng() : currentCenter.lng;

    return Math.abs(currentLat - targetCenter.lat) <= CENTER_EPSILON
        && Math.abs(currentLng - targetCenter.lng) <= CENTER_EPSILON;
};

export const shouldFetchForMapIdle = (previousBounds, nextBounds, suppressIdle = false, apiState) =>
    !suppressIdle && (!apiState || apiState.hasMore !== false) && hasMaterialViewportChange(previousBounds, nextBounds);
