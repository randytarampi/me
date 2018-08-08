import {Photo, Post} from "@randy.tarampi/js";
import {expect} from "chai";
import sinon from "sinon";
import DataSource from "../../../lib/dataSource";
import PhotoSource from "../../../photos/photoSource";
import DummyDataSourceGenerator from "../../lib/dummyDataSourceGenerator";

describe("DataSource", function () {

    let stubApiKey;
    let stubApiSecret;
    let stubType;
    let stubServiceClient;
    let stubPhoto;
    let stubPost;
    let stubPosts;
    let stubBeforePostsGetter;
    let stubPostsGetter;
    let stubAfterPostsGetter;
    let stubBeforePostGetter;
    let stubPostGetter;
    let stubAfterPostGetter;
    let stubJsonToPost;
    let DummyDataSource;

    beforeEach(function () {
        stubType = "ʕ•ᴥ•ʔ";
        stubServiceClient = {"ʕ•ᴥ•ʔ": "ʕ•ᴥ•ʔ"};

        stubPost = Post.fromJSON({id: "woof"});
        stubPhoto = Photo.fromJSON({id: "meow"});
        stubPosts = [stubPost, stubPhoto];

        stubBeforePostsGetter = sinon.stub().callsFake(params => Promise.resolve(params));
        stubPostsGetter = sinon.stub().callsFake(params => Promise.resolve(stubPosts)); // eslint-disable-line no-unused-vars
        stubAfterPostsGetter = sinon.stub().callsFake((posts, params) => Promise.resolve(posts)); // eslint-disable-line no-unused-vars

        stubBeforePostGetter = sinon.stub().callsFake((postId, params) => Promise.resolve(params));
        stubPostGetter = sinon.stub().callsFake((postId, params) => Promise.resolve(stubPosts.find(post => post.id === postId) || null)); // eslint-disable-line no-unused-vars
        stubAfterPostGetter = sinon.stub().callsFake((post, params) => Promise.resolve(post)); // eslint-disable-line no-unused-vars

        stubJsonToPost = sinon.stub().callsFake(postJson => postJson.id === stubPost.id ? Post.fromJSON(postJson) : Photo.fromJSON(postJson));

        DummyDataSource = DummyDataSourceGenerator({
            stubBeforePostsGetter,
            stubPostsGetter,
            stubAfterPostsGetter,

            stubBeforePostGetter,
            stubPostGetter,
            stubAfterPostGetter,

            stubJsonToPost
        });

        process.env[`${stubType}_API_KEY`] = stubApiKey;
        process.env[`${stubType}_API_SECRET`] = stubApiSecret;
    });

    afterEach(function () {
        delete process.env[`${stubType}_API_KEY`];
        delete process.env[`${stubType}_API_SECRET`];
    });

    describe("constructor", function () {
        it("should build a `DataSource` instance", function () {
            const dataSource = new DataSource(stubType, stubServiceClient);

            expect(dataSource.client).to.eql(stubServiceClient);
            expect(dataSource.type).to.eql(stubType);
            expect(dataSource).to.be.instanceOf(DataSource);
        });
    });

    describe("#isEnabled", () => {
        it("should be enabled if it can find some `_API_KEY` and some `_API_SECRET`", () => {
            const photoSource = new PhotoSource(stubType);

            expect(photoSource.isEnabled).to.eql(true);
        });

        it("should not be enabled if it cannot find `_API_KEY`", () => {
            delete process.env[`${stubType}_API_KEY`];

            const photoSource = new PhotoSource(stubType);

            expect(photoSource.isEnabled).to.eql(false);
        });

        it("should not be enabled if it cannot find `_API_SECRET`", () => {
            delete process.env[`${stubType}_API_SECRET`];

            const photoSource = new PhotoSource(stubType);

            expect(photoSource.isEnabled).to.eql(false);
        });
    });

    describe("#postsGetter", function () {
        it("requires implementation", async function () {
            const dataSource = new DataSource(stubType, stubServiceClient);
            expect(dataSource).to.be.instanceOf(DataSource);

            return dataSource.postsGetter({})
                .then(() => {
                    throw new Error("Wtf? This should've thrown");
                })
                .catch(error => {
                    expect(error).to.be.ok;
                    expect(error.message).to.match(/Please specify an actual postsGetter implementation/);
                });
        });

        it("calls implementation", async function () {
            const dataSource = new DummyDataSource(stubType, stubServiceClient);
            expect(dataSource).to.be.instanceOf(DummyDataSource);

            const postsRecieved = await dataSource.postsGetter(dataSource, {});
            expect(postsRecieved).to.eql(stubPosts);
            expect(stubPostsGetter.calledOnce).to.eql(true);
        });
    });

    describe("#getPosts", function () {
        it("calls all hooks", async function () {
            const dataSource = new DummyDataSource(stubType, stubServiceClient);
            expect(dataSource).to.be.instanceOf(DummyDataSource);

            const stubParams = {};
            const posts = await dataSource.getPosts(stubParams);

            expect(posts).to.be.ok;
            expect(posts).to.eql(stubPosts);
            expect(stubBeforePostsGetter.calledOnce).to.eql(true);
            expect(stubBeforePostsGetter.calledWith(stubParams)).to.eql(true);
            expect(stubPostsGetter.calledOnce).to.eql(true);
            expect(stubPostsGetter.calledWith(stubParams)).to.eql(true);
            expect(stubAfterPostsGetter.calledOnce).to.eql(true);
            expect(stubAfterPostsGetter.calledWith(stubPosts, stubParams)).to.eql(true);
        });
    });

    describe("#postGetter", function () {
        it("requires implementation", function () {
            const dataSource = new DataSource(stubType, stubServiceClient);
            expect(dataSource).to.be.instanceOf(DataSource);

            return dataSource.postGetter(stubPost.id, {})
                .then(() => {
                    throw new Error("Wtf? This should've thrown");
                })
                .catch(error => {
                    expect(error).to.be.ok;
                    expect(error.message).to.match(/Please specify an actual postGetter implementation/);
                });
        });

        it("calls implementation", async function () {
            const dataSource = new DummyDataSource(stubType, stubServiceClient);
            expect(dataSource).to.be.instanceOf(DummyDataSource);

            const postRecieved = await dataSource.postGetter(stubPost.id, {});
            expect(postRecieved).to.eql(stubPost);
            expect(stubPostGetter.calledOnce).to.eql(true);
        });
    });

    describe("#getPost", function () {
        it("calls all hooks", async function () {
            const dataSource = new DummyDataSource(stubType, stubServiceClient);
            expect(dataSource).to.be.instanceOf(DummyDataSource);

            const stubParams = {};
            const post = await dataSource.getPost(stubPost.id, stubParams);

            expect(post).to.be.ok;
            expect(post).to.eql(stubPost);
            expect(stubBeforePostGetter.calledOnce).to.eql(true);
            expect(stubBeforePostGetter.calledWith(stubPost.id, stubParams)).to.eql(true);
            expect(stubPostGetter.calledOnce).to.eql(true);
            expect(stubPostGetter.calledWith(stubPost.id, stubParams)).to.eql(true);
            expect(stubAfterPostGetter.calledOnce).to.eql(true);
            expect(stubAfterPostGetter.calledWith(stubPost, stubParams)).to.eql(true);
        });
    });

    describe("#jsonToPost", function () {
        it("requires implementation", function () {
            const dataSource = new DataSource(stubType, stubServiceClient);
            expect(dataSource).to.be.instanceOf(DataSource);
            expect(() => dataSource.jsonToPost(stubPost.toJSON())).to.throw(/Please specify an actual Post transformation/);
        });

        it("calls implementation", function () {
            const dataSource = new DummyDataSource(stubType, stubServiceClient);
            expect(dataSource).to.be.instanceOf(DummyDataSource);
            expect(dataSource.jsonToPost(stubPost.toJSON())).to.be.instanceof(Post);
            expect(stubJsonToPost.calledOnce).to.eql(true);
        });
    });
});
