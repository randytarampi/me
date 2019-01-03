import haversine from "haversine";

/**
 * @function Compute the haversine distance between two points, in metres
 * @param lat1 {number} The latitude of the first point
 * @param long1 {number} The longitude of the first point
 * @param lat2 {number} The latitude of the second point
 * @param long2 {number} The longitude of the second point
 * @returns {number}
 */
export const getHaversineDistance = (lat1, long1, lat2, long2) => {
    return haversine(
        {latitude: lat1, longitude: long1},
        {latitude: lat2, longitude: long2},
        {unit: "meter"}
    );
};

export default getHaversineDistance;
