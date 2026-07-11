import {Post, timedPromise} from "@randy.tarampi/js";
import {expect} from "chai";
import {DateTime} from "luxon";
import sinon from "sinon";
import PostSearchParams from "../../../../../../src/lib/postSearchParams.js";
import YouTubeSource, {YOUTUBE_API_MAX_POSTS_PER_PAGE} from "../../../../../../src/lib/sources/youtube/index.js";
import dummyClassesGenerator from "../../../../../lib/dummyClassesGenerator.js";

describe("YouTubeSource", function () {
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

    let youtubeVideo;
    let youtubeVideos;
    let channelResponse;
    let playlistResponse;

    beforeEach(function () {
        process.env.YOUTUBE_API_KEY = "youtube-api-key";
        process.env.YOUTUBE_CHANNEL_ID = "UC_test_channel";

        stubPost = Post.fromJSON({id: "woof"});
        stubPosts = [stubPost, Post.fromJSON({id: "meow"}), Post.fromJSON({id: "grr"})];

        youtubeVideo = {
            id: {videoId: "abc123"},
            snippet: {
                publishedAt: "2024-01-15T10:00:00Z",
                channelId: "UC_test_channel",
                channelTitle: "Randy Tarampi",
                title: "My First Video",
                description: "This is the description of my first video.",
                thumbnails: {
                    default: {url: "https://i.ytimg.com/vi/abc123/default.jpg", width: 120, height: 90},
                    medium: {url: "https://i.ytimg.com/vi/abc123/mqdefault.jpg", width: 320, height: 180},
                    high: {url: "https://i.ytimg.com/vi/abc123/hqdefault.jpg", width: 480, height: 360}
                },
                tags: ["tag1", "tag2"]
            }
        };
        youtubeVideos = [youtubeVideo, {
            id: {videoId: "def456"},
            snippet: {
                publishedAt: "2024-02-01T10:00:00Z",
                channelId: "UC_test_channel",
                channelTitle: "Randy Tarampi",
                title: "My Second Video",
                description: "Description of second video.",
                thumbnails: {
                    default: {url: "https://i.ytimg.com/vi/def456/default.jpg", width: 120, height: 90}
                },
                tags: ["tag3"]
            }
        }];

        channelResponse = {
            items: [{
                contentDetails: {
                    relatedPlaylists: {
                        uploads: "UU_test_playlist"
                    }
                }
            }]
        };

        playlistResponse = {
            items: youtubeVideos
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
        it("should build a `YouTubeSource` instance (with stubbed client)", function () {
            const youTubeSource = new YouTubeSource(stubServiceClient, stubCacheClient);

            expect(YouTubeSource.type).to.eql("youtube");
            expect(youTubeSource.client).to.eql(stubServiceClient);
            expect(youTubeSource.cacheClient).to.eql(stubCacheClient);
            expect(youTubeSource.initializing).to.be.instanceOf(Promise);
            expect(youTubeSource).to.be.instanceOf(YouTubeSource);
        });
    });

    describe("type", function () {
        it("returns 'youtube'", function () {
            expect(YouTubeSource.type).to.eql("youtube");
        });
    });

    describe("isEnabled", function () {
        it("returns true when YOUTUBE_API_KEY and YOUTUBE_CHANNEL_ID are set", function () {
            const youTubeSource = new YouTubeSource(stubServiceClient, stubCacheClient);
            expect(youTubeSource.isEnabled).to.be.true;
        });

        it("returns false when YOUTUBE_API_KEY is not set", function () {
            delete process.env.YOUTUBE_API_KEY;
            const youTubeSource = new YouTubeSource(stubServiceClient, stubCacheClient);
            expect(youTubeSource.isEnabled).to.be.false;
        });

        it("returns false when YOUTUBE_CHANNEL_ID is not set", function () {
            delete process.env.YOUTUBE_CHANNEL_ID;
            const youTubeSource = new YouTubeSource(stubServiceClient, stubCacheClient);
            expect(youTubeSource.isEnabled).to.be.false;
        });
    });

    describe("instanceToRecord", function () {
        it("turns a YouTube playlist item response into a `Post`", function () {
            const post = YouTubeSource.instanceToRecord(youtubeVideo);

            expect(post).to.be.instanceOf(Post);
            expect(post.id).to.eql("abc123");
            expect(post.source).to.eql("youtube");
            expect(post.title).to.eql("My First Video");
            expect(post.body).to.eql("This is the description of my first video.");
            expect(post.sourceUrl).to.eql("https://www.youtube.com/watch?v=abc123");
            expect(post.datePublished).to.be.instanceOf(DateTime);
            expect(post.dateCreated).to.be.instanceOf(DateTime);
            expect(post.creator.username).to.eql("Randy Tarampi");
            expect(post.tags.toArray()).to.eql(["tag1", "tag2"]);
        });
    });

    describe("recordsGetter", function () {
        it("fetches videos from the YouTube API and transforms them", async function () {
            const youTubeSource = new YouTubeSource(stubServiceClient, stubCacheClient);
            const stubParams = PostSearchParams.fromJS({perPage: 10});

            const fetchStub = sinon.stub(globalThis, "fetch");

            // First call: channel endpoint
            fetchStub.onFirstCall().resolves({
                ok: true,
                json: () => Promise.resolve(channelResponse)
            });
            // Second call: playlist items endpoint
            fetchStub.onSecondCall().resolves({
                ok: true,
                json: () => Promise.resolve(playlistResponse)
            });

            try {
                const posts = await youTubeSource.recordsGetter(stubParams);

                expect(posts).to.be.instanceof(Array);
                expect(posts).to.have.length(youtubeVideos.length);
                posts.map(post => {
                    expect(post).to.be.instanceof(Post);
                });

                // Verify first call was to channels endpoint
                const channelUrl = new URL(fetchStub.getCall(0).args[0]);
                expect(channelUrl.hostname).to.eql("www.googleapis.com");
                expect(channelUrl.pathname).to.eql("/youtube/v3/channels");
                expect(channelUrl.searchParams.get("id")).to.eql("UC_test_channel");
                expect(channelUrl.searchParams.get("key")).to.eql("youtube-api-key");

                // Verify second call was to playlistItems endpoint
                const playlistUrl = new URL(fetchStub.getCall(1).args[0]);
                expect(playlistUrl.hostname).to.eql("www.googleapis.com");
                expect(playlistUrl.pathname).to.eql("/youtube/v3/playlistItems");
                expect(playlistUrl.searchParams.get("playlistId")).to.eql("UU_test_playlist");
                expect(playlistUrl.searchParams.get("maxResults")).to.eql("10");
            } finally {
                fetchStub.restore();
            }
        });

        it("returns empty array when channel API call fails", async function () {
            const youTubeSource = new YouTubeSource(stubServiceClient, stubCacheClient);
            const stubParams = PostSearchParams.fromJS({perPage: 10});

            const fetchStub = sinon.stub(globalThis, "fetch").resolves({
                ok: false,
                status: 403
            });

            try {
                const posts = await youTubeSource.recordsGetter(stubParams);
                expect(posts).to.be.instanceof(Array);
                expect(posts).to.be.empty;
            } finally {
                fetchStub.restore();
            }
        });

        it("returns empty array when channel has no uploads playlist", async function () {
            const youTubeSource = new YouTubeSource(stubServiceClient, stubCacheClient);
            const stubParams = PostSearchParams.fromJS({perPage: 10});

            const fetchStub = sinon.stub(globalThis, "fetch").resolves({
                ok: true,
                json: () => Promise.resolve({items: [{contentDetails: {relatedPlaylists: {}}}]})
            });

            try {
                const posts = await youTubeSource.recordsGetter(stubParams);
                expect(posts).to.be.instanceof(Array);
                expect(posts).to.be.empty;
            } finally {
                fetchStub.restore();
            }
        });
    });

    describe("allRecordsGetter", function () {
        it("finds all videos", async function () {
            const youTubeSource = new YouTubeSource(stubServiceClient, stubCacheClient);
            const stubParams = PostSearchParams.fromJS({perPage: 50});

            const fetchStub = sinon.stub(globalThis, "fetch");

            // Page 1: channel endpoint
            fetchStub.onCall(0).resolves({
                ok: true,
                json: () => Promise.resolve(channelResponse)
            });
            // Page 1: playlist items (returns videos)
            fetchStub.onCall(1).resolves({
                ok: true,
                json: () => Promise.resolve(playlistResponse)
            });
            // Page 2 (recursive): channel endpoint returns empty (no more items)
            fetchStub.onCall(2).resolves({
                ok: true,
                json: () => Promise.resolve({items: []})
            });

            try {
                const posts = await youTubeSource.allRecordsGetter(stubParams);

                expect(posts).to.be.instanceof(Array);
                expect(posts).to.have.length(youtubeVideos.length);
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
            const youTubeSource = new YouTubeSource(stubServiceClient, stubCacheClient);
            expect(youTubeSource).to.be.instanceOf(YouTubeSource);

            return youTubeSource.recordGetter(stubPost.id, {})
                .then(() => {
                    throw new Error("Wtf? This should've thrown");
                })
                .catch(error => {
                    expect(error.message).to.match(/Please specify an actual recordGetter implementation/);
                });
        });
    });
});
