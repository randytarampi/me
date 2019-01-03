import selectors from "../../data/selectors";
import {fetchPostsCreator} from "./fetchPosts";

export const fetchPostsForMapCreator = (mapId, fetchUrl, postType = "global", {filter, filterValue, ...params} = {}) => (dispatch, getState) => {
    const state = getState();
    const searchType = "map";
    const mapState = selectors.getMap(state, mapId);
    const {center, bounds} = mapState ? mapState.toJS() : {};
    const {north, east, south, west} = bounds || {};
    const oldestLoadedPost = selectors.getOldestPostForBoundingBox(state, north, east, south, west);
    const oldestLoadedPostDate = oldestLoadedPost && oldestLoadedPost.date;

    const searchParams = {
        ...params,
        ...(
            oldestLoadedPostDate
                ? {
                    orderBy: "datePublished",
                    orderOperator: "lt",
                    orderComparator: oldestLoadedPostDate && oldestLoadedPostDate.toISO(),
                    orderComparatorType: "String"
                }
                : null
        ),
        north,
        east,
        south,
        west,
        lat: center && center.lat,
        long: center && center.lng
    };

    if (filter) {
        searchParams[filter] = filterValue;
    }

    return fetchPostsCreator(fetchUrl, postType, searchParams, searchType)(dispatch, getState);
};

export default fetchPostsForMapCreator;
