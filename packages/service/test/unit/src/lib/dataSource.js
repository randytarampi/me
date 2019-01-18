import {Photo, Post} from "@randy.tarampi/js";
import {expect} from "chai";
import sinon from "sinon";
import DataSource from "../../../../src/lib/dataSource";
import SearchParams from "../../../../src/lib/searchParams";
import DummyDataSourceGenerator from "../../../lib/dummyDataSourceGenerator";

describe("DataSource", function () {
    let stubApiKey;
    let stubApiSecret;
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
    let stubInstanceToRecord;
    let DummyDataSource;

    beforeEach(function () {
        stubType = "ʕ•ᴥ•ʔ";
        stubServiceClient = {"ʕ•ᴥ•ʔ": "ʕ•ᴥ•ʔ"};

        stubPost = Post.fromJSON({id: "woof"});
        stubPhoto = Photo.fromJSON({id: "meow"});
        stubPosts = [stubPost, stubPhoto];

        stubBeforeRecordsGetter = sinon.stub().callsFake(params => Promise.resolve(params));
        stubRecordsGetter = sinon.stub().callsFake(params => Promise.resolve(stubPosts)); // eslint-disable-line no-unused-vars
        stubAfterRecordsGetter = sinon.stub().callsFake((posts, params) => Promise.resolve(posts)); // eslint-disable-line no-unused-vars

        stubAllRecordsGetter = sinon.stub().callsFake(params => Promise.resolve(stubPosts)); // eslint-disable-line no-unused-vars

        stubBeforeRecordGetter = sinon.stub().callsFake((postId, params) => Promise.resolve(params));
        stubRecordGetter = sinon.stub().callsFake((postId, params) => Promise.resolve(stubPosts.find(post => post.id === postId) || null)); // eslint-disable-line no-unused-vars
        stubAfterRecordGetter = sinon.stub().callsFake((post, params) => Promise.resolve(post)); // eslint-disable-line no-unused-vars

        stubInstanceToRecord = sinon.stub().callsFake(postJson => postJson.id === stubPost.id ? Post.fromJSON(postJson) : Photo.fromJSON(postJson));

        DummyDataSource = DummyDataSourceGenerator({
            stubType,

            stubBeforeRecordsGetter,
            stubRecordsGetter,
            stubAfterRecordsGetter,

            stubAllRecordsGetter,

            stubBeforeRecordGetter,
            stubRecordGetter,
            stubAfterRecordGetter,

            stubInstanceToRecord
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
            const dataSource = new DummyDataSource(stubServiceClient);

            expect(dataSource.client).to.eql(stubServiceClient);
            expect(DummyDataSource.type).to.eql(stubType);
            expect(dataSource).to.be.instanceOf(DataSource);
        });
    });

    describe("isEnabled", () => {
        it("should be enabled if it can find some `_API_KEY` and some `_API_SECRET`", () => {
            const dataSource = new DummyDataSource();

            expect(dataSource.isEnabled).to.eql(true);
        });

        it("should not be enabled if it cannot find `_API_KEY`", () => {
            delete process.env[`${stubType}_API_KEY`];

            const dataSource = new DummyDataSource();

            expect(dataSource.isEnabled).to.eql(false);
        });

        it("should not be enabled if it cannot find `_API_SECRET`", () => {
            delete process.env[`${stubType}_API_SECRET`];

            const dataSource = new DummyDataSource();

            expect(dataSource.isEnabled).to.eql(false);
        });
    });

    describe("beforeRecordsGetter", function () {
        it("returns promised `searchParams`", function () {
            const stubSearchParams = {woof: true};
            const dataSource = new DataSource();

            return dataSource.beforeRecordsGetter(stubSearchParams)
                .then(searchParams => {
                    expect(searchParams).to.eql(stubSearchParams);
                });
        });
    });

    describe("recordsGetter", function () {
        it("requires implementation", async function () {
            const dataSource = new DataSource(stubServiceClient);
            expect(dataSource).to.be.instanceOf(DataSource);

            return dataSource.recordsGetter({})
                .then(() => {
                    throw new Error("Wtf? This should've thrown");
                })
                .catch(error => {
                    expect(error.message).to.match(/Please specify an actual recordsGetter implementation/);
                });
        });

        it("calls implementation", async function () {
            const dataSource = new DummyDataSource(stubServiceClient);
            expect(dataSource).to.be.instanceOf(DummyDataSource);

            const postsRecieved = await dataSource.recordsGetter(dataSource, {});
            expect(postsRecieved).to.eql(stubPosts);
            expect(stubRecordsGetter.calledOnce).to.eql(true);
        });
    });

    describe("afterRecordsGetter", function () {
        it("returns promised `posts`", function () {
            const stubSearchParams = {woof: true};
            const stubPosts = [{meow: false}];
            const dataSource = new DataSource();

            return dataSource.afterRecordsGetter(stubPosts, stubSearchParams)
                .then(posts => {
                    expect(posts).to.eql(stubPosts);
                });
        });
    });

    describe("getRecords", function () {
        it("calls all hooks", async function () {
            const dataSource = new DummyDataSource(stubServiceClient);
            expect(dataSource).to.be.instanceOf(DummyDataSource);

            const stubParams = SearchParams.fromJS();
            const posts = await dataSource.getRecords(stubParams);

            expect(posts).to.eql(stubPosts);
            expect(stubBeforeRecordsGetter.calledOnce).to.eql(true);
            expect(stubBeforeRecordsGetter.calledWith(stubParams)).to.eql(true);
            expect(stubRecordsGetter.calledOnce).to.eql(true);
            expect(stubRecordsGetter.calledWith(stubParams)).to.eql(true);
            expect(stubAfterRecordsGetter.calledOnce).to.eql(true);
            expect(stubAfterRecordsGetter.calledWith(stubPosts, stubParams)).to.eql(true);
        });
    });

    describe("allRecordsGetter", function () {
        it("requires implementation", async function () {
            const dataSource = new DataSource(stubServiceClient);
            expect(dataSource).to.be.instanceOf(DataSource);

            return dataSource.allRecordsGetter({})
                .then(() => {
                    throw new Error("Wtf? This should've thrown");
                })
                .catch(error => {
                    expect(error.message).to.match(/Please specify an actual allRecordsGetter implementation/);
                });
        });

        it("calls implementation", async function () {
            const dataSource = new DummyDataSource(stubServiceClient);
            expect(dataSource).to.be.instanceOf(DummyDataSource);

            const postsRecieved = await dataSource.allRecordsGetter(dataSource, {});
            expect(postsRecieved).to.eql(stubPosts);
            expect(stubAllRecordsGetter.calledOnce).to.eql(true);
        });
    });

    describe("getAllRecords", function () {
        it("calls all hooks", async function () {
            const dataSource = new DummyDataSource(stubServiceClient);
            expect(dataSource).to.be.instanceOf(DummyDataSource);

            const stubParams = SearchParams.fromJS();
            const posts = await dataSource.getAllRecords(stubParams);

            expect(posts).to.eql(stubPosts);
            expect(stubBeforeRecordsGetter.calledOnce).to.eql(true);
            expect(stubBeforeRecordsGetter.calledWith(stubParams)).to.eql(true);
            expect(stubAllRecordsGetter.calledOnce).to.eql(true);
            expect(stubAllRecordsGetter.calledWith(stubParams)).to.eql(true);
            expect(stubAfterRecordsGetter.calledOnce).to.eql(true);
            expect(stubAfterRecordsGetter.calledWith(stubPosts, stubParams)).to.eql(true);
        });
    });

    describe("beforeRecordGetter", function () {
        it("returns promised `searchParams`", function () {
            const stubSearchParams = {woof: true};
            const stubPostId = "meow";
            const dataSource = new DataSource();

            return dataSource.beforeRecordGetter(stubPostId, stubSearchParams)
                .then(searchParams => {
                    expect(searchParams).to.eql(stubSearchParams);
                });
        });
    });

    describe("recordGetter", function () {
        it("requires implementation", function () {
            const dataSource = new DataSource(stubServiceClient);
            expect(dataSource).to.be.instanceOf(DataSource);

            return dataSource.recordGetter(stubPost.id, {})
                .then(() => {
                    throw new Error("Wtf? This should've thrown");
                })
                .catch(error => {
                    expect(error.message).to.match(/Please specify an actual recordGetter implementation/);
                });
        });

        it("calls implementation", async function () {
            const dataSource = new DummyDataSource(stubServiceClient);
            expect(dataSource).to.be.instanceOf(DummyDataSource);

            const postRecieved = await dataSource.recordGetter(stubPost.id, {});
            expect(postRecieved).to.eql(stubPost);
            expect(stubRecordGetter.calledOnce).to.eql(true);
        });
    });

    describe("afterRecordGetter", function () {
        it("returns promised `posts`", function () {
            const stubSearchParams = {woof: true};
            const stubPost = {meow: false};
            const dataSource = new DataSource();

            return dataSource.afterRecordGetter(stubPost, stubSearchParams)
                .then(post => {
                    expect(post).to.eql(stubPost);
                });
        });
    });

    describe("getRecord", function () {
        it("calls all hooks", async function () {
            const dataSource = new DummyDataSource(stubServiceClient);
            expect(dataSource).to.be.instanceOf(DummyDataSource);

            const stubParams = SearchParams.fromJS();
            const post = await dataSource.getRecord(stubPost.id, stubParams);

            expect(post).to.eql(stubPost);
            expect(stubBeforeRecordGetter.calledOnce).to.eql(true);
            expect(stubBeforeRecordGetter.calledWith(stubPost.id, stubParams)).to.eql(true);
            expect(stubRecordGetter.calledOnce).to.eql(true);
            expect(stubRecordGetter.calledWith(stubPost.id, stubParams)).to.eql(true);
            expect(stubAfterRecordGetter.calledOnce).to.eql(true);
            expect(stubAfterRecordGetter.calledWith(stubPost, stubParams)).to.eql(true);
        });
    });

    describe("instanceToRecord", function () {
        it("requires implementation", function () {
            expect(() => DataSource.instanceToRecord(stubPost.toJSON())).to.throw(/Please specify an actual Record transformation/);
        });

        it("calls implementation", function () {
            expect(DummyDataSource.instanceToRecord(stubPost.toJSON())).to.be.instanceof(Post);
            expect(stubInstanceToRecord.calledOnce).to.eql(true);
        });
    });

    describe("type", function () {
        it("requires implementation", function () {
            expect(() => DataSource.type).to.throw(/Please specify an actual Record type/);
        });

        it("calls implementation", function () {
            expect(DummyDataSource.type).to.eql(stubType);
        });
    });
});
