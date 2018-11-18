import Flickr from "./flickr";
import Instagram from "./instagram";
import S3 from "./s3";
import Tumblr from "./tumblr";
import Unsplash from "./unsplash";

export const sources = [Flickr, Instagram, S3, Tumblr, Unsplash].reduce(
    (sources, source) => {
        sources[source.type] = source;
        return sources;
    }, {}
);

export const initializeSources = namedSources => Promise.all(
    Object.entries(sources)
        .filter(keyValuePair => !namedSources || !namedSources.length || namedSources.includes(keyValuePair[0]))
        .map(keyValuePair => keyValuePair[1])
        .map(postSourceConstructor => new postSourceConstructor())
        .filter(postSource => postSource.isEnabled)
        .map(postSource => postSource.initializing)
);

export default sources;
