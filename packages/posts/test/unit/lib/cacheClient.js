import {Photo, Post} from "@randy.tarampi/js";
import {expect} from "chai";
import sinon from "sinon";
import CacheClient from "../../../lib/cacheClient";
import DummyDataClientGenerator from "../../lib/dummyDataClientGenerator";

let stubType;
let stubPost;
let stubPhoto;
let stubPosts;
let stubCreatePosts;
let stubGetPosts;
let stubCreatePost;
let stubGetPost;
let DummyDataClient;
let stubDataClient;

describe("CacheClient", function () {
    beforeEach(function () {
        stubType = "ʕ•ᴥ•ʔ";

        stubPost = Post.fromJSON({id: "woof"});
        stubPhoto = Photo.fromJSON({id: "meow"});
        stubPosts = [stubPost, stubPhoto];

        stubCreatePosts = sinon.stub().callsFake(posts => Promise.resolve(posts));
        stubGetPosts = sinon.stub().callsFake(params => Promise.resolve(stubPosts)); // eslint-disable-line no-unused-vars

        stubCreatePost = sinon.stub().callsFake(post => Promise.resolve(post));
        stubGetPost = sinon.stub().callsFake(params => Promise.resolve(stubPost)); // eslint-disable-line no-unused-vars

        DummyDataClient = DummyDataClientGenerator({
            stubGetPosts,
            stubCreatePosts,

            stubGetPost,
            stubCreatePost
        });
        stubDataClient = new DummyDataClient("ᶘ ◕ᴥ◕ᶅ");
    });

    describe("constructor", function () {
        it("should build a `CacheClient` instance", function () {
            const cacheClient = new CacheClient(stubType, stubDataClient);

            expect(cacheClient.dataClient).to.eql(stubDataClient);
            expect(cacheClient.type).to.eql(stubType);
            expect(cacheClient).to.be.instanceOf(CacheClient);
        });
    });

    describe("#setPosts", function () {
        it("delegates to dataClient.createPosts", async function () {
            const cacheClient = new CacheClient(stubType, stubDataClient);
            expect(cacheClient).to.be.instanceOf(CacheClient);

            const createdPosts = await cacheClient.setPosts(stubPosts);
            expect(createdPosts).to.be.ok;
            createdPosts.map(createdPost => expect(createdPost).to.be.instanceof(Post));
            expect(stubCreatePosts.calledOnce).to.eql(true);
            expect(stubCreatePosts.calledWith(stubPosts)).to.eql(true);
        });
    });

    describe("#getPosts", function () {
        it("delegates to dataClient.getPosts", async function () {
            const cacheClient = new CacheClient(stubType, stubDataClient);
            expect(cacheClient).to.be.instanceOf(CacheClient);

            const stubParams = {};
            const retrievedPosts = await cacheClient.getPosts(stubParams);
            expect(retrievedPosts).to.be.ok;
            retrievedPosts.map(retrievedPost => expect(retrievedPost).to.be.instanceof(Post));
            expect(stubGetPosts.calledOnce).to.eql(true);
            expect(stubGetPosts.calledWith(stubParams)).to.eql(true);
        });
    });

    describe("#setPost", function () {
        it("delegates to dataClient.createPost", async function () {
            const cacheClient = new CacheClient(stubType, stubDataClient);
            expect(cacheClient).to.be.instanceOf(CacheClient);

            const createdPost = await cacheClient.setPost(stubPost);
            expect(createdPost).to.be.ok;
            expect(createdPost).to.be.instanceOf(Post);
            expect(createdPost).to.eql(stubPost);
            expect(stubCreatePost.calledOnce).to.eql(true);
            expect(stubCreatePost.calledWith(stubPost)).to.eql(true);
        });
    });

    describe("#getPost", function () {
        it("delegates to dataClient.getPost", async function () {
            const cacheClient = new CacheClient(stubType, stubDataClient);
            expect(cacheClient).to.be.instanceOf(CacheClient);

            const stubParams = {};
            const retrievedPost = await cacheClient.getPost(stubParams);
            expect(retrievedPost).to.be.ok;
            expect(retrievedPost).to.be.instanceOf(Post);
            expect(retrievedPost).to.eql(stubPost);
            expect(stubGetPost.calledOnce).to.eql(true);
            expect(stubGetPost.calledWith(stubParams)).to.eql(true);
        });
    });
});
