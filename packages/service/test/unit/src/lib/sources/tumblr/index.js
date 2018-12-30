import {Gallery, Photo, Post} from "@randy.tarampi/js";
import {expect} from "chai";
import {DateTime} from "luxon";
import sinon from "sinon";
import tumblr from "tumblr.js";
import SearchParams from "../../../../../../src/lib/searchParams";
import TumblrSource from "../../../../../../src/lib/sources/tumblr";
import dummyClassesGenerator from "../../../../../lib/dummyClassesGenerator";
import {timedPromise} from "../../../../../lib/util";

describe("TumblrSource", function () {
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
        process.env.TUMBLR_API_KEY = "TUMBLR_API_KEY";
        process.env.TUMBLR_API_SECRET = "TUMBLR_API_SECRET";

        stubPost = Post.fromJSON({id: "woof"});
        stubPosts = [stubPost, Photo.fromJSON({id: "meow"}), Photo.fromJSON({id: "grr"}), Gallery.fromJSON({id: "rawr"})];

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
            date: DateTime.utc().toISO(),
            title: "ʕ•ᴥ•ʔ",
            caption: "<p>Woof woof woof</p>",
            post_url: "woof://woof.woof/woof/woof/woof"
        };
        tumblrBlogPosts = stubPosts.map(stubPost => {
            const postJson = {
                ...tumblrBlogPost,
                id: stubPost.id,
                type: "post",
                blog: tumblrBlog
            };

            switch (stubPost.constructor.type) {
                case Gallery.type:
                    postJson.type = "photo";
                    postJson.photos = [
                        tumblrPhoto,
                        tumblrPhoto
                    ];
                    break;

                case Photo.type:
                    postJson.type = "photo";
                    postJson.photos = [
                        tumblrPhoto
                    ];
                    break;
            }

            return postJson;
        });
        stubServiceClient = {
            blogPosts: sinon.stub().callsFake((tumblrUser, params) => {
                const response = {
                    posts: (
                        params.id
                            ? [tumblrBlogPosts.find(tumblrBlogPost => tumblrBlogPost.id === params.id)]
                            : tumblrBlogPosts
                    ).filter(value => !!value),
                    blog: tumblrBlog
                };

                if (params.limit === 17) { // NOTE-RT: 17 is a sentinel value for an empty array
                    response.posts = [];
                }

                if (stubServiceClient.blogPosts.callCount > 1) {
                    response.posts = [];
                }

                return timedPromise(response);
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
    });

    describe("constructor", function () {
        it("should build a `TumblrSource` instance (including the default `tumblr` client)", function () {
            const tumblrSource = new TumblrSource(null, stubCacheClient);

            expect(TumblrSource.type).to.eql("tumblr");
            expect(tumblrSource.client).to.be.instanceof(tumblr.Client);
            expect(tumblrSource.cacheClient).to.eql(stubCacheClient);
            expect(tumblrSource.initializing).to.be.instanceOf(Promise);
            expect(tumblrSource).to.be.instanceOf(TumblrSource);
        });

        it("should build a `TumblrSource` instance (with stubbed client)", function () {
            const tumblrSource = new TumblrSource(stubServiceClient, stubCacheClient);

            expect(TumblrSource.type).to.eql("tumblr");
            expect(tumblrSource.client).to.eql(stubServiceClient);
            expect(tumblrSource.cacheClient).to.eql(stubCacheClient);
            expect(tumblrSource.initializing).to.be.instanceOf(Promise);
            expect(tumblrSource).to.be.instanceOf(TumblrSource);
        });
    });

    describe("isEnabled", function () {
        it("`isEnabled` if `process.env.TUMBLR_API_KEY` and `process.env.TUMBLR_API_SECRET` are defined", function () {
            const tumblrSource = new TumblrSource(stubServiceClient, stubCacheClient);
            expect(tumblrSource.isEnabled).to.eql(true);
        });

        it("`!isEnabled` if `process.env.TUMBLR_API_KEY` is not defined", function () {
            delete process.env.TUMBLR_API_KEY;
            const tumblrSource = new TumblrSource(stubServiceClient, stubCacheClient);
            expect(tumblrSource.isEnabled).to.eql(false);
        });

        it("`!isEnabled` if `process.env.TUMBLR_API_SECRET` is not defined", function () {
            delete process.env.TUMBLR_API_SECRET;
            const tumblrSource = new TumblrSource(stubServiceClient, stubCacheClient);
            expect(tumblrSource.isEnabled).to.eql(false);
        });
    });

    describe("#postsGetter", function () {
        it("passes `serviceClient` the expected parameters", function () {
            const tumblrSource = new TumblrSource(stubServiceClient, stubCacheClient);
            const stubParams = SearchParams.fromJS({perPage: 30, page: 2, type: Photo.type});

            return tumblrSource.postsGetter(stubParams)
                .then(posts => {
                    expect(posts).to.be.instanceof(Array);
                    posts.map(post => {
                        expect(post).to.be.ok;

                        switch (post.type) {
                            case Gallery.type:
                                expect(post).to.be.instanceof(Gallery);
                                break;

                            case Photo.type:
                                expect(post).to.be.instanceof(Photo);
                                break;

                            default:
                            case Post.type:
                                expect(post).to.be.instanceof(Post);
                                break;
                        }
                    });
                    sinon.assert.calledOnce(stubServiceClient.blogPosts);
                    sinon.assert.calledWith(stubServiceClient.blogPosts, process.env.TUMBLR_USER_NAME, sinon.match({
                        type: "photo",
                        page: stubParams.page,
                        limit: 20,
                        offset: 20 * (stubParams.page - 1)
                    }));
                });
        });

        it("finds no posts", function () {
            const tumblrSource = new TumblrSource(stubServiceClient, stubCacheClient);
            const stubParams = SearchParams.fromJS({perPage: 17, type: Photo.type});

            return tumblrSource.postsGetter(stubParams)
                .then(posts => {
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

    describe("#allPostsGetter", function () {
        it("finds all posts", function () {
            const tumblrSource = new TumblrSource(stubServiceClient, stubCacheClient);
            const stubParams = SearchParams.fromJS({perPage: 7});

            return tumblrSource.allPostsGetter(stubParams)
                .then(posts => {
                    expect(posts).to.be.instanceof(Array);
                    expect(posts).to.have.length(stubPosts.length);
                    sinon.assert.calledTwice(stubServiceClient.blogPosts);
                    sinon.assert.calledWith(stubServiceClient.blogPosts, process.env.TUMBLR_USER_NAME, sinon.match({
                        limit: stubParams.perPage
                    }));
                });
        });
    });

    describe("#postGetter", function () {
        it("passes `serviceClient` the expected parameters", function () {
            const tumblrSource = new TumblrSource(stubServiceClient, stubCacheClient);

            return tumblrSource.postGetter(stubPost.id, SearchParams.fromJS())
                .then(post => {
                    expect(post).to.be.ok;

                    switch (post.type) {
                        case Gallery.type:
                            expect(post).to.be.instanceof(Gallery);
                            break;

                        case Photo.type:
                            expect(post).to.be.instanceof(Photo);
                            break;

                        default:
                        case Post.type:
                            expect(post).to.be.instanceof(Post);
                            break;
                    }

                    sinon.assert.calledOnce(stubServiceClient.blogPosts);
                    sinon.assert.calledWith(stubServiceClient.blogPosts, process.env.TUMBLR_USER_NAME, sinon.match({
                        id: stubPost.id
                    }));
                });
        });

        it("finds no post", function () {
            const tumblrSource = new TumblrSource(stubServiceClient, stubCacheClient);

            return tumblrSource.postGetter("foo", SearchParams.fromJS())
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
