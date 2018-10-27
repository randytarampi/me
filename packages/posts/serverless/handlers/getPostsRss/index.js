import RssFeed from "../../../lib/rssFeed";
import configureEnvironment from "../../util/configureEnvironment";
import getPostsForParsedQuerystringParameters from "../../util/getPostsForParsedQuerystringParameters";
import parseHeaders from "../../util/request/parseHeaders";
import parseQuerystringParameters from "../../util/request/parseQuerystringParameters";
import buildRssResponse from "../../util/response/buildRssResponse";
import returnErrorResponse from "../../util/response/returnErrorResponse";

export default (event, context, callback) => {
    if (event.source === "serverless-plugin-warmup") {
        return callback(null, "Lambda is warm!");
    }

    const errorHandler = returnErrorResponse(callback);
    let parsedHeaders;
    let parsedQuerystringParameters;

    try {
        parsedHeaders = parseHeaders(event.headers);
        parsedQuerystringParameters = parseQuerystringParameters(event.queryStringParameters);
    } catch (error) {
        return errorHandler(error);
    }

    configureEnvironment()
        .then(() => getPostsForParsedQuerystringParameters(parsedQuerystringParameters))
        .then(({posts}) => {
            const feed = new RssFeed({
                title: `${process.env.ME_PERSON_NAME} — ${process.env.ME_PERSON_JOB_TITLE}`,
                description: process.env.ME_PERSON_DESCRIPTION,
                imageUrl: process.env.ME_PERSON_IMAGE,
                siteUrl: process.env.BLOG_URL,
                feedUrl: process.env.FEED_URL,
                managingEditor: `${process.env.ME_PERSON_EMAIL} (${process.env.ME_PERSON_NAME})`,
                webMaster: `${process.env.ME_PERSON_EMAIL} (${process.env.ME_PERSON_NAME})`,
                copyright: `© ${process.env.ME_PERSON_NAME}`
            });

            posts.forEach(post => feed.item(post.toRss()));

            return feed;
        })
        .then(rss => callback(null, buildRssResponse(parsedHeaders)({rss})))
        .catch(errorHandler);
};
