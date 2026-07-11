import {expect} from "chai";
import sinon from "sinon";
import esmock from "../../../../lib/esmock.js";

describe("cacheRecords", function () {
    let stubSearchParams;
    let stubSource;
    let stubSources;
    let stubPosts;
    let initializeSourcesStub;
    let cachePosts;
    let originalFlickrApiKey;

    beforeEach(async function () {
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
        initializeSourcesStub = sinon.stub().returns(Promise.resolve(stubSources));

        ({cachePosts} = await esmock("../../../../../src/lib/sources/cachePosts.js", import.meta.url, {
            "../../../../../src/lib/sources/index.js": {initializeSources: initializeSourcesStub}
        }));
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
                expect(initializeSourcesStub.calledOnce).to.eql(true);
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
                expect(initializeSourcesStub.calledOnce).to.eql(true);
            });
    });
});
