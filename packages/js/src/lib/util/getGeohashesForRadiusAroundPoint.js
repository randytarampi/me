import proximityhash from "proximityhash";
import {getGeohashPrecisionForRadius} from "./getGeohashPrecisionForRadius";

/**
 * @function Return a set of geohashes that cover a circle for a given location and radius
 * @param lat {number} The latitude of the centre of the area
 * @param long {number} The longitude of the centre of the area
 * @param radius {number} The radius of the search area, in metres
 * @param [precision] {number} The desired precision of the returned geohashes
 * @returns {string}
 */
export const getGeohashesForRadiusAroundPoint = (lat, long, radius, precision) => {
    if (!Number.isFinite(precision)) {
        precision = getGeohashPrecisionForRadius(radius);
    }

    return proximityhash.createGeohashes({
        latitude: lat,
        longitude: long,
        radius,
        precision,
        georaptorFlag: true,
        approxHashCount: true
    });
};

export default getGeohashesForRadiusAroundPoint;
