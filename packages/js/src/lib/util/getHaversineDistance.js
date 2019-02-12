import haversine from "haversine";

/**
 * @function Compute the haversine distance between two points, in metres by default
 * @param lat1 {number} The latitude of the first point
 * @param long1 {number} The longitude of the first point
 * @param lat2 {number} The latitude of the second point
 * @param long2 {number} The longitude of the second point
 * @param [unit=meter] {string} The distance unit of measure
 * @returns {number}
 */
export const getHaversineDistance = (lat1, long1, lat2, long2, unit = "meter") => {
    return haversine(
        {latitude: lat1, longitude: long1},
        {latitude: lat2, longitude: long2},
        {unit}
    );
};

export default getHaversineDistance;
