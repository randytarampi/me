import {expect} from "chai";
import sinon from "sinon";
import * as sources from "../../../../../src/lib/sources";
import {cachePosts} from "../../../../../src/lib/sources/cachePosts";

describe("cacheRecords", function () {
    let stubSearchParams;
    let stubSource;
    let stubSources;
    let stubPosts;

    beforeEach(function () {
        stubPosts = ["meow"];
        stubSearchParams = {type: "woof"};
        stubSource = {
            getAllServiceRecords: sinon.stub().callsFake(searchParams => {
                expect(searchParams).to.eql(stubSearchParams);
                return Promise.resolve(stubPosts);
            })
        };
        stubSources = [stubSource];
        sinon.stub(sources, "initializeSources").returns(Promise.resolve(stubSources));
    });

    afterEach(function () {
        sources.initializeSources.restore();
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
