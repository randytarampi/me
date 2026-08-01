import {Post, timedPromise} from "@randy.tarampi/js";
import {expect} from "chai";
import {DateTime} from "luxon";
import sinon from "sinon";
import PostSearchParams from "../../../../../../src/lib/postSearchParams.js";
import SoundCloudSource from "../../../../../../src/lib/sources/soundcloud/index.js";
import dummyClassesGenerator from "../../../../../lib/dummyClassesGenerator.js";

describe("SoundCloudSource", function () {
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

    let soundCloudTrack;
    let soundCloudTracks;

    beforeEach(function () {
        process.env.SOUNDCLOUD_ACCESS_TOKEN = "soundcloud-access-token";
        process.env.SOUNDCLOUD_USER_ID = "123456789";

        stubPost = Post.fromJSON({id: "woof"});
        stubPosts = [stubPost, Post.fromJSON({id: "meow"}), Post.fromJSON({id: "grr"})];

        soundCloudTrack = {
            id: 111222333,
            title: "My First Track",
            description: "This is the description of my first track on SoundCloud.",
            created_at: "2024-01-15T10:00:00Z",
            permalink_url: "https://soundcloud.com/randytarampi/my-first-track",
            artwork_url: "https://i1.sndcdn.com/artworks-artwork-large.jpg",
            tag_list: "tag1 tag2 tag3",
            user: {
                id: 123456789,
                username: "randytarampi",
                permalink_url: "https://soundcloud.com/randytarampi"
            }
        };
        soundCloudTracks = [soundCloudTrack, {
            ...soundCloudTrack,
            id: 444555666,
            title: "My Second Track",
            permalink_url: "https://soundcloud.com/randytarampi/my-second-track"
        }];

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
        it("should build a `SoundCloudSource` instance (with stubbed client)", function () {
            const soundCloudSource = new SoundCloudSource(stubServiceClient, stubCacheClient);

            expect(SoundCloudSource.type).to.eql("soundcloud");
            expect(soundCloudSource.client).to.eql(stubServiceClient);
            expect(soundCloudSource.cacheClient).to.eql(stubCacheClient);
            expect(soundCloudSource.initializing).to.be.instanceOf(Promise);
            expect(soundCloudSource).to.be.instanceOf(SoundCloudSource);
        });
    });

    describe("type", function () {
        it("returns 'soundcloud'", function () {
            expect(SoundCloudSource.type).to.eql("soundcloud");
        });
    });

    describe("isEnabled", function () {
        it("returns true when SOUNDCLOUD_ACCESS_TOKEN and SOUNDCLOUD_USER_ID are set", function () {
            const soundCloudSource = new SoundCloudSource(stubServiceClient, stubCacheClient);
            expect(soundCloudSource.isEnabled).to.be.true;
        });

        it("returns false when SOUNDCLOUD_ACCESS_TOKEN is not set", function () {
            delete process.env.SOUNDCLOUD_ACCESS_TOKEN;
            const soundCloudSource = new SoundCloudSource(stubServiceClient, stubCacheClient);
            expect(soundCloudSource.isEnabled).to.be.false;
        });

        it("returns false when SOUNDCLOUD_USER_ID is not set", function () {
            delete process.env.SOUNDCLOUD_USER_ID;
            const soundCloudSource = new SoundCloudSource(stubServiceClient, stubCacheClient);
            expect(soundCloudSource.isEnabled).to.be.false;
        });
    });

    describe("instanceToRecord", function () {
        it("turns a SoundCloud track response into a `Post`", function () {
            const post = SoundCloudSource.instanceToRecord(soundCloudTrack);

            expect(post).to.be.instanceOf(Post);
            expect(post.id).to.eql("111222333");
            expect(post.source).to.eql("soundcloud");
            expect(post.title).to.eql("My First Track");
            expect(post.body).to.eql("This is the description of my first track on SoundCloud.");
            expect(post.sourceUrl).to.eql("https://soundcloud.com/randytarampi/my-first-track");
            expect(post.datePublished).to.be.instanceOf(DateTime);
            expect(post.dateCreated).to.be.instanceOf(DateTime);
            expect(post.creator.username).to.eql("randytarampi");
            expect(post.tags.toArray()).to.eql(["tag1", "tag2", "tag3"]);
        });
    });

    describe("recordsGetter", function () {
        it("fetches tracks from the SoundCloud API and transforms them", async function () {
            const soundCloudSource = new SoundCloudSource(stubServiceClient, stubCacheClient);
            const stubParams = PostSearchParams.fromJS({perPage: 10, page: 1});

            const fetchStub = sinon.stub(globalThis, "fetch").resolves({
                ok: true,
                json: () => Promise.resolve(soundCloudTracks)
            });

            try {
                const posts = await soundCloudSource.recordsGetter(stubParams);

                expect(posts).to.be.instanceof(Array);
                expect(posts).to.have.length(soundCloudTracks.length);
                posts.map(post => {
                    expect(post).to.be.instanceof(Post);
                });

                const calledUrl = new URL(fetchStub.getCall(0).args[0]);
                expect(calledUrl.hostname).to.eql("api.soundcloud.com");
                expect(calledUrl.pathname).to.eql("/users/123456789/tracks");
                expect(calledUrl.searchParams.get("limit")).to.eql("10");
                expect(calledUrl.searchParams.get("offset")).to.eql("0");

                const calledHeaders = fetchStub.getCall(0).args[1].headers;
                expect(calledHeaders.Authorization).to.eql("OAuth soundcloud-access-token");
            } finally {
                fetchStub.restore();
            }
        });

        it("returns empty array when API call fails", async function () {
            const soundCloudSource = new SoundCloudSource(stubServiceClient, stubCacheClient);
            const stubParams = PostSearchParams.fromJS({perPage: 10});

            const fetchStub = sinon.stub(globalThis, "fetch").resolves({
                ok: false,
                status: 401
            });

            try {
                const posts = await soundCloudSource.recordsGetter(stubParams);
                expect(posts).to.be.instanceof(Array);
                expect(posts).to.be.empty;
            } finally {
                fetchStub.restore();
            }
        });
    });

    describe("allRecordsGetter", function () {
        it("finds all tracks", async function () {
            const soundCloudSource = new SoundCloudSource(stubServiceClient, stubCacheClient);
            const stubParams = PostSearchParams.fromJS({perPage: 50});

            const fetchStub = sinon.stub(globalThis, "fetch");

            // First call returns tracks
            fetchStub.onCall(0).resolves({
                ok: true,
                json: () => Promise.resolve(soundCloudTracks)
            });
            // Second call (recursive) returns empty
            fetchStub.onCall(1).resolves({
                ok: true,
                json: () => Promise.resolve([])
            });

            try {
                const posts = await soundCloudSource.allRecordsGetter(stubParams);

                expect(posts).to.be.instanceof(Array);
                expect(posts).to.have.length(soundCloudTracks.length);
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
            const soundCloudSource = new SoundCloudSource(stubServiceClient, stubCacheClient);
            expect(soundCloudSource).to.be.instanceOf(SoundCloudSource);

            return soundCloudSource.recordGetter(stubPost.id, {})
                .then(() => {
                    throw new Error("Wtf? This should've thrown");
                })
                .catch(error => {
                    expect(error.message).to.match(/Please specify an actual recordGetter implementation/);
                });
        });
    });
});
