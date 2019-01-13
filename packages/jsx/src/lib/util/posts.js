import {ensurePostsHaveUniqueLocation, filterPostsForBoundingBox} from "@randy.tarampi/js";

export const generateFilterFunctionForFilterName = {
    tags: commaSeparatedTags => posts => {
        const filteringTags = commaSeparatedTags.split(",");
        return posts.filter(post => post.tags && post.tags.find(tag => filteringTags.includes(tag)));
    },
    earlierThan: earlierThanDate => posts => posts.filter(post => post.date.diff(earlierThanDate) >= 0),
    location: () => posts => posts.filter(post => Number.isFinite(post.lat) && Number.isFinite(post.long)),
    boundingBox: (north, east, south, west) => posts => filterPostsForBoundingBox(posts, north, east, south, west)
};

export const generateTransformFunctionForTransformName = {
    location: (offsetPrecision, minimumOffset) => posts => ensurePostsHaveUniqueLocation(posts, offsetPrecision, minimumOffset)
};
