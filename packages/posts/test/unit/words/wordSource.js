import {Post} from "@randy.tarampi/js";
import {expect} from "chai";
import sinon from "sinon";
import WordSource from "../../../words/wordSource";
import dummyClassesGenerator from "../../lib/dummyClassesGenerator";
import {timedPromise} from "../../lib/util";

describe("WordSource", function () {
    let stubType;
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

    beforeEach(function () {
        stubType = "ʕ•ᴥ•ʔ";
        stubServiceClient = {"ʕ•ᴥ•ʔ": "ʕ•ᴥ•ʔ"};

        stubPost = Post.fromJSON({id: "woof"});
        stubPosts = [stubPost, Post.fromJSON({id: "meow"}), Post.fromJSON({id: "grr"})];

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

        stubJsonToPost = sinon.stub().callsFake(Post.fromJSON);

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
        it("should build a `WordSource` instance", function () {
            const wordSource = new WordSource(stubType, stubServiceClient, stubCacheClient);

            expect(wordSource.type).to.eql(stubType);
            expect(wordSource.client).to.eql(stubServiceClient);
            expect(wordSource.cacheClient).to.eql(stubCacheClient);
            expect(wordSource.initializing).to.be.instanceOf(Promise);
            expect(wordSource).to.be.instanceOf(WordSource);
        });
    });

    describe("#postsGetter", function () {
        it("should throw a `Please specify an actual postsGetter implementation` error", function () {
            const wordSource = new WordSource(stubType, stubServiceClient, stubCacheClient);

            return wordSource.postsGetter()
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
            const wordSource = new WordSource(stubType, stubServiceClient, stubCacheClient);

            return wordSource.postGetter()
                .then(() => {
                    throw new Error("Wtf? This should've thrown");
                })
                .catch((error) => {
                    expect(error.message).to.match(/Please specify an actual postGetter implementation/);
                });
        });
    });

    describe("#cachedPostsGetter", function () {
        it("delegates to `this.cacheClient.getPosts`", function () {
            const wordSource = new WordSource(stubType, stubServiceClient, stubCacheClient);

            return wordSource.cachedPostsGetter()
                .then(cachedPosts => {
                    expect(cachedPosts).to.be.ok;
                    expect(cachedPosts).to.eql(stubPosts);
                    expect(stubGetPosts.calledOnce).to.eql(true);
                    sinon.assert.calledWith(stubGetPosts, {
                        hash: {type: {eq: "Post"}},
                        options: {indexName: "type-source-index"},
                        range: {source: {eq: "ʕ•ᴥ•ʔ"}}
                    });
                });
        });
    });

    describe("#cachedPostGetter", function () {
        it("delegates to `this.cacheClient.getPost`", function () {
            const wordSource = new WordSource(stubPost.source, stubServiceClient, stubCacheClient);

            return wordSource.cachedPostGetter(stubPost.id)
                .then(cachedPost => {
                    expect(cachedPost).to.be.ok;
                    expect(cachedPost).to.eql(stubPost);
                    expect(stubGetPost.calledOnce).to.eql(true);
                    sinon.assert.calledWith(stubGetPost, {
                        uid: {eq: stubPost.uid}
                    });
                });
        });
    });
});
