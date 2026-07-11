// @ts-check
import _ from "lodash";
import AuthInfoSearchParams from "../authInfoSearchParams.js";
import Flickr from "./flickr/index.js";
import GitHub from "./github/index.js";
import S3 from "./s3/index.js";
import SoundCloud from "./soundcloud/index.js";
import StackOverflow from "./stackoverflow/index.js";
import Tumblr from "./tumblr/index.js";
import Unsplash from "./unsplash/index.js";
import Vimeo from "./vimeo/index.js";
import WordPress from "./wordpress/index.js";
import YouTube from "./youtube/index.js";

const sources = [Flickr, GitHub, S3, SoundCloud, StackOverflow, Tumblr, Unsplash, Vimeo, WordPress, YouTube].reduce(
    (sources, source) => {
        sources[source.type] = source;
        return sources;
    }, {}
);

/** @param {string[]} [namedSources] - Only initialize these sources. @returns {Promise<Array<*>>} Ready-to-go source instances. */
const initializeSources = namedSources => Promise.all(
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
export {sources, initializeSources};
