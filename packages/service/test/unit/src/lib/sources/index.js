const {expect} = require("chai");
const sinon = require("sinon");
const AuthInfo = require("../../../../../src/lib/authInfo.js");
const sources = require("../../../../../src/lib/sources/index.js");
const {initializeSources} = sources;
const {FacebookSource} = require("../../../../../src/lib/sources/facebook/index.js");
const {InstagramSource} = require("../../../../../src/lib/sources/instagram/index.js");
const {TwitterSource} = require("../../../../../src/lib/sources/twitter/index.js");

describe("sources", function () {
    describe("initializeSources", function () {
        let stubFacebookAuthInfoClientGetter;
        let stubInstagramAuthInfoClientGetter;
        let stubTwitterAuthInfoClientGetter;
        let originalFlickrApiKey;

        beforeEach(function () {
            originalFlickrApiKey = process.env.FLICKR_API_KEY;
            process.env.FLICKR_API_KEY = "flickr-key";

            class StubFacebookAuthInfoClient {
                getRecords(searchParams) {
                    try {
                        expect(searchParams.source).to.eql(sources.facebook.type);

                        return Promise.resolve([]);
                    } catch (error) {
                        return Promise.reject(error);
                    }
                }
            }
            class StubInstagramAuthInfoClient {
                getRecords(searchParams) {
                    try {
                        expect(searchParams.source).to.eql(sources.instagram.type);

                        return Promise.resolve([]);
                    } catch (error) {
                        return Promise.reject(error);
                    }
                }
            }
            class StubTwitterAuthInfoClient {
                getRecords(searchParams) {
                    try {
                        expect(searchParams.source).to.eql(sources.twitter.type);

                        return Promise.resolve([]);
                    } catch (error) {
                        return Promise.reject(error);
                    }
                }
            }

            stubFacebookAuthInfoClientGetter = sinon.stub(FacebookSource, "AuthInfoClient").get(() => StubFacebookAuthInfoClient);
            stubInstagramAuthInfoClientGetter = sinon.stub(InstagramSource, "AuthInfoClient").get(() => StubInstagramAuthInfoClient);
            stubTwitterAuthInfoClientGetter = sinon.stub(TwitterSource, "AuthInfoClient").get(() => StubTwitterAuthInfoClient);
        });

        afterEach(function () {
            stubFacebookAuthInfoClientGetter.restore();
            stubInstagramAuthInfoClientGetter.restore();
            stubTwitterAuthInfoClientGetter.restore();
            if (typeof originalFlickrApiKey === "undefined") {
                delete process.env.FLICKR_API_KEY;
            } else {
                process.env.FLICKR_API_KEY = originalFlickrApiKey;
            }
        });

        it("returns initialized sources", function () {
            return initializeSources()
                .then(initializedSources => {
                    const sourcesAsArray = Object.values(sources); // NOTE-RT: No guarantee that they'll be in the same order per the spec, but I assume they would be.

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
                    const sourcesAsArray = Object.values(sources); // NOTE-RT: No guarantee that they'll be in the same order per the spec, but I assume they would be.

                    expect(initializedSources).to.have.length(sourcesAsArray.length);
                    initializedSources.forEach((initializedSource, index) => {
                        expect(initializedSource).to.be.instanceof(sourcesAsArray[index]);
                    });
                });
        });

        it("returns filtered initialized sources", function () {
            stubInstagramAuthInfoClientGetter.restore();

            const stubAuthInfos = [
                new AuthInfo({id: "woof", token: "woof"}),
                new AuthInfo({id: "meow", token: "meow"})
            ];

            class StubInstagramAuthInfoClient {
                getRecords(searchParams) {
                    try {
                        expect(searchParams.source).to.eql(sources.instagram.type);

                        return Promise.resolve(stubAuthInfos);
                    } catch (error) {
                        return Promise.reject(error);
                    }
                }
            }

            sinon.stub(InstagramSource, "AuthInfoClient").get(() => StubInstagramAuthInfoClient);

            const filter = [sources.instagram.type];

            return initializeSources(filter)
                .then(initializedSources => {
                    expect(initializedSources).to.have.length(stubAuthInfos.length);
                    expect(initializedSources[0]).to.be.instanceof(sources[filter]);
                    expect(initializedSources[0].authInfo).to.eql(stubAuthInfos[0]);
                    expect(initializedSources[1]).to.be.instanceof(sources[filter]);
                    expect(initializedSources[1].authInfo).to.eql(stubAuthInfos[1]);
                });
        });
    });
});
module.exports.default = module.exports;
