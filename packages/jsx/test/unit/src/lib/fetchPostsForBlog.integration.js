import {createRequire} from "module";

const require = createRequire(import.meta.url);

const {Post} = require("@randy.tarampi/js");
const {expect} = require("chai");
const {Map} = require("immutable");
const {DateTime} = require("luxon");
const configureStoreModule = require("redux-mock-store");
const configureStore = configureStoreModule.default || configureStoreModule;
const {thunk} = require("redux-thunk");
const sinon = require("sinon");
const {fetchingPostsSuccess} = require("../../../../src/lib/actions/posts/fetchPosts.js");
const fetchPostsForBlog = require("../../../../src/lib/actions/posts/fetchPostsForBlog.js").default || require("../../../../src/lib/actions/posts/fetchPostsForBlog.js");
const reducer = require("../../../../src/lib/data/posts.js").default || require("../../../../src/lib/data/posts.js");

describe("fetchPostsForBlog integration", function () {
    afterEach(function () {
        sinon.restore();
    });

    it("uses reduced v4 oldestFetched metadata for the next serialized request", async function () {
        const fetchUrl = "https://service.dev.randytarampi.ca/posts";
        const oldestPublished = DateTime.fromISO("2020-01-01T00:00:00.000Z");
        const newestPublished = DateTime.fromISO("2020-01-03T00:00:00.000Z");
        const pageOnePost = Post.fromJSON({
            id: "page-one",
            source: "fixture",
            dateCreated: oldestPublished.minus({years: 1}).toISO(),
            datePublished: oldestPublished.toISO()
        });
        const pageOneNewestPost = Post.fromJSON({
            id: "page-one-newest",
            source: "fixture",
            dateCreated: newestPublished.minus({years: 1}).toISO(),
            datePublished: newestPublished.toISO()
        });
        const pageOneState = reducer(undefined, fetchingPostsSuccess({
            posts: [pageOneNewestPost, pageOnePost],
            searchType: "blog",
            searchParams: {perPage: 8},
            oldestFetched: {global: oldestPublished.toISO()},
            newestFetched: {global: newestPublished.toISO()}
        }));
        const fetchStub = sinon.stub(global, "fetch").resolves({
            json: () => Promise.resolve({
                posts: [],
                total: {global: 2},
                oldestFetched: {global: oldestPublished.minus({days: 1}).toISO()},
                newestFetched: {global: oldestPublished.minus({days: 1}).toISO()}
            })
        });
        const store = configureStore([thunk])(Map({
            api: Map(),
            posts: pageOneState
        }));

        await store.dispatch(fetchPostsForBlog(fetchUrl));

        expect(fetchStub.calledOnce).to.eql(true);
        const requestUrl = new URL(fetchStub.firstCall.args[0]);
        expect(requestUrl.searchParams.get("perPage")).to.eql("8");
        expect(requestUrl.searchParams.get("orderBy")).to.eql("datePublished");
        expect(requestUrl.searchParams.get("orderOperator")).to.eql("lt");
        expect(requestUrl.searchParams.get("orderComparator")).to.eql(oldestPublished.toISO());
        expect(requestUrl.searchParams.get("beforeId")).to.eql(pageOnePost.uid);
    });

    it("uses the V5 opaque cursor for the next serialized request", async function () {
        const fetchUrl = "https://service.dev.randytarampi.ca/posts";
        const fetchStub = sinon.stub(global, "fetch").callsFake((_url, options) => {
            expect(options.headers["ME-API-VERSION"]).to.eql(5);
            return Promise.resolve({json: () => Promise.resolve({posts: [], nextCursor: "next", hasMore: true})});
        });
        const store = configureStore([thunk])(Map({
            api: Map({[fetchUrl]: Map({nextCursor: "opaque", hasMore: true})}),
            posts: reducer(undefined, fetchingPostsSuccess({posts: [], searchType: "blog", searchParams: {}}))
        }));

        await store.dispatch(fetchPostsForBlog(fetchUrl, "global", {usePublicFeedV5: true}));

        const requestUrl = new URL(fetchStub.firstCall.args[0]);
        expect(requestUrl.searchParams.get("continuationToken")).to.eql("opaque");
        expect(requestUrl.searchParams.has("beforeId")).to.eql(false);
        expect(requestUrl.searchParams.has("orderComparator")).to.eql(false);
    });
});
