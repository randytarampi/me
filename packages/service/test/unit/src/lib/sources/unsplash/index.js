import {Photo, timedPromise} from "@randy.tarampi/js";
import {expect} from "chai";
import {DateTime} from "luxon";
import sinon from "sinon";
import Unsplash from "unsplash-js";
import PostSearchParams from "../../../../../../src/lib/postSearchParams";
import UnsplashSource from "../../../../../../src/lib/sources/unsplash";
import dummyClassesGenerator from "../../../../../lib/dummyClassesGenerator";

describe("UnsplashSource", function () {
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
    let stubGetPhotos;
    let stubCreateRecord;
    let stubGetPhoto;
    let stubCacheClient;
    let builtDummyClasses;
    let dummyClassBuilderArguments;

    let unsplashUser;
    let unsplashPhoto;
    let unsplashPhotos;

    beforeEach(function () {
        process.env.UNSPLASH_API_KEY = "UNSPLASH_API_KEY";
        process.env.UNSPLASH_API_SECRET = "UNSPLASH_API_SECRET";
        process.env.UNSPLASH_USER_NAME = "UNSPLASH_USER_NAME";

        stubPost = Photo.fromJSON({id: "woof"});
        stubPosts = [stubPost, Photo.fromJSON({id: "meow"}), Photo.fromJSON({id: "grr"})];

        unsplashUser = {
            url: "woof://woof.woof",
            username: process.env.UNSPLASH_USER_NAME,
            name: "Woof!",
            id: "woof",
            links: {
                html: "woof://woof.woof"
            },
            profile_image: {
                large: "woof://woof.woof"
            }
        };
        unsplashPhoto = {
            id: stubPost.id,
            created_at: DateTime.utc().toISO(),
            width: 1000,
            height: 1000,
            links: {
                html: "woof://woof.woof"
            },
            urls: {
                raw: "woof://woof.woof/?size=raw",
                full: "woof://woof.woof/?size=full",
                regular: "woof://woof.woof/?size=regular",
                small: "woof://woof.woof/?size=small"
            },
            description: "A man drinking a coffee.",
            exif: {
                make: "Canon",
                model: "Canon EOS 40D",
                exposure_time: "0.011111111111111112",
                aperture: "4.970854",
                focal_length: "37",
                iso: 100
            },
            location: {
                city: "Montreal",
                country: "Canada",
                position: {
                    latitude: 45.4732984,
                    longitude: -73.6384879
                }
            },
            user: unsplashUser
        };
        unsplashPhotos = stubPosts.map(stubPost => Object.assign({}, unsplashPhoto, {id: stubPost.id}));
        delete unsplashPhotos[0].location;
        delete unsplashPhotos[1].exif;
        delete unsplashPhotos[2].location.position;
        stubServiceClient = {
            photos: {
                getPhoto: sinon.stub().callsFake((id, width, height, crop) => {
                    const post = unsplashPhotos.find(unsplashBlogPost => unsplashBlogPost.id === id);

                    if (post) {
                        if (width) {
                            post.width = width;
                        }
                        if (height) {
                            post.height = height;
                        }
                        if (crop) {
                            const cropArgument = crop.split(",");
                            post.width = cropArgument[2];
                            post.height = cropArgument[3];
                        }
                    }

                    return Promise.resolve({
                        json: () => post
                    });
                })
            },
            users: {
                photos: sinon.stub().callsFake((user, page, perPage, orderBy) => { // eslint-disable-line no-unused-vars
                    let photos = unsplashPhotos;

                    if (perPage === 420) { // NOTE-RT: 420 is a sentinel value for an empty array
                        photos = [];
                    }

                    if (stubServiceClient.users.photos.callCount > 1) { // NOTE-RT: 420 is a sentinel value for an empty array
                        photos = [];
                    }

                    return Promise.resolve({
                        json: () => photos
                    });
                })
            }
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
        stubGetPhotos = sinon.stub().callsFake(params => timedPromise(stubPosts)); // eslint-disable-line no-unused-vars

        stubCreateRecord = sinon.stub().callsFake(post => timedPromise(post));
        stubGetPhoto = sinon.stub().callsFake(params => timedPromise(stubPost)); // eslint-disable-line no-unused-vars

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

            stubGetPhotos,
            stubCreateRecords,

            stubGetPhoto,
            stubCreateRecord
        };
        builtDummyClasses = dummyClassesGenerator(dummyClassBuilderArguments);

        DummyCacheClient = builtDummyClasses.DummyCacheClient;

        stubCacheClient = new DummyCacheClient("ᶘ ◕ᴥ◕ᶅ");
    });

    describe("constructor", function () {
        it("should build a `UnsplashSource` instance (including the default `unsplash` client)", function () {
            const unsplashSource = new UnsplashSource(null, stubCacheClient);

            expect(UnsplashSource.type).to.eql("unsplash");
            expect(unsplashSource.client).to.be.instanceof(Unsplash);
            expect(unsplashSource.cacheClient).to.eql(stubCacheClient);
            expect(unsplashSource.initializing).to.be.instanceOf(Promise);
            expect(unsplashSource).to.be.instanceOf(UnsplashSource);
        });

        it("should build a `UnsplashSource` instance (with stubbed client)", function () {
            const unsplashSource = new UnsplashSource(stubServiceClient, stubCacheClient);

            expect(UnsplashSource.type).to.eql("unsplash");
            expect(unsplashSource.client).to.eql(stubServiceClient);
            expect(unsplashSource.cacheClient).to.eql(stubCacheClient);
            expect(unsplashSource.initializing).to.be.instanceOf(Promise);
            expect(unsplashSource).to.be.instanceOf(UnsplashSource);
        });
    });

    describe("recordsGetter", function () {
        it("passes `serviceClient` the expected parameters", function () {
            const unsplashSource = new UnsplashSource(stubServiceClient, stubCacheClient);
            const stubParams = PostSearchParams.fromJS({perPage: 30, page: 2, orderBy: "woof"});

            return unsplashSource.recordsGetter(stubParams)
                .then(posts => {
                    expect(posts).to.be.instanceof(Array);
                    posts.map(post => {
                        expect(post).to.be.instanceof(Photo);
                    });
                    sinon.assert.calledOnce(stubServiceClient.users.photos);
                    sinon.assert.calledWith(stubServiceClient.users.photos, process.env.UNSPLASH_USER_NAME, stubParams.page, stubParams.perPage, "latest");
                    stubPosts.forEach(stubPost => sinon.assert.calledWith(stubServiceClient.photos.getPhoto, stubPost.id, stubParams.Unsplash.width, stubParams.Unsplash.height, stubParams.Unsplash.crop));
                });
        });

        it("finds no posts", function () {
            const unsplashSource = new UnsplashSource(stubServiceClient, stubCacheClient);
            const stubParams = PostSearchParams.fromJS({perPage: 420});

            return unsplashSource.recordsGetter(stubParams)
                .then(posts => {
                    expect(posts).to.be.instanceof(Array);
                    expect(posts).to.be.empty;
                    sinon.assert.calledOnce(stubServiceClient.users.photos);
                    sinon.assert.calledWith(stubServiceClient.users.photos, process.env.UNSPLASH_USER_NAME, 1, stubParams.perPage, "latest");
                    sinon.assert.notCalled(stubServiceClient.photos.getPhoto);
                });
        });
    });

    describe("allRecordsGetter", function () {
        it("finds all posts", function () {
            const unsplashSource = new UnsplashSource(stubServiceClient, stubCacheClient);
            const stubParams = PostSearchParams.fromJS({perPage: 30, orderBy: "latest"});

            return unsplashSource.allRecordsGetter(stubParams)
                .then(posts => {
                    expect(posts).to.be.instanceof(Array);
                    posts.map(post => {
                        expect(post).to.be.instanceof(Photo);
                    });
                    sinon.assert.calledTwice(stubServiceClient.users.photos);
                    sinon.assert.calledWith(stubServiceClient.users.photos, process.env.UNSPLASH_USER_NAME, 1, stubParams.perPage, "latest");
                });
        });
    });

    describe("recordGetter", function () {
        it("passes `serviceClient` the expected parameters", function () {
            const unsplashSource = new UnsplashSource(stubServiceClient, stubCacheClient);
            const stubParams = PostSearchParams.fromJS({width: 500, height: 500, crop: "0,0,400,400"});

            return unsplashSource.recordGetter(stubPost.id, stubParams)
                .then(post => {
                    expect(post).to.be.instanceof(Photo);
                    sinon.assert.calledOnce(stubServiceClient.photos.getPhoto);
                    sinon.assert.calledWith(stubServiceClient.photos.getPhoto, stubPost.id, stubParams.width, stubParams.height, stubParams.crop);
                });
        });

        it("finds no post", function () {
            const unsplashSource = new UnsplashSource(stubServiceClient, stubCacheClient);
            const stubParams = PostSearchParams.fromJS({width: 500, height: 500, crop: "0,0,400,400"});

            return unsplashSource.recordGetter("foo", stubParams)
                .then(post => {
                    expect(post).to.not.be.ok;
                    sinon.assert.calledOnce(stubServiceClient.photos.getPhoto);
                    sinon.assert.calledWith(stubServiceClient.photos.getPhoto, "foo", stubParams.width, stubParams.height, stubParams.crop);
                });
        });
    });
});
