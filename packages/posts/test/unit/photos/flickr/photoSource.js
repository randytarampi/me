import {Photo} from "@randy.tarampi/js";
import {expect} from "chai";
import Flickr from "flickr-sdk";
import {DateTime} from "luxon";
import sinon from "sinon";
import SearchParams from "../../../../lib/searchParams";
import FlickrPhotoSource from "../../../../photos/flickr/photoSource";
import dummyClassesGenerator from "../../../lib/dummyClassesGenerator";
import {timedPromise} from "../../../lib/util";

describe("FlickrPhotoSource", function () {
    let stubServiceClient;
    let stubPost;
    let stubPosts;
    let stubBeforePostsGetter;
    let stubPostsGetter;
    let stubAfterPostsGetter;
    let stubBeforePostGetter;
    let stubPostGetter;
    let stubAfterPostGetter;
    let stubBeforeCachedPostsGetter;
    let stubCachedPostsGetter;
    let stubAfterCachedPostsGetter;
    let stubBeforeCachedPostGetter;
    let stubCachedPostGetter;
    let stubAfterCachedPostGetter;
    let stubJsonToPost;
    let DummyCacheClient;
    let stubCreatePosts;
    let stubGetPosts;
    let stubCreatePost;
    let stubGetPost;
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
            }
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

        stubBeforePostsGetter = sinon.stub().callsFake(params => timedPromise(params));
        stubPostsGetter = sinon.stub().callsFake(params => timedPromise(stubPosts)); // eslint-disable-line no-unused-vars
        stubAfterPostsGetter = sinon.stub().callsFake((posts, params) => timedPromise(posts)); // eslint-disable-line no-unused-vars

        stubBeforePostGetter = sinon.stub().callsFake((postId, params) => timedPromise(params));
        stubPostGetter = sinon.stub().callsFake((postId, params) => timedPromise(stubPosts.find(post => post.id === postId) || null)); // eslint-disable-line no-unused-vars
        stubAfterPostGetter = sinon.stub().callsFake((post, params) => timedPromise(post)); // eslint-disable-line no-unused-vars

        stubBeforeCachedPostsGetter = sinon.stub().callsFake(params => timedPromise(params));
        stubCachedPostsGetter = sinon.stub().callsFake(params => timedPromise(stubPosts)); // eslint-disable-line no-unused-vars
        stubAfterCachedPostsGetter = sinon.stub().callsFake((posts, params) => timedPromise(posts)); // eslint-disable-line no-unused-vars

        stubBeforeCachedPostGetter = sinon.stub().callsFake((postId, params) => timedPromise(params));
        stubCachedPostGetter = sinon.stub().callsFake((postId, params) => timedPromise(stubPosts.find(post => post.id === postId) || null)); // eslint-disable-line no-unused-vars
        stubAfterCachedPostGetter = sinon.stub().callsFake((post, params) => timedPromise(post)); // eslint-disable-line no-unused-vars

        stubJsonToPost = sinon.stub().callsFake(Photo.fromJSON);

        stubCreatePosts = sinon.stub().callsFake(posts => timedPromise(posts));
        stubGetPosts = sinon.stub().callsFake(params => timedPromise(stubPosts)); // eslint-disable-line no-unused-vars

        stubCreatePost = sinon.stub().callsFake(post => timedPromise(post));
        stubGetPost = sinon.stub().callsFake(params => timedPromise(stubPost)); // eslint-disable-line no-unused-vars

        dummyClassBuilderArguments = {
            stubBeforePostsGetter,
            stubPostsGetter,
            stubAfterPostsGetter,

            stubBeforePostGetter,
            stubPostGetter,
            stubAfterPostGetter,

            stubBeforeCachedPostsGetter,
            stubCachedPostsGetter,
            stubAfterCachedPostsGetter,

            stubBeforeCachedPostGetter,
            stubCachedPostGetter,
            stubAfterCachedPostGetter,

            stubJsonToPost,

            stubGetPosts,
            stubCreatePosts,

            stubGetPost,
            stubCreatePost
        };
        builtDummyClasses = dummyClassesGenerator(dummyClassBuilderArguments);

        DummyCacheClient = builtDummyClasses.DummyCacheClient;

        stubCacheClient = new DummyCacheClient("ᶘ ◕ᴥ◕ᶅ");
    });

    describe("constructor", function () {
        it("should build a `FlickrPhotoSource` instance (including the default `flickr` client)", function () {
            const flickrPhotoSource = new FlickrPhotoSource(null, stubCacheClient);

            expect(flickrPhotoSource.type).to.eql("Flickr");
            expect(flickrPhotoSource.client).to.be.instanceof(Flickr);
            expect(flickrPhotoSource.cacheClient).to.eql(stubCacheClient);
            expect(flickrPhotoSource.initializing).to.be.instanceOf(Promise);
            expect(flickrPhotoSource).to.be.instanceOf(FlickrPhotoSource);
        });

        it("should build a `FlickrPhotoSource` instance (with stubbed client)", function () {
            const flickrPhotoSource = new FlickrPhotoSource(stubServiceClient, stubCacheClient);

            expect(flickrPhotoSource.type).to.eql("Flickr");
            expect(flickrPhotoSource.client).to.eql(stubServiceClient);
            expect(flickrPhotoSource.cacheClient).to.eql(stubCacheClient);
            expect(flickrPhotoSource.initializing).to.be.instanceOf(Promise);
            expect(flickrPhotoSource).to.be.instanceOf(FlickrPhotoSource);
        });
    });

    describe("#postsGetter", function () {
        it("passes `serviceClient` the expected parameters", function () {
            const flickrPhotoSource = new FlickrPhotoSource(stubServiceClient, stubCacheClient);
            const stubParams = SearchParams.fromJS({perPage: 30, min_id: "meow", max_id: "grr"});

            delete process.env.FLICKR_USER_ID;

            return flickrPhotoSource.postsGetter(stubParams)
                .then(posts => {
                    expect(posts).to.be.ok;
                    expect(posts).to.be.instanceof(Array);
                    expect(posts).to.have.length(3);
                    posts.map(post => {
                        expect(post).to.be.ok;
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
            const flickrPhotoSource = new FlickrPhotoSource(stubServiceClient, stubCacheClient);
            const stubParams = SearchParams.fromJS({perPage: 40});

            process.env.FLICKR_USER_ID = flickrUser.id;

            return flickrPhotoSource.postsGetter(stubParams)
                .then(posts => {
                    expect(posts).to.be.ok;
                    expect(posts).to.be.instanceof(Array);
                    expect(posts).to.have.length(3);
                    posts.map(post => {
                        expect(post).to.be.ok;
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
            const flickrPhotoSource = new FlickrPhotoSource(stubServiceClient, stubCacheClient);
            const stubParams = SearchParams.fromJS({perPage: 420});

            return flickrPhotoSource.postsGetter(stubParams)
                .then(posts => {
                    expect(posts).to.be.ok;
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

    describe("#allPostsGetter", function () {
        it("finds all posts", function () {
            const flickrPhotoSource = new FlickrPhotoSource(stubServiceClient, stubCacheClient);
            const stubParams = SearchParams.fromJS({perPage: 40});

            process.env.FLICKR_USER_ID = flickrUser.id;

            return flickrPhotoSource.allPostsGetter(stubParams)
                .then(posts => {
                    expect(posts).to.be.ok;
                    expect(posts).to.be.instanceof(Array);
                    expect(posts).to.have.length(3);
                    posts.map(post => {
                        expect(post).to.be.ok;
                        expect(post).to.be.instanceof(Photo);
                    });
                    sinon.assert.notCalled(stubServiceClient.people.findByUsername);
                    sinon.assert.calledTwice(stubServiceClient.people.getPublicPhotos);
                    sinon.assert.calledWith(stubServiceClient.people.getPublicPhotos, sinon.match({
                        user_id: process.env.FLICKR_USER_ID,
                        per_page: stubParams.perPage
                    }));
                });
        });
    });

    describe("#postGetter", function () {
        it("requires implementation", function () {
            const flickrPhotoSource = new FlickrPhotoSource(stubServiceClient, stubCacheClient);
            expect(flickrPhotoSource).to.be.instanceOf(FlickrPhotoSource);

            return flickrPhotoSource.postGetter(stubPost.id, {})
                .then(() => {
                    throw new Error("Wtf? This should've thrown");
                })
                .catch(error => {
                    expect(error).to.be.ok;
                    expect(error.message).to.match(/Please specify an actual postGetter implementation/);
                });
        });
    });

    describe("#jsonToPost", function () {
        it("turns a flickr response into a `Photo`", function () {
            const flickrPhotoSource = new FlickrPhotoSource(stubServiceClient, stubCacheClient);
            expect(flickrPhotoSource).to.be.instanceOf(FlickrPhotoSource);

            const photoFromFlickr = flickrPhotoSource.jsonToPost(flickrPhoto);

            expect(photoFromFlickr).to.be.ok;
            expect(photoFromFlickr.id).to.eql(photoFromFlickr.id);
            expect(photoFromFlickr.datePublished).to.be.instanceof(DateTime);
            expect(photoFromFlickr.datePublished).to.eql(DateTime.fromMillis(parseInt(flickrPhoto.dateupload, 10) * 1000));
            expect(photoFromFlickr.dateCreated).to.be.instanceof(DateTime);
            expect(photoFromFlickr.dateCreated).to.eql(DateTime.fromSQL(flickrPhoto.datetaken));
        });
    });
});
