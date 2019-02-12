import {Photo, timedPromise} from "@randy.tarampi/js";
import {expect} from "chai";
import Flickr from "flickr-sdk";
import {DateTime} from "luxon";
import sinon from "sinon";
import PostSearchParams from "../../../../../../src/lib/postSearchParams";
import FlickrSource, {FLICKR_API_MAX_POSTS_PER_PAGE} from "../../../../../../src/lib/sources/flickr";
import dummyClassesGenerator from "../../../../../lib/dummyClassesGenerator";

describe("FlickrSource", function () {
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

    let flickrUser;
    let flickrPhoto;
    let flickrPhotos;

    beforeEach(function () {
        process.env.FLICKR_API_KEY = "FLICKR_API_KEY";
        process.env.FLICKR_USER_ID = "FLICKR_USER_ID";
        process.env.FLICKR_USER_NAME = "FLICKR_USER_NAME";

        stubPost = Photo.fromJSON({id: "woof"});
        stubPosts = [stubPost, Photo.fromJSON({id: "meow"}), Photo.fromJSON({id: "grr"})];

        flickrUser = {
            nsid: process.env.FLICKR_USER_ID,
            username: process.env.FLICKR_USER_NAME,
            owner: process.env.FLICKR_USER_NAME,
            owner_name: "Woof Woof",
        };
        flickrPhoto = {
            id: stubPost.id,
            type: "image",
            owner: flickrUser.owner,
            pathalias: flickrUser.owner,
            owner_name: flickrUser.owner_name,
            datetaken: DateTime.utc().toSQL(),
            dateupload: DateTime.utc().valueOf().toString(),
            width_o: 1080,
            height_o: 1080,
            url_o: "woof://woof.woof/?size=o",
            title: "ʕ•ᴥ•ʔﾉ゛",
            description: {
                _content: "<p>Woof woof woof</p>"
            },
            tags: "woof meow grr",
            latitude: "49.2845",
            longitude: "-123.1116"
        };
        flickrPhotos = stubPosts.map(stubPost => Object.assign({}, flickrPhoto, {id: stubPost.id}));
        stubServiceClient = {
            people: {
                findByUsername: sinon.stub().callsFake(params => { // eslint-disable-line no-unused-vars
                    return Promise.resolve({
                        body: {
                            user: params.username === flickrUser.username ? flickrUser : null
                        }
                    });
                }),
                getPublicPhotos: sinon.stub().callsFake(params => {
                    let posts = flickrPhotos;

                    if (params.per_page === 420) { // NOTE-RT: 420 is a sentinel value for an empty array
                        posts = [];
                    }

                    if (stubServiceClient.people.getPublicPhotos.callCount > 1) {
                        posts = [];
                    }

                    return Promise.resolve({
                        body: {
                            photos: {
                                photo: posts
                            }
                        }
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
        it("should build a `FlickrSource` instance (including the default `flickr` client)", function () {
            const flickrSource = new FlickrSource(null, stubCacheClient);

            expect(FlickrSource.type).to.eql("flickr");
            expect(flickrSource.client).to.be.instanceof(Flickr);
            expect(flickrSource.cacheClient).to.eql(stubCacheClient);
            expect(flickrSource.initializing).to.be.instanceOf(Promise);
            expect(flickrSource).to.be.instanceOf(FlickrSource);
        });

        it("should build a `FlickrSource` instance (with stubbed client)", function () {
            const flickrSource = new FlickrSource(stubServiceClient, stubCacheClient);

            expect(FlickrSource.type).to.eql("flickr");
            expect(flickrSource.client).to.eql(stubServiceClient);
            expect(flickrSource.cacheClient).to.eql(stubCacheClient);
            expect(flickrSource.initializing).to.be.instanceOf(Promise);
            expect(flickrSource).to.be.instanceOf(FlickrSource);
        });
    });

    describe("recordsGetter", function () {
        it("passes `serviceClient` the expected parameters", function () {
            const flickrSource = new FlickrSource(stubServiceClient, stubCacheClient);
            const stubParams = PostSearchParams.fromJS({perPage: 30, min_id: "meow", max_id: "grr"});

            delete process.env.FLICKR_USER_ID;

            return flickrSource.recordsGetter(stubParams)
                .then(posts => {
                    expect(posts).to.be.instanceof(Array);
                    expect(posts).to.have.length(3);
                    posts.map(post => {
                        expect(post).to.be.instanceof(Photo);
                    });
                    sinon.assert.calledOnce(stubServiceClient.people.findByUsername);
                    sinon.assert.calledWith(stubServiceClient.people.findByUsername, {username: process.env.FLICKR_USER_NAME});
                    sinon.assert.calledOnce(stubServiceClient.people.getPublicPhotos);
                    sinon.assert.calledWith(stubServiceClient.people.getPublicPhotos, sinon.match({
                        user_id: flickrUser.nsid,
                        per_page: stubParams.perPage
                    }));
                });
        });

        it("doesn't query for a `userId` if it already has `process.env.FLICKR_USER_ID`", function () {
            const flickrSource = new FlickrSource(stubServiceClient, stubCacheClient);
            const stubParams = PostSearchParams.fromJS({perPage: 40});

            process.env.FLICKR_USER_ID = flickrUser.id;

            return flickrSource.recordsGetter(stubParams)
                .then(posts => {
                    expect(posts).to.be.instanceof(Array);
                    expect(posts).to.have.length(3);
                    posts.map(post => {
                        expect(post).to.be.instanceof(Photo);
                    });
                    sinon.assert.notCalled(stubServiceClient.people.findByUsername);
                    sinon.assert.calledOnce(stubServiceClient.people.getPublicPhotos);
                    sinon.assert.calledWith(stubServiceClient.people.getPublicPhotos, sinon.match({
                        user_id: process.env.FLICKR_USER_ID,
                        per_page: stubParams.perPage
                    }));
                });
        });

        it("finds no posts", function () {
            const flickrSource = new FlickrSource(stubServiceClient, stubCacheClient);
            const stubParams = PostSearchParams.fromJS({perPage: 420});

            return flickrSource.recordsGetter(stubParams)
                .then(posts => {
                    expect(posts).to.be.instanceof(Array);
                    expect(posts).to.be.empty;
                    sinon.assert.calledOnce(stubServiceClient.people.getPublicPhotos);
                    sinon.assert.calledWith(stubServiceClient.people.getPublicPhotos, sinon.match({
                        user_id: process.env.FLICKR_USER_ID,
                        per_page: stubParams.perPage
                    }));
                });
        });
    });

    describe("allRecordsGetter", function () {
        it("finds all posts", function () {
            const flickrSource = new FlickrSource(stubServiceClient, stubCacheClient);
            const stubParams = PostSearchParams.fromJS({perPage: 40});

            process.env.FLICKR_USER_ID = flickrUser.id;

            return flickrSource.allRecordsGetter(stubParams)
                .then(posts => {
                    expect(posts).to.be.instanceof(Array);
                    expect(posts).to.have.length(3);
                    posts.map(post => {
                        expect(post).to.be.instanceof(Photo);
                    });
                    sinon.assert.notCalled(stubServiceClient.people.findByUsername);
                    sinon.assert.calledTwice(stubServiceClient.people.getPublicPhotos);
                    sinon.assert.calledWith(stubServiceClient.people.getPublicPhotos, sinon.match({
                        user_id: process.env.FLICKR_USER_ID,
                        per_page: FLICKR_API_MAX_POSTS_PER_PAGE
                    }));
                });
        });
    });

    describe("recordGetter", function () {
        it("requires implementation", function () {
            const flickrSource = new FlickrSource(stubServiceClient, stubCacheClient);
            expect(flickrSource).to.be.instanceOf(FlickrSource);

            return flickrSource.recordGetter(stubPost.id, {})
                .then(() => {
                    throw new Error("Wtf? This should've thrown");
                })
                .catch(error => {
                    expect(error.message).to.match(/Please specify an actual recordGetter implementation/);
                });
        });
    });

    describe("instanceToRecord", function () {
        it("turns a flickr response into a `Photo`", function () {
            const flickrSource = new FlickrSource(stubServiceClient, stubCacheClient);
            expect(flickrSource).to.be.instanceOf(FlickrSource);

            const photoFromFlickr = FlickrSource.instanceToRecord(flickrPhoto);

            expect(photoFromFlickr.id).to.eql(photoFromFlickr.id);
            expect(photoFromFlickr.datePublished).to.be.instanceof(DateTime);
            expect(photoFromFlickr.datePublished).to.eql(DateTime.fromMillis(parseInt(flickrPhoto.dateupload, 10) * 1000));
            expect(photoFromFlickr.dateCreated).to.be.instanceof(DateTime);
            expect(photoFromFlickr.dateCreated).to.eql(DateTime.fromSQL(flickrPhoto.datetaken));
        });

        it("turns a flickr response into a `Photo` (falsy values)", function () {
            flickrPhoto = {
                id: stubPost.id,
                type: "image",
                owner: flickrUser.owner,
                pathalias: flickrUser.owner,
                owner_name: flickrUser.owner_name,
                datetaken: null,
                dateupload: DateTime.utc().valueOf().toString(),
                width_o: 1080,
                height_o: 1080,
                url_o: "woof://woof.woof/?size=o",
                title: "ʕ•ᴥ•ʔﾉ゛",
                description: {
                    _content: "<p>Woof woof woof</p>"
                },
                tags: null,
                latitude: null,
                longitude: null
            };

            const flickrSource = new FlickrSource(stubServiceClient, stubCacheClient);
            expect(flickrSource).to.be.instanceOf(FlickrSource);

            const photoFromFlickr = FlickrSource.instanceToRecord(flickrPhoto);

            expect(photoFromFlickr.id).to.eql(photoFromFlickr.id);
            expect(photoFromFlickr.datePublished).to.be.instanceof(DateTime);
            expect(photoFromFlickr.datePublished).to.eql(DateTime.fromMillis(parseInt(flickrPhoto.dateupload, 10) * 1000));
            expect(photoFromFlickr.dateCreated).to.eql(null);
        });
    });
});
