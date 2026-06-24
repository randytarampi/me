import {Photo, Post} from "@randy.tarampi/js";
import {expect} from "chai";
import {DateTime} from "luxon";
import sinon from "sinon";
import PostSearchParams from "../../../../src/lib/postSearchParams";
import sources from "../../../../src/lib/sources";
import {freshRequire} from "../../../lib/freshRequire";

afterEach(function () {
    sinon.restore();
});

describe("searchPosts", function () {
    let stubSource;
    let stubPost;
    let stubPhoto;
    let stubPosts;
    let stubGetRecords;
    let stubGetRecordCount;
    let stubGetRecord;

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

        stubGetRecords = sinon.stub().resolves(stubPosts);
        stubGetRecordCount = sinon.stub().resolves(stubPosts.length);
        stubGetRecord = sinon.stub().callsFake(params => Promise.resolve(params.orderBy === "descending" ? stubPhoto : stubPost));

        sinon.stub(sources[stubSource], "instanceToRecord").callsFake(json => {
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
        const CacheClient = freshRequire("../../../../src/lib/cacheClient").default;
        sinon.stub(CacheClient.prototype, "getRecords").callsFake(stubGetRecords);
        sinon.stub(CacheClient.prototype, "getRecordCount").callsFake(stubGetRecordCount);
        sinon.stub(CacheClient.prototype, "getRecord").callsFake(stubGetRecord);

        const searchPosts = freshRequire("../../../../src/lib/sources/searchPosts").default;
        const stubSearchParams = new PostSearchParams();
        const postsResult = await searchPosts(stubSearchParams);

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
