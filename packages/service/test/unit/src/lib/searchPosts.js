import {Photo, Post} from "@randy.tarampi/js";
import {expect} from "chai";
import {DateTime} from "luxon";
import proxyquire from "proxyquire";
import sinon from "sinon";
import PostSearchParams from "../../../../src/lib/postSearchParams";
import sources from "../../../../src/lib/sources";
import DummyCacheClientGenerator from "../../../lib/dummyCacheClientGenerator";

describe("searchPosts", function () {
    let stubSource;
    let stubPost;
    let stubPhoto;
    let stubPosts;
    let stubCreateRecords;
    let stubGetRecords;
    let stubGetRecordCount;
    let stubCreateRecord;
    let stubGetRecord;
    let DummyCacheClient;

    beforeEach(function () {
        stubSource = "tumblr";

        const stubRawPost = {id: "woof", source: stubSource, dateCreated: DateTime.utc().toISO(), type: "post"};
        const stubRawPhoto = {
            id: "meow",
            source: stubSource,
            dateCreated: DateTime.utc().plus({seconds: 10}).toISO(),
            type: "photo"
        };

        stubPost = Post.fromJSON({...stubRawPost, raw: stubRawPost});
        stubPhoto = Photo.fromJSON({...stubRawPhoto, raw: stubRawPhoto});
        stubPosts = [stubPhoto, stubPost];

        stubCreateRecords = sinon.stub().callsFake(posts => Promise.resolve(posts));
        stubGetRecords = sinon.stub().callsFake(params => Promise.resolve(stubPosts)); // eslint-disable-line no-unused-vars
        stubGetRecordCount = sinon.stub().callsFake(params => Promise.resolve(stubPosts.length)); // eslint-disable-line no-unused-vars

        stubCreateRecord = sinon.stub().callsFake(post => Promise.resolve(post));
        stubGetRecord = sinon.stub().callsFake(params => Promise.resolve(params._options.descending ? stubPhoto : stubPost)); // eslint-disable-line no-unused-vars

        DummyCacheClient = DummyCacheClientGenerator({
            dummyDataClientStubs: {
                stubGetRecords,
                stubCreateRecords,
                stubGetRecordCount,

                stubGetRecord,
                stubCreateRecord
            }
        });

        sinon.stub(sources[stubSource], "instanceToRecord")
            .callsFake(json => {
                if (json.type === "photo") {
                    return stubPhoto;
                } else if (json.type === "post") {
                    return stubPost;
                } else {
                    return null;
                }
            });
    });

    afterEach(function () {
        sources[stubSource].instanceToRecord.restore();
    });

    it("delegates to `CacheClient` functions", async function () {
        const proxyquiredSeachPosts = proxyquire("../../../../src/lib/sources/searchPosts", {
            "../cacheClient": {
                "default": DummyCacheClient
            }
        });

        const stubSearchParams = new PostSearchParams();
        const postsResult = await proxyquiredSeachPosts.default(stubSearchParams);

        expect(postsResult).to.eql({
            posts: stubPosts,
            total: 2,
            first: stubPost,
            firstFetched: stubPost,
            last: stubPhoto,
            lastFetched: stubPhoto
        });

        expect(stubGetRecordCount.calledOnce).to.eql(true);
        expect(stubGetRecords.calledOnce).to.eql(true);
        expect(stubGetRecord.calledTwice).to.eql(true);
    });
});
