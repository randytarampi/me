export const getClusterMarkerChanges = (previousMarkers, nextMarkers) => {
    const previous = previousMarkers || {};
    const next = nextMarkers || {};
    return {
        toAdd: Object.keys(next).filter(key => !previous[key]).map(key => next[key]),
        toRemove: Object.keys(previous).filter(key => !next[key]).map(key => previous[key])
    };
};
