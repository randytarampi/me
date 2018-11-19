import {Photo, Post} from "@randy.tarampi/js";
import {expect} from "chai";
import {DateTime} from "luxon";
import proxyquire from "proxyquire";
import sinon from "sinon";
import SearchParams from "../../../../src/lib/searchParams";
import sources from "../../../../src/lib/sources";
import DummyCacheClientGenerator from "../../../lib/dummyCacheClientGenerator";

describe("searchPosts", function () {
    let stubSource;
    let stubPost;
    let stubPhoto;
    let stubPosts;
    let stubCreatePosts;
    let stubGetPosts;
    let stubGetPostCount;
    let stubCreatePost;
    let stubGetPost;
    let DummyCacheClient;

    beforeEach(function () {
        stubSource = "tumblr";

        const stubRawPost = {id: "woof", source: stubSource, dateCreated: DateTime.utc().toISO(), type: "post"};
        const stubRawPhoto = {
            id: "meow",
            source: stubSource,
            dateCreated: DateTime.utc().plus({seconds: 1}).toISO(),
            type: "photo"
        };

        stubPost = Post.fromJSON({...stubRawPost, raw: stubRawPost});
        stubPhoto = Photo.fromJSON({...stubRawPhoto, raw: stubRawPhoto});
        stubPosts = [stubPost, stubPhoto];

        stubCreatePosts = sinon.stub().callsFake(posts => Promise.resolve(posts));
        stubGetPosts = sinon.stub().callsFake(params => Promise.resolve(stubPosts)); // eslint-disable-line no-unused-vars
        stubGetPostCount = sinon.stub().callsFake(params => Promise.resolve(stubPosts.length)); // eslint-disable-line no-unused-vars

        stubCreatePost = sinon.stub().callsFake(post => Promise.resolve(post));
        stubGetPost = sinon.stub().callsFake(params => Promise.resolve(params._options.descending ? stubPhoto : stubPost)); // eslint-disable-line no-unused-vars

        DummyCacheClient = DummyCacheClientGenerator({
            dummyDataClientStubs: {
                stubGetPosts,
                stubCreatePosts,
                stubGetPostCount,

                stubGetPost,
                stubCreatePost
            }
        });

        sinon.stub(sources[stubSource], "jsonToPost")
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
        sources[stubSource].jsonToPost.restore();
    });

    it("delegates to `CacheClient` functions", async function () {
        const proxyquiredSeachPosts = proxyquire("../../../../src/lib/sources/searchPosts", {
            "../cacheClient": {
                "default": DummyCacheClient
            }
        });

        const stubSearchParams = new SearchParams();


        const postsResult = await proxyquiredSeachPosts.default(stubSearchParams);

        expect(postsResult).to.be.ok;
        expect(postsResult).to.eql({
            posts: stubPosts,
            total: 2,
            first: stubPost,
            last: stubPhoto
        });
    });
});
