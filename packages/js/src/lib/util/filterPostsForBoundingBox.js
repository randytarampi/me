/**
 * @function Return {@link Post}s that fit within a bounding box.
 * @param posts {Post[]}
 * @param north {number} The latitude of the Northeast corner of the bounding box
 * @param east {number} The longitude of the Northeast corner of the bounding box
 * @param south {number} The latitude of the Southwest corner of the bounding box
 * @param west {number} The longitude of the Southwest corner of the bounding box
 * @returns {Post[]}
 */
export const filterPostsForBoundingBox = (posts, north, east, south, west) => posts
    .filter(post => Number.isFinite(post.lat)
        && Number.isFinite(post.long)
        && post.lat <= north
        && post.lat >= south
        && post.long <= east
        && post.long >= west
    );

export default filterPostsForBoundingBox;
