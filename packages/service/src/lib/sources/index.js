const _ = require("lodash");
const AuthInfoSearchParams = require("../authInfoSearchParams.js");
const Facebook = require("./facebook/index.js");
const Flickr = require("./flickr/index.js");
const Instagram = require("./instagram/index.js");
const S3 = require("./s3/index.js");
const Tumblr = require("./tumblr/index.js");
const Twitter = require("./twitter/index.js");
const Unsplash = require("./unsplash/index.js");

const sources = [Facebook, Flickr, Instagram, S3, Tumblr, Twitter, Unsplash].reduce(
    (sources, source) => {
        sources[source.type] = source;
        return sources;
    }, {}
);

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

module.exports = sources;
Object.defineProperties(module.exports, {
    sources: {
        value: sources,
        enumerable: false,
        writable: true,
        configurable: true
    },
    initializeSources: {
        value: initializeSources,
        enumerable: false,
        writable: true,
        configurable: true
    },
    default: {
        value: module.exports,
        enumerable: false,
        writable: true,
        configurable: true
    }
});
