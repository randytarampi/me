import _ from "lodash";
import AuthInfoSearchParams from "../authInfoSearchParams";
import Facebook from "./facebook";
import Flickr from "./flickr";
import Instagram from "./instagram";
import S3 from "./s3";
import Tumblr from "./tumblr";
import Twitter from "./twitter";
import Unsplash from "./unsplash";

export const sources = [Facebook, Flickr, Instagram, S3, Tumblr, Twitter, Unsplash].reduce(
    (sources, source) => {
        sources[source.type] = source;
        return sources;
    }, {}
);

export const initializeSources = namedSources => Promise.all(
    Object.entries(sources)
        .filter(keyValuePair => !namedSources || !namedSources.length || namedSources.includes(keyValuePair[0]))
        .map(keyValuePair => keyValuePair[1])
        .map(PostSourceConstructor => {
            if (PostSourceConstructor.AuthInfoClient) {
                const authInfoClient = new PostSourceConstructor.AuthInfoClient();

                return authInfoClient.getRecords(new AuthInfoSearchParams({source: PostSourceConstructor.type}))
                    .then(authInfos => {
                        if (!authInfos.length) {
                            return new PostSourceConstructor();
                        }

                        return authInfos
                            .map(authInfo => new PostSourceConstructor(undefined, undefined, authInfo));
                    });
            }

            return new PostSourceConstructor();
        })
    )
    .then(_.flatten)
    .then(constructors => Promise.all(
        constructors
            .filter(postSource => postSource.isEnabled)
            .map(constructors => constructors.initializing))
    );

export default sources;
