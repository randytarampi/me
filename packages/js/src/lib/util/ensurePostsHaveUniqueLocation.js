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
        if (locationHash[post.geohash]) {
            const randomOffset = Math.abs(Math.max(
                Math.random() * Number(`1e${offsetPrecision || -getNumericalPrecision(post.lat)}`),
                Math.random() * 10 * minimumOffset
            ));
            const offsetLat = post.lat + randomOffset;
            const offsetLong = post.long + randomOffset;
            const offsetPost = post
                .set("locationCreated", post.get("locationCreated") || Place({geo: {}}))
                .setIn(["locationCreated", "geo", "latitude"], offsetLat)
                .setIn(["locationCreated", "geo", "longitude"], offsetLong);

            locationHash[offsetPost.geohash] = true;

            return offsetPost;
        }

        locationHash[post.geohash] = true;

        return post;
    });
};

export default ensurePostsHaveUniqueLocation;
