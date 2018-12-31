import {getNumericalPrecision} from "./getNumericalPrecision";

/**
 * Significant Figure Hash Length
 *
 * This is a quick and dirty lookup to figure out how long our hash
 * should be in order to guarantee a certain amount of trailing
 * significant figures. This was calculated by determining the error:
 * 45/2^(n-1) where n is the number of bits for a latitude or
 * longitude. Key is # of desired sig figs, value is minimum length of
 * the geohash.
 *
 * Shamelessly stolen from https://github.com/sunng87/node-geohash/blob/master/main.js#L50
 *
 * @type {number[]}
 */
// NOTE-RT:                  Desired sig figs:  0  1  2  3  4   5   6   7   8   9   10
export const GEOHASH_PRECISION_FOR_SIG_FIGS = [0, 5, 7, 8, 11, 12, 13, 15, 16, 17, 18];

/**
 * Return the best geohash precision described by any of the given latitude or longitude
 * @param latOrLong {number} A latitude or longitude value
 * @returns {number} The maximum geohash precision described by any of the given latOrlong
 */
export const getGeohashPrecisionForLatOrLong = latOrLong => {
    const numericalPrecisionForLatOrLong = getNumericalPrecision(latOrLong);
    const geohashPrecision = GEOHASH_PRECISION_FOR_SIG_FIGS[numericalPrecisionForLatOrLong];

    return Number.isFinite(geohashPrecision)
        ? geohashPrecision
        : 19;
};

/**
 * Return the best geohash precision described by any of the given latitude or longitude values
 * @param latsOrLongs {number[]} An array of latitude or longitude values
 * @returns {number} The maximum geohash precision described by any of the given latitudes or longitudes
 */
export const getGeohashPrecisionForLatsOrLongs = (...latsOrLongs) => {
    return Math.max.apply(null, latsOrLongs.map(getGeohashPrecisionForLatOrLong));
};

export default getGeohashPrecisionForLatsOrLongs;
