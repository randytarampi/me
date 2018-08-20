import {Photo} from "@randy.tarampi/js";
import {expect} from "chai";
import sinon from "sinon";
import tumblr from "tumblr.js";
import TumblrPhotoSource from "../../../../photos/tumblr/photoSource";
import dummyClassesGenerator from "../../../lib/dummyClassesGenerator";
import {timedPromise} from "../../../lib/util";

import SearchParams from "../../../../lib/searchParams";

describe("TumblrPhotoSource", function () {
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

    let tumblrPhoto;
    let tumblrBlog;
    let tumblrBlogPost;
    let tumblrBlogPosts;

    beforeEach(function () {
        process.env.TUMBLR_USER_NAME = "TUMBLR_USER_NAME";

        stubPost = Photo.fromJSON({id: "woof"});
        stubPosts = [stubPost, Photo.fromJSON({id: "meow"}), Photo.fromJSON({id: "grr"})];

        tumblrPhoto = {
            caption: "<p>Woof woof woof</p>",
            alt_sizes: [
                {url: "woof://woof.woof/?size=100", height: 100, width: 100},
                {url: "woof://woof.woof/?size=500", height: 500, width: 500},
                {url: "woof://woof.woof/?size=1000", height: 1000, width: 1000}
            ]
        };
        tumblrBlog = {
            url: "woof://woof.woof",
            title: "ʕ•ᴥ•ʔﾉ゛",
            name: "Woof!",
            userName: process.env.TUMBLR_USER_NAME
        };
        tumblrBlogPost = {
            id: stubPost.id,
            date: Date.now(),
            title: "ʕ•ᴥ•ʔ",
            caption: "<p>Woof woof woof</p>",
            post_url: "woof://woof.woof/woof/woof/woof",
            photos: [
                tumblrPhoto
            ]
        };
        tumblrBlogPosts = stubPosts.map(stubPost => Object.assign({}, tumblrBlogPost, {id: stubPost.id}));
        stubServiceClient = {
            blogPosts: sinon.stub().callsFake((tumblrUser, params) => timedPromise({
                posts: params.limit === 420 // NOTE-RT: 420 is a sentinel value for an empty array
                    ? []
                    : (params.id ? [tumblrBlogPosts.find(tumblrBlogPost => tumblrBlogPost.id === params.id)] : tumblrBlogPosts).filter(value => !!value),
                blog: tumblrBlog
            }))
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
        it("should build a `TumblrPhotoSource` instance (including the default `tumblr` client)", function () {
            const tumblrPhotoSource = new TumblrPhotoSource(null, stubCacheClient);

            expect(tumblrPhotoSource.type).to.eql("Tumblr");
            expect(tumblrPhotoSource.client).to.be.instanceof(tumblr.Client);
            expect(tumblrPhotoSource.cacheClient).to.eql(stubCacheClient);
            expect(tumblrPhotoSource.initializing).to.be.instanceOf(Promise);
            expect(tumblrPhotoSource).to.be.instanceOf(TumblrPhotoSource);
        });

        it("should build a `TumblrPhotoSource` instance (with stubbed client)", function () {
            const tumblrPhotoSource = new TumblrPhotoSource(stubServiceClient, stubCacheClient);

            expect(tumblrPhotoSource.type).to.eql("Tumblr");
            expect(tumblrPhotoSource.client).to.eql(stubServiceClient);
            expect(tumblrPhotoSource.cacheClient).to.eql(stubCacheClient);
            expect(tumblrPhotoSource.initializing).to.be.instanceOf(Promise);
            expect(tumblrPhotoSource).to.be.instanceOf(TumblrPhotoSource);
        });
    });

    describe("#postsGetter", function () {
        it("passes `serviceClient` the expected parameters", function () {
            const tumblrPhotoSource = new TumblrPhotoSource(stubServiceClient, stubCacheClient);
            const stubParams = SearchParams.fromJS({perPage: 30, page: 2, type: "Photo"});

            return tumblrPhotoSource.postsGetter(stubParams)
                .then(posts => {
                    expect(posts).to.be.ok;
                    expect(posts).to.be.instanceof(Array);
                    posts.map(post => {
                        expect(post).to.be.ok;
                        expect(post).to.be.instanceof(Photo);
                    });
                    sinon.assert.calledOnce(stubServiceClient.blogPosts);
                    sinon.assert.calledWith(stubServiceClient.blogPosts, process.env.TUMBLR_USER_NAME, sinon.match({
                        type: "photo",
                        page: stubParams.page,
                        limit: stubParams.perPage,
                        offset: stubParams.perPage * (stubParams.page - 1)
                    }));
                });
        });

        it("finds no posts", function () {
            const tumblrPhotoSource = new TumblrPhotoSource(stubServiceClient, stubCacheClient);
            const stubParams = SearchParams.fromJS({perPage: 420, type: "Photo"});

            return tumblrPhotoSource.postsGetter(stubParams)
                .then(posts => {
                    expect(posts).to.be.ok;
                    expect(posts).to.be.instanceof(Array);
                    expect(posts).to.be.empty;
                    sinon.assert.calledOnce(stubServiceClient.blogPosts);
                    sinon.assert.calledWith(stubServiceClient.blogPosts, process.env.TUMBLR_USER_NAME, sinon.match({
                        type: "photo",
                        page: 1,
                        offset: 0,
                        limit: stubParams.perPage
                    }));
                });
        });
    });

    describe("#postGetter", function () {
        it("passes `serviceClient` the expected parameters", function () {
            const tumblrPhotoSource = new TumblrPhotoSource(stubServiceClient, stubCacheClient);

            return tumblrPhotoSource.postGetter(stubPost.id, SearchParams.fromJS())
                .then(post => {
                    expect(post).to.be.ok;
                    expect(post).to.be.instanceof(Photo);
                    sinon.assert.calledOnce(stubServiceClient.blogPosts);
                    sinon.assert.calledWith(stubServiceClient.blogPosts, process.env.TUMBLR_USER_NAME, sinon.match({
                        id: stubPost.id
                    }));
                });
        });

        it("finds no post", function () {
            const tumblrPhotoSource = new TumblrPhotoSource(stubServiceClient, stubCacheClient);

            return tumblrPhotoSource.postGetter("foo", SearchParams.fromJS())
                .then(post => {
                    expect(post).to.not.be.ok;
                    sinon.assert.calledOnce(stubServiceClient.blogPosts);
                    sinon.assert.calledWith(stubServiceClient.blogPosts, process.env.TUMBLR_USER_NAME, sinon.match({
                        id: "foo"
                    }));
                });
        });
    });
});
