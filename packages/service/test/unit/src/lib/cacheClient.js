import {Photo, Post} from "@randy.tarampi/js";
import {expect} from "chai";
import sinon from "sinon";
import CacheClient from "../../../../src/lib/cacheClient";
import PostSearchParams from "../../../../src/lib/postSearchParams";
import DummyDataClientGenerator from "../../../lib/dummyDataClientGenerator";

describe("CacheClient", function () {
    let stubType;
    let stubPost;
    let stubPhoto;
    let stubPosts;
    let stubCreateRecords;
    let stubGetRecords;
    let stubGetRecordCount;
    let stubCreateRecord;
    let stubGetRecord;
    let DummyDataClient;
    let stubDataClient;

    beforeEach(function () {
        stubType = "ʕ•ᴥ•ʔ";

        stubPost = Post.fromJSON({id: "woof"});
        stubPhoto = Photo.fromJSON({id: "meow"});
        stubPosts = [stubPost, stubPhoto];

        stubCreateRecords = sinon.stub().callsFake(posts => Promise.resolve(posts));
        stubGetRecords = sinon.stub().callsFake(params => Promise.resolve(stubPosts)); // eslint-disable-line no-unused-vars
        stubGetRecordCount = sinon.stub().callsFake(params => Promise.resolve(stubPosts.length)); // eslint-disable-line no-unused-vars

        stubCreateRecord = sinon.stub().callsFake(post => Promise.resolve(post));
        stubGetRecord = sinon.stub().callsFake(params => Promise.resolve(stubPost)); // eslint-disable-line no-unused-vars

        DummyDataClient = DummyDataClientGenerator({
            stubGetRecords,
            stubGetRecordCount,
            stubCreateRecords,

            stubGetRecord,
            stubCreateRecord
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

    describe("setRecords", function () {
        it("delegates to dataClient.createRecords", async function () {
            const cacheClient = new CacheClient(undefined, stubDataClient);
            expect(cacheClient).to.be.instanceOf(CacheClient);

            const createdPosts = await cacheClient.setRecords(stubPosts);
            expect(createdPosts).to.be.ok;
            expect(stubCreateRecords.calledOnce).to.eql(true);
            expect(stubCreateRecords.calledWith(stubPosts)).to.eql(true);
        });

        it("swallows errors", async function () {
            stubCreateRecords = sinon.stub().callsFake(() => Promise.reject(new Error("💥")));

            DummyDataClient = DummyDataClientGenerator({
                stubGetRecords,
                stubGetRecordCount,
                stubCreateRecords,

                stubGetRecord,
                stubCreateRecord
            });
            stubDataClient = new DummyDataClient();

            const cacheClient = new CacheClient(undefined, stubDataClient);
            expect(cacheClient).to.be.instanceOf(CacheClient);

            const createdPosts = await cacheClient.setRecords(stubPosts);
            expect(createdPosts).to.not.be.ok;
            expect(stubCreateRecords.calledOnce).to.eql(true);
            expect(stubCreateRecords.calledWith(stubPosts)).to.eql(true);
        });
    });

    describe("getRecords", function () {
        it("delegates to dataClient.getRecords", async function () {
            const cacheClient = new CacheClient(undefined, stubDataClient);
            expect(cacheClient).to.be.instanceOf(CacheClient);

            const stubParams = PostSearchParams.fromJS();

            const retrievedPosts = await cacheClient.getRecords(stubParams);
            expect(retrievedPosts).to.be.ok;
            expect(stubGetRecords.calledOnce).to.eql(true);
            sinon.assert.calledWith(stubGetRecords, stubParams[cacheClient.type]);
        });

        it("swallows errors", async function () {
            stubGetRecords = sinon.stub().returns(Promise.reject(new Error("💥")));

            DummyDataClient = DummyDataClientGenerator({
                stubGetRecords,
                stubGetRecordCount,
                stubCreateRecords,

                stubGetRecord,
                stubCreateRecord
            });
            stubDataClient = new DummyDataClient();

            const cacheClient = new CacheClient(undefined, stubDataClient);
            expect(cacheClient).to.be.instanceOf(CacheClient);

            const stubParams = PostSearchParams.fromJS();

            const retrievedPosts = await cacheClient.getRecords(stubParams);
            expect(retrievedPosts).to.not.be.ok;
            expect(stubGetRecords.calledOnce).to.eql(true);
            sinon.assert.calledWith(stubGetRecords, stubParams[cacheClient.type]);
        });
    });

    describe("getRecordCount", function () {
        it("delegates to dataClient.getRecordCount", async function () {
            const cacheClient = new CacheClient(undefined, stubDataClient);
            expect(cacheClient).to.be.instanceOf(CacheClient);

            const stubParams = PostSearchParams.fromJS();

            const retrievedPosts = await cacheClient.getRecordCount(stubParams);
            expect(retrievedPosts).to.eql(stubPosts.length);
            expect(stubGetRecordCount.calledOnce).to.eql(true);
            sinon.assert.calledWith(stubGetRecordCount, stubParams[cacheClient.type]);
        });

        it("swallows errors", async function () {
            stubGetRecordCount = sinon.stub().returns(Promise.reject(new Error("💥")));

            DummyDataClient = DummyDataClientGenerator({
                stubGetRecords,
                stubGetRecordCount,
                stubCreateRecords,

                stubGetRecord,
                stubCreateRecord
            });
            stubDataClient = new DummyDataClient();

            const cacheClient = new CacheClient(undefined, stubDataClient);
            expect(cacheClient).to.be.instanceOf(CacheClient);

            const stubParams = PostSearchParams.fromJS();

            const retrievedPosts = await cacheClient.getRecordCount(stubParams);
            expect(retrievedPosts).to.not.be.ok;
            expect(stubGetRecordCount.calledOnce).to.eql(true);
            sinon.assert.calledWith(stubGetRecordCount, stubParams[cacheClient.type]);
        });
    });

    describe("setRecord", function () {
        it("delegates to dataClient.createRecord", async function () {
            const cacheClient = new CacheClient(undefined, stubDataClient);
            expect(cacheClient).to.be.instanceOf(CacheClient);

            const createdPost = await cacheClient.setRecord(stubPost);
            expect(createdPost).to.be.instanceOf(Post);
            expect(createdPost).to.eql(stubPost);
            expect(stubCreateRecord.calledOnce).to.eql(true);
            expect(stubCreateRecord.calledWith(stubPost)).to.eql(true);
        });

        it("swallows errors", async function () {
            stubCreateRecord = sinon.stub().callsFake(post => Promise.reject(new Error("💥"))); // eslint-disable-line no-unused-vars

            DummyDataClient = DummyDataClientGenerator({
                stubGetRecords,
                stubGetRecordCount,
                stubCreateRecords,

                stubGetRecord,
                stubCreateRecord
            });
            stubDataClient = new DummyDataClient();

            const cacheClient = new CacheClient(undefined, stubDataClient);
            expect(cacheClient).to.be.instanceOf(CacheClient);

            const createdPost = await cacheClient.setRecord(stubPost);
            expect(createdPost).to.not.be.ok;
            expect(stubCreateRecord.calledOnce).to.eql(true);
            expect(stubCreateRecord.calledWith(stubPost)).to.eql(true);
        });
    });

    describe("getRecord", function () {
        it("delegates to dataClient.getRecord", async function () {
            const cacheClient = new CacheClient(undefined, stubDataClient);
            expect(cacheClient).to.be.instanceOf(CacheClient);

            const stubParams = PostSearchParams.fromJS();
            const retrievedPost = await cacheClient.getRecord(stubParams);
            expect(retrievedPost).to.be.instanceOf(Post);
            expect(retrievedPost).to.eql(stubPost);
            expect(stubGetRecord.calledOnce).to.eql(true);
            sinon.assert.calledWith(stubGetRecord, stubParams[cacheClient.type]);
        });

        it("swallows errors", async function () {
            stubGetRecord = sinon.stub().returns(Promise.reject(new Error("💥")));

            DummyDataClient = DummyDataClientGenerator({
                stubGetRecords,
                stubGetRecordCount,
                stubCreateRecords,

                stubGetRecord,
                stubCreateRecord
            });
            stubDataClient = new DummyDataClient();

            const cacheClient = new CacheClient(undefined, stubDataClient);
            expect(cacheClient).to.be.instanceOf(CacheClient);

            const stubParams = PostSearchParams.fromJS();
            const retrievedPost = await cacheClient.getRecord(stubParams);
            expect(retrievedPost).to.not.be.ok;
            expect(stubGetRecord.calledOnce).to.eql(true);
            sinon.assert.calledWith(stubGetRecord, stubParams[cacheClient.type]);
        });
    });
});
