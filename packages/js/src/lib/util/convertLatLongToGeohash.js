import geohash from "latlon-geohash";
import {getGeohashPrecisionForLatsOrLongs} from "./getGeohashPrecisionForLatOrLong";

/**
 * @function Convert a latitude and longitude to a geohash
 * @param lat {number} The latitude of the centre of the area
 * @param long {number} The longitude of the centre of the area
 * @param [precision] {number}
 * @returns {string}
 */
export const convertLatLongToGeohash = (lat, long, precision) => {
    if (!Number.isFinite(precision)) {
        precision = getGeohashPrecisionForLatsOrLongs(lat, long);
    }

    return geohash.encode(lat, long, precision);
};

export default convertLatLongToGeohash;
