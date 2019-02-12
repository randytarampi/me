import {RequestError} from "@randy.tarampi/js";
import mime from "mime-types";
import {
    checkHeader as checkMeVersionHeader,
    getHeaderValue as getMeVersionHeaderValue,
    headerName as meVersionHeaderName
} from "../request/headers/version";
import responseBuilder from "./responseBuilder";

/**
 * Build a version 1 GET [rss]{@link RssFeed} response – just an RSS XML string.
 * @param rss {RssFeed}
 * @returns {string}
 */
export const buildRssV1ResponseBody = rss => rss.xml();

/**
 * Transform the output of [searchPosts]{@link searchPosts} into an RSS response object for some [ME-API-VERSION]{@link ME_API_VERSION_HEADER}
 * @function buildPostsResponse
 * @param rss {RssFeed}
 * @param parsedHeaders
 * @returns {Function}
 */
export default ({rss}, parsedHeaders) => {
    if (checkMeVersionHeader(parsedHeaders, 1)) {
        return responseBuilder(buildRssV1ResponseBody(rss), 200, {
            "Content-Disposition": "attachment",
            "Content-Type": mime.types.rss
        });
    }

    throw new RequestError(`\`${meVersionHeaderName}\` specifies unsupported version of \`${getMeVersionHeaderValue(parsedHeaders)}\``, RequestError.codes.badRequest);
};
