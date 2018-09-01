import flickr from "./flickr";
import instagram from "./instagram";
import local from "./local";
import s3 from "./s3";
import tumblr from "./tumblr";
import unsplash from "./unsplash";

const sources = {
    flickr,
    unsplash,
    instagram,
    s3,
    tumblr,
    local,
};

export const initializeSources = () => Promise.all(
    sources.values()
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
