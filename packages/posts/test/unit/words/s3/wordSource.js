import {Post} from "@randy.tarampi/js";
import Aws from "aws-sdk";
import {expect} from "chai";
import {DateTime} from "luxon";
import sinon from "sinon";
import SearchParams from "../../../../lib/searchParams";
import S3WordSource from "../../../../words/s3/wordSource";
import dummyClassesGenerator from "../../../lib/dummyClassesGenerator";
import {timedPromise} from "../../../lib/util";

describe("S3WordSource", function () {
    let stubServiceClient;
    let stubPost;
    let stubPosts;
    let stubBeforePostsGetter;
    let stubPostsGetter;
    let stubAfterPostsGetter;
    let stubAllPostsGetter;
    let stubBeforePostGetter;
    let stubPostGetter;
    let stubAfterPostGetter;
    let stubBeforeCachedPostsGetter;
    let stubCachedPostsGetter;
    let stubAfterCachedPostsGetter;
    let stubAllCachedPostsGetter;
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

    let s3Post;
    let s3Posts;

    beforeEach(function () {
        process.env.S3_BUCKET_NAME = "S3_BUCKET_NAME";

        stubPost = Post.fromJSON({id: "woof.yaml"});
        stubPosts = [stubPost, Post.fromJSON({id: "meow.yaml"}), Post.fromJSON({id: "grr.yaml"})];

        s3Post = {
            id: stubPost.id,
            date: DateTime.utc().toISO(),
            title: "ʕ•ᴥ•ʔ",
            Body: "<p>Woof woof woof</p>"
        };
        s3Posts = stubPosts.map(stubPost => Object.assign({}, s3Post, {id: stubPost.id}));
        stubServiceClient = {
            listObjectsV2: sinon.stub().callsFake(function (options) {
                const response = {
                    Contents: s3Posts.map(s3Post => {
                        return {Key: s3Post.id};
                    }),
                    IsTruncated: false,
                    NextContinuationToken: null,
                };

                if (options.MaxKeys === 420) { // NOTE-RT: 420 is a sentinel value for an empty array
                    response.Contents = [];
                }

                if (options.MaxKeys === 720) { // NOTE-RT: 720 is a sentinel value for a paginated request
                    response.IsTruncated = true;
                    response.NextContinuationToken = "woof";

                    if (stubServiceClient.listObjectsV2.callCount > 1) {
                        response.IsTruncated = false;
                        response.NextContinuationToken = null;
                        response.Contents = [Object.assign({}, s3Post, {id: "roar.yaml"})];
                    }
                }

                this.promise = () => Promise.resolve(response);

                return this;
            }),
            getObject: sinon.stub().callsFake(function (options) {
                this.promise = () => Promise.resolve(s3Posts.find(s3Post => s3Post.id === options.Key));

                return this;
            })
        };

        stubBeforePostsGetter = sinon.stub().callsFake(params => timedPromise(params));
        stubPostsGetter = sinon.stub().callsFake(params => timedPromise(stubPosts)); // eslint-disable-line no-unused-vars
        stubAfterPostsGetter = sinon.stub().callsFake((posts, params) => timedPromise(posts)); // eslint-disable-line no-unused-vars

        stubAllPostsGetter = sinon.stub().callsFake(params => timedPromise(stubPosts)); // eslint-disable-line no-unused-vars

        stubBeforePostGetter = sinon.stub().callsFake((postId, params) => timedPromise(params));
        stubPostGetter = sinon.stub().callsFake((postId, params) => timedPromise(stubPosts.find(post => post.id === postId) || null)); // eslint-disable-line no-unused-vars
        stubAfterPostGetter = sinon.stub().callsFake((post, params) => timedPromise(post)); // eslint-disable-line no-unused-vars

        stubBeforeCachedPostsGetter = sinon.stub().callsFake(params => timedPromise(params));
        stubCachedPostsGetter = sinon.stub().callsFake(params => timedPromise(stubPosts)); // eslint-disable-line no-unused-vars
        stubAfterCachedPostsGetter = sinon.stub().callsFake((posts, params) => timedPromise(posts)); // eslint-disable-line no-unused-vars

        stubAllCachedPostsGetter = sinon.stub().callsFake(params => timedPromise(stubPosts)); // eslint-disable-line no-unused-vars

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

            stubAllPostsGetter,

            stubBeforePostGetter,
            stubPostGetter,
            stubAfterPostGetter,

            stubBeforeCachedPostsGetter,
            stubCachedPostsGetter,
            stubAfterCachedPostsGetter,

            stubAllCachedPostsGetter,

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

        stubCacheClient = new DummyCacheClient();
    });

    describe("constructor", function () {
        it("should build a `S3WordSource` instance (including the default `Aws.S3` client)", function () {
            const s3WordSource = new S3WordSource(null, stubCacheClient);

            expect(s3WordSource.type).to.eql("S3");
            expect(s3WordSource.client).to.be.instanceof(Aws.S3);
            expect(s3WordSource.cacheClient).to.eql(stubCacheClient);
            expect(s3WordSource.initializing).to.be.instanceOf(Promise);
            expect(s3WordSource).to.be.instanceOf(S3WordSource);
        });

        it("should build a `S3WordSource` instance (with stubbed client)", function () {
            const s3WordSource = new S3WordSource(stubServiceClient, stubCacheClient);

            expect(s3WordSource.type).to.eql("S3");
            expect(s3WordSource.client).to.eql(stubServiceClient);
            expect(s3WordSource.cacheClient).to.eql(stubCacheClient);
            expect(s3WordSource.initializing).to.be.instanceOf(Promise);
            expect(s3WordSource).to.be.instanceOf(S3WordSource);
        });
    });

    describe(".isEnabled", function () {
        it("`isEnabled` if `process.env.S3_BUCKET_NAME` is defined", function () {
            const s3WordSource = new S3WordSource(stubServiceClient, stubCacheClient);
            expect(s3WordSource.isEnabled).to.eql(true);
        });

        it("`!isEnabled` if `process.env.S3_BUCKET_NAME` is not defined", function () {
            delete process.env.S3_BUCKET_NAME;
            const s3WordSource = new S3WordSource(stubServiceClient, stubCacheClient);
            expect(s3WordSource.isEnabled).to.eql(false);
        });
    });

    describe("#postsGetter", function () {
        it("passes `serviceClient` the expected parameters", function () {
            const s3WordSource = new S3WordSource(stubServiceClient, stubCacheClient);
            const stubParams = SearchParams.fromJS({perPage: 30, page: 2});

            return s3WordSource.postsGetter(stubParams)
                .then(posts => {
                    expect(posts).to.be.ok;
                    expect(posts).to.be.instanceof(Array);
                    posts.map(post => {
                        expect(post).to.be.ok;
                        expect(post).to.be.instanceof(Post);
                    });
                    sinon.assert.calledOnce(stubServiceClient.listObjectsV2);
                    sinon.assert.calledWith(stubServiceClient.listObjectsV2, {
                        Bucket: process.env.S3_BUCKET_NAME,
                        MaxKeys: stubParams.perPage
                    });
                });
        });

        it("finds all posts", function () {
            const s3WordSource = new S3WordSource(stubServiceClient, stubCacheClient);
            const stubParams = SearchParams.fromJS({perPage: 720});

            return s3WordSource.postsGetter(stubParams)
                .then(posts => {
                    expect(posts).to.be.ok;
                    expect(posts).to.have.length(stubPosts.length + 1);
                    expect(posts).to.be.instanceof(Array);
                    posts.map(post => {
                        expect(post).to.be.ok;
                        expect(post).to.be.instanceof(Post);
                    });
                    sinon.assert.calledTwice(stubServiceClient.listObjectsV2);
                    sinon.assert.calledWith(stubServiceClient.listObjectsV2, {
                        Bucket: process.env.S3_BUCKET_NAME,
                        MaxKeys: stubParams.perPage
                    });
                    sinon.assert.calledWith(stubServiceClient.listObjectsV2, {
                        Bucket: process.env.S3_BUCKET_NAME,
                        MaxKeys: stubParams.perPage,
                        ContinuationToken: "woof"
                    });
                });
        });

        it("finds no posts", function () {
            const s3WordSource = new S3WordSource(stubServiceClient, stubCacheClient);
            const stubParams = SearchParams.fromJS({perPage: 420});

            return s3WordSource.postsGetter(stubParams)
                .then(posts => {
                    expect(posts).to.be.ok;
                    expect(posts).to.be.instanceof(Array);
                    expect(posts).to.be.empty;
                    sinon.assert.calledOnce(stubServiceClient.listObjectsV2);
                    sinon.assert.calledWith(stubServiceClient.listObjectsV2, {
                        Bucket: process.env.S3_BUCKET_NAME,
                        MaxKeys: stubParams.perPage
                    });
                });
        });
    });

    describe("#allPostsGetter", function () {
        it("finds all posts", function () {
            const s3WordSource = new S3WordSource(stubServiceClient, stubCacheClient);
            const stubParams = SearchParams.fromJS({perPage: 720});

            return s3WordSource.allPostsGetter(stubParams)
                .then(posts => {
                    expect(posts).to.be.ok;
                    expect(posts).to.have.length(stubPosts.length + 1);
                    expect(posts).to.be.instanceof(Array);
                    posts.map(post => {
                        expect(post).to.be.ok;
                        expect(post).to.be.instanceof(Post);
                    });
                    sinon.assert.calledTwice(stubServiceClient.listObjectsV2);
                    sinon.assert.calledWith(stubServiceClient.listObjectsV2, {
                        Bucket: process.env.S3_BUCKET_NAME,
                        MaxKeys: stubParams.perPage
                    });
                    sinon.assert.calledWith(stubServiceClient.listObjectsV2, {
                        Bucket: process.env.S3_BUCKET_NAME,
                        MaxKeys: stubParams.perPage,
                        ContinuationToken: "woof"
                    });
                });
        });
    });

    describe("#postGetter", function () {
        it("passes `serviceClient` the expected parameters", function () {
            const s3WordSource = new S3WordSource(stubServiceClient, stubCacheClient);

            return s3WordSource.postGetter(stubPost.id, SearchParams.fromJS())
                .then(post => {
                    expect(post).to.be.ok;
                    expect(post).to.be.instanceof(Post);
                    sinon.assert.calledOnce(stubServiceClient.getObject);
                    sinon.assert.calledWith(stubServiceClient.getObject, {
                        Bucket: process.env.S3_BUCKET_NAME,
                        Key: stubPost.id
                    });
                });
        });

        it("finds no post", function () {
            const s3WordSource = new S3WordSource(stubServiceClient, stubCacheClient);

            return s3WordSource.postGetter("foo", SearchParams.fromJS())
                .then(post => {
                    expect(post).to.not.be.ok;
                    sinon.assert.calledOnce(stubServiceClient.getObject);
                    sinon.assert.calledWith(stubServiceClient.getObject, {
                        Bucket: process.env.S3_BUCKET_NAME,
                        Key: "foo"
                    });
                });
        });
    });
});
