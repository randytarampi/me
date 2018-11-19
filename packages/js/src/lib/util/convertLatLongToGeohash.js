import geohash from "latlon-geohash";

/**
 * The default number of characters of precision for geohashes, about 37mm * 19mm per http://www.movable-type.co.uk/scripts/geohash.html.
 * @type {number}
 */
export const GEOHASH_CHARACTER_PRECISION = 12;

/**
 * @function Convert a latitude and longitude to a geohash
 * @param lat {number}
 * @param long {number}
 * @param [precision = GEOHASH_CHARACTER_PRECISION] {string}
 * @returns {string}
 */
export const convertLatLongToGeohash = (lat, long, precision = GEOHASH_CHARACTER_PRECISION) => {
    return geohash.encode(lat, long, precision);
};

export default convertLatLongToGeohash;
