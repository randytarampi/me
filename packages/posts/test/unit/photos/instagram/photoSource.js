import {Photo} from "@randy.tarampi/js";
import {expect} from "chai";
import {DateTime} from "luxon";
import fetch from "node-fetch"; // eslint-disable-line import/no-extraneous-dependencies
import sinon from "sinon";
import SearchParams from "../../../../lib/searchParams";
import InstagramPhotoSource from "../../../../photos/instagram/photoSource";
import dummyClassesGenerator from "../../../lib/dummyClassesGenerator";
import {timedPromise} from "../../../lib/util";

describe("InstagramPhotoSource", function () {
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

    let instagramUser;
    let instagramPhoto;
    let instagramPhotos;

    beforeEach(function () {
        process.env.INSTAGRAM_ACCESS_TOKEN = "INSTAGRAM_ACCESS_TOKEN";
        process.env.INSTAGRAM_USER_ID = "INSTAGRAM_USER_ID";
        process.env.INSTAGRAM_USER_NAME = "INSTAGRAM_USER_NAME";

        stubPost = Photo.fromJSON({id: "woof"});
        stubPosts = [stubPost, Photo.fromJSON({id: "meow"}), Photo.fromJSON({id: "grr"})];

        instagramUser = {
            id: process.env.INSTAGRAM_USER_ID,
            username: process.env.INSTAGRAM_USER_NAME,
            full_name: "Woof Woof",
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
            }
        };
        instagramPhotos = stubPosts.map(stubPost => Object.assign({}, instagramPhoto, {id: stubPost.id}));
        stubServiceClient = {
            media: sinon.stub().callsFake(postId => {
                return Promise.resolve({
                    data: instagramPhotos.find(instagramBlogPost => instagramBlogPost.id === postId)
                });
            }),
            userSearch: sinon.stub().callsFake(username => { // eslint-disable-line no-unused-vars
                return Promise.resolve({
                    data: [instagramUser]
                });
            }),
            userMedia: sinon.stub().callsFake((username, params) => { // eslint-disable-line no-unused-vars
                return Promise.resolve({
                    data: params.count === 420 ? [] : instagramPhotos.concat({id: "foo", type: "foo"})
                });
            })
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

        // FIXME-RT: Ugh. Gross af, but I really don't want to proxyquire right now. https://stackoverflow.com/questions/43960646/testing-mocking-node-fetch-dependency-that-it-is-used-in-a-class-method
        sinon.stub(fetch, "Promise").returns(Promise.resolve({
            json: () => {
                return {
                    graphql: {
                        shortcode_media: {
                            display_url: "woof://woof.woof/woof",
                            dimensions: {
                                width: 1080,
                                height: 1080
                            },
                        }
                    }
                };
            }
        }));
    });

    afterEach(function () {
        fetch.Promise.restore();
    });

    describe("constructor", function () {
        it("should build a `InstagramPhotoSource` instance (including the default `instagram` client)", function () {
            const instagramPhotoSource = new InstagramPhotoSource(null, stubCacheClient);

            expect(instagramPhotoSource.type).to.eql("Instagram");
            // expect(instagramPhotoSource.client).to.be.instanceof(Instagram); // NOTE-RT: It's not so much a class as it is just an exported anonymous function
            expect(instagramPhotoSource.cacheClient).to.eql(stubCacheClient);
            expect(instagramPhotoSource.initializing).to.be.instanceOf(Promise);
            expect(instagramPhotoSource).to.be.instanceOf(InstagramPhotoSource);
        });

        it("should build a `InstagramPhotoSource` instance (with stubbed client)", function () {
            const instagramPhotoSource = new InstagramPhotoSource(stubServiceClient, stubCacheClient);

            expect(instagramPhotoSource.type).to.eql("Instagram");
            expect(instagramPhotoSource.client).to.eql(stubServiceClient);
            expect(instagramPhotoSource.cacheClient).to.eql(stubCacheClient);
            expect(instagramPhotoSource.initializing).to.be.instanceOf(Promise);
            expect(instagramPhotoSource).to.be.instanceOf(InstagramPhotoSource);
        });
    });

    describe("#postsGetter", function () {
        it("passes `serviceClient` the expected parameters", function () {
            const instagramPhotoSource = new InstagramPhotoSource(stubServiceClient, stubCacheClient);
            const stubParams = SearchParams.fromJS({perPage: 30, min_id: "meow", max_id: "grr"});

            delete process.env.INSTAGRAM_USER_ID;

            return instagramPhotoSource.postsGetter(stubParams)
                .then(posts => {
                    expect(posts).to.be.ok;
                    expect(posts).to.be.instanceof(Array);
                    expect(posts).to.have.length(3);
                    posts.map(post => {
                        expect(post).to.be.ok;
                        expect(post).to.be.instanceof(Photo);
                    });
                    sinon.assert.calledOnce(stubServiceClient.userSearch);
                    sinon.assert.calledWith(stubServiceClient.userSearch, process.env.INSTAGRAM_USER_NAME);
                    sinon.assert.calledOnce(stubServiceClient.userMedia);
                    sinon.assert.calledWith(stubServiceClient.userMedia, instagramUser.id, sinon.match({count: stubParams.perPage}));
                });
        });

        it("doesn't query for a `userId` if it already has `process.env.INSTAGRAM_USER_ID`", function () {
            const instagramPhotoSource = new InstagramPhotoSource(stubServiceClient, stubCacheClient);
            const stubParams = SearchParams.fromJS({perPage: 40, min_id: "meow", max_id: "grr"});

            process.env.INSTAGRAM_USER_ID = instagramUser.id;

            return instagramPhotoSource.postsGetter(stubParams)
                .then(posts => {
                    expect(posts).to.be.ok;
                    expect(posts).to.be.instanceof(Array);
                    expect(posts).to.have.length(3);
                    posts.map(post => {
                        expect(post).to.be.ok;
                        expect(post).to.be.instanceof(Photo);
                    });
                    sinon.assert.notCalled(stubServiceClient.userSearch);
                    sinon.assert.calledOnce(stubServiceClient.userMedia);
                    sinon.assert.calledWith(stubServiceClient.userMedia, process.env.INSTAGRAM_USER_ID, sinon.match({count: stubParams.perPage}));
                });
        });

        it("finds no posts", function () {
            const instagramPhotoSource = new InstagramPhotoSource(stubServiceClient, stubCacheClient);
            const stubParams = SearchParams.fromJS({perPage: 420});

            return instagramPhotoSource.postsGetter(stubParams)
                .then(posts => {
                    expect(posts).to.be.ok;
                    expect(posts).to.be.instanceof(Array);
                    expect(posts).to.be.empty;
                    sinon.assert.calledOnce(stubServiceClient.userMedia);
                    sinon.assert.calledWith(stubServiceClient.userMedia, process.env.INSTAGRAM_USER_ID, sinon.match({count: stubParams.perPage}));
                });
        });
    });

    describe("#postGetter", function () {
        it("passes `serviceClient` the expected parameters", function () {
            const instagramPhotoSource = new InstagramPhotoSource(stubServiceClient, stubCacheClient);

            return instagramPhotoSource.postGetter(stubPost.id)
                .then(post => {
                    expect(post).to.be.ok;
                    expect(post).to.be.instanceof(Photo);
                    sinon.assert.calledOnce(stubServiceClient.media);
                    sinon.assert.calledWith(stubServiceClient.media, stubPost.id);
                });
        });

        it("finds no post", function () {
            const instagramPhotoSource = new InstagramPhotoSource(stubServiceClient, stubCacheClient);

            return instagramPhotoSource.postGetter("foo")
                .then(post => {
                    expect(post).to.not.be.ok;
                    sinon.assert.calledOnce(stubServiceClient.media);
                    sinon.assert.calledWith(stubServiceClient.media, "foo");
                });
        });
    });
});
