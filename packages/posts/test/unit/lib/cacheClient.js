import {Photo, Post} from "@randy.tarampi/js";
import {expect} from "chai";
import sinon from "sinon";
import CacheClient from "../../../lib/cacheClient";
import SearchParams from "../../../lib/searchParams";
import DummyDataClientGenerator from "../../lib/dummyDataClientGenerator";

describe("CacheClient", function () {
    let stubType;
    let stubPost;
    let stubPhoto;
    let stubPosts;
    let stubCreatePosts;
    let stubGetPosts;
    let stubGetPostCount;
    let stubCreatePost;
    let stubGetPost;
    let DummyDataClient;
    let stubDataClient;

    beforeEach(function () {
        stubType = "ʕ•ᴥ•ʔ";

        stubPost = Post.fromJSON({id: "woof"});
        stubPhoto = Photo.fromJSON({id: "meow"});
        stubPosts = [stubPost, stubPhoto];

        stubCreatePosts = sinon.stub().callsFake(posts => Promise.resolve(posts));
        stubGetPosts = sinon.stub().callsFake(params => Promise.resolve(stubPosts)); // eslint-disable-line no-unused-vars
        stubGetPostCount = sinon.stub().callsFake(params => Promise.resolve(stubPosts.length)); // eslint-disable-line no-unused-vars

        stubCreatePost = sinon.stub().callsFake(post => Promise.resolve(post));
        stubGetPost = sinon.stub().callsFake(params => Promise.resolve(stubPost)); // eslint-disable-line no-unused-vars

        DummyDataClient = DummyDataClientGenerator({
            stubGetPosts,
            stubGetPostCount,
            stubCreatePosts,

            stubGetPost,
            stubCreatePost
        });
        stubDataClient = new DummyDataClient();
    });

    describe("constructor", function () {
        it("should build a `CacheClient` instance", function () {
            const cacheClient = new CacheClient(stubType, stubDataClient);

            expect(cacheClient.dataClient).to.eql(stubDataClient);
            expect(cacheClient.type).to.eql(stubType);
            expect(cacheClient).to.be.instanceOf(CacheClient);
        });

        it("sets `stubType` to `Dynamoose` by default", function () {
            const cacheClient = new CacheClient(undefined, stubDataClient);

            expect(cacheClient.dataClient).to.eql(stubDataClient);
            expect(cacheClient.type).to.eql("Dynamoose");
            expect(cacheClient).to.be.instanceOf(CacheClient);
        });
    });

    describe("#setPosts", function () {
        it("delegates to dataClient.createPosts", async function () {
            const cacheClient = new CacheClient(undefined, stubDataClient);
            expect(cacheClient).to.be.instanceOf(CacheClient);

            const createdPosts = await cacheClient.setPosts(stubPosts);
            expect(createdPosts).to.be.ok;
            createdPosts.map(createdPost => expect(createdPost).to.be.instanceof(Post));
            expect(stubCreatePosts.calledOnce).to.eql(true);
            expect(stubCreatePosts.calledWith(stubPosts)).to.eql(true);
        });

        it("swallows errors", async function () {
            stubCreatePosts = sinon.stub().callsFake(() => Promise.reject(new Error("💥")));

            DummyDataClient = DummyDataClientGenerator({
                stubGetPosts,
                stubGetPostCount,
                stubCreatePosts,

                stubGetPost,
                stubCreatePost
            });
            stubDataClient = new DummyDataClient();

            const cacheClient = new CacheClient(undefined, stubDataClient);
            expect(cacheClient).to.be.instanceOf(CacheClient);

            const createdPosts = await cacheClient.setPosts(stubPosts);
            expect(createdPosts).to.not.be.ok;
            expect(stubCreatePosts.calledOnce).to.eql(true);
            expect(stubCreatePosts.calledWith(stubPosts)).to.eql(true);
        });
    });

    describe("#getPosts", function () {
        it("delegates to dataClient.getPosts", async function () {
            const cacheClient = new CacheClient(undefined, stubDataClient);
            expect(cacheClient).to.be.instanceOf(CacheClient);

            const stubParams = SearchParams.fromJS();

            const retrievedPosts = await cacheClient.getPosts(stubParams);
            expect(retrievedPosts).to.be.ok;
            retrievedPosts.map(retrievedPost => expect(retrievedPost).to.be.instanceof(Post));
            expect(stubGetPosts.calledOnce).to.eql(true);
            sinon.assert.calledWith(stubGetPosts, stubParams[cacheClient.type]);
        });

        it("swallows errors", async function () {
            stubGetPosts = sinon.stub().returns(Promise.reject(new Error("💥")));

            DummyDataClient = DummyDataClientGenerator({
                stubGetPosts,
                stubGetPostCount,
                stubCreatePosts,

                stubGetPost,
                stubCreatePost
            });
            stubDataClient = new DummyDataClient();

            const cacheClient = new CacheClient(undefined, stubDataClient);
            expect(cacheClient).to.be.instanceOf(CacheClient);

            const stubParams = SearchParams.fromJS();

            const retrievedPosts = await cacheClient.getPosts(stubParams);
            expect(retrievedPosts).to.not.be.ok;
            expect(stubGetPosts.calledOnce).to.eql(true);
            sinon.assert.calledWith(stubGetPosts, stubParams[cacheClient.type]);
        });
    });

    describe("#getPostCount", function () {
        it("delegates to dataClient.getPostCount", async function () {
            const cacheClient = new CacheClient(undefined, stubDataClient);
            expect(cacheClient).to.be.instanceOf(CacheClient);

            const stubParams = SearchParams.fromJS();

            const retrievedPosts = await cacheClient.getPostCount(stubParams);
            expect(retrievedPosts).to.be.ok;
            expect(retrievedPosts).to.eql(stubPosts.length);
            expect(stubGetPostCount.calledOnce).to.eql(true);
            sinon.assert.calledWith(stubGetPostCount, stubParams[cacheClient.type]);
        });

        it("swallows errors", async function () {
            stubGetPostCount = sinon.stub().returns(Promise.reject(new Error("💥")));

            DummyDataClient = DummyDataClientGenerator({
                stubGetPosts,
                stubGetPostCount,
                stubCreatePosts,

                stubGetPost,
                stubCreatePost
            });
            stubDataClient = new DummyDataClient();

            const cacheClient = new CacheClient(undefined, stubDataClient);
            expect(cacheClient).to.be.instanceOf(CacheClient);

            const stubParams = SearchParams.fromJS();

            const retrievedPosts = await cacheClient.getPostCount(stubParams);
            expect(retrievedPosts).to.not.be.ok;
            expect(stubGetPostCount.calledOnce).to.eql(true);
            sinon.assert.calledWith(stubGetPostCount, stubParams[cacheClient.type]);
        });
    });

    describe("#setPost", function () {
        it("delegates to dataClient.createPost", async function () {
            const cacheClient = new CacheClient(undefined, stubDataClient);
            expect(cacheClient).to.be.instanceOf(CacheClient);

            const createdPost = await cacheClient.setPost(stubPost);
            expect(createdPost).to.be.ok;
            expect(createdPost).to.be.instanceOf(Post);
            expect(createdPost).to.eql(stubPost);
            expect(stubCreatePost.calledOnce).to.eql(true);
            expect(stubCreatePost.calledWith(stubPost)).to.eql(true);
        });

        it("swallows errors", async function () {
            stubCreatePost = sinon.stub().callsFake(post => Promise.reject(new Error("💥"))); // eslint-disable-line no-unused-vars

            DummyDataClient = DummyDataClientGenerator({
                stubGetPosts,
                stubGetPostCount,
                stubCreatePosts,

                stubGetPost,
                stubCreatePost
            });
            stubDataClient = new DummyDataClient();

            const cacheClient = new CacheClient(undefined, stubDataClient);
            expect(cacheClient).to.be.instanceOf(CacheClient);

            const createdPost = await cacheClient.setPost(stubPost);
            expect(createdPost).to.not.be.ok;
            expect(stubCreatePost.calledOnce).to.eql(true);
            expect(stubCreatePost.calledWith(stubPost)).to.eql(true);
        });
    });

    describe("#getPost", function () {
        it("delegates to dataClient.getPost", async function () {
            const cacheClient = new CacheClient(undefined, stubDataClient);
            expect(cacheClient).to.be.instanceOf(CacheClient);

            const stubParams = SearchParams.fromJS();
            const retrievedPost = await cacheClient.getPost(stubParams);
            expect(retrievedPost).to.be.ok;
            expect(retrievedPost).to.be.instanceOf(Post);
            expect(retrievedPost).to.eql(stubPost);
            expect(stubGetPost.calledOnce).to.eql(true);
            sinon.assert.calledWith(stubGetPost, stubParams[cacheClient.type]);
        });

        it("swallows errors", async function () {
            stubGetPost = sinon.stub().returns(Promise.reject(new Error("💥")));

            DummyDataClient = DummyDataClientGenerator({
                stubGetPosts,
                stubGetPostCount,
                stubCreatePosts,

                stubGetPost,
                stubCreatePost
            });
            stubDataClient = new DummyDataClient();

            const cacheClient = new CacheClient(undefined, stubDataClient);
            expect(cacheClient).to.be.instanceOf(CacheClient);

            const stubParams = SearchParams.fromJS();
            const retrievedPost = await cacheClient.getPost(stubParams);
            expect(retrievedPost).to.not.be.ok;
            expect(stubGetPost.calledOnce).to.eql(true);
            sinon.assert.calledWith(stubGetPost, stubParams[cacheClient.type]);
        });
    });
});
