import {Place} from "../place";
import {getNumericalPrecision} from "./getNumericalPrecision";

/**
 * @function Return {@link Post}s that have unique locations
 * @param posts {Post[]}
 * @param [offsetPrecision] {number} The precision of the latitude or longitude offset for duplicate {@link Post} locations.
 * @param [minimumOffset] {number} The minimum latitude or longitude offset for duplicate {@link Post} locations.
 * @returns {Post[]}
 */
export const ensurePostsHaveUniqueLocation = (posts, offsetPrecision = 0, minimumOffset = 0) => {
    const locationHash = {};

    return posts.map(post => {
        const truncatedPostGeohash = post.geohash && post.geohash.slice(0, 8); // NOTE-RT: Assume everything with similar geohash prefixes with lengths > 8 (4.5m * 4.5m) are in the same place.

        if (locationHash[truncatedPostGeohash]) {
            const randomOffset = (Math.random() > 0.5 ? 1 : -1) * Math.max(
                Math.random() * Number(`1e${offsetPrecision || -getNumericalPrecision(post.lat)}`),
                Math.random() * 10 * minimumOffset
            );
            const offsetLat = post.lat + randomOffset;
            const offsetLong = post.long + randomOffset;
            const offsetPost = post
                .set("locationCreated", post.get("locationCreated") || Place({geo: {}}))
                .setIn(["locationCreated", "geo", "latitude"], offsetLat)
                .setIn(["locationCreated", "geo", "longitude"], offsetLong);

            locationHash[truncatedPostGeohash] = true;

            return offsetPost;
        }

        locationHash[truncatedPostGeohash] = true;

        return post;
    });
};

export default ensurePostsHaveUniqueLocation;
