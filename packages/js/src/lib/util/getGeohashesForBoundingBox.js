import {getGeohashesForRadiusAroundPoint} from "./getGeohashesForRadiusAroundPoint";
import {getGeohashPrecisionForRadius} from "./getGeohashPrecisionForRadius";
import {getHaversineDistance} from "./getHaversineDistance";

/**
 * @function Convert a latitude and longitude bounding box to a set of geohashes
 * @param north {number} The latitude of the Northeast corner of the bounding box
 * @param east {number} The longitude of the Northeast corner of the bounding box
 * @param south {number} The latitude of the Southwest corner of the bounding box
 * @param west {number} The longitude of the Southwest corner of the bounding box
 * @param [precision] {number} The desired precision of the returned geohashes
 * @returns {string}
 */
export const getGeohashesForBoundingBox = (north, east, south, west, precision) => {
    const radius = getHaversineDistance(north, east, south, west) / 2;

    if (!Number.isFinite(precision)) {
        precision = getGeohashPrecisionForRadius(radius);
    }

    return getGeohashesForRadiusAroundPoint(
        (north + south) / 2,
        (east + west) / 2,
        radius,
        precision
    );
};

export default getGeohashesForBoundingBox;
