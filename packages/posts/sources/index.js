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

export const initializeSources = () => Promise.all(
    Object.values(sources)
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
