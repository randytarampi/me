import {Post, timedPromise} from "@randy.tarampi/js";
import {expect} from "chai";
import {DateTime} from "luxon";
import sinon from "sinon";
import PostSearchParams from "../../../../../../src/lib/postSearchParams.js";
import StackOverflowSource from "../../../../../../src/lib/sources/stackoverflow/index.js";
import dummyClassesGenerator from "../../../../../lib/dummyClassesGenerator.js";

describe("StackOverflowSource", function () {
    let stubServiceClient;
    let stubPost;
    let stubPosts;
    let stubBeforeRecordsGetter;
    let stubRecordsGetter;
    let stubAfterRecordsGetter;
    let stubBeforeRecordGetter;
    let stubRecordGetter;
    let stubAfterRecordGetter;
    let stubBeforeCachedRecordsGetter;
    let stubCachedRecordsGetter;
    let stubAfterCachedRecordsGetter;
    let stubBeforeCachedRecordGetter;
    let stubCachedRecordGetter;
    let stubAfterCachedRecordGetter;
    let stubInstanceToRecord;
    let DummyCacheClient;
    let stubCreateRecords;
    let stubGetRecords;
    let stubCreateRecord;
    let stubGetRecord;
    let stubCacheClient;
    let builtDummyClasses;
    let dummyClassBuilderArguments;

    let stackOverflowPost;
    let stackOverflowPosts;
    let stackOverflowApiResponse;

    beforeEach(function () {
        process.env.STACKOVERFLOW_API_KEY = "stackoverflow-api-key";
        process.env.STACKOVERFLOW_USER_ID = "123456";

        stubPost = Post.fromJSON({id: "woof"});
        stubPosts = [stubPost, Post.fromJSON({id: "meow"}), Post.fromJSON({id: "grr"})];

        stackOverflowPost = {
            post_id: 98765,
            post_type: "question",
            title: "How to implement a custom data source in JavaScript?",
            body: "<p>I'm trying to implement a custom data source...</p>",
            link: "https://stackoverflow.com/questions/98765/how-to-implement",
            creation_date: 1705312800,
            score: 42,
            tags: ["javascript", "data-source", "node.js"],
            owner: {
                user_id: 123456,
                display_name: "randytarampi",
                link: "https://stackoverflow.com/users/123456/randytarampi"
            }
        };
        stackOverflowPosts = [stackOverflowPost, {
            ...stackOverflowPost,
            post_id: 54321,
            title: "Another question about JavaScript",
            link: "https://stackoverflow.com/questions/54321/another-question"
        }];

        stackOverflowApiResponse = {
            items: stackOverflowPosts
        };

        stubServiceClient = {};

        stubBeforeRecordsGetter = sinon.stub().callsFake(params => timedPromise(params));
        stubRecordsGetter = sinon.stub().callsFake(params => timedPromise(stubPosts)); // eslint-disable-line no-unused-vars
        stubAfterRecordsGetter = sinon.stub().callsFake((posts, params) => timedPromise(posts)); // eslint-disable-line no-unused-vars

        stubBeforeRecordGetter = sinon.stub().callsFake((postId, params) => timedPromise(params));
        stubRecordGetter = sinon.stub().callsFake((postId, params) => timedPromise(stubPosts.find(post => post.id === postId) || null)); // eslint-disable-line no-unused-vars
        stubAfterRecordGetter = sinon.stub().callsFake((post, params) => timedPromise(post)); // eslint-disable-line no-unused-vars

        stubBeforeCachedRecordsGetter = sinon.stub().callsFake(params => timedPromise(params));
        stubCachedRecordsGetter = sinon.stub().callsFake(params => timedPromise(stubPosts)); // eslint-disable-line no-unused-vars
        stubAfterCachedRecordsGetter = sinon.stub().callsFake((posts, params) => timedPromise(posts)); // eslint-disable-line no-unused-vars

        stubBeforeCachedRecordGetter = sinon.stub().callsFake((postId, params) => timedPromise(params));
        stubCachedRecordGetter = sinon.stub().callsFake((postId, params) => timedPromise(stubPosts.find(post => post.id === postId) || null)); // eslint-disable-line no-unused-vars
        stubAfterCachedRecordGetter = sinon.stub().callsFake((post, params) => timedPromise(post)); // eslint-disable-line no-unused-vars

        stubInstanceToRecord = sinon.stub().callsFake(Post.fromJSON);

        stubCreateRecords = sinon.stub().callsFake(posts => timedPromise(posts));
        stubGetRecords = sinon.stub().callsFake(params => timedPromise(stubPosts)); // eslint-disable-line no-unused-vars

        stubCreateRecord = sinon.stub().callsFake(post => timedPromise(post));
        stubGetRecord = sinon.stub().callsFake(params => timedPromise(stubPost)); // eslint-disable-line no-unused-vars

        dummyClassBuilderArguments = {
            stubBeforeRecordsGetter,
            stubRecordsGetter,
            stubAfterRecordsGetter,

            stubBeforeRecordGetter,
            stubRecordGetter,
            stubAfterRecordGetter,

            stubBeforeCachedRecordsGetter,
            stubCachedRecordsGetter,
            stubAfterCachedRecordsGetter,

            stubBeforeCachedRecordGetter,
            stubCachedRecordGetter,
            stubAfterCachedRecordGetter,

            stubInstanceToRecord,

            stubGetRecords,
            stubCreateRecords,

            stubGetRecord,
            stubCreateRecord
        };
        builtDummyClasses = dummyClassesGenerator(dummyClassBuilderArguments);

        DummyCacheClient = builtDummyClasses.DummyCacheClient;

        stubCacheClient = new DummyCacheClient("ᶘ ◕ᴥ◕ᶅ");
    });

    describe("constructor", function () {
        it("should build a `StackOverflowSource` instance (with stubbed client)", function () {
            const stackOverflowSource = new StackOverflowSource(stubServiceClient, stubCacheClient);

            expect(StackOverflowSource.type).to.eql("stackoverflow");
            expect(stackOverflowSource.client).to.eql(stubServiceClient);
            expect(stackOverflowSource.cacheClient).to.eql(stubCacheClient);
            expect(stackOverflowSource.initializing).to.be.instanceOf(Promise);
            expect(stackOverflowSource).to.be.instanceOf(StackOverflowSource);
        });
    });

    describe("type", function () {
        it("returns 'stackoverflow'", function () {
            expect(StackOverflowSource.type).to.eql("stackoverflow");
        });
    });

    describe("isEnabled", function () {
        it("returns true when STACKOVERFLOW_USER_ID is set", function () {
            const stackOverflowSource = new StackOverflowSource(stubServiceClient, stubCacheClient);
            expect(stackOverflowSource.isEnabled).to.be.true;
        });

        it("returns false when STACKOVERFLOW_USER_ID is not set", function () {
            delete process.env.STACKOVERFLOW_USER_ID;
            const stackOverflowSource = new StackOverflowSource(stubServiceClient, stubCacheClient);
            expect(stackOverflowSource.isEnabled).to.be.false;
        });
    });

    describe("instanceToRecord", function () {
        it("turns a StackOverflow post response into a `Post`", function () {
            const post = StackOverflowSource.instanceToRecord(stackOverflowPost);

            expect(post).to.be.instanceOf(Post);
            expect(post.id).to.eql("98765");
            expect(post.source).to.eql("stackoverflow");
            expect(post.title).to.eql("How to implement a custom data source in JavaScript?");
            expect(post.body).to.include("I'm trying to implement a custom data source");
            expect(post.sourceUrl).to.eql("https://stackoverflow.com/questions/98765/how-to-implement");
            expect(post.datePublished).to.be.instanceOf(DateTime);
            expect(post.dateCreated).to.be.instanceOf(DateTime);
            expect(post.creator.username).to.eql("randytarampi");
            expect(post.tags.toArray()).to.eql(["javascript", "data-source", "node.js"]);
        });
    });

    describe("recordsGetter", function () {
        it("fetches posts from the StackExchange API and transforms them", async function () {
            const stackOverflowSource = new StackOverflowSource(stubServiceClient, stubCacheClient);
            const stubParams = PostSearchParams.fromJS({perPage: 10, page: 1});

            const fetchStub = sinon.stub(globalThis, "fetch").resolves({
                ok: true,
                json: () => Promise.resolve(stackOverflowApiResponse)
            });

            try {
                const posts = await stackOverflowSource.recordsGetter(stubParams);

                expect(posts).to.be.instanceof(Array);
                expect(posts).to.have.length(stackOverflowPosts.length);
                posts.map(post => {
                    expect(post).to.be.instanceof(Post);
                });

                const calledUrl = new URL(fetchStub.getCall(0).args[0]);
                expect(calledUrl.hostname).to.eql("api.stackexchange.com");
                expect(calledUrl.pathname).to.eql("/2.3/users/123456/posts");
                expect(calledUrl.searchParams.get("order")).to.eql("desc");
                expect(calledUrl.searchParams.get("sort")).to.eql("activity");
                expect(calledUrl.searchParams.get("site")).to.eql("stackoverflow");
                expect(calledUrl.searchParams.get("page")).to.eql("1");
                expect(calledUrl.searchParams.get("pagesize")).to.eql("10");
                expect(calledUrl.searchParams.get("key")).to.eql("stackoverflow-api-key");
                expect(calledUrl.searchParams.get("filter")).to.eql("withbody");
            } finally {
                fetchStub.restore();
            }
        });

        it("returns empty array when API call fails", async function () {
            const stackOverflowSource = new StackOverflowSource(stubServiceClient, stubCacheClient);
            const stubParams = PostSearchParams.fromJS({perPage: 10});

            const fetchStub = sinon.stub(globalThis, "fetch").resolves({
                ok: false,
                status: 400
            });

            try {
                const posts = await stackOverflowSource.recordsGetter(stubParams);
                expect(posts).to.be.instanceof(Array);
                expect(posts).to.be.empty;
            } finally {
                fetchStub.restore();
            }
        });
    });

    describe("allRecordsGetter", function () {
        it("finds all posts", async function () {
            const stackOverflowSource = new StackOverflowSource(stubServiceClient, stubCacheClient);
            const stubParams = PostSearchParams.fromJS({perPage: 50});

            const fetchStub = sinon.stub(globalThis, "fetch");

            // First call returns posts
            fetchStub.onCall(0).resolves({
                ok: true,
                json: () => Promise.resolve(stackOverflowApiResponse)
            });
            // Second call (recursive) returns empty
            fetchStub.onCall(1).resolves({
                ok: true,
                json: () => Promise.resolve({items: []})
            });

            try {
                const posts = await stackOverflowSource.allRecordsGetter(stubParams);

                expect(posts).to.be.instanceof(Array);
                expect(posts).to.have.length(stackOverflowPosts.length);
                posts.map(post => {
                    expect(post).to.be.instanceof(Post);
                });
            } finally {
                fetchStub.restore();
            }
        });
    });

    describe("recordGetter", function () {
        it("requires implementation", function () {
            const stackOverflowSource = new StackOverflowSource(stubServiceClient, stubCacheClient);
            expect(stackOverflowSource).to.be.instanceOf(StackOverflowSource);

            return stackOverflowSource.recordGetter(stubPost.id, {})
                .then(() => {
                    throw new Error("Wtf? This should've thrown");
                })
                .catch(error => {
                    expect(error.message).to.match(/Please specify an actual recordGetter implementation/);
                });
        });
    });
});
