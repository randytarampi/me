import {Photo, Post} from "@randy.tarampi/js";
import {expect} from "chai";
import sinon from "sinon";
import CachedDataSource from "../../../../src/lib/cachedDataSource";
import SearchParams from "../../../../src/lib/searchParams";
import dummyClassesGenerator from "../../../lib/dummyClassesGenerator";
import {timedPromise} from "../../../lib/util";

describe("CachedDataSource", function () {
    let stubType;
    let stubServiceClient;
    let stubPhoto;
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
    let DummyCachedDataSource;
    let DummyCacheClient;
    let stubCreatePosts;
    let stubGetPosts;
    let stubCreatePost;
    let stubGetPost;
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

        stubJsonToPost = sinon.stub().callsFake(postJson => postJson.id === stubPost.id ? Post.fromJSON(postJson) : Photo.fromJSON(postJson));

        stubCreatePosts = sinon.stub().callsFake(posts => timedPromise(posts));
        stubGetPosts = sinon.stub().callsFake(params => timedPromise(stubPosts)); // eslint-disable-line no-unused-vars

        stubCreatePost = sinon.stub().callsFake(post => timedPromise(post));
        stubGetPost = sinon.stub().callsFake(params => timedPromise(stubPost)); // eslint-disable-line no-unused-vars

        dummyClassBuilderArguments = {
            stubType,

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

    describe("cachedPostsGetter", function () {
        it("delegates to `this.cacheClient.getPosts`", function () {
            delete dummyClassBuilderArguments.stubCachedPostsGetter;
            builtDummyClasses = dummyClassesGenerator(dummyClassBuilderArguments);

            DummyCachedDataSource = builtDummyClasses.DummyCachedDataSource;
            DummyDataClient = builtDummyClasses.DummyDataClient;
            DummyCacheClient = builtDummyClasses.DummyCacheClient;

            stubDataClient = new DummyDataClient();
            stubCacheClient = new DummyCacheClient();

            const cachedDataSource = new DummyCachedDataSource(stubServiceClient, stubCacheClient);
            const stubSearchParams = SearchParams.fromJS({type: Photo.type, source: stubType});

            return cachedDataSource.cachedPostsGetter(stubSearchParams)
                .then(cachedPosts => {
                    expect(cachedPosts).to.be.ok;
                    expect(
                        cachedPosts.map(cachedPost => cachedPost.toJS())
                    ).to.eql(
                        stubPosts.map(stubPost => stubPost.remove("raw").toJS())
                    );
                    expect(stubGetPosts.calledOnce).to.eql(true);
                    sinon.assert.calledWith(stubGetPosts, {
                        _query: {
                            hash: {source: {eq: stubType}},
                            range: {type: {eq: Photo.type}}
                        },
                        _options: {
                            limit: 100,
                            descending: true,
                            all: false,
                            indexName: "source-type-index"
                        }
                    });
                    sinon.assert.calledTwice(stubJsonToPost);
                });
        });
    });

    describe("allCachedPostsGetter", function () {
        it("delegates to `this.cacheClient.getPosts`", function () {
            delete dummyClassBuilderArguments.stubAllCachedPostsGetter;
            builtDummyClasses = dummyClassesGenerator(dummyClassBuilderArguments);

            DummyCachedDataSource = builtDummyClasses.DummyCachedDataSource;
            DummyDataClient = builtDummyClasses.DummyDataClient;
            DummyCacheClient = builtDummyClasses.DummyCacheClient;

            stubDataClient = new DummyDataClient();
            stubCacheClient = new DummyCacheClient();

            const cachedDataSource = new DummyCachedDataSource(stubServiceClient, stubCacheClient);
            const stubSearchParams = SearchParams.fromJS({type: Photo.type, source: stubType});

            return cachedDataSource.allCachedPostsGetter(stubSearchParams)
                .then(cachedPosts => {
                    expect(cachedPosts).to.be.ok;
                    expect(
                        cachedPosts.map(cachedPost => cachedPost.toJS())
                    ).to.eql(
                        stubPosts.map(stubPost => stubPost.remove("raw").toJS())
                    );
                    expect(stubGetPosts.calledOnce).to.eql(true);
                    sinon.assert.calledWith(stubGetPosts, {
                        _query: {
                            hash: {source: {eq: stubType}},
                            range: {type: {eq: Photo.type}}
                        },
                        _options: {
                            limit: 100,
                            descending: true,
                            all: true,
                            indexName: "source-type-index"
                        }
                    });
                });
        });
    });

    describe("getCachedPosts", function () {
        it("calls all hooks", async function () {
            const cachedDataSource = new DummyCachedDataSource(stubServiceClient, stubCacheClient);
            expect(cachedDataSource).to.be.instanceOf(DummyCachedDataSource);

            const stubParams = SearchParams.fromJS();
            const posts = await cachedDataSource.getCachedPosts(stubParams);

            expect(posts).to.eql(stubPosts);
            expect(stubBeforeCachedPostsGetter.calledOnce).to.eql(true);
            expect(stubBeforeCachedPostsGetter.calledWith(stubParams)).to.eql(true);
            expect(stubCachedPostsGetter.calledOnce).to.eql(true);
            expect(stubCachedPostsGetter.calledWith(stubParams)).to.eql(true);
            expect(stubAfterCachedPostsGetter.calledOnce).to.eql(true);
            expect(stubAfterCachedPostsGetter.calledWith(stubPosts, stubParams)).to.eql(true);
        });

        it("handles a cache miss", async function () {
            const cachedPosts = [];
            stubCachedPostsGetter = sinon.stub().callsFake(() => timedPromise(cachedPosts));
            builtDummyClasses = dummyClassesGenerator({...dummyClassBuilderArguments, stubCachedPostsGetter});
            DummyCachedDataSource = builtDummyClasses.DummyCachedDataSource;
            DummyCacheClient = builtDummyClasses.DummyCacheClient;
            stubCacheClient = new DummyCacheClient("handles a cache miss");

            const cachedDataSource = new DummyCachedDataSource(stubServiceClient, stubCacheClient);
            expect(cachedDataSource).to.be.instanceOf(DummyCachedDataSource);

            const stubParams = SearchParams.fromJS();
            const posts = await cachedDataSource.getCachedPosts(stubParams);

            expect(posts).to.not.be.ok;
            expect(posts).to.eql(null);
            expect(stubBeforeCachedPostsGetter.calledOnce).to.eql(true);
            expect(stubBeforeCachedPostsGetter.calledWith(stubParams)).to.eql(true);
            expect(stubCachedPostsGetter.calledOnce).to.eql(true);
            expect(stubCachedPostsGetter.calledWith(stubParams)).to.eql(true);
            expect(stubAfterCachedPostsGetter.calledOnce).to.eql(true);
            expect(stubAfterCachedPostsGetter.calledWith(cachedPosts, stubParams)).to.eql(true);
        });
    });

    describe("getAllCachedPosts", function () {
        it("calls all hooks", async function () {
            const cachedDataSource = new DummyCachedDataSource(stubServiceClient, stubCacheClient);
            expect(cachedDataSource).to.be.instanceOf(DummyCachedDataSource);

            const stubParams = SearchParams.fromJS();
            const posts = await cachedDataSource.getAllCachedPosts(stubParams);

            expect(posts).to.eql(stubPosts);
            expect(stubBeforeCachedPostsGetter.calledOnce).to.eql(true);
            expect(stubBeforeCachedPostsGetter.calledWith(stubParams)).to.eql(true);
            expect(stubAllCachedPostsGetter.calledOnce).to.eql(true);
            expect(stubAllCachedPostsGetter.calledWith(stubParams)).to.eql(true);
            expect(stubAfterCachedPostsGetter.calledOnce).to.eql(true);
            expect(stubAfterCachedPostsGetter.calledWith(stubPosts, stubParams)).to.eql(true);
        });

        it("handles a cache miss", async function () {
            const cachedPosts = [];
            stubAllCachedPostsGetter = sinon.stub().callsFake(() => timedPromise(cachedPosts));
            builtDummyClasses = dummyClassesGenerator({...dummyClassBuilderArguments, stubAllCachedPostsGetter});
            DummyCachedDataSource = builtDummyClasses.DummyCachedDataSource;
            DummyCacheClient = builtDummyClasses.DummyCacheClient;
            stubCacheClient = new DummyCacheClient("handles a cache miss");

            const cachedDataSource = new DummyCachedDataSource(stubServiceClient, stubCacheClient);
            expect(cachedDataSource).to.be.instanceOf(DummyCachedDataSource);

            const stubParams = SearchParams.fromJS();
            const posts = await cachedDataSource.getAllCachedPosts(stubParams);

            expect(posts).to.not.be.ok;
            expect(posts).to.eql(null);
            expect(stubBeforeCachedPostsGetter.calledOnce).to.eql(true);
            expect(stubBeforeCachedPostsGetter.calledWith(stubParams)).to.eql(true);
            expect(stubAllCachedPostsGetter.calledOnce).to.eql(true);
            expect(stubAllCachedPostsGetter.calledWith(stubParams)).to.eql(true);
            expect(stubAfterCachedPostsGetter.calledOnce).to.eql(true);
            expect(stubAfterCachedPostsGetter.calledWith(cachedPosts, stubParams)).to.eql(true);
        });
    });

    describe("getServicePosts", function () {
        it("calls all hooks", async function () {
            const cachedDataSource = new DummyCachedDataSource(stubServiceClient, stubCacheClient);
            expect(cachedDataSource).to.be.instanceOf(DummyCachedDataSource);

            const stubParams = SearchParams.fromJS();
            const posts = await cachedDataSource.getServicePosts(stubParams);

            expect(posts).to.eql(stubPosts);
            expect(stubBeforePostsGetter.calledOnce).to.eql(true);
            expect(stubBeforePostsGetter.calledWith(stubParams)).to.eql(true);
            expect(stubPostsGetter.calledOnce).to.eql(true);
            expect(stubPostsGetter.calledWith(stubParams)).to.eql(true);
            expect(stubAfterPostsGetter.calledOnce).to.eql(true);
            expect(stubAfterPostsGetter.calledWith(stubPosts, stubParams)).to.eql(true);
            expect(stubCreatePosts.calledOnce).to.eql(true);
            expect(stubCreatePosts.calledWith(stubPosts)).to.eql(true);
        });

        it("handles not finding any posts", async function () {
            const cachedPosts = [];
            stubPostsGetter = sinon.stub().callsFake(() => timedPromise(cachedPosts));
            builtDummyClasses = dummyClassesGenerator({...dummyClassBuilderArguments, stubPostsGetter});
            DummyCachedDataSource = builtDummyClasses.DummyCachedDataSource;
            DummyCacheClient = builtDummyClasses.DummyCacheClient;
            stubCacheClient = new DummyCacheClient("handles not finding any posts");

            const cachedDataSource = new DummyCachedDataSource(stubServiceClient, stubCacheClient);
            expect(cachedDataSource).to.be.instanceOf(DummyCachedDataSource);

            const stubParams = SearchParams.fromJS();
            const posts = await cachedDataSource.getServicePosts(stubParams);

            expect(posts).to.be.empty;
            expect(stubBeforePostsGetter.calledOnce).to.eql(true);
            expect(stubBeforePostsGetter.calledWith(stubParams)).to.eql(true);
            expect(stubPostsGetter.calledOnce).to.eql(true);
            expect(stubPostsGetter.calledWith(stubParams)).to.eql(true);
            expect(stubAfterPostsGetter.calledOnce).to.eql(true);
            expect(stubAfterPostsGetter.calledWith([], stubParams)).to.eql(true);
            expect(stubCreatePosts.notCalled).to.eql(true);
        });
    });

    describe("getAllServicePosts", function () {
        it("calls all hooks", async function () {
            const cachedDataSource = new DummyCachedDataSource(stubServiceClient, stubCacheClient);
            expect(cachedDataSource).to.be.instanceOf(DummyCachedDataSource);

            const stubParams = SearchParams.fromJS();
            const posts = await cachedDataSource.getAllServicePosts(stubParams);

            expect(posts).to.eql(stubPosts);
            expect(stubBeforePostsGetter.calledOnce).to.eql(true);
            expect(stubBeforePostsGetter.calledWith(stubParams)).to.eql(true);
            expect(stubAllPostsGetter.calledOnce).to.eql(true);
            expect(stubAllPostsGetter.calledWith(stubParams)).to.eql(true);
            expect(stubAfterPostsGetter.calledOnce).to.eql(true);
            expect(stubAfterPostsGetter.calledWith(stubPosts, stubParams)).to.eql(true);
            expect(stubCreatePosts.calledOnce).to.eql(true);
            expect(stubCreatePosts.calledWith(stubPosts)).to.eql(true);
        });

        it("handles not finding any posts", async function () {
            const cachedPosts = [];
            stubAllPostsGetter = sinon.stub().callsFake(() => timedPromise(cachedPosts));
            builtDummyClasses = dummyClassesGenerator({...dummyClassBuilderArguments, stubAllPostsGetter});
            DummyCachedDataSource = builtDummyClasses.DummyCachedDataSource;
            DummyCacheClient = builtDummyClasses.DummyCacheClient;
            stubCacheClient = new DummyCacheClient("handles not finding any posts");

            const cachedDataSource = new DummyCachedDataSource(stubServiceClient, stubCacheClient);
            expect(cachedDataSource).to.be.instanceOf(DummyCachedDataSource);

            const stubParams = SearchParams.fromJS();
            const posts = await cachedDataSource.getAllServicePosts(stubParams);

            expect(posts).to.be.empty;
            expect(stubBeforePostsGetter.calledOnce).to.eql(true);
            expect(stubBeforePostsGetter.calledWith(stubParams)).to.eql(true);
            expect(stubAllPostsGetter.calledOnce).to.eql(true);
            expect(stubAllPostsGetter.calledWith(stubParams)).to.eql(true);
            expect(stubAfterPostsGetter.calledOnce).to.eql(true);
            expect(stubAfterPostsGetter.calledWith([], stubParams)).to.eql(true);
            expect(stubCreatePosts.notCalled).to.eql(true);
        });
    });

    describe("getPosts", function () {
        it("calls only the cache hooks on a cache hit", async function () {
            const cachedDataSource = new DummyCachedDataSource(stubServiceClient, stubCacheClient);
            expect(cachedDataSource).to.be.instanceOf(DummyCachedDataSource);

            const stubParams = SearchParams.fromJS();
            const posts = await cachedDataSource.getPosts(stubParams);

            expect(posts).to.eql(stubPosts);
            expect(stubBeforePostsGetter.notCalled).to.eql(true);
            expect(stubPostsGetter.notCalled).to.eql(true);
            expect(stubAfterPostsGetter.notCalled).to.eql(true);
            expect(stubBeforeCachedPostsGetter.calledOnce).to.eql(true);
            expect(stubBeforeCachedPostsGetter.calledWith(stubParams)).to.eql(true);
            expect(stubCachedPostsGetter.calledOnce).to.eql(true);
            expect(stubCachedPostsGetter.calledWith(stubParams)).to.eql(true);
            expect(stubAfterCachedPostsGetter.calledOnce).to.eql(true);
            expect(stubAfterCachedPostsGetter.calledWith(stubPosts, stubParams)).to.eql(true);
            expect(stubCreatePosts.notCalled).to.eql(true);
        });

        it("calls all hooks on a cache miss", async function () {
            const cachedPosts = [];
            stubCachedPostsGetter = sinon.stub().callsFake(() => timedPromise(cachedPosts));
            builtDummyClasses = dummyClassesGenerator({...dummyClassBuilderArguments, stubCachedPostsGetter});
            DummyCachedDataSource = builtDummyClasses.DummyCachedDataSource;
            DummyCacheClient = builtDummyClasses.DummyCacheClient;
            stubCacheClient = new DummyCacheClient("handles a cache miss");

            const cachedDataSource = new DummyCachedDataSource(stubServiceClient, stubCacheClient);
            expect(cachedDataSource).to.be.instanceOf(DummyCachedDataSource);

            const stubParams = SearchParams.fromJS();
            const posts = await cachedDataSource.getPosts(stubParams);

            expect(posts).to.eql(stubPosts);
            expect(stubBeforePostsGetter.calledOnce).to.eql(true);
            expect(stubBeforePostsGetter.calledWith(stubParams)).to.eql(true);
            expect(stubPostsGetter.calledOnce).to.eql(true);
            expect(stubPostsGetter.calledWith(stubParams)).to.eql(true);
            expect(stubAfterPostsGetter.calledOnce).to.eql(true);
            expect(stubAfterPostsGetter.calledWith(stubPosts, stubParams)).to.eql(true);
            expect(stubBeforeCachedPostsGetter.calledOnce).to.eql(true);
            expect(stubBeforeCachedPostsGetter.calledWith(stubParams)).to.eql(true);
            expect(stubCachedPostsGetter.calledOnce).to.eql(true);
            expect(stubCachedPostsGetter.calledWith(stubParams)).to.eql(true);
            expect(stubAfterCachedPostsGetter.calledOnce).to.eql(true);
            expect(stubAfterCachedPostsGetter.calledWith(cachedPosts, stubParams)).to.eql(true);
            expect(stubCreatePosts.calledOnce).to.eql(true);
            expect(stubCreatePosts.calledWith(stubPosts)).to.eql(true);
        });
    });

    describe("getAllPosts", function () {
        it("calls only the cache hooks on a cache hit", async function () {
            const cachedDataSource = new DummyCachedDataSource(stubServiceClient, stubCacheClient);
            expect(cachedDataSource).to.be.instanceOf(DummyCachedDataSource);

            const stubParams = SearchParams.fromJS();
            const posts = await cachedDataSource.getAllPosts(stubParams);

            expect(posts).to.eql(stubPosts);
            expect(stubBeforePostsGetter.notCalled).to.eql(true);
            expect(stubAllPostsGetter.notCalled).to.eql(true);
            expect(stubAfterPostsGetter.notCalled).to.eql(true);
            expect(stubBeforeCachedPostsGetter.calledOnce).to.eql(true);
            expect(stubBeforeCachedPostsGetter.calledWith(stubParams)).to.eql(true);
            expect(stubAllCachedPostsGetter.calledOnce).to.eql(true);
            expect(stubAllCachedPostsGetter.calledWith(stubParams)).to.eql(true);
            expect(stubAfterCachedPostsGetter.calledOnce).to.eql(true);
            expect(stubAfterCachedPostsGetter.calledWith(stubPosts, stubParams)).to.eql(true);
            expect(stubCreatePosts.notCalled).to.eql(true);
        });

        it("calls all hooks on a cache miss", async function () {
            const cachedPosts = [];
            stubAllCachedPostsGetter = sinon.stub().callsFake(() => timedPromise(cachedPosts));
            builtDummyClasses = dummyClassesGenerator({...dummyClassBuilderArguments, stubAllCachedPostsGetter});
            DummyCachedDataSource = builtDummyClasses.DummyCachedDataSource;
            DummyCacheClient = builtDummyClasses.DummyCacheClient;
            stubCacheClient = new DummyCacheClient("handles a cache miss");

            const cachedDataSource = new DummyCachedDataSource(stubServiceClient, stubCacheClient);
            expect(cachedDataSource).to.be.instanceOf(DummyCachedDataSource);

            const stubParams = SearchParams.fromJS();
            const posts = await cachedDataSource.getAllPosts(stubParams);

            expect(posts).to.eql(stubPosts);
            expect(stubBeforePostsGetter.calledOnce).to.eql(true);
            expect(stubBeforePostsGetter.calledWith(stubParams)).to.eql(true);
            expect(stubAllPostsGetter.calledOnce).to.eql(true);
            expect(stubAllPostsGetter.calledWith(stubParams)).to.eql(true);
            expect(stubAfterPostsGetter.calledOnce).to.eql(true);
            expect(stubAfterPostsGetter.calledWith(stubPosts, stubParams)).to.eql(true);
            expect(stubBeforeCachedPostsGetter.calledOnce).to.eql(true);
            expect(stubBeforeCachedPostsGetter.calledWith(stubParams)).to.eql(true);
            expect(stubAllCachedPostsGetter.calledOnce).to.eql(true);
            expect(stubAllCachedPostsGetter.calledWith(stubParams)).to.eql(true);
            expect(stubAfterCachedPostsGetter.calledOnce).to.eql(true);
            expect(stubAfterCachedPostsGetter.calledWith(cachedPosts, stubParams)).to.eql(true);
            expect(stubCreatePosts.calledOnce).to.eql(true);
            expect(stubCreatePosts.calledWith(stubPosts)).to.eql(true);
        });
    });

    describe("cachedPostGetter", function () {
        it("delegates to `this.cacheClient.getPost` (no params)", function () {
            delete dummyClassBuilderArguments.stubCachedPostGetter;
            builtDummyClasses = dummyClassesGenerator(dummyClassBuilderArguments);

            DummyCachedDataSource = builtDummyClasses.DummyCachedDataSource;
            DummyDataClient = builtDummyClasses.DummyDataClient;
            DummyCacheClient = builtDummyClasses.DummyCacheClient;

            stubDataClient = new DummyDataClient();
            stubCacheClient = new DummyCacheClient();

            const cachedDataSource = new DummyCachedDataSource(stubServiceClient, stubCacheClient);

            return cachedDataSource.cachedPostGetter(stubPost.id)
                .then(cachedPost => {
                    expect(cachedPost.toJS()).to.eql(stubPost.remove("raw").toJS());
                    expect(stubGetPost.calledOnce).to.eql(true);
                    sinon.assert.calledWith(stubGetPost, {
                        _query: {hash: {uid: {eq: stubPost.uid}}},
                        _options: {limit: 100, descending: true, all: false, indexName: "uid-index"}
                    });
                    sinon.assert.calledOnce(stubJsonToPost);
                });
        });

        it("delegates to `this.cacheClient.getPost` (with params)", function () {
            delete dummyClassBuilderArguments.stubCachedPostGetter;
            builtDummyClasses = dummyClassesGenerator(dummyClassBuilderArguments);

            DummyCachedDataSource = builtDummyClasses.DummyCachedDataSource;
            DummyDataClient = builtDummyClasses.DummyDataClient;
            DummyCacheClient = builtDummyClasses.DummyCacheClient;

            stubDataClient = new DummyDataClient();
            stubCacheClient = new DummyCacheClient();

            const cachedDataSource = new DummyCachedDataSource(stubServiceClient, stubCacheClient);
            const stubSearchParams = SearchParams.fromJS();

            return cachedDataSource.cachedPostGetter(stubPost.id, stubSearchParams)
                .then(cachedPost => {
                    expect(cachedPost.toJS()).to.eql(stubPost.remove("raw").toJS());
                    expect(stubGetPost.calledOnce).to.eql(true);
                    sinon.assert.calledWith(stubGetPost, {
                        _query: {hash: {uid: {eq: stubPost.uid}}},
                        _options: {limit: 100, descending: true, all: false, indexName: "uid-index"}
                    });
                    sinon.assert.calledOnce(stubJsonToPost);
                });
        });
    });

    describe("getCachedPost", function () {
        it("calls all hooks", async function () {
            const cachedDataSource = new DummyCachedDataSource(stubServiceClient, stubCacheClient);
            expect(cachedDataSource).to.be.instanceOf(DummyCachedDataSource);

            const stubParams = SearchParams.fromJS();
            const post = await cachedDataSource.getCachedPost(stubPost.id, stubParams);

            expect(post).to.eql(stubPost);
            expect(stubBeforeCachedPostGetter.calledOnce).to.eql(true);
            expect(stubBeforeCachedPostGetter.calledWith(stubPost.id, stubParams)).to.eql(true);
            expect(stubCachedPostGetter.calledOnce).to.eql(true);
            expect(stubCachedPostGetter.calledWith(stubPost.id, stubParams)).to.eql(true);
            expect(stubAfterCachedPostGetter.calledOnce).to.eql(true);
            expect(stubAfterCachedPostGetter.calledWith(stubPost, stubParams)).to.eql(true);
        });

        it("handles a cache miss", async function () {
            const cachedPost = null;
            stubCachedPostGetter = sinon.stub().callsFake(() => timedPromise(cachedPost));
            builtDummyClasses = dummyClassesGenerator({...dummyClassBuilderArguments, stubCachedPostGetter});
            DummyCachedDataSource = builtDummyClasses.DummyCachedDataSource;
            DummyCacheClient = builtDummyClasses.DummyCacheClient;
            stubCacheClient = new DummyCacheClient("handles a cache miss");

            const cachedDataSource = new DummyCachedDataSource(stubServiceClient, stubCacheClient);
            expect(cachedDataSource).to.be.instanceOf(DummyCachedDataSource);

            const stubParams = SearchParams.fromJS();
            const post = await cachedDataSource.getCachedPost(stubPost.id, stubParams);

            expect(post).to.not.be.ok;
            expect(post).to.eql(null);
            expect(stubBeforeCachedPostGetter.calledOnce).to.eql(true);
            expect(stubBeforeCachedPostGetter.calledWith(stubPost.id, stubParams)).to.eql(true);
            expect(stubCachedPostGetter.calledOnce).to.eql(true);
            expect(stubCachedPostGetter.calledWith(stubPost.id, stubParams)).to.eql(true);
            expect(stubAfterCachedPostGetter.calledOnce).to.eql(true);
            expect(stubAfterCachedPostGetter.calledWith(cachedPost, stubParams)).to.eql(true);
        });
    });

    describe("getServicePost", function () {
        it("calls all hooks", async function () {
            const cachedDataSource = new DummyCachedDataSource(stubServiceClient, stubCacheClient);
            expect(cachedDataSource).to.be.instanceOf(DummyCachedDataSource);

            const stubParams = SearchParams.fromJS();
            const post = await cachedDataSource.getServicePost(stubPost.id, stubParams);

            expect(post).to.eql(stubPost);
            expect(stubBeforePostGetter.calledOnce).to.eql(true);
            expect(stubBeforePostGetter.calledWith(stubPost.id, stubParams)).to.eql(true);
            expect(stubPostGetter.calledOnce).to.eql(true);
            expect(stubPostGetter.calledWith(stubPost.id, stubParams)).to.eql(true);
            expect(stubAfterPostGetter.calledOnce).to.eql(true);
            expect(stubAfterPostGetter.calledWith(stubPost, stubParams)).to.eql(true);
            expect(stubCreatePost.calledOnce).to.eql(true);
            expect(stubCreatePost.calledWith(stubPost)).to.eql(true);
        });

        it("handles not finding a post at all", async function () {
            const cachedDataSource = new DummyCachedDataSource(stubServiceClient, stubCacheClient);
            expect(cachedDataSource).to.be.instanceOf(DummyCachedDataSource);

            const stubParams = SearchParams.fromJS();
            const stubMissPostId = "ಠ_ಠ";
            const post = await cachedDataSource.getServicePost(stubMissPostId, stubParams);

            expect(post).to.not.be.ok;
            expect(stubBeforePostGetter.calledOnce).to.eql(true);
            expect(stubBeforePostGetter.calledWith(stubMissPostId, stubParams)).to.eql(true);
            expect(stubPostGetter.calledOnce).to.eql(true);
            expect(stubPostGetter.calledWith(stubMissPostId, stubParams)).to.eql(true);
            expect(stubAfterPostGetter.calledOnce).to.eql(true);
            expect(stubAfterPostGetter.calledWith(null, stubParams)).to.eql(true);
            expect(stubCreatePost.notCalled).to.eql(true);
        });
    });

    describe("getPost", function () {
        it("calls only the cache hooks on a cache hit", async function () {
            const cachedDataSource = new DummyCachedDataSource(stubServiceClient, stubCacheClient);
            expect(cachedDataSource).to.be.instanceOf(DummyCachedDataSource);

            const stubParams = SearchParams.fromJS();
            const post = await cachedDataSource.getPost(stubPost.id, stubParams);

            expect(post).to.eql(stubPost);
            expect(stubBeforePostGetter.notCalled).to.eql(true);
            expect(stubPostGetter.notCalled).to.eql(true);
            expect(stubAfterPostGetter.notCalled).to.eql(true);
            expect(stubBeforeCachedPostGetter.calledOnce).to.eql(true);
            expect(stubBeforeCachedPostGetter.calledWith(stubPost.id, stubParams)).to.eql(true);
            expect(stubCachedPostGetter.calledOnce).to.eql(true);
            expect(stubCachedPostGetter.calledWith(stubPost.id, stubParams)).to.eql(true);
            expect(stubAfterCachedPostGetter.calledOnce).to.eql(true);
            expect(stubAfterCachedPostGetter.calledWith(stubPost, stubParams)).to.eql(true);
            expect(stubCreatePost.notCalled).to.eql(true);
        });

        it("calls all hooks on a cache miss", async function () {
            const cachedPost = null;
            stubCachedPostGetter = sinon.stub().callsFake(() => timedPromise(cachedPost));
            builtDummyClasses = dummyClassesGenerator({...dummyClassBuilderArguments, stubCachedPostGetter});
            DummyCachedDataSource = builtDummyClasses.DummyCachedDataSource;
            DummyCacheClient = builtDummyClasses.DummyCacheClient;
            stubCacheClient = new DummyCacheClient("handles a cache miss");

            const cachedDataSource = new DummyCachedDataSource(stubServiceClient, stubCacheClient);
            expect(cachedDataSource).to.be.instanceOf(DummyCachedDataSource);

            const stubParams = SearchParams.fromJS();
            const post = await cachedDataSource.getPost(stubPost.id, stubParams);

            expect(post).to.eql(stubPost);
            expect(stubBeforePostGetter.calledOnce).to.eql(true);
            expect(stubBeforePostGetter.calledWith(stubPost.id, stubParams)).to.eql(true);
            expect(stubPostGetter.calledOnce).to.eql(true);
            expect(stubPostGetter.calledWith(stubPost.id, stubParams)).to.eql(true);
            expect(stubAfterPostGetter.calledOnce).to.eql(true);
            expect(stubAfterPostGetter.calledWith(stubPost, stubParams)).to.eql(true);
            expect(stubBeforeCachedPostGetter.calledOnce).to.eql(true);
            expect(stubBeforeCachedPostGetter.calledWith(stubPost.id, stubParams)).to.eql(true);
            expect(stubCachedPostGetter.calledOnce).to.eql(true);
            expect(stubCachedPostGetter.calledWith(stubPost.id, stubParams)).to.eql(true);
            expect(stubAfterCachedPostGetter.calledOnce).to.eql(true);
            expect(stubAfterCachedPostGetter.calledWith(cachedPost, stubParams)).to.eql(true);
            expect(stubCreatePost.calledOnce).to.eql(true);
            expect(stubCreatePost.calledWith(stubPost)).to.eql(true);
        });

        it("handles not finding a post at all", async function () {
            const cachedDataSource = new DummyCachedDataSource(stubServiceClient, stubCacheClient);
            expect(cachedDataSource).to.be.instanceOf(DummyCachedDataSource);

            const stubParams = SearchParams.fromJS();
            const stubMissPostId = "ಠ_ಠ";
            const post = await cachedDataSource.getPost(stubMissPostId, stubParams);

            expect(post).to.not.be.ok;
            expect(stubBeforePostGetter.calledOnce).to.eql(true);
            expect(stubBeforePostGetter.calledWith(stubMissPostId, stubParams)).to.eql(true);
            expect(stubPostGetter.calledOnce).to.eql(true);
            expect(stubPostGetter.calledWith(stubMissPostId, stubParams)).to.eql(true);
            expect(stubAfterPostGetter.calledOnce).to.eql(true);
            expect(stubAfterPostGetter.calledWith(null, stubParams)).to.eql(true);
            expect(stubBeforeCachedPostGetter.calledOnce).to.eql(true);
            expect(stubBeforeCachedPostGetter.calledWith(stubMissPostId, stubParams)).to.eql(true);
            expect(stubCachedPostGetter.calledOnce).to.eql(true);
            expect(stubCachedPostGetter.calledWith(stubMissPostId, stubParams)).to.eql(true);
            expect(stubAfterCachedPostGetter.calledOnce).to.eql(true);
            expect(stubAfterCachedPostGetter.calledWith(null, stubParams)).to.eql(true);
            expect(stubCreatePost.notCalled).to.eql(true);
        });
    });
});
