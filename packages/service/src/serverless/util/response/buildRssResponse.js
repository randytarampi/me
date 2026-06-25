const {RequestError} = require("@randy.tarampi/js");
const {responseBuilder} = require("@randy.tarampi/serverless");
const mime = require("mime-types");
const {checkHeader: checkMeVersionHeader, getHeaderValue: getMeVersionHeaderValue, headerName: meVersionHeaderName} = require("../request/headers/version.js");

/**
 * Build a version 1 GET [rss]{@link RssFeed} response – just an RSS XML string.
 * @param rss {RssFeed}
 * @returns {string}
 */
const buildRssV1ResponseBody = rss => rss.xml();

/**
 * Transform the output of [searchPosts]{@link searchPosts} into an RSS response object for some [ME-API-VERSION]{@link ME_API_VERSION_HEADER}
 * @function buildPostsResponse
 * @param rss {RssFeed}
 * @param parsedHeaders
 * @returns {Function}
 */
module.exports = ({rss}, parsedHeaders) => {
    if (checkMeVersionHeader(parsedHeaders, 1)) {
        return responseBuilder(buildRssV1ResponseBody(rss), 200, {
            "Content-Disposition": "attachment",
            "Content-Type": mime.types.rss
        });
    }

    throw new RequestError(`\`${meVersionHeaderName}\` specifies unsupported version of \`${getMeVersionHeaderValue(parsedHeaders)}\``, RequestError.codes.badRequest);
};
module.exports.buildRssV1ResponseBody = buildRssV1ResponseBody;
module.exports.default = module.exports;
