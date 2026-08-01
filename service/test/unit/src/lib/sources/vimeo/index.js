import {Post, timedPromise} from "@randy.tarampi/js";
import {expect} from "chai";
import {DateTime} from "luxon";
import sinon from "sinon";
import PostSearchParams from "../../../../../../src/lib/postSearchParams.js";
import VimeoSource from "../../../../../../src/lib/sources/vimeo/index.js";
import dummyClassesGenerator from "../../../../../lib/dummyClassesGenerator.js";

describe("VimeoSource", function () {
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

    let vimeoVideo;
    let vimeoVideos;
    let vimeoApiResponse;

    beforeEach(function () {
        process.env.VIMEO_ACCESS_TOKEN = "vimeo-access-token";
        process.env.VIMEO_USER_ID = "12345678";

        stubPost = Post.fromJSON({id: "woof"});
        stubPosts = [stubPost, Post.fromJSON({id: "meow"}), Post.fromJSON({id: "grr"})];

        vimeoVideo = {
            uri: "/videos/98765432",
            name: "My First Vimeo Video",
            description: "This is the description of my first Vimeo video.",
            created_time: "2024-01-15T10:00:00+00:00",
            link: "https://vimeo.com/98765432",
            pictures: {
                sizes: [
                    {width: 100, height: 75, link: "https://i.vimeocdn.com/video/small.jpg"},
                    {width: 640, height: 480, link: "https://i.vimeocdn.com/video/medium.jpg"}
                ]
            },
            user: {
                name: "Randy Tarampi",
                link: "https://vimeo.com/randytarampi"
            },
            tags: [
                {name: "tag1"},
                {name: "tag2"}
            ]
        };
        vimeoVideos = [vimeoVideo, {
            ...vimeoVideo,
            uri: "/videos/87654321",
            name: "My Second Vimeo Video",
            link: "https://vimeo.com/87654321"
        }];

        vimeoApiResponse = {
            data: vimeoVideos
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
        it("should build a `VimeoSource` instance (with stubbed client)", function () {
            const vimeoSource = new VimeoSource(stubServiceClient, stubCacheClient);

            expect(VimeoSource.type).to.eql("vimeo");
            expect(vimeoSource.client).to.eql(stubServiceClient);
            expect(vimeoSource.cacheClient).to.eql(stubCacheClient);
            expect(vimeoSource.initializing).to.be.instanceOf(Promise);
            expect(vimeoSource).to.be.instanceOf(VimeoSource);
        });
    });

    describe("type", function () {
        it("returns 'vimeo'", function () {
            expect(VimeoSource.type).to.eql("vimeo");
        });
    });

    describe("isEnabled", function () {
        it("returns true when VIMEO_ACCESS_TOKEN and VIMEO_USER_ID are set", function () {
            const vimeoSource = new VimeoSource(stubServiceClient, stubCacheClient);
            expect(vimeoSource.isEnabled).to.be.true;
        });

        it("returns false when VIMEO_ACCESS_TOKEN is not set", function () {
            delete process.env.VIMEO_ACCESS_TOKEN;
            const vimeoSource = new VimeoSource(stubServiceClient, stubCacheClient);
            expect(vimeoSource.isEnabled).to.be.false;
        });

        it("returns false when VIMEO_USER_ID is not set", function () {
            delete process.env.VIMEO_USER_ID;
            const vimeoSource = new VimeoSource(stubServiceClient, stubCacheClient);
            expect(vimeoSource.isEnabled).to.be.false;
        });
    });

    describe("instanceToRecord", function () {
        it("turns a Vimeo video response into a `Post`", function () {
            const post = VimeoSource.instanceToRecord(vimeoVideo);

            expect(post).to.be.instanceOf(Post);
            expect(post.id).to.eql("98765432");
            expect(post.source).to.eql("vimeo");
            expect(post.title).to.eql("My First Vimeo Video");
            expect(post.body).to.eql("This is the description of my first Vimeo video.");
            expect(post.sourceUrl).to.eql("https://vimeo.com/98765432");
            expect(post.datePublished).to.be.instanceOf(DateTime);
            expect(post.dateCreated).to.be.instanceOf(DateTime);
            expect(post.creator.username).to.eql("Randy Tarampi");
            expect(post.tags.toArray()).to.eql(["tag1", "tag2"]);
        });
    });

    describe("recordsGetter", function () {
        it("fetches videos from the Vimeo API and transforms them", async function () {
            const vimeoSource = new VimeoSource(stubServiceClient, stubCacheClient);
            const stubParams = PostSearchParams.fromJS({perPage: 10, page: 1});

            const fetchStub = sinon.stub(globalThis, "fetch").resolves({
                ok: true,
                json: () => Promise.resolve(vimeoApiResponse)
            });

            try {
                const posts = await vimeoSource.recordsGetter(stubParams);

                expect(posts).to.be.instanceof(Array);
                expect(posts).to.have.length(vimeoVideos.length);
                posts.map(post => {
                    expect(post).to.be.instanceof(Post);
                });

                const calledUrl = new URL(fetchStub.getCall(0).args[0]);
                expect(calledUrl.hostname).to.eql("api.vimeo.com");
                expect(calledUrl.pathname).to.eql("/users/12345678/videos");
                expect(calledUrl.searchParams.get("page")).to.eql("1");
                expect(calledUrl.searchParams.get("per_page")).to.eql("10");

                const calledHeaders = fetchStub.getCall(0).args[1].headers;
                expect(calledHeaders.Authorization).to.eql("Bearer vimeo-access-token");
            } finally {
                fetchStub.restore();
            }
        });

        it("returns empty array when API call fails", async function () {
            const vimeoSource = new VimeoSource(stubServiceClient, stubCacheClient);
            const stubParams = PostSearchParams.fromJS({perPage: 10});

            const fetchStub = sinon.stub(globalThis, "fetch").resolves({
                ok: false,
                status: 401
            });

            try {
                const posts = await vimeoSource.recordsGetter(stubParams);
                expect(posts).to.be.instanceof(Array);
                expect(posts).to.be.empty;
            } finally {
                fetchStub.restore();
            }
        });
    });

    describe("allRecordsGetter", function () {
        it("finds all videos", async function () {
            const vimeoSource = new VimeoSource(stubServiceClient, stubCacheClient);
            const stubParams = PostSearchParams.fromJS({perPage: 50});

            const fetchStub = sinon.stub(globalThis, "fetch");

            // First call returns videos
            fetchStub.onCall(0).resolves({
                ok: true,
                json: () => Promise.resolve(vimeoApiResponse)
            });
            // Second call (recursive) returns empty
            fetchStub.onCall(1).resolves({
                ok: true,
                json: () => Promise.resolve({data: []})
            });

            try {
                const posts = await vimeoSource.allRecordsGetter(stubParams);

                expect(posts).to.be.instanceof(Array);
                expect(posts).to.have.length(vimeoVideos.length);
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
            const vimeoSource = new VimeoSource(stubServiceClient, stubCacheClient);
            expect(vimeoSource).to.be.instanceOf(VimeoSource);

            return vimeoSource.recordGetter(stubPost.id, {})
                .then(() => {
                    throw new Error("Wtf? This should've thrown");
                })
                .catch(error => {
                    expect(error.message).to.match(/Please specify an actual recordGetter implementation/);
                });
        });
    });
});
