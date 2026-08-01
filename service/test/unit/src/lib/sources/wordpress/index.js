import {Post, timedPromise} from "@randy.tarampi/js";
import {expect} from "chai";
import {DateTime} from "luxon";
import sinon from "sinon";
import PostSearchParams from "../../../../../../src/lib/postSearchParams.js";
import WordPressSource from "../../../../../../src/lib/sources/wordpress/index.js";
import dummyClassesGenerator from "../../../../../lib/dummyClassesGenerator.js";

describe("WordPressSource", function () {
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

    let wordpressPost;
    let wordpressPosts;

    beforeEach(function () {
        process.env.WORDPRESS_USER_NAME = "randytarampi";

        stubPost = Post.fromJSON({id: "woof"});
        stubPosts = [stubPost, Post.fromJSON({id: "meow"}), Post.fromJSON({id: "grr"})];

        wordpressPost = {
            id: 12345,
            date: "2024-01-15T10:00:00",
            date_gmt: "2024-01-15T15:00:00Z",
            title: {rendered: "Hello World"},
            content: {rendered: "<p>This is my first blog post.</p>"},
            excerpt: {rendered: "<p>This is my first blog post.</p>"},
            link: "https://randytarampi.wordpress.com/2024/01/15/hello-world/",
            featured_image: "https://randytarampi.wordpress.com/wp-content/uploads/2024/01/featured.jpg",
            tags: [1, 2],
            categories: [3],
            _embedded: {
                "wp:featuredmedia": [
                    {source_url: "https://randytarampi.wordpress.com/wp-content/uploads/2024/01/featured.jpg"}
                ]
            },
            author: 1
        };
        wordpressPosts = [wordpressPost, {
            ...wordpressPost,
            id: 67890,
            title: {rendered: "Second Post"},
            link: "https://randytarampi.wordpress.com/2024/02/01/second-post/"
        }];

        stubServiceClient = {
            apiBase: "https://randytarampi.wordpress.com"
        };

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
        it("should build a `WordPressSource` instance (including the default client)", function () {
            const wordPressSource = new WordPressSource(null, stubCacheClient);

            expect(WordPressSource.type).to.eql("wordpress");
            expect(wordPressSource.client).to.be.an("object");
            expect(wordPressSource.client.apiBase).to.eql("https://randytarampi.wordpress.com");
            expect(wordPressSource.cacheClient).to.eql(stubCacheClient);
            expect(wordPressSource.initializing).to.be.instanceOf(Promise);
            expect(wordPressSource).to.be.instanceOf(WordPressSource);
        });

        it("should build a `WordPressSource` instance (with stubbed client)", function () {
            const wordPressSource = new WordPressSource(stubServiceClient, stubCacheClient);

            expect(WordPressSource.type).to.eql("wordpress");
            expect(wordPressSource.client).to.eql(stubServiceClient);
            expect(wordPressSource.cacheClient).to.eql(stubCacheClient);
            expect(wordPressSource.initializing).to.be.instanceOf(Promise);
            expect(wordPressSource).to.be.instanceOf(WordPressSource);
        });
    });

    describe("type", function () {
        it("returns 'wordpress'", function () {
            expect(WordPressSource.type).to.eql("wordpress");
        });
    });

    describe("isEnabled", function () {
        it("returns true when WORDPRESS_USER_NAME is set", function () {
            const wordPressSource = new WordPressSource(stubServiceClient, stubCacheClient);
            expect(wordPressSource.isEnabled).to.be.true;
        });

        it("returns false when WORDPRESS_USER_NAME is not set", function () {
            delete process.env.WORDPRESS_USER_NAME;
            const wordPressSource = new WordPressSource(stubServiceClient, stubCacheClient);
            expect(wordPressSource.isEnabled).to.be.false;
        });
    });

    describe("instanceToRecord", function () {
        it("turns a WordPress post response into a `Post`", function () {
            const post = WordPressSource.instanceToRecord(wordpressPost);

            expect(post).to.be.instanceOf(Post);
            expect(post.id).to.eql("12345");
            expect(post.source).to.eql("wordpress");
            expect(post.title).to.eql("Hello World");
            expect(post.body).to.include("This is my first blog post");
            expect(post.sourceUrl).to.eql("https://randytarampi.wordpress.com/2024/01/15/hello-world/");
            expect(post.datePublished).to.be.instanceOf(DateTime);
            expect(post.dateCreated).to.be.instanceOf(DateTime);
            expect(post.creator.username).to.eql("randytarampi");
            expect(post.tags.toArray()).to.eql(["1", "2", "3"]);
        });
    });

    describe("recordsGetter", function () {
        it("fetches posts from the WordPress API and transforms them", async function () {
            const wordPressSource = new WordPressSource(stubServiceClient, stubCacheClient);
            const stubParams = PostSearchParams.fromJS({perPage: 10, page: 1});

            // Stub global fetch
            const fetchStub = sinon.stub(globalThis, "fetch").resolves({
                ok: true,
                json: () => Promise.resolve(wordpressPosts)
            });

            try {
                const posts = await wordPressSource.recordsGetter(stubParams);

                expect(posts).to.be.instanceof(Array);
                expect(posts).to.have.length(wordpressPosts.length);
                posts.map(post => {
                    expect(post).to.be.instanceof(Post);
                });

                const calledUrl = new URL(fetchStub.getCall(0).args[0]);
                expect(calledUrl.pathname).to.eql("/wp/v2/posts");
                expect(calledUrl.searchParams.get("page")).to.eql("1");
                expect(calledUrl.searchParams.get("per_page")).to.eql("10");
                expect(calledUrl.searchParams.get("author_name")).to.eql("randytarampi");
                expect(calledUrl.searchParams.get("_embed")).to.eql("1");
            } finally {
                fetchStub.restore();
            }
        });

        it("returns empty array when API call fails", async function () {
            const wordPressSource = new WordPressSource(stubServiceClient, stubCacheClient);
            const stubParams = PostSearchParams.fromJS({perPage: 10});

            const fetchStub = sinon.stub(globalThis, "fetch").resolves({
                ok: false,
                status: 404
            });

            try {
                const posts = await wordPressSource.recordsGetter(stubParams);
                expect(posts).to.be.instanceof(Array);
                expect(posts).to.be.empty;
            } finally {
                fetchStub.restore();
            }
        });
    });

    describe("allRecordsGetter", function () {
        it("finds all posts across pages", async function () {
            const wordPressSource = new WordPressSource(stubServiceClient, stubCacheClient);
            const stubParams = PostSearchParams.fromJS({perPage: 2});

            const fetchStub = sinon.stub(globalThis, "fetch");

            // First call returns posts, second call returns empty (no more pages)
            fetchStub.onFirstCall().resolves({
                ok: true,
                json: () => Promise.resolve(wordpressPosts)
            });
            fetchStub.onSecondCall().resolves({
                ok: true,
                json: () => Promise.resolve([])
            });

            try {
                const posts = await wordPressSource.allRecordsGetter(stubParams);

                expect(posts).to.be.instanceof(Array);
                expect(posts).to.have.length(wordpressPosts.length);
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
            const wordPressSource = new WordPressSource(stubServiceClient, stubCacheClient);
            expect(wordPressSource).to.be.instanceOf(WordPressSource);

            return wordPressSource.recordGetter(stubPost.id, {})
                .then(() => {
                    throw new Error("Wtf? This should've thrown");
                })
                .catch(error => {
                    expect(error.message).to.match(/Please specify an actual recordGetter implementation/);
                });
        });
    });
});
