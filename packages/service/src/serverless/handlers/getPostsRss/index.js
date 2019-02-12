import {augmentUrlWithTrackingParams} from "@randy.tarampi/js";
import RssFeed from "../../../lib/rssFeed";
import logger from "../../logger";
import callbackOnWarmup from "../../util/callbackOnWarmup";
import configureEnvironment from "../../util/configureEnvironment";
import getPostsForParsedQuerystringParameters from "../../util/getPostsForParsedQuerystringParameters";
import parseHeaders from "../../util/request/parseHeaders";
import parseQuerystringParameters from "../../util/request/parseQuerystringParameters";
import buildRssResponse from "../../util/response/buildRssResponse";
import returnErrorResponse from "../../util/response/returnErrorResponse";

export default (event, context, callback) => {
    logger.debug("%s@%s handling request %s", context.functionName, context.functionVersion, context.awsRequestId, event, context);

    if (event.source === "serverless-plugin-warmup") {
        return callbackOnWarmup(event, context, callback);
    }

    const errorHandler = returnErrorResponse(event, context, callback);
    let parsedHeaders;
    let parsedQuerystringParameters;

    try {
        parsedHeaders = parseHeaders(event.headers);
        parsedQuerystringParameters = parseQuerystringParameters(event.queryStringParameters);
    } catch (error) {
        return errorHandler(error);
    }

    configureEnvironment()
        .then(() => getPostsForParsedQuerystringParameters(parsedQuerystringParameters, parsedHeaders))
        .then(({posts}) => {
            const campaign = {
                source: process.env.CAMPAIGN_SOURCE,
                medium: process.env.CAMPAIGN_MEDIUM,
                name: process.env.CAMPAIGN_NAME,
                term: process.env.CAMPAIGN_TERM,
                content: process.env.CAMPAIGN_CONTENT
            };
            const feed = new RssFeed({
                title: `${process.env.ME_PERSON_NAME} — ${process.env.ME_PERSON_JOB_TITLE}`,
                description: process.env.ME_PERSON_DESCRIPTION,
                imageUrl: augmentUrlWithTrackingParams(process.env.ME_PERSON_IMAGE, campaign),
                siteUrl: augmentUrlWithTrackingParams(process.env.BLOG_URL, campaign),
                feedUrl: process.env.FEED_URL,
                managingEditor: `${process.env.ME_PERSON_EMAIL} (${process.env.ME_PERSON_NAME})`,
                webMaster: `${process.env.ME_PERSON_EMAIL} (${process.env.ME_PERSON_NAME})`,
                copyright: `© ${process.env.ME_PERSON_NAME}`
            });

            posts.forEach(post => feed.item(post.toRss({campaign})));

            return feed;
        })
        .then(rss => callback(null, buildRssResponse({rss}, parsedHeaders)))
        .catch(errorHandler);
};
