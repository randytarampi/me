import {DateTime} from "luxon";
import Rss from "rss";
import packageJson from "../../package.json";

/**
 * An object that describes an instance of an RSS Feed
 */
export class RssFeed extends Rss {
    constructor({title, feedUrl, siteUrl, imageUrl, customNamespaces, customElements, ttl = 60, pubDate = DateTime.utc().toJSDate(), generator = packageJson.name, docs = "https://validator.w3.org/feed/docs/rss2.html", ...rssOptions} = {}) {
        super({
            title,
            feed_url: feedUrl,
            site_url: siteUrl,
            image_url: imageUrl,
            custom_namespaces: customNamespaces,
            custom_elements: customElements,
            ttl,
            pubDate,
            generator,
            docs,
            ...rssOptions
        });
    }
}

export default RssFeed;
