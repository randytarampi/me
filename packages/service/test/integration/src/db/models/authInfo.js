import {expect} from "chai";
import AuthInfoModel from "../../../../../src/db/models/authInfo";
import {AuthInfo} from "../../../../../src/lib/authInfo";

describe("AuthInfo", function () {
    this.timeout(60000);

    let stubAuthInfo;
    let stubAuthInfos;

    beforeEach(async function () {
        stubAuthInfo = new AuthInfo({
            raw: {},
            id: "woof",
            source: "Woofdy"
        });
        stubAuthInfos = [
            stubAuthInfo,
            stubAuthInfo.set("id", "meow")
        ];

        return await AuthInfoModel.dynamooseModel.query("source").eq(stubAuthInfo.source).exec()
            .then(authInfos => {
                return AuthInfoModel.dynamooseModel.batchDelete(authInfos.map(authInfo => {
                    return {id: authInfo.id, source: authInfo.source};
                }));
            });
    });

    describe("createRecord", function () {
        it("persists an AuthInfo", async function () {
            const createdAuthInfo = await AuthInfoModel.createRecord(stubAuthInfo);
            expect(createdAuthInfo.uid).to.eql(stubAuthInfo.uid);
            const authInfoFromDb = await AuthInfoModel.dynamooseModel.get({
                id: stubAuthInfo.id,
                source: stubAuthInfo.source
            });
            expect(authInfoFromDb).to.be.ok;
        });
    });

    describe("getRecord", function () {
        it("retrieves an AuthInfo", async function () {
            await AuthInfoModel.createRecords(stubAuthInfos);
            const retrievedAuthInfo = await AuthInfoModel.getRecord({
                _query: {
                    hash: {source: {eq: stubAuthInfo.source}},
                    range: {id: {eq: stubAuthInfo.id}}
                }
            });
            expect(retrievedAuthInfo.uid).to.eql(stubAuthInfo.uid);
            expect(retrievedAuthInfo.source).to.eql(stubAuthInfo.source);
        });
    });

    describe("createRecords", function () {
        it("persists multiple AuthInfos", async function () {//
            const createdAuthInfos = await AuthInfoModel.createRecords(stubAuthInfos);
            expect(createdAuthInfos).to.be.an("array");
            expect(createdAuthInfos).to.have.length(stubAuthInfos.length);
            return await Promise.all(stubAuthInfos.map(async createdAuthInfo => {
                expect(createdAuthInfo.uid).to.be.ok;
                const authInfoFromDb = await AuthInfoModel.dynamooseModel.get({
                    id: createdAuthInfo.id,
                    source: createdAuthInfo.source
                });
                expect(authInfoFromDb.uid).to.eql(createdAuthInfo.uid);
            }));
        });
    });

    describe("getRecords", function () {
        it("retrieves authInfos (source)", async function () {
            await AuthInfoModel.createRecords(stubAuthInfos);
            const retrievedAuthInfos = await AuthInfoModel.getRecords({_query: {source: {eq: stubAuthInfo.source}}});
            expect(retrievedAuthInfos).to.be.an("array");
            expect(retrievedAuthInfos).to.have.length(stubAuthInfos.length);
            return await Promise.all(retrievedAuthInfos.map(retrievedAuthInfo => {
                expect(retrievedAuthInfo.source).to.eql(stubAuthInfo.source);
            }));
        });

        it("retrieves authInfos (uid)", async function () {
            await AuthInfoModel.createRecords(stubAuthInfos);
            const retrievedAuthInfos = await AuthInfoModel.getRecords({_filter: {uid: {eq: stubAuthInfo.uid}}});
            expect(retrievedAuthInfos).to.be.an("array");
            expect(retrievedAuthInfos).to.have.length(1);
            return await Promise.all(retrievedAuthInfos.map(retrievedAuthInfo => {
                expect(retrievedAuthInfo.uid).to.eql(stubAuthInfo.uid);
            }));
        });
    });

    describe("getRecordCount", function () {
        it("retrieves authInfos (source)", async function () {
            await AuthInfoModel.createRecords(stubAuthInfos);
            const retrievedAuthInfosCount = await AuthInfoModel.getRecordCount({_query: {source: {eq: stubAuthInfo.source}}});
            expect(retrievedAuthInfosCount).to.eql(stubAuthInfos.length);
        });

        it("retrieves authInfos (uid)", async function () {
            await AuthInfoModel.createRecords(stubAuthInfos);
            const retrievedAuthInfosCount = await AuthInfoModel.getRecordCount({_filter: {uid: {eq: stubAuthInfo.uid}}});
            expect(retrievedAuthInfosCount).to.eql(1);
        });
    });
});
