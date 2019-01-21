import {Photo, Post, POST_STATUS} from "@randy.tarampi/js";
import {expect} from "chai";
import sinon from "sinon";
import CachedDataSource from "../../../../src/lib/cachedDataSource";
import PostSearchParams from "../../../../src/lib/postSearchParams";
import dummyClassesGenerator from "../../../lib/dummyClassesGenerator";
import {timedPromise} from "../../../lib/util";

describe("CachedDataSource", function () {
    let stubType;
    let stubServiceClient;
    let stubPhoto;
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
    let DummyCachedDataSource;
    let DummyCacheClient;
    let stubCreateRecords;
    let stubGetRecords;
    let stubCreateRecord;
    let stubGetRecord;
    let DummyDataClient;
    let stubDataClient; // eslint-disable-line no-unused-vars
    let stubCacheClient;
    let builtDummyClasses;
    let dummyClassBuilderArguments;

    beforeEach(function () {
        stubType = "Tumblr";
        stubServiceClient = {"ʕ•ᴥ•ʔ": "ʕ•ᴥ•ʔ"};

        const stubRawPost = {id: "woof", source: stubType};
        const stubRawPhoto = {id: "meow", source: stubType};

        stubPost = Post.fromJSON({...stubRawPost, raw: stubRawPost});
        stubPhoto = Photo.fromJSON({...stubRawPhoto, raw: stubRawPhoto});
        stubPosts = [stubPost, stubPhoto];

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

        stubInstanceToRecord = sinon.stub().callsFake(postJson => postJson.id === stubPost.id ? Post.fromJSON(postJson) : Photo.fromJSON(postJson));

        stubCreateRecords = sinon.stub().callsFake(posts => timedPromise(posts));
        stubGetRecords = sinon.stub().callsFake(params => timedPromise(stubPosts)); // eslint-disable-line no-unused-vars

        stubCreateRecord = sinon.stub().callsFake(post => timedPromise(post));
        stubGetRecord = sinon.stub().callsFake(params => timedPromise(stubPost)); // eslint-disable-line no-unused-vars

        dummyClassBuilderArguments = {
            stubType,

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

        DummyCachedDataSource = builtDummyClasses.DummyCachedDataSource;
        DummyDataClient = builtDummyClasses.DummyDataClient;
        DummyCacheClient = builtDummyClasses.DummyCacheClient;

        stubDataClient = new DummyDataClient();
        stubCacheClient = new DummyCacheClient();
    });

    describe("constructor", function () {
        it("should build a `CachedDataSource` instance", function () {
            const cachedDataSource = new DummyCachedDataSource(stubServiceClient, stubCacheClient);

            expect(cachedDataSource.client).to.eql(stubServiceClient);
            expect(cachedDataSource).to.be.instanceOf(CachedDataSource);
        });
    });

    describe("beforeCachedRecordsGetter", function () {
        it("returns promised `searchParams`", function () {
            const stubSearchParams = {woof: true};
            const dataSource = new CachedDataSource();

            return dataSource.beforeCachedRecordsGetter(stubSearchParams)
                .then(searchParams => {
                    expect(searchParams).to.eql(stubSearchParams);
                });
        });
    });

    describe("cachedRecordsGetter", function () {
        it("delegates to `this.cacheClient.getRecords`", function () {
            delete dummyClassBuilderArguments.stubCachedRecordsGetter;
            builtDummyClasses = dummyClassesGenerator(dummyClassBuilderArguments);

            DummyCachedDataSource = builtDummyClasses.DummyCachedDataSource;
            DummyDataClient = builtDummyClasses.DummyDataClient;
            DummyCacheClient = builtDummyClasses.DummyCacheClient;

            stubDataClient = new DummyDataClient();
            stubCacheClient = new DummyCacheClient();

            const cachedDataSource = new DummyCachedDataSource(stubServiceClient, stubCacheClient);
            const stubSearchParams = PostSearchParams.fromJS({type: Photo.type, source: stubType});

            return cachedDataSource.cachedRecordsGetter(stubSearchParams)
                .then(cachedPosts => {
                    expect(cachedPosts).to.be.ok;
                    expect(
                        cachedPosts.map(cachedPost => cachedPost.toJS())
                    ).to.eql(
                        stubPosts.map(stubPost => stubPost.remove("raw").toJS())
                    );
                    expect(stubGetRecords.calledOnce).to.eql(true);
                    sinon.assert.calledWith(stubGetRecords, sinon.match({
                        _filter: {
                            status: POST_STATUS.visible,
                            source: stubType,
                            type: Photo.type
                        },
                        _options: {
                            limit: 100,
                            descending: true,
                            all: false,
                            indexName: "type-datePublished-index"
                        }
                    }));
                    sinon.assert.calledTwice(stubInstanceToRecord);
                });
        });
    });

    describe("afterCachedRecordsGetter", function () {
        it("returns promised `posts`", function () {
            const stubSearchParams = {woof: true};
            const stubPosts = [{meow: false}];
            const dataSource = new CachedDataSource();

            return dataSource.afterCachedRecordsGetter(stubPosts, stubSearchParams)
                .then(posts => {
                    expect(posts).to.eql(stubPosts);
                });
        });
    });

    describe("allCachedRecordsGetter", function () {
        it("delegates to `this.cacheClient.getRecords`", function () {
            delete dummyClassBuilderArguments.stubAllCachedRecordsGetter;
            builtDummyClasses = dummyClassesGenerator(dummyClassBuilderArguments);

            DummyCachedDataSource = builtDummyClasses.DummyCachedDataSource;
            DummyDataClient = builtDummyClasses.DummyDataClient;
            DummyCacheClient = builtDummyClasses.DummyCacheClient;

            stubDataClient = new DummyDataClient();
            stubCacheClient = new DummyCacheClient();

            const cachedDataSource = new DummyCachedDataSource(stubServiceClient, stubCacheClient);
            const stubSearchParams = PostSearchParams.fromJS({type: Photo.type, source: stubType});

            return cachedDataSource.allCachedRecordsGetter(stubSearchParams)
                .then(cachedPosts => {
                    expect(cachedPosts).to.be.ok;
                    expect(
                        cachedPosts.map(cachedPost => cachedPost.toJS())
                    ).to.eql(
                        stubPosts.map(stubPost => stubPost.remove("raw").toJS())
                    );
                    expect(stubGetRecords.calledOnce).to.eql(true);
                    sinon.assert.calledWith(stubGetRecords, sinon.match({
                        _filter: {
                            status: POST_STATUS.visible,
                            source: stubType,
                            type: Photo.type
                        },
                        _options: {
                            limit: 100,
                            descending: true,
                            all: true,
                            indexName: "type-datePublished-index"
                        }
                    }));
                });
        });
    });

    describe("getCachedRecords", function () {
        it("calls all hooks", async function () {
            const cachedDataSource = new DummyCachedDataSource(stubServiceClient, stubCacheClient);
            expect(cachedDataSource).to.be.instanceOf(DummyCachedDataSource);

            const stubParams = PostSearchParams.fromJS();
            const posts = await cachedDataSource.getCachedRecords(stubParams);

            expect(posts).to.eql(stubPosts);
            expect(stubBeforeCachedRecordsGetter.calledOnce).to.eql(true);
            expect(stubBeforeCachedRecordsGetter.calledWith(stubParams)).to.eql(true);
            expect(stubCachedRecordsGetter.calledOnce).to.eql(true);
            expect(stubCachedRecordsGetter.calledWith(stubParams)).to.eql(true);
            expect(stubAfterCachedRecordsGetter.calledOnce).to.eql(true);
            expect(stubAfterCachedRecordsGetter.calledWith(stubPosts, stubParams)).to.eql(true);
        });

        it("handles a cache miss", async function () {
            const cachedPosts = [];
            stubCachedRecordsGetter = sinon.stub().callsFake(() => timedPromise(cachedPosts));
            builtDummyClasses = dummyClassesGenerator({...dummyClassBuilderArguments, stubCachedRecordsGetter});
            DummyCachedDataSource = builtDummyClasses.DummyCachedDataSource;
            DummyCacheClient = builtDummyClasses.DummyCacheClient;
            stubCacheClient = new DummyCacheClient("handles a cache miss");

            const cachedDataSource = new DummyCachedDataSource(stubServiceClient, stubCacheClient);
            expect(cachedDataSource).to.be.instanceOf(DummyCachedDataSource);

            const stubParams = PostSearchParams.fromJS();
            const posts = await cachedDataSource.getCachedRecords(stubParams);

            expect(posts).to.not.be.ok;
            expect(posts).to.eql(null);
            expect(stubBeforeCachedRecordsGetter.calledOnce).to.eql(true);
            expect(stubBeforeCachedRecordsGetter.calledWith(stubParams)).to.eql(true);
            expect(stubCachedRecordsGetter.calledOnce).to.eql(true);
            expect(stubCachedRecordsGetter.calledWith(stubParams)).to.eql(true);
            expect(stubAfterCachedRecordsGetter.calledOnce).to.eql(true);
            expect(stubAfterCachedRecordsGetter.calledWith(cachedPosts, stubParams)).to.eql(true);
        });
    });

    describe("getAllCachedRecords", function () {
        it("calls all hooks", async function () {
            const cachedDataSource = new DummyCachedDataSource(stubServiceClient, stubCacheClient);
            expect(cachedDataSource).to.be.instanceOf(DummyCachedDataSource);

            const stubParams = PostSearchParams.fromJS();
            const posts = await cachedDataSource.getAllCachedRecords(stubParams);

            expect(posts).to.eql(stubPosts);
            expect(stubBeforeCachedRecordsGetter.calledOnce).to.eql(true);
            expect(stubBeforeCachedRecordsGetter.calledWith(stubParams)).to.eql(true);
            expect(stubAllCachedRecordsGetter.calledOnce).to.eql(true);
            expect(stubAllCachedRecordsGetter.calledWith(stubParams)).to.eql(true);
            expect(stubAfterCachedRecordsGetter.calledOnce).to.eql(true);
            expect(stubAfterCachedRecordsGetter.calledWith(stubPosts, stubParams)).to.eql(true);
        });

        it("handles a cache miss", async function () {
            const cachedPosts = [];
            stubAllCachedRecordsGetter = sinon.stub().callsFake(() => timedPromise(cachedPosts));
            builtDummyClasses = dummyClassesGenerator({...dummyClassBuilderArguments, stubAllCachedRecordsGetter});
            DummyCachedDataSource = builtDummyClasses.DummyCachedDataSource;
            DummyCacheClient = builtDummyClasses.DummyCacheClient;
            stubCacheClient = new DummyCacheClient("handles a cache miss");

            const cachedDataSource = new DummyCachedDataSource(stubServiceClient, stubCacheClient);
            expect(cachedDataSource).to.be.instanceOf(DummyCachedDataSource);

            const stubParams = PostSearchParams.fromJS();
            const posts = await cachedDataSource.getAllCachedRecords(stubParams);

            expect(posts).to.not.be.ok;
            expect(posts).to.eql(null);
            expect(stubBeforeCachedRecordsGetter.calledOnce).to.eql(true);
            expect(stubBeforeCachedRecordsGetter.calledWith(stubParams)).to.eql(true);
            expect(stubAllCachedRecordsGetter.calledOnce).to.eql(true);
            expect(stubAllCachedRecordsGetter.calledWith(stubParams)).to.eql(true);
            expect(stubAfterCachedRecordsGetter.calledOnce).to.eql(true);
            expect(stubAfterCachedRecordsGetter.calledWith(cachedPosts, stubParams)).to.eql(true);
        });
    });

    describe("getServiceRecords", function () {
        it("calls all hooks", async function () {
            const cachedDataSource = new DummyCachedDataSource(stubServiceClient, stubCacheClient);
            expect(cachedDataSource).to.be.instanceOf(DummyCachedDataSource);

            const stubParams = PostSearchParams.fromJS();
            const posts = await cachedDataSource.getServiceRecords(stubParams);

            expect(posts).to.eql(stubPosts);
            expect(stubBeforeRecordsGetter.calledOnce).to.eql(true);
            expect(stubBeforeRecordsGetter.calledWith(stubParams)).to.eql(true);
            expect(stubRecordsGetter.calledOnce).to.eql(true);
            expect(stubRecordsGetter.calledWith(stubParams)).to.eql(true);
            expect(stubAfterRecordsGetter.calledOnce).to.eql(true);
            expect(stubAfterRecordsGetter.calledWith(stubPosts, stubParams)).to.eql(true);
            expect(stubCreateRecords.calledOnce).to.eql(true);
            expect(stubCreateRecords.calledWith(stubPosts)).to.eql(true);
        });

        it("handles not finding any posts", async function () {
            const cachedPosts = [];
            stubRecordsGetter = sinon.stub().callsFake(() => timedPromise(cachedPosts));
            builtDummyClasses = dummyClassesGenerator({...dummyClassBuilderArguments, stubRecordsGetter});
            DummyCachedDataSource = builtDummyClasses.DummyCachedDataSource;
            DummyCacheClient = builtDummyClasses.DummyCacheClient;
            stubCacheClient = new DummyCacheClient("handles not finding any posts");

            const cachedDataSource = new DummyCachedDataSource(stubServiceClient, stubCacheClient);
            expect(cachedDataSource).to.be.instanceOf(DummyCachedDataSource);

            const stubParams = PostSearchParams.fromJS();
            const posts = await cachedDataSource.getServiceRecords(stubParams);

            expect(posts).to.be.empty;
            expect(stubBeforeRecordsGetter.calledOnce).to.eql(true);
            expect(stubBeforeRecordsGetter.calledWith(stubParams)).to.eql(true);
            expect(stubRecordsGetter.calledOnce).to.eql(true);
            expect(stubRecordsGetter.calledWith(stubParams)).to.eql(true);
            expect(stubAfterRecordsGetter.calledOnce).to.eql(true);
            expect(stubAfterRecordsGetter.calledWith([], stubParams)).to.eql(true);
            expect(stubCreateRecords.notCalled).to.eql(true);
        });
    });

    describe("getAllServiceRecords", function () {
        it("calls all hooks", async function () {
            const cachedDataSource = new DummyCachedDataSource(stubServiceClient, stubCacheClient);
            expect(cachedDataSource).to.be.instanceOf(DummyCachedDataSource);

            const stubParams = PostSearchParams.fromJS();
            const posts = await cachedDataSource.getAllServiceRecords(stubParams);

            expect(posts).to.eql(stubPosts);
            expect(stubBeforeRecordsGetter.calledOnce).to.eql(true);
            expect(stubBeforeRecordsGetter.calledWith(stubParams)).to.eql(true);
            expect(stubAllRecordsGetter.calledOnce).to.eql(true);
            expect(stubAllRecordsGetter.calledWith(stubParams)).to.eql(true);
            expect(stubAfterRecordsGetter.calledOnce).to.eql(true);
            expect(stubAfterRecordsGetter.calledWith(stubPosts, stubParams)).to.eql(true);
            expect(stubCreateRecords.calledOnce).to.eql(true);
            expect(stubCreateRecords.calledWith(stubPosts)).to.eql(true);
        });

        it("handles not finding any posts", async function () {
            const cachedPosts = [];
            stubAllRecordsGetter = sinon.stub().callsFake(() => timedPromise(cachedPosts));
            builtDummyClasses = dummyClassesGenerator({...dummyClassBuilderArguments, stubAllRecordsGetter});
            DummyCachedDataSource = builtDummyClasses.DummyCachedDataSource;
            DummyCacheClient = builtDummyClasses.DummyCacheClient;
            stubCacheClient = new DummyCacheClient("handles not finding any posts");

            const cachedDataSource = new DummyCachedDataSource(stubServiceClient, stubCacheClient);
            expect(cachedDataSource).to.be.instanceOf(DummyCachedDataSource);

            const stubParams = PostSearchParams.fromJS();
            const posts = await cachedDataSource.getAllServiceRecords(stubParams);

            expect(posts).to.be.empty;
            expect(stubBeforeRecordsGetter.calledOnce).to.eql(true);
            expect(stubBeforeRecordsGetter.calledWith(stubParams)).to.eql(true);
            expect(stubAllRecordsGetter.calledOnce).to.eql(true);
            expect(stubAllRecordsGetter.calledWith(stubParams)).to.eql(true);
            expect(stubAfterRecordsGetter.calledOnce).to.eql(true);
            expect(stubAfterRecordsGetter.calledWith([], stubParams)).to.eql(true);
            expect(stubCreateRecords.notCalled).to.eql(true);
        });
    });

    describe("getRecords", function () {
        it("calls only the cache hooks on a cache hit", async function () {
            const cachedDataSource = new DummyCachedDataSource(stubServiceClient, stubCacheClient);
            expect(cachedDataSource).to.be.instanceOf(DummyCachedDataSource);

            const stubParams = PostSearchParams.fromJS();
            const posts = await cachedDataSource.getRecords(stubParams);

            expect(posts).to.eql(stubPosts);
            expect(stubBeforeRecordsGetter.notCalled).to.eql(true);
            expect(stubRecordsGetter.notCalled).to.eql(true);
            expect(stubAfterRecordsGetter.notCalled).to.eql(true);
            expect(stubBeforeCachedRecordsGetter.calledOnce).to.eql(true);
            expect(stubBeforeCachedRecordsGetter.calledWith(stubParams)).to.eql(true);
            expect(stubCachedRecordsGetter.calledOnce).to.eql(true);
            expect(stubCachedRecordsGetter.calledWith(stubParams)).to.eql(true);
            expect(stubAfterCachedRecordsGetter.calledOnce).to.eql(true);
            expect(stubAfterCachedRecordsGetter.calledWith(stubPosts, stubParams)).to.eql(true);
            expect(stubCreateRecords.notCalled).to.eql(true);
        });

        it("calls all hooks on a cache miss", async function () {
            const cachedPosts = [];
            stubCachedRecordsGetter = sinon.stub().callsFake(() => timedPromise(cachedPosts));
            builtDummyClasses = dummyClassesGenerator({...dummyClassBuilderArguments, stubCachedRecordsGetter});
            DummyCachedDataSource = builtDummyClasses.DummyCachedDataSource;
            DummyCacheClient = builtDummyClasses.DummyCacheClient;
            stubCacheClient = new DummyCacheClient("handles a cache miss");

            const cachedDataSource = new DummyCachedDataSource(stubServiceClient, stubCacheClient);
            expect(cachedDataSource).to.be.instanceOf(DummyCachedDataSource);

            const stubParams = PostSearchParams.fromJS();
            const posts = await cachedDataSource.getRecords(stubParams);

            expect(posts).to.eql(stubPosts);
            expect(stubBeforeRecordsGetter.calledOnce).to.eql(true);
            expect(stubBeforeRecordsGetter.calledWith(stubParams)).to.eql(true);
            expect(stubRecordsGetter.calledOnce).to.eql(true);
            expect(stubRecordsGetter.calledWith(stubParams)).to.eql(true);
            expect(stubAfterRecordsGetter.calledOnce).to.eql(true);
            expect(stubAfterRecordsGetter.calledWith(stubPosts, stubParams)).to.eql(true);
            expect(stubBeforeCachedRecordsGetter.calledOnce).to.eql(true);
            expect(stubBeforeCachedRecordsGetter.calledWith(stubParams)).to.eql(true);
            expect(stubCachedRecordsGetter.calledOnce).to.eql(true);
            expect(stubCachedRecordsGetter.calledWith(stubParams)).to.eql(true);
            expect(stubAfterCachedRecordsGetter.calledOnce).to.eql(true);
            expect(stubAfterCachedRecordsGetter.calledWith(cachedPosts, stubParams)).to.eql(true);
            expect(stubCreateRecords.calledOnce).to.eql(true);
            expect(stubCreateRecords.calledWith(stubPosts)).to.eql(true);
        });
    });

    describe("getAllRecords", function () {
        it("calls only the cache hooks on a cache hit", async function () {
            const cachedDataSource = new DummyCachedDataSource(stubServiceClient, stubCacheClient);
            expect(cachedDataSource).to.be.instanceOf(DummyCachedDataSource);

            const stubParams = PostSearchParams.fromJS();
            const posts = await cachedDataSource.getAllRecords(stubParams);

            expect(posts).to.eql(stubPosts);
            expect(stubBeforeRecordsGetter.notCalled).to.eql(true);
            expect(stubAllRecordsGetter.notCalled).to.eql(true);
            expect(stubAfterRecordsGetter.notCalled).to.eql(true);
            expect(stubBeforeCachedRecordsGetter.calledOnce).to.eql(true);
            expect(stubBeforeCachedRecordsGetter.calledWith(stubParams)).to.eql(true);
            expect(stubAllCachedRecordsGetter.calledOnce).to.eql(true);
            expect(stubAllCachedRecordsGetter.calledWith(stubParams)).to.eql(true);
            expect(stubAfterCachedRecordsGetter.calledOnce).to.eql(true);
            expect(stubAfterCachedRecordsGetter.calledWith(stubPosts, stubParams)).to.eql(true);
            expect(stubCreateRecords.notCalled).to.eql(true);
        });

        it("calls all hooks on a cache miss", async function () {
            const cachedPosts = [];
            stubAllCachedRecordsGetter = sinon.stub().callsFake(() => timedPromise(cachedPosts));
            builtDummyClasses = dummyClassesGenerator({...dummyClassBuilderArguments, stubAllCachedRecordsGetter});
            DummyCachedDataSource = builtDummyClasses.DummyCachedDataSource;
            DummyCacheClient = builtDummyClasses.DummyCacheClient;
            stubCacheClient = new DummyCacheClient("handles a cache miss");

            const cachedDataSource = new DummyCachedDataSource(stubServiceClient, stubCacheClient);
            expect(cachedDataSource).to.be.instanceOf(DummyCachedDataSource);

            const stubParams = PostSearchParams.fromJS();
            const posts = await cachedDataSource.getAllRecords(stubParams);

            expect(posts).to.eql(stubPosts);
            expect(stubBeforeRecordsGetter.calledOnce).to.eql(true);
            expect(stubBeforeRecordsGetter.calledWith(stubParams)).to.eql(true);
            expect(stubAllRecordsGetter.calledOnce).to.eql(true);
            expect(stubAllRecordsGetter.calledWith(stubParams)).to.eql(true);
            expect(stubAfterRecordsGetter.calledOnce).to.eql(true);
            expect(stubAfterRecordsGetter.calledWith(stubPosts, stubParams)).to.eql(true);
            expect(stubBeforeCachedRecordsGetter.calledOnce).to.eql(true);
            expect(stubBeforeCachedRecordsGetter.calledWith(stubParams)).to.eql(true);
            expect(stubAllCachedRecordsGetter.calledOnce).to.eql(true);
            expect(stubAllCachedRecordsGetter.calledWith(stubParams)).to.eql(true);
            expect(stubAfterCachedRecordsGetter.calledOnce).to.eql(true);
            expect(stubAfterCachedRecordsGetter.calledWith(cachedPosts, stubParams)).to.eql(true);
            expect(stubCreateRecords.calledOnce).to.eql(true);
            expect(stubCreateRecords.calledWith(stubPosts)).to.eql(true);
        });
    });

    describe("cachedRecordGetter", function () {
        it("delegates to `this.cacheClient.getRecord` (no params)", function () {
            delete dummyClassBuilderArguments.stubCachedRecordGetter;
            builtDummyClasses = dummyClassesGenerator(dummyClassBuilderArguments);

            DummyCachedDataSource = builtDummyClasses.DummyCachedDataSource;
            DummyDataClient = builtDummyClasses.DummyDataClient;
            DummyCacheClient = builtDummyClasses.DummyCacheClient;

            stubDataClient = new DummyDataClient();
            stubCacheClient = new DummyCacheClient();

            const cachedDataSource = new DummyCachedDataSource(stubServiceClient, stubCacheClient);

            return cachedDataSource.cachedRecordGetter(stubPost.id)
                .then(cachedPost => {
                    expect(cachedPost.toJS()).to.eql(stubPost.remove("raw").toJS());
                    expect(stubGetRecord.calledOnce).to.eql(true);
                    sinon.assert.calledWith(stubGetRecord, sinon.match({
                        _query: {hash: {uid: {eq: stubPost.uid}}},
                        _options: {limit: 100, descending: true, all: false, indexName: "uid-index"}
                    }));
                    sinon.assert.calledOnce(stubInstanceToRecord);
                });
        });

        it("delegates to `this.cacheClient.getRecord` (with params)", function () {
            delete dummyClassBuilderArguments.stubCachedRecordGetter;
            builtDummyClasses = dummyClassesGenerator(dummyClassBuilderArguments);

            DummyCachedDataSource = builtDummyClasses.DummyCachedDataSource;
            DummyDataClient = builtDummyClasses.DummyDataClient;
            DummyCacheClient = builtDummyClasses.DummyCacheClient;

            stubDataClient = new DummyDataClient();
            stubCacheClient = new DummyCacheClient();

            const cachedDataSource = new DummyCachedDataSource(stubServiceClient, stubCacheClient);
            const stubSearchParams = PostSearchParams.fromJS();

            return cachedDataSource.cachedRecordGetter(stubPost.id, stubSearchParams)
                .then(cachedPost => {
                    expect(cachedPost.toJS()).to.eql(stubPost.remove("raw").toJS());
                    expect(stubGetRecord.calledOnce).to.eql(true);
                    sinon.assert.calledWith(stubGetRecord, sinon.match({
                        _query: {hash: {uid: {eq: stubPost.uid}}},
                        _options: {limit: 100, descending: true, all: false, indexName: "uid-index"}
                    }));
                    sinon.assert.calledOnce(stubInstanceToRecord);
                });
        });
    });

    describe("getCachedRecord", function () {
        it("calls all hooks", async function () {
            const cachedDataSource = new DummyCachedDataSource(stubServiceClient, stubCacheClient);
            expect(cachedDataSource).to.be.instanceOf(DummyCachedDataSource);

            const stubParams = PostSearchParams.fromJS();
            const post = await cachedDataSource.getCachedRecord(stubPost.id, stubParams);

            expect(post).to.eql(stubPost);
            expect(stubBeforeCachedRecordGetter.calledOnce).to.eql(true);
            expect(stubBeforeCachedRecordGetter.calledWith(stubPost.id, stubParams)).to.eql(true);
            expect(stubCachedRecordGetter.calledOnce).to.eql(true);
            expect(stubCachedRecordGetter.calledWith(stubPost.id, stubParams)).to.eql(true);
            expect(stubAfterCachedRecordGetter.calledOnce).to.eql(true);
            expect(stubAfterCachedRecordGetter.calledWith(stubPost, stubParams)).to.eql(true);
        });

        it("handles a cache miss", async function () {
            const cachedPost = null;
            stubCachedRecordGetter = sinon.stub().callsFake(() => timedPromise(cachedPost));
            builtDummyClasses = dummyClassesGenerator({...dummyClassBuilderArguments, stubCachedRecordGetter});
            DummyCachedDataSource = builtDummyClasses.DummyCachedDataSource;
            DummyCacheClient = builtDummyClasses.DummyCacheClient;
            stubCacheClient = new DummyCacheClient("handles a cache miss");

            const cachedDataSource = new DummyCachedDataSource(stubServiceClient, stubCacheClient);
            expect(cachedDataSource).to.be.instanceOf(DummyCachedDataSource);

            const stubParams = PostSearchParams.fromJS();
            const post = await cachedDataSource.getCachedRecord(stubPost.id, stubParams);

            expect(post).to.not.be.ok;
            expect(post).to.eql(null);
            expect(stubBeforeCachedRecordGetter.calledOnce).to.eql(true);
            expect(stubBeforeCachedRecordGetter.calledWith(stubPost.id, stubParams)).to.eql(true);
            expect(stubCachedRecordGetter.calledOnce).to.eql(true);
            expect(stubCachedRecordGetter.calledWith(stubPost.id, stubParams)).to.eql(true);
            expect(stubAfterCachedRecordGetter.calledOnce).to.eql(true);
            expect(stubAfterCachedRecordGetter.calledWith(cachedPost, stubParams)).to.eql(true);
        });
    });

    describe("getServiceRecord", function () {
        it("calls all hooks", async function () {
            const cachedDataSource = new DummyCachedDataSource(stubServiceClient, stubCacheClient);
            expect(cachedDataSource).to.be.instanceOf(DummyCachedDataSource);

            const stubParams = PostSearchParams.fromJS();
            const post = await cachedDataSource.getServiceRecord(stubPost.id, stubParams);

            expect(post).to.eql(stubPost);
            expect(stubBeforeRecordGetter.calledOnce).to.eql(true);
            expect(stubBeforeRecordGetter.calledWith(stubPost.id, stubParams)).to.eql(true);
            expect(stubRecordGetter.calledOnce).to.eql(true);
            expect(stubRecordGetter.calledWith(stubPost.id, stubParams)).to.eql(true);
            expect(stubAfterRecordGetter.calledOnce).to.eql(true);
            expect(stubAfterRecordGetter.calledWith(stubPost, stubParams)).to.eql(true);
            expect(stubCreateRecord.calledOnce).to.eql(true);
            expect(stubCreateRecord.calledWith(stubPost)).to.eql(true);
        });

        it("handles not finding a post at all", async function () {
            const cachedDataSource = new DummyCachedDataSource(stubServiceClient, stubCacheClient);
            expect(cachedDataSource).to.be.instanceOf(DummyCachedDataSource);

            const stubParams = PostSearchParams.fromJS();
            const stubMissPostId = "ಠ_ಠ";
            const post = await cachedDataSource.getServiceRecord(stubMissPostId, stubParams);

            expect(post).to.not.be.ok;
            expect(stubBeforeRecordGetter.calledOnce).to.eql(true);
            expect(stubBeforeRecordGetter.calledWith(stubMissPostId, stubParams)).to.eql(true);
            expect(stubRecordGetter.calledOnce).to.eql(true);
            expect(stubRecordGetter.calledWith(stubMissPostId, stubParams)).to.eql(true);
            expect(stubAfterRecordGetter.calledOnce).to.eql(true);
            expect(stubAfterRecordGetter.calledWith(null, stubParams)).to.eql(true);
            expect(stubCreateRecord.notCalled).to.eql(true);
        });
    });

    describe("getRecord", function () {
        it("calls only the cache hooks on a cache hit", async function () {
            const cachedDataSource = new DummyCachedDataSource(stubServiceClient, stubCacheClient);
            expect(cachedDataSource).to.be.instanceOf(DummyCachedDataSource);

            const stubParams = PostSearchParams.fromJS();
            const post = await cachedDataSource.getRecord(stubPost.id, stubParams);

            expect(post).to.eql(stubPost);
            expect(stubBeforeRecordGetter.notCalled).to.eql(true);
            expect(stubRecordGetter.notCalled).to.eql(true);
            expect(stubAfterRecordGetter.notCalled).to.eql(true);
            expect(stubBeforeCachedRecordGetter.calledOnce).to.eql(true);
            expect(stubBeforeCachedRecordGetter.calledWith(stubPost.id, stubParams)).to.eql(true);
            expect(stubCachedRecordGetter.calledOnce).to.eql(true);
            expect(stubCachedRecordGetter.calledWith(stubPost.id, stubParams)).to.eql(true);
            expect(stubAfterCachedRecordGetter.calledOnce).to.eql(true);
            expect(stubAfterCachedRecordGetter.calledWith(stubPost, stubParams)).to.eql(true);
            expect(stubCreateRecord.notCalled).to.eql(true);
        });

        it("calls all hooks on a cache miss", async function () {
            const cachedPost = null;
            stubCachedRecordGetter = sinon.stub().callsFake(() => timedPromise(cachedPost));
            builtDummyClasses = dummyClassesGenerator({...dummyClassBuilderArguments, stubCachedRecordGetter});
            DummyCachedDataSource = builtDummyClasses.DummyCachedDataSource;
            DummyCacheClient = builtDummyClasses.DummyCacheClient;
            stubCacheClient = new DummyCacheClient("handles a cache miss");

            const cachedDataSource = new DummyCachedDataSource(stubServiceClient, stubCacheClient);
            expect(cachedDataSource).to.be.instanceOf(DummyCachedDataSource);

            const stubParams = PostSearchParams.fromJS();
            const post = await cachedDataSource.getRecord(stubPost.id, stubParams);

            expect(post).to.eql(stubPost);
            expect(stubBeforeRecordGetter.calledOnce).to.eql(true);
            expect(stubBeforeRecordGetter.calledWith(stubPost.id, stubParams)).to.eql(true);
            expect(stubRecordGetter.calledOnce).to.eql(true);
            expect(stubRecordGetter.calledWith(stubPost.id, stubParams)).to.eql(true);
            expect(stubAfterRecordGetter.calledOnce).to.eql(true);
            expect(stubAfterRecordGetter.calledWith(stubPost, stubParams)).to.eql(true);
            expect(stubBeforeCachedRecordGetter.calledOnce).to.eql(true);
            expect(stubBeforeCachedRecordGetter.calledWith(stubPost.id, stubParams)).to.eql(true);
            expect(stubCachedRecordGetter.calledOnce).to.eql(true);
            expect(stubCachedRecordGetter.calledWith(stubPost.id, stubParams)).to.eql(true);
            expect(stubAfterCachedRecordGetter.calledOnce).to.eql(true);
            expect(stubAfterCachedRecordGetter.calledWith(cachedPost, stubParams)).to.eql(true);
            expect(stubCreateRecord.calledOnce).to.eql(true);
            expect(stubCreateRecord.calledWith(stubPost)).to.eql(true);
        });

        it("handles not finding a post at all", async function () {
            const cachedDataSource = new DummyCachedDataSource(stubServiceClient, stubCacheClient);
            expect(cachedDataSource).to.be.instanceOf(DummyCachedDataSource);

            const stubParams = PostSearchParams.fromJS();
            const stubMissPostId = "ಠ_ಠ";
            const post = await cachedDataSource.getRecord(stubMissPostId, stubParams);

            expect(post).to.not.be.ok;
            expect(stubBeforeRecordGetter.calledOnce).to.eql(true);
            expect(stubBeforeRecordGetter.calledWith(stubMissPostId, stubParams)).to.eql(true);
            expect(stubRecordGetter.calledOnce).to.eql(true);
            expect(stubRecordGetter.calledWith(stubMissPostId, stubParams)).to.eql(true);
            expect(stubAfterRecordGetter.calledOnce).to.eql(true);
            expect(stubAfterRecordGetter.calledWith(null, stubParams)).to.eql(true);
            expect(stubBeforeCachedRecordGetter.calledOnce).to.eql(true);
            expect(stubBeforeCachedRecordGetter.calledWith(stubMissPostId, stubParams)).to.eql(true);
            expect(stubCachedRecordGetter.calledOnce).to.eql(true);
            expect(stubCachedRecordGetter.calledWith(stubMissPostId, stubParams)).to.eql(true);
            expect(stubAfterCachedRecordGetter.calledOnce).to.eql(true);
            expect(stubAfterCachedRecordGetter.calledWith(null, stubParams)).to.eql(true);
            expect(stubCreateRecord.notCalled).to.eql(true);
        });
    });
});
