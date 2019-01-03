/**
 * Per https://www.movable-type.co.uk/scripts/geohash.html, where the `index + 1` is the geohash precision and the value is the cell width (in metres)
 * @type {number[]}
 */
export const MAX_CELL_WIDTH_FOR_GEOHASH_PRECISION = [
    5000 * 1000,
    1250 * 1000,
    156 * 1000,
    39.1 * 1000,
    4.89 * 1000,
    1.22 * 1000,
    153,
    38.2,
    4.77,
    1.19,
    0.149,
    0.0372
];

/**
 * Get a reasonable geohash precision that covers some distance. Used to bound the search in {@link getGeohashesForRadiusAroundPoint} and {@link getGeohashesForRadiusAroundGeohash} as to not generate unnecessarily small geohashes that'll get eaten up by georaptor anyways.

 * @param radius {number} The radius that we want to bound our geohash precision to
 * @returns {number}
 */
export const getGeohashPrecisionForRadius = radius => {
    const geohashPrecisionIndex = MAX_CELL_WIDTH_FOR_GEOHASH_PRECISION.findIndex(cellWidth => {
        return cellWidth < radius;
    });

    if (geohashPrecisionIndex >= 0) {
        return geohashPrecisionIndex + 1;
    }

    return MAX_CELL_WIDTH_FOR_GEOHASH_PRECISION.length + 1;
};
