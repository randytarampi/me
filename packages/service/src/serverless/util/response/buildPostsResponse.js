const {RequestError} = require("@randy.tarampi/js");
const {responseBuilder} = require("@randy.tarampi/serverless");
const {checkHeader: checkMeVersionHeader, getHeaderValue: getMeVersionHeaderValue, headerName: meVersionHeaderName} = require("../request/headers/version.js");

/**
 * Set `Post.raw` to `null` before we send it down.
 * @param post {Post}
 * @returns {Post}
 */
const setPostRawToNull = post => post.set("raw", null);

/**
 * Build a version 3 GET [Posts]{@link Post} response – some array of Post objects with some metadata
 * @param posts {List<Post>} The posts returned for some query
 * @param total {number} The total number of posts available for some query
 * @param first {(object|undefined)} The first (oldest) [Post]{@link Post}s for some query
 * @param last {(object|undefined)} The latest (newest) [Post]{@link Post}s for some query
 * @returns {{posts: {Post[]}, total: {number}, oldest: {(object|undefined)}, newest: {(object|undefined)}}}
 */
const buildPostsV3ResponseBody = ({posts, total, first, last, firstFetched, lastFetched}) => {
    return {
        posts: posts.map(setPostRawToNull),
        total,
        oldest: first && Object.keys(first).reduce((oldest, oldestKey) => {
            oldest[oldestKey] = first[oldestKey] && first[oldestKey].date && first[oldestKey].date.toISO();
            return oldest;
        }, {}),
        newest: last && Object.keys(last).reduce((newest, newestKey) => {
            newest[newestKey] = last[newestKey] && last[newestKey].date && last[newestKey].date.toISO();
            return newest;
        }, {}),
        oldestFetched: firstFetched && Object.keys(firstFetched).reduce((oldest, oldestKey) => {
            oldest[oldestKey] = firstFetched[oldestKey] && firstFetched[oldestKey].date && firstFetched[oldestKey].date.toISO();
            return oldest;
        }, {}),
        newestFetched: lastFetched && Object.keys(lastFetched).reduce((newest, newestKey) => {
            newest[newestKey] = lastFetched[newestKey] && lastFetched[newestKey].date && lastFetched[newestKey].date.toISO();
            return newest;
        }, {})
    };
};

/**
 * Build a version 2 GET [Posts]{@link Post} response – some array of Post objects with some metadata
 * @param posts {Post[]} The posts returned for some query
 * @param total {number} The total number of posts available for some query
 * @param first {(Post|undefined)} The first (oldest) [Post]{@link Post} for some query
 * @param last {(Post|undefined)} The latest (newest) [Post]{@link Post} for some query
 * @returns {{posts: {Post[]}, total: {number}, oldest: {(string|undefined)}, newest: {(string|undefined)}}}
 */
const buildPostsV2ResponseBody = ({posts, total, first, last}) => {
    return {
        posts: posts.map(setPostRawToNull),
        total,
        oldest: first && first.date && first.date.toISO(),
        newest: last && last.date && last.date.toISO()
    };
};

/**
 * Build a version 1 GET [Posts]{@link Post} response – just an array of Post objects.
 * @param posts {Post[]}
 * @returns {Post[]}
 */
const buildPostsV1ResponseBody = posts => posts.map(setPostRawToNull);


/**
 * Transform the output of [searchPosts]{@link searchPosts} into a response object for some [ME-API-VERSION]{@link ME_API_VERSION_HEADER}
 * @function buildPostsResponse
 * @param posts {Post[]} The posts returned for some query
 * @param total {number} The total number of posts available for some query
 * @param first {(Post|undefined)} The first (oldest) [Post]{@link Post} for some query
 * @param last {(Post|undefined)} The latest (newest) [Post]{@link Post} for some query
 * @param metadata {(object|undefined)} Any other information from the query
 * @param parsedHeaders The headers containing a specified [ME-API-VERSION]{@link ME_API_VERSION_HEADER}
 * @returns {(object|RequestError)}
 */
module.exports = ({posts, total, first, last, ...metadata}, parsedHeaders) => {
    if (checkMeVersionHeader(parsedHeaders, 1)) {
        return responseBuilder(buildPostsV1ResponseBody(posts));
    }

    if (checkMeVersionHeader(parsedHeaders, 2)) {
        return responseBuilder(buildPostsV2ResponseBody({
            posts,
            total: total.global,
            first: first.global,
            last: last.global
        }));
    }

    if ([3, 4].some(expectedHeaderValue => checkMeVersionHeader(parsedHeaders, expectedHeaderValue))) {
        return responseBuilder(buildPostsV3ResponseBody({posts, total, first, last, ...metadata}));
    }

    throw new RequestError(`\`${meVersionHeaderName}\` specifies unsupported version of \`${getMeVersionHeaderValue(parsedHeaders)}\``, RequestError.codes.badRequest);
};
module.exports.setPostRawToNull = setPostRawToNull;
module.exports.buildPostsV3ResponseBody = buildPostsV3ResponseBody;
module.exports.buildPostsV2ResponseBody = buildPostsV2ResponseBody;
module.exports.buildPostsV1ResponseBody = buildPostsV1ResponseBody;
module.exports.default = module.exports;
