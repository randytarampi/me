import geohash from "latlon-geohash";
import {getGeohashesForRadiusAroundPoint} from "./getGeohashesForRadiusAroundPoint";
import {getGeohashPrecisionForRadius} from "./getGeohashPrecisionForRadius";

/**
 * @function Return a set of geohashes that cover a circle for a given geohash and radius
 * @param geohashQuery {string} The geohash at the centre of the area
 * @param radius {number} The radius of the search area, in metres
 * @param [precision] {number} The desired precision of the returned geohashes
 * @returns {string}
 */
export const getGeohashesForRadiusAroundGeohash = (geohashQuery, radius, precision) => {
    if (!Number.isFinite(precision)) {
        precision = getGeohashPrecisionForRadius(radius);
    }
    const {lat: latitude, lon: longitude} = geohash.decode(geohashQuery);

    return getGeohashesForRadiusAroundPoint(latitude, longitude, radius, precision);
};

export default getGeohashesForRadiusAroundGeohash;
