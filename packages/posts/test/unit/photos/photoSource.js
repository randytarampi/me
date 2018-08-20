import {Photo} from "@randy.tarampi/js";
import {expect} from "chai";
import sinon from "sinon";
import PhotoSource from "../../../photos/photoSource";
import dummyClassesGenerator from "../../lib/dummyClassesGenerator";
import {timedPromise} from "../../lib/util";

describe("PhotoSource", function () {
    let stubType;
    let stubServiceClient;
    let stubPhoto;
    let stubPhotos;
    let stubBeforePostsGetter;
    let stubPhotosGetter;
    let stubAfterPostsGetter;
    let stubBeforePostGetter;
    let stubPhotoGetter;
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

    beforeEach(function () {
        stubType = "ʕ•ᴥ•ʔ";
        stubServiceClient = {"ʕ•ᴥ•ʔ": "ʕ•ᴥ•ʔ"};

        stubPhoto = Photo.fromJSON({id: "woof"});
        stubPhotos = [stubPhoto, Photo.fromJSON({id: "meow"}), Photo.fromJSON({id: "grr"})];

        stubBeforePostsGetter = sinon.stub().callsFake(params => timedPromise(params));
        stubPhotosGetter = sinon.stub().callsFake(params => timedPromise(stubPhotos)); // eslint-disable-line no-unused-vars
        stubAfterPostsGetter = sinon.stub().callsFake((posts, params) => timedPromise(posts)); // eslint-disable-line no-unused-vars

        stubBeforePostGetter = sinon.stub().callsFake((postId, params) => timedPromise(params));
        stubPhotoGetter = sinon.stub().callsFake((postId, params) => timedPromise(stubPhotos.find(post => post.id === postId) || null)); // eslint-disable-line no-unused-vars
        stubAfterPostGetter = sinon.stub().callsFake((post, params) => timedPromise(post)); // eslint-disable-line no-unused-vars

        stubBeforeCachedPostsGetter = sinon.stub().callsFake(params => timedPromise(params));
        stubCachedPostsGetter = sinon.stub().callsFake(params => timedPromise(stubPhotos)); // eslint-disable-line no-unused-vars
        stubAfterCachedPostsGetter = sinon.stub().callsFake((posts, params) => timedPromise(posts)); // eslint-disable-line no-unused-vars

        stubBeforeCachedPostGetter = sinon.stub().callsFake((postId, params) => timedPromise(params));
        stubCachedPostGetter = sinon.stub().callsFake((postId, params) => timedPromise(stubPhotos.find(post => post.id === postId) || null)); // eslint-disable-line no-unused-vars
        stubAfterCachedPostGetter = sinon.stub().callsFake((post, params) => timedPromise(post)); // eslint-disable-line no-unused-vars

        stubJsonToPost = sinon.stub().callsFake(Photo.fromJSON);

        stubCreatePosts = sinon.stub().callsFake(posts => timedPromise(posts));
        stubGetPosts = sinon.stub().callsFake(params => timedPromise(stubPhotos)); // eslint-disable-line no-unused-vars

        stubCreatePost = sinon.stub().callsFake(post => timedPromise(post));
        stubGetPost = sinon.stub().callsFake(params => timedPromise(stubPhoto)); // eslint-disable-line no-unused-vars

        dummyClassBuilderArguments = {
            stubBeforePostsGetter,
            stubPhotosGetter,
            stubAfterPostsGetter,

            stubBeforePostGetter,
            stubPhotoGetter,
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
        it("should build a `PhotoSource` instance", function () {
            const photoSource = new PhotoSource(stubType, stubServiceClient, stubCacheClient);

            expect(photoSource.type).to.eql(stubType);
            expect(photoSource.client).to.eql(stubServiceClient);
            expect(photoSource.cacheClient).to.eql(stubCacheClient);
            expect(photoSource.initializing).to.be.instanceOf(Promise);
            expect(photoSource).to.be.instanceOf(PhotoSource);
        });
    });

    describe("#postsGetter", function () {
        it("should throw a `Please specify an actual postsGetter implementation` error", function () {
            const photoSource = new PhotoSource(stubType, stubServiceClient, stubCacheClient);

            return photoSource.postsGetter()
                .then(() => {
                    throw new Error("Wtf? This should've thrown");
                })
                .catch((error) => {
                    expect(error.message).to.match(/Please specify an actual postsGetter implementation/);
                });
        });
    });

    describe("#postGetter", function () {
        it("should throw a `Please specify an actual postGetter implementation` error", function () {
            const photoSource = new PhotoSource(stubType, stubServiceClient, stubCacheClient);

            return photoSource.postGetter()
                .then(() => {
                    throw new Error("Wtf? This should've thrown");
                })
                .catch((error) => {
                    expect(error.message).to.match(/Please specify an actual postGetter implementation/);
                });
        });
    });
});
