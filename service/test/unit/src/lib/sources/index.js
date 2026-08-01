import {expect} from "chai";
import sources, {initializeSources} from "../../../../../src/lib/sources/index.js";

describe("sources", function () {
    describe("initializeSources", function () {
        let originalFlickrApiKey;
        let originalWordPressUserName;
        let originalYouTubeApiKey;
        let originalYouTubeChannelId;
        let originalVimeoAccessToken;
        let originalVimeoUserId;
        let originalStackOverflowUserId;
        let originalSoundCloudAccessToken;
        let originalSoundCloudUserId;

        beforeEach(function () {
            originalFlickrApiKey = process.env.FLICKR_API_KEY;
            process.env.FLICKR_API_KEY = "flickr-key";
            process.env.FLICKR_API_SECRET = "flickr-secret";

            originalWordPressUserName = process.env.WORDPRESS_USER_NAME;
            process.env.WORDPRESS_USER_NAME = "randytarampi";

            originalYouTubeApiKey = process.env.YOUTUBE_API_KEY;
            process.env.YOUTUBE_API_KEY = "youtube-key";
            originalYouTubeChannelId = process.env.YOUTUBE_CHANNEL_ID;
            process.env.YOUTUBE_CHANNEL_ID = "UC_test";

            originalVimeoAccessToken = process.env.VIMEO_ACCESS_TOKEN;
            process.env.VIMEO_ACCESS_TOKEN = "vimeo-token";
            originalVimeoUserId = process.env.VIMEO_USER_ID;
            process.env.VIMEO_USER_ID = "12345";

            originalStackOverflowUserId = process.env.STACKOVERFLOW_USER_ID;
            process.env.STACKOVERFLOW_USER_ID = "12345";

            originalSoundCloudAccessToken = process.env.SOUNDCLOUD_ACCESS_TOKEN;
            process.env.SOUNDCLOUD_ACCESS_TOKEN = "sc-token";
            originalSoundCloudUserId = process.env.SOUNDCLOUD_USER_ID;
            process.env.SOUNDCLOUD_USER_ID = "12345";

            process.env.GITHUB_API_KEY = "github-key";
            process.env.GITHUB_API_SECRET = "github-secret";
            process.env.TUMBLR_API_KEY = "tumblr-key";
            process.env.TUMBLR_API_SECRET = "tumblr-secret";
            process.env.UNSPLASH_API_KEY = "unsplash-key";
            process.env.UNSPLASH_API_SECRET = "unsplash-secret";
            process.env.SERVICE_POSTS_S3_BUCKET_NAME = "test-bucket";
        });

        afterEach(function () {
            if (typeof originalFlickrApiKey === "undefined") {
                delete process.env.FLICKR_API_KEY;
            } else {
                process.env.FLICKR_API_KEY = originalFlickrApiKey;
            }

            if (typeof originalWordPressUserName === "undefined") {
                delete process.env.WORDPRESS_USER_NAME;
            } else {
                process.env.WORDPRESS_USER_NAME = originalWordPressUserName;
            }

            if (typeof originalYouTubeApiKey === "undefined") {
                delete process.env.YOUTUBE_API_KEY;
            } else {
                process.env.YOUTUBE_API_KEY = originalYouTubeApiKey;
            }
            if (typeof originalYouTubeChannelId === "undefined") {
                delete process.env.YOUTUBE_CHANNEL_ID;
            } else {
                process.env.YOUTUBE_CHANNEL_ID = originalYouTubeChannelId;
            }

            if (typeof originalVimeoAccessToken === "undefined") {
                delete process.env.VIMEO_ACCESS_TOKEN;
            } else {
                process.env.VIMEO_ACCESS_TOKEN = originalVimeoAccessToken;
            }
            if (typeof originalVimeoUserId === "undefined") {
                delete process.env.VIMEO_USER_ID;
            } else {
                process.env.VIMEO_USER_ID = originalVimeoUserId;
            }

            if (typeof originalStackOverflowUserId === "undefined") {
                delete process.env.STACKOVERFLOW_USER_ID;
            } else {
                process.env.STACKOVERFLOW_USER_ID = originalStackOverflowUserId;
            }

            if (typeof originalSoundCloudAccessToken === "undefined") {
                delete process.env.SOUNDCLOUD_ACCESS_TOKEN;
            } else {
                process.env.SOUNDCLOUD_ACCESS_TOKEN = originalSoundCloudAccessToken;
            }
            if (typeof originalSoundCloudUserId === "undefined") {
                delete process.env.SOUNDCLOUD_USER_ID;
            } else {
                process.env.SOUNDCLOUD_USER_ID = originalSoundCloudUserId;
            }
        });

        it("returns initialized sources", function () {
            return initializeSources()
                .then(initializedSources => {
                    const sourcesAsArray = Object.values(sources);

                    expect(initializedSources).to.have.length(sourcesAsArray.length);
                    initializedSources.forEach((initializedSource, index) => {
                        expect(initializedSource).to.be.instanceof(sourcesAsArray[index]);
                    });
                });
        });

        it("returns filtered initialized sources", function () {
            const filter = [sources.tumblr.type];

            return initializeSources(filter)
                .then(initializedSources => {
                    expect(initializedSources).to.have.length(filter.length);
                    expect(initializedSources[0]).to.be.instanceof(sources[filter]);
                });
        });

        it("returns all initialized sources if the filter is empty", function () {
            const filter = [];

            return initializeSources(filter)
                .then(initializedSources => {
                    const sourcesAsArray = Object.values(sources);

                    expect(initializedSources).to.have.length(sourcesAsArray.length);
                    initializedSources.forEach((initializedSource, index) => {
                        expect(initializedSource).to.be.instanceof(sourcesAsArray[index]);
                    });
                });
        });
    });
});