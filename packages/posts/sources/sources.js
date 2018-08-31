import flickr from "./flickr/postSource";
import instagram from "./instagram/postSource";
import local from "./local/postSource";
import s3 from "./s3/postSource";
import tumblr from "./tumblr/postSource";
import unsplash from "./unsplash/postSource";

export const sources = [
    flickr,
    unsplash,
    instagram,
    s3,
    tumblr,
    local,
];

export const initializeSources = () => Promise.all(
    sources
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

export const initializedSources = initializeSources();

export default initializedSources;

