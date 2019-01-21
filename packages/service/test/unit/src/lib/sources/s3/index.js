import {Post} from "@randy.tarampi/js";
import {expect} from "chai";
import {DateTime} from "luxon";
import sinon from "sinon";
import PostSearchParams from "../../../../../../src/lib/postSearchParams";
import S3Source from "../../../../../../src/lib/sources/s3";
import {XRayedAwsSdk} from "../../../../../../src/lib/util";
import dummyClassesGenerator from "../../../../../lib/dummyClassesGenerator";
import {timedPromise} from "../../../../../lib/util";

describe("S3Source", function () {
    let stubServiceClient;
    let stubPost;
    let stubPosts;
    let stubBeforeRecordsGetter;
    let stubRecordsGetter;
    let stubAfterRecordsGetter;
    let stubAllRecordsGetter;
    let stubBeforeRecordGetter;
    let stubRecordGetter;
    let stubAfterRecordGetter;
    let stubBeforeCachedRecordsGetter;
    let stubCachedRecordsGetter;
    let stubAfterCachedRecordsGetter;
    let stubAllCachedRecordsGetter;
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

    let s3Post;
    let s3Posts;

    beforeEach(function () {
        process.env.SERVICE_POSTS_S3_BUCKET_NAME = "SERVICE_POSTS_S3_BUCKET_NAME";

        s3Post = {
            id: "woof.yaml",
            date: DateTime.utc().toISO(),
            title: "ʕ•ᴥ•ʔ",
            Body: "<p>Woof woof woof</p>",
            lat: 49.2845,
            long: -123.1116,
            geohash: "c2b2qebz5b9w"
        };
        s3Post.raw = s3Post;
        stubPost = Post.fromJSON(s3Post);
        stubPosts = [
            stubPost,
            Post.fromJSON({...s3Post, id: "meow.yaml"}),
            Post.fromJSON({...s3Post, id: "grr.yaml"})
        ];
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

        stubBeforeRecordsGetter = sinon.stub().callsFake(params => timedPromise(params));
        stubRecordsGetter = sinon.stub().callsFake(params => timedPromise(stubPosts)); // eslint-disable-line no-unused-vars
        stubAfterRecordsGetter = sinon.stub().callsFake((posts, params) => timedPromise(posts)); // eslint-disable-line no-unused-vars

        stubAllRecordsGetter = sinon.stub().callsFake(params => timedPromise(stubPosts)); // eslint-disable-line no-unused-vars

        stubBeforeRecordGetter = sinon.stub().callsFake((postId, params) => timedPromise(params));
        stubRecordGetter = sinon.stub().callsFake((postId, params) => timedPromise(stubPosts.find(post => post.id === postId) || null)); // eslint-disable-line no-unused-vars
        stubAfterRecordGetter = sinon.stub().callsFake((post, params) => timedPromise(post)); // eslint-disable-line no-unused-vars

        stubBeforeCachedRecordsGetter = sinon.stub().callsFake(params => timedPromise(params));
        stubCachedRecordsGetter = sinon.stub().callsFake(params => timedPromise(stubPosts)); // eslint-disable-line no-unused-vars
        stubAfterCachedRecordsGetter = sinon.stub().callsFake((posts, params) => timedPromise(posts)); // eslint-disable-line no-unused-vars

        stubAllCachedRecordsGetter = sinon.stub().callsFake(params => timedPromise(stubPosts)); // eslint-disable-line no-unused-vars

        stubBeforeCachedRecordGetter = sinon.stub().callsFake((postId, params) => timedPromise(params));
        stubCachedRecordGetter = sinon.stub().callsFake((postId, params) => timedPromise(stubPosts.find(post => post.id === postId) || null)); // eslint-disable-line no-unused-vars
        stubAfterCachedRecordGetter = sinon.stub().callsFake((post, params) => timedPromise(post)); // eslint-disable-line no-unused-vars

        stubInstanceToRecord = sinon.stub().callsFake(Post.fromJSON);

        stubCreateRecords = sinon.stub().callsFake(posts => timedPromise(posts));
        stubGetRecords = sinon.stub().callsFake(params => timedPromise(stubPosts)); // eslint-disable-line no-unused-vars

        stubCreateRecord = sinon.stub().callsFake(post => timedPromise(post));
        stubGetRecord = sinon.stub().callsFake(params => timedPromise(stubPost)); // eslint-disable-line no-unused-vars

        dummyClassBuilderArguments = {
            stubBeforeRecordsGetter,
            stubRecordsGetter,
            stubAfterRecordsGetter,

            stubAllRecordsGetter,

            stubBeforeRecordGetter,
            stubRecordGetter,
            stubAfterRecordGetter,

            stubBeforeCachedRecordsGetter,
            stubCachedRecordsGetter,
            stubAfterCachedRecordsGetter,

            stubAllCachedRecordsGetter,

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

        stubCacheClient = new DummyCacheClient();
    });

    describe("constructor", function () {
        it("should build a `S3Source` instance (including the default `XRayedAwsSdk.S3` client)", function () {
            const s3Source = new S3Source(null, stubCacheClient);

            expect(S3Source.type).to.eql("s3");
            expect(s3Source.client).to.be.instanceof(XRayedAwsSdk.S3);
            expect(s3Source.cacheClient).to.eql(stubCacheClient);
            expect(s3Source.initializing).to.be.instanceOf(Promise);
            expect(s3Source).to.be.instanceOf(S3Source);
        });

        it("should build a `S3Source` instance (with stubbed client)", function () {
            const s3Source = new S3Source(stubServiceClient, stubCacheClient);

            expect(S3Source.type).to.eql("s3");
            expect(s3Source.client).to.eql(stubServiceClient);
            expect(s3Source.cacheClient).to.eql(stubCacheClient);
            expect(s3Source.initializing).to.be.instanceOf(Promise);
            expect(s3Source).to.be.instanceOf(S3Source);
        });
    });

    describe("isEnabled", function () {
        it("`isEnabled` if `process.env.SERVICE_POSTS_S3_BUCKET_NAME` is defined", function () {
            const s3Source = new S3Source(stubServiceClient, stubCacheClient);
            expect(s3Source.isEnabled).to.eql(true);
        });

        it("`!isEnabled` if `process.env.SERVICE_POSTS_S3_BUCKET_NAME` is not defined", function () {
            delete process.env.SERVICE_POSTS_S3_BUCKET_NAME;
            const s3Source = new S3Source(stubServiceClient, stubCacheClient);
            expect(s3Source.isEnabled).to.eql(false);
        });
    });

    describe("recordsGetter", function () {
        it("passes `serviceClient` the expected parameters", function () {
            const s3Source = new S3Source(stubServiceClient, stubCacheClient);
            const stubParams = PostSearchParams.fromJS({perPage: 30, page: 2});

            return s3Source.recordsGetter(stubParams)
                .then(posts => {
                    expect(posts).to.be.instanceof(Array);
                    posts.map(post => {
                        expect(post).to.be.instanceof(Post);
                    });
                    sinon.assert.calledOnce(stubServiceClient.listObjectsV2);
                    sinon.assert.calledWith(stubServiceClient.listObjectsV2, {
                        Bucket: process.env.SERVICE_POSTS_S3_BUCKET_NAME,
                        MaxKeys: stubParams.perPage
                    });
                });
        });

        it("finds all posts", function () {
            const s3Source = new S3Source(stubServiceClient, stubCacheClient);
            const stubParams = PostSearchParams.fromJS({perPage: 720});

            return s3Source.recordsGetter(stubParams)
                .then(posts => {
                    expect(posts).to.have.length(stubPosts.length + 1);
                    expect(posts).to.be.instanceof(Array);
                    posts.map(post => {
                        expect(post).to.be.instanceof(Post);
                    });
                    sinon.assert.calledTwice(stubServiceClient.listObjectsV2);
                    sinon.assert.calledWith(stubServiceClient.listObjectsV2, {
                        Bucket: process.env.SERVICE_POSTS_S3_BUCKET_NAME,
                        MaxKeys: stubParams.perPage
                    });
                    sinon.assert.calledWith(stubServiceClient.listObjectsV2, {
                        Bucket: process.env.SERVICE_POSTS_S3_BUCKET_NAME,
                        MaxKeys: stubParams.perPage,
                        ContinuationToken: "woof"
                    });
                });
        });

        it("finds no posts", function () {
            const s3Source = new S3Source(stubServiceClient, stubCacheClient);
            const stubParams = PostSearchParams.fromJS({perPage: 420});

            return s3Source.recordsGetter(stubParams)
                .then(posts => {
                    expect(posts).to.be.instanceof(Array);
                    expect(posts).to.be.empty;
                    sinon.assert.calledOnce(stubServiceClient.listObjectsV2);
                    sinon.assert.calledWith(stubServiceClient.listObjectsV2, {
                        Bucket: process.env.SERVICE_POSTS_S3_BUCKET_NAME,
                        MaxKeys: stubParams.perPage
                    });
                });
        });
    });

    describe("allRecordsGetter", function () {
        it("finds all posts", function () {
            const s3Source = new S3Source(stubServiceClient, stubCacheClient);
            const stubParams = PostSearchParams.fromJS({perPage: 720});

            return s3Source.allRecordsGetter(stubParams)
                .then(posts => {
                    expect(posts).to.have.length(stubPosts.length + 1);
                    expect(posts).to.be.instanceof(Array);
                    posts.map(post => {
                        expect(post).to.be.instanceof(Post);
                    });
                    sinon.assert.calledTwice(stubServiceClient.listObjectsV2);
                    sinon.assert.calledWith(stubServiceClient.listObjectsV2, {
                        Bucket: process.env.SERVICE_POSTS_S3_BUCKET_NAME,
                        MaxKeys: stubParams.perPage
                    });
                    sinon.assert.calledWith(stubServiceClient.listObjectsV2, {
                        Bucket: process.env.SERVICE_POSTS_S3_BUCKET_NAME,
                        MaxKeys: stubParams.perPage,
                        ContinuationToken: "woof"
                    });
                });
        });
    });

    describe("recordGetter", function () {
        it("passes `serviceClient` the expected parameters", function () {
            const s3Source = new S3Source(stubServiceClient, stubCacheClient);

            return s3Source.recordGetter(stubPost.id, PostSearchParams.fromJS())
                .then(post => {
                    expect(post).to.be.instanceof(Post);
                    sinon.assert.calledOnce(stubServiceClient.getObject);
                    sinon.assert.calledWith(stubServiceClient.getObject, {
                        Bucket: process.env.SERVICE_POSTS_S3_BUCKET_NAME,
                        Key: stubPost.id
                    });
                });
        });

        it("finds no post", function () {
            const s3Source = new S3Source(stubServiceClient, stubCacheClient);

            return s3Source.recordGetter("foo", PostSearchParams.fromJS())
                .then(post => {
                    expect(post).to.not.be.ok;
                    sinon.assert.calledOnce(stubServiceClient.getObject);
                    sinon.assert.calledWith(stubServiceClient.getObject, {
                        Bucket: process.env.SERVICE_POSTS_S3_BUCKET_NAME,
                        Key: "foo"
                    });
                });
        });
    });
});
