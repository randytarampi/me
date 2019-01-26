import {Gallery, Photo, Post} from "@randy.tarampi/js";
import {expect} from "chai";
import {DateTime} from "luxon";
import sinon from "sinon";
import PostSearchParams from "../../../../../../src/lib/postSearchParams";
import {FacebookAuthInfo} from "../../../../../../src/lib/sources/facebook/authInfo";
import {FacebookSource} from "../../../../../../src/lib/sources/facebook/source";
import dummyClassesGenerator from "../../../../../lib/dummyClassesGenerator";
import {timedPromise} from "../../../../../lib/util";

describe("FacebookSource", function () {
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

    let facebookUser;
    let facebookPhoto;
    let facebookPhotos;

    beforeEach(function () {
        process.env.FACEBOOK_ACCESS_TOKEN = "FACEBOOK_ACCESS_TOKEN";

        stubPost = Photo.fromJSON({id: "woof"});
        stubPosts = [stubPost, Photo.fromJSON({id: "meow"}), Photo.fromJSON({id: "grr"})];

        facebookUser = {
            id: "woof",
            name: "Woof Woof"
        };
        facebookPhoto = {
            id: stubPost.id,
            type: "photo",
            created_time: DateTime.utc().toISO(),
            from: facebookUser,
            place: {
                id: "meow",
                name: "Meow",
                location: {
                    latitude: 49.2845,
                    longitude: -123.1116,
                    city: "grr",
                    country: "rawr",
                    state: "ARF",
                    street: "742 Evergreen Terrace",
                    zip: "90210"
                }
            },
            name: "Woof!",
            message: "Woof woof woof."
        };
        facebookPhotos = stubPosts.map(stubPost => Object.assign({}, facebookPhoto, {id: stubPost.id}));
        delete facebookPhotos[0].place;
        delete facebookPhotos[1].message;
        facebookPhotos[2].type = "share";
        stubServiceClient = {
            get: sinon.stub().callsFake((edge, params) => {
                switch (edge) {
                    case "me/feed": {
                        let posts = facebookPhotos;

                        if (params.count === 42) { // NOTE-RT: 42 is a sentinel value for an empty array
                            posts = [];
                        }

                        if (stubServiceClient.get.callCount > 1) {
                            posts = [];
                        }

                        return Promise.resolve({
                            data: posts
                        });
                    }

                    default:
                        return Promise.resolve({
                            data: facebookPhotos.find(facebookBlogPost => facebookBlogPost.id === edge)
                        });
                }
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
    });

    describe("constructor", function () {
        it("should build a `FacebookSource` instance (including the default `facebook` client)", function () {
            const facebookSource = new FacebookSource(null, stubCacheClient);

            expect(FacebookSource.type).to.eql("facebook");
            expect(facebookSource.cacheClient).to.eql(stubCacheClient);
            expect(facebookSource.initializing).to.be.instanceOf(Promise);
            expect(facebookSource).to.be.instanceOf(FacebookSource);
        });

        it("should build a `FacebookSource` instance (with stubbed client)", function () {
            const facebookSource = new FacebookSource(stubServiceClient, stubCacheClient);

            expect(FacebookSource.type).to.eql("facebook");
            expect(facebookSource.client).to.eql(stubServiceClient);
            expect(facebookSource.cacheClient).to.eql(stubCacheClient);
            expect(facebookSource.initializing).to.be.instanceOf(Promise);
            expect(facebookSource).to.be.instanceOf(FacebookSource);
        });
    });

    describe("AuthInfoClient", function () {
        it("returns `FacebookAuthInfo`", function () {
            expect(FacebookSource.AuthInfoClient).to.eql(FacebookAuthInfo);
        });
    });

    describe("isEnabled", function () {
        it("`isEnabled` if `process.env.FACEBOOK_ACCESS_TOKEN` is defined", function () {
            const facebookSource = new FacebookSource(stubServiceClient, stubCacheClient);
            expect(facebookSource.isEnabled).to.eql(true);
        });

        it("`!isEnabled` if `process.env.FACEBOOK_ACCESS_TOKEN` is not defined", function () {
            delete process.env.FACEBOOK_ACCESS_TOKEN;
            const facebookSource = new FacebookSource(stubServiceClient, stubCacheClient);
            expect(facebookSource.isEnabled).to.eql(false);
        });
    });

    describe("recordsGetter", function () {
        it("passes `serviceClient` the expected parameters", function () {
            const facebookSource = new FacebookSource(stubServiceClient, stubCacheClient);
            const stubParams = PostSearchParams.fromJS({perPage: 30, min_id: "meow", max_id: "grr"});

            return facebookSource.recordsGetter(stubParams)
                .then(posts => {
                    expect(posts).to.be.instanceof(Array);
                    posts.map(post => {
                        switch (post.type) {
                            case Gallery.type:
                                expect(post).to.be.instanceof(Gallery);
                                break;

                            case Photo.type:
                                expect(post).to.be.instanceof(Photo);
                                break;

                            default:
                                expect(post).to.be.instanceof(Post);
                                break;
                        }
                    });
                    sinon.assert.calledOnce(stubServiceClient.get);
                    sinon.assert.calledWith(stubServiceClient.get, "me/feed", sinon.match({count: stubParams.perPage}));
                });
        });

        it("finds no posts", function () {
            const facebookSource = new FacebookSource(stubServiceClient, stubCacheClient);
            const stubParams = PostSearchParams.fromJS({perPage: 42});

            return facebookSource.recordsGetter(stubParams)
                .then(posts => {
                    expect(posts).to.be.instanceof(Array);
                    expect(posts).to.be.empty;
                    sinon.assert.calledOnce(stubServiceClient.get);
                    sinon.assert.calledWith(stubServiceClient.get, "me/feed", sinon.match({count: stubParams.perPage}));
                });
        });
    });

    describe("allRecordsGetter", function () {
        it("finds all posts", function () {
            const facebookSource = new FacebookSource(stubServiceClient, stubCacheClient);
            const stubParams = PostSearchParams.fromJS({perPage: 40, min_id: "meow", max_id: "grr"});

            return facebookSource.allRecordsGetter(stubParams)
                .then(posts => {
                    expect(posts).to.be.instanceof(Array);
                    expect(posts).to.have.length(3);
                    posts.map(post => {
                        switch (post.type) {
                            case Gallery.type:
                                expect(post).to.be.instanceof(Gallery);
                                break;

                            case Photo.type:
                                expect(post).to.be.instanceof(Photo);
                                break;

                            default:
                                expect(post).to.be.instanceof(Post);
                                break;
                        }
                    });
                    sinon.assert.calledTwice(stubServiceClient.get);
                    sinon.assert.calledWith(stubServiceClient.get, "me/feed", sinon.match({count: stubParams.perPage}));
                });
        });
    });

    describe("recordGetter", function () {
        it("passes `serviceClient` the expected parameters", function () {
            const facebookSource = new FacebookSource(stubServiceClient, stubCacheClient);

            return facebookSource.recordGetter(stubPost.id)
                .then(post => {
                    expect(post).to.be.instanceof(Post);
                    sinon.assert.calledOnce(stubServiceClient.get);
                    sinon.assert.calledWith(stubServiceClient.get, stubPost.id);
                });
        });

        it("finds no post", function () {
            const facebookSource = new FacebookSource(stubServiceClient, stubCacheClient);

            return facebookSource.recordGetter("foo")
                .then(post => {
                    expect(post).to.not.be.ok;
                    sinon.assert.calledOnce(stubServiceClient.get);
                    sinon.assert.calledWith(stubServiceClient.get, "foo");
                });
        });
    });
});
