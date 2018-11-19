import flickr from "./flickr";
import instagram from "./instagram";
import s3 from "./s3";
import tumblr from "./tumblr";
import unsplash from "./unsplash";

const sources = {
    flickr,
    unsplash,
    instagram,
    s3,
    tumblr
};

export const initializeSources = namedSources => Promise.all(
    Object.entries(sources)
        .filter(keyValuePair => !namedSources || !namedSources.length || namedSources.includes(keyValuePair[0]))
        .map(keyValuePair => keyValuePair[1])
        .map(postSourceConstructor => {
            return new postSourceConstructor();
        })
        .filter(postSource => {
            return postSource.isEnabled;
        })
        .map(postSource => {
            return postSource.initializing;
        })
);

export default sources;
