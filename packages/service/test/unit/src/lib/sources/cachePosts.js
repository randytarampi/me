const {expect} = require("chai");
const sinon = require("sinon");
const {freshRequire} = require("../../../../lib/freshRequire.js");

describe("cacheRecords", function () {
    let stubSearchParams;
    let stubSource;
    let stubSources;
    let stubPosts;
    let sources;
    let cachePosts;
    let originalFlickrApiKey;

    beforeEach(function () {
        originalFlickrApiKey = process.env.FLICKR_API_KEY;
        process.env.FLICKR_API_KEY = "flickr-key";

        stubPosts = ["meow"];
        stubSearchParams = {type: "woof"};
        stubSource = {
            getAllServiceRecords: sinon.stub().callsFake(searchParams => {
                expect(searchParams).to.eql(stubSearchParams);
                return Promise.resolve(stubPosts);
            })
        };
        stubSources = [stubSource];
        sources = freshRequire("../../../../../src/lib/sources/index.js");
        sinon.stub(sources, "initializeSources").returns(Promise.resolve(stubSources));
        cachePosts = freshRequire("../../../../../src/lib/sources/cachePosts.js").cachePosts;
    });

    afterEach(function () {
        sinon.restore();
        if (typeof originalFlickrApiKey === "undefined") {
            delete process.env.FLICKR_API_KEY;
        } else {
            process.env.FLICKR_API_KEY = originalFlickrApiKey;
        }
    });

    it("returns some posts", function () {
        return cachePosts(stubSearchParams)
            .then(posts => {
                expect(posts).to.eql([
                    stubPosts
                ]);
                expect(stubSource.getAllServiceRecords.calledOnce).to.eql(true);
                expect(sources.initializeSources.calledOnce).to.eql(true);
            });
    });

    it("swallows `getAllServiceRecords` errors", function () {
        stubSource.getAllServiceRecords = sinon.stub().callsFake(searchParams => {
            expect(searchParams).to.eql(stubSearchParams);
            return Promise.reject(new Error("meow"));
        });

        return cachePosts(stubSearchParams)
            .then(posts => {
                expect(posts).to.eql([
                    []
                ]);
                expect(stubSource.getAllServiceRecords.calledOnce).to.eql(true);
                expect(sources.initializeSources.calledOnce).to.eql(true);
            });
    });
});
module.exports.default = module.exports;
