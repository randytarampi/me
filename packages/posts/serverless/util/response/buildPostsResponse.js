import {
    checkHeader as checkMeVersionHeader,
    getHeaderValue as getMeVersionHeaderValue,
    headerName as meVersionHeaderName
} from "../request/headers/version";
import RequestError, {codes} from "../request/requestError";
import responseBuilder from "./responseBuilder";

/**
 * Build a version 2 GET [Posts]{@link Post} response – some array of Post objects with some metadata
 * @param posts {Post[]} The posts returned for some query
 * @param total {number} The total number of posts available for some query
 * @param first {(Post|undefined)} The first (oldest) [Post]{@link Post} for some query
 * @param last {(Post|undefined)} The latest (newest) [Post]{@link Post} for some query
 * @returns {{posts: {Post[]}, total: {number}, oldest: {(string|undefined)}, newest: {(string|undefined)}}}
 */
export const buildPostsV2ResponseBody = ({posts, total, first, last}) => {
    return {
        posts,
        total,
        oldest: first && first.date && first.date.toISO(),
        newest: last && last.date && last.date.toISO(),
    };
};

/**
 * Build a version 1 GET [Posts]{@link Post} response – just an array of Post objects.
 * @param posts {Post[]}
 * @returns {Post[]}
 */
export const buildPostsV1ResponseBody = posts => posts;

/**
 * Transform the output of [searchPosts]{@link searchPosts} into a response object for some [ME-API-VERSION]{@link ME_API_VERSION_HEADER}
 * @function buildPostsResponse
 * @param parsedHeaders
 * @returns {Function}
 */
export default parsedHeaders =>
    /**
     * Transform the output of [searchPosts]{@link searchPosts} into a response object
     * @param posts {Post[]} The posts returned for some query
     * @param total {number} The total number of posts available for some query
     * @param first {(Post|undefined)} The first (oldest) [Post]{@link Post} for some query
     * @param last {(Post|undefined)} The latest (newest) [Post]{@link Post} for some query
     * @returns {(object|RequestError)}
     */
        ({posts, total, first, last}) => {
        if (checkMeVersionHeader(parsedHeaders, 1)) {
            return responseBuilder(buildPostsV1ResponseBody(posts));
        }

        if (checkMeVersionHeader(parsedHeaders, 2)) {
            return responseBuilder(buildPostsV2ResponseBody({posts, total, first, last}));
        }

        throw new RequestError(`\`${meVersionHeaderName}\` specifies unsupported version of \`${getMeVersionHeaderValue(parsedHeaders)}\``, codes.badRequest);
    };
