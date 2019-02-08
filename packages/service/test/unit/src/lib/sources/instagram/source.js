import {Gallery, Photo} from "@randy.tarampi/js";
import {expect} from "chai";
import {DateTime} from "luxon";
import proxyquire from "proxyquire";
import sinon from "sinon";
import PostSearchParams from "../../../../../../src/lib/postSearchParams";
import {InstagramAuthInfo} from "../../../../../../src/lib/sources/instagram/authInfo";
import dummyClassesGenerator from "../../../../../lib/dummyClassesGenerator";
import {timedPromise} from "../../../../../lib/util";

describe("InstagramSource", function () {
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

    let instagramUser;
    let instagramPhoto;
    let instagramPhotos;
    let instagramGraphEdgeResponse;
    let proxyquiredInstagramSource;

    beforeEach(function () {
        process.env.INSTAGRAM_ACCESS_TOKEN = "INSTAGRAM_ACCESS_TOKEN";

        stubPost = Photo.fromJSON({id: "woof"});
        stubPosts = [stubPost, Photo.fromJSON({id: "meow"}), Photo.fromJSON({id: "grr"})];

        instagramUser = {
            id: "woof",
            username: "woofwoof",
            full_name: "Woof Woof"
        };
        instagramPhoto = {
            id: stubPost.id,
            type: "image",
            created_time: DateTime.utc().toISO(),
            user: instagramUser,
            images: {
                "small": {url: "woof://woof.woof/?size=small", height: 100, width: 100},
                "regular": {url: "woof://woof.woof/?size=regular", height: 500, width: 500},
                "full": {url: "woof://woof.woof/?size=full", height: 1000, width: 1000}
            },
            location: {
                latitude: 49.2845,
                longitude: -123.1116,
                name: "SFU Vancouver"
            },
            caption: {
                text: "Woof!"
            }
        };
        instagramPhotos = stubPosts.map(stubPost => Object.assign({}, instagramPhoto, {id: stubPost.id}));
        delete instagramPhotos[0].location;
        delete instagramPhotos[1].caption;
        instagramPhotos[2].type = "carousel";
        stubServiceClient = {
            media: sinon.stub().callsFake(postId => {
                return Promise.resolve({
                    data: instagramPhotos.find(instagramBlogPost => instagramBlogPost.id === postId)
                });
            }),
            userSelfMedia: sinon.stub().callsFake(params => { // eslint-disable-line no-unused-vars
                let posts = instagramPhotos.concat({id: "foo", type: "foo"});

                if (params.count === 42) { // NOTE-RT: 42 is a sentinel value for an empty array
                    posts = [];
                }

                if (stubServiceClient.userSelfMedia.callCount > 1) {
                    posts = [];
                }

                return Promise.resolve({
                    data: posts
                });
            })
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

        stubInstanceToRecord = sinon.stub().callsFake(Photo.fromJSON);

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

        instagramGraphEdgeResponse = {
            graphql: {
                shortcode_media: {
                    display_url: "woof://woof.woof/woof",
                    display_resources: [
                        {
                            src: "woof://woof.woof/woof",
                            config_width: 640,
                            config_height: 640
                        },
                        {
                            src: "woof://woof.woof/woof",
                            config_width: 750,
                            config_height: 750
                        },
                        {
                            src: "woof://woof.woof/woof",
                            config_width: 1080,
                            config_height: 1080
                        }
                    ],
                    dimensions: {
                        width: 1080,
                        height: 1080
                    },
                    edge_sidecar_to_children: {
                        edges: [
                            {
                                node: {
                                    display_url: "woof://woof.woof/woof",
                                    display_resources: [
                                        {
                                            src: "woof://woof.woof/woof",
                                            config_width: 640,
                                            config_height: 640
                                        },
                                        {
                                            src: "woof://woof.woof/woof",
                                            config_width: 750,
                                            config_height: 750
                                        },
                                        {
                                            src: "woof://woof.woof/woof",
                                            config_width: 1080,
                                            config_height: 1080
                                        }
                                    ],
                                    dimensions: {
                                        width: 1080,
                                        height: 1080
                                    }
                                }
                            }
                        ]
                    }
                }
            }
        };
        proxyquiredInstagramSource = proxyquire("../../../../../../src/lib/sources/instagram/source", {
            "isomorphic-fetch": () => Promise.resolve({
                json: () => Promise.resolve(instagramGraphEdgeResponse)
            })
        }).InstagramSource;
    });

    describe("constructor", function () {
        it("should build a `proxyquiredInstagramSource` instance (including the default `instagram` client)", function () {
            const instagramSource = new proxyquiredInstagramSource(null, stubCacheClient);

            expect(proxyquiredInstagramSource.type).to.eql("instagram");
            // expect(instagramSource.client).to.be.instanceof(Instagram); // NOTE-RT: It's not so much a class as it is just an exported anonymous function
            expect(instagramSource.cacheClient).to.eql(stubCacheClient);
            expect(instagramSource.initializing).to.be.instanceOf(Promise);
            expect(instagramSource).to.be.instanceOf(proxyquiredInstagramSource);
        });

        it("should build a `proxyquiredInstagramSource` instance (with stubbed client)", function () {
            const instagramSource = new proxyquiredInstagramSource(stubServiceClient, stubCacheClient);

            expect(proxyquiredInstagramSource.type).to.eql("instagram");
            expect(instagramSource.client).to.eql(stubServiceClient);
            expect(instagramSource.cacheClient).to.eql(stubCacheClient);
            expect(instagramSource.initializing).to.be.instanceOf(Promise);
            expect(instagramSource).to.be.instanceOf(proxyquiredInstagramSource);
        });
    });

    describe("AuthInfoClient", function () {
        it("returns `InstagramAuthInfo`", function () {
            expect(proxyquiredInstagramSource.AuthInfoClient).to.eql(InstagramAuthInfo);
        });
    });

    describe("isEnabled", function () {
        it("`isEnabled` if `process.env.INSTAGRAM_ACCESS_TOKEN` is defined", function () {
            const instagramSource = new proxyquiredInstagramSource(stubServiceClient, stubCacheClient);
            expect(instagramSource.isEnabled).to.eql(true);
        });

        it("`!isEnabled` if `process.env.INSTAGRAM_ACCESS_TOKEN` is not defined", function () {
            delete process.env.INSTAGRAM_ACCESS_TOKEN;
            const instagramSource = new proxyquiredInstagramSource(stubServiceClient, stubCacheClient);
            expect(instagramSource.isEnabled).to.eql(false);
        });
    });

    describe("recordsGetter", function () {
        it("passes `serviceClient` the expected parameters", function () {
            const instagramSource = new proxyquiredInstagramSource(stubServiceClient, stubCacheClient);
            const stubParams = PostSearchParams.fromJS({perPage: 30, min_id: "meow", max_id: "grr"});

            return instagramSource.recordsGetter(stubParams)
                .then(posts => {
                    expect(posts).to.be.instanceof(Array);
                    posts.map(post => {
                        switch (post.type) {
                            case Gallery.type:
                                expect(post).to.be.instanceof(Gallery);
                                break;

                            case Photo.type:
                            default:
                                expect(post).to.be.instanceof(Photo);
                                break;
                        }
                    });
                    sinon.assert.calledOnce(stubServiceClient.userSelfMedia);
                    sinon.assert.calledWith(stubServiceClient.userSelfMedia, sinon.match({count: stubParams.perPage}));
                });
        });

        it("finds no posts", function () {
            const instagramSource = new proxyquiredInstagramSource(stubServiceClient, stubCacheClient);
            const stubParams = PostSearchParams.fromJS({perPage: 42});

            return instagramSource.recordsGetter(stubParams)
                .then(posts => {
                    expect(posts).to.be.instanceof(Array);
                    expect(posts).to.be.empty;
                    sinon.assert.calledOnce(stubServiceClient.userSelfMedia);
                    sinon.assert.calledWith(stubServiceClient.userSelfMedia, sinon.match({count: stubParams.perPage}));
                });
        });
    });

    describe("allRecordsGetter", function () {
        it("finds all posts", function () {
            const instagramSource = new proxyquiredInstagramSource(stubServiceClient, stubCacheClient);
            const stubParams = PostSearchParams.fromJS({perPage: 40, min_id: "meow", max_id: "grr"});

            return instagramSource.allRecordsGetter(stubParams)
                .then(posts => {
                    expect(posts).to.be.instanceof(Array);
                    expect(posts).to.have.length(3);
                    posts.map(post => {
                        switch (post.type) {
                            case Gallery.type:
                                expect(post).to.be.instanceof(Gallery);
                                break;

                            case Photo.type:
                            default:
                                expect(post).to.be.instanceof(Photo);
                                break;
                        }
                    });
                    sinon.assert.calledTwice(stubServiceClient.userSelfMedia);
                    sinon.assert.calledWith(stubServiceClient.userSelfMedia, sinon.match({count: stubParams.perPage}));
                });
        });
    });

    describe("recordGetter", function () {
        it("passes `serviceClient` the expected parameters", function () {
            const instagramSource = new proxyquiredInstagramSource(stubServiceClient, stubCacheClient);

            return instagramSource.recordGetter(stubPost.id)
                .then(post => {
                    expect(post).to.be.instanceof(Photo);
                    sinon.assert.calledOnce(stubServiceClient.media);
                    sinon.assert.calledWith(stubServiceClient.media, stubPost.id);
                });
        });

        it("finds no post", function () {
            const instagramSource = new proxyquiredInstagramSource(stubServiceClient, stubCacheClient);

            return instagramSource.recordGetter("foo")
                .then(post => {
                    expect(post).to.not.be.ok;
                    sinon.assert.calledOnce(stubServiceClient.media);
                    sinon.assert.calledWith(stubServiceClient.media, "foo");
                });
        });
    });
});
