import {expect} from "chai";
import sinon from "sinon";
import {AuthInfo} from "../../../../../../src/lib/authInfo";
import AuthInfoSearchParams from "../../../../../../src/lib/authInfoSearchParams";
import CacheClient from "../../../../../../src/lib/cacheClient";
import {INSTAGRAM_TOKEN_URL, InstagramAuthInfo} from "../../../../../../src/lib/sources/instagram/authInfo";
import {OAuthClient} from "../../../../../../src/lib/sources/oAuthClient";
import dummyClassesGenerator from "../../../../../lib/dummyClassesGenerator";
import {timedPromise} from "../../../../../lib/util";

describe("InstagramAuthInfo", function () {
    let stubServiceClient;
    let stubAuthInfo;
    let stubAuthInfos;
    let stubBeforeRecordsGetter;
    let stubRecordsGetter;
    let stubAfterRecordsGetter;
    let stubBeforeRecordGetter;
    let stubRecordGetter;
    let stubAfterRecordGetter;
    let stubBeforeCachedRecordsGetter;
    let stubCachedRecordsGetter;
    let stubAfterCachedRecordsGetter;
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

    let instagramUser;
    let instagramAccessToken;
    let instagramAccessTokenResponse;

    beforeEach(function () {
        instagramUser = {
            id: "woof",
            username: "woofwoof",
            full_name: "Woof Woof"
        };
        instagramAccessToken = "woof";
        instagramAccessTokenResponse = {
            access_token: instagramAccessToken,
            user: instagramUser
        };
        stubAuthInfo = InstagramAuthInfo.instanceToRecord(instagramAccessTokenResponse);
        stubAuthInfos = [
            stubAuthInfo,
            stubAuthInfo.setIn(["id"], "MEOW")
        ];
        stubServiceClient = {
            getAuthToken: sinon.stub().callsFake(() => Promise.resolve(instagramAccessTokenResponse))
        };

        stubBeforeRecordsGetter = sinon.stub().callsFake(params => timedPromise(params));
        stubRecordsGetter = sinon.stub().callsFake(params => timedPromise(stubAuthInfos)); // eslint-disable-line no-unused-vars
        stubAfterRecordsGetter = sinon.stub().callsFake((authInfos, params) => timedPromise(authInfos)); // eslint-disable-line no-unused-vars

        stubBeforeRecordGetter = sinon.stub().callsFake((postId, params) => timedPromise(params));
        stubRecordGetter = sinon.stub().callsFake((postId, params) => timedPromise(stubAuthInfos.find(authInfo => authInfo.id === postId) || null)); // eslint-disable-line no-unused-vars
        stubAfterRecordGetter = sinon.stub().callsFake((authInfo, params) => timedPromise(authInfo)); // eslint-disable-line no-unused-vars

        stubBeforeCachedRecordsGetter = sinon.stub().callsFake(params => timedPromise(params));
        stubCachedRecordsGetter = sinon.stub().callsFake(params => timedPromise(stubAuthInfos)); // eslint-disable-line no-unused-vars
        stubAfterCachedRecordsGetter = sinon.stub().callsFake((authInfos, params) => timedPromise(authInfos)); // eslint-disable-line no-unused-vars

        stubBeforeCachedRecordGetter = sinon.stub().callsFake((postId, params) => timedPromise(params));
        stubCachedRecordGetter = sinon.stub().callsFake((postId, params) => timedPromise(stubAuthInfos.find(authInfo => authInfo.id === postId) || null)); // eslint-disable-line no-unused-vars
        stubAfterCachedRecordGetter = sinon.stub().callsFake((authInfo, params) => timedPromise(authInfo)); // eslint-disable-line no-unused-vars

        stubInstanceToRecord = sinon.stub().callsFake(AuthInfo.fromJSON);

        stubCreateRecords = sinon.stub().callsFake(authInfos => timedPromise(authInfos));
        stubGetRecords = sinon.stub().callsFake(params => timedPromise(stubAuthInfos)); // eslint-disable-line no-unused-vars

        stubCreateRecord = sinon.stub().callsFake(authInfo => timedPromise(authInfo));
        stubGetRecord = sinon.stub().callsFake(params => timedPromise(stubAuthInfo)); // eslint-disable-line no-unused-vars

        dummyClassBuilderArguments = {
            stubBeforeRecordsGetter,
            stubRecordsGetter,
            stubAfterRecordsGetter,

            stubBeforeRecordGetter,
            stubRecordGetter,
            stubAfterRecordGetter,

            stubBeforeCachedRecordsGetter,
            stubCachedRecordsGetter,
            stubAfterCachedRecordsGetter,

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

        stubCacheClient = new DummyCacheClient("ᶘ ◕ᴥ◕ᶅ");
    });

    describe("constructor", function () {
        it("should build a `InstagramAuthInfo` instance (including the default `instagram` client)", function () {
            const instagramSource = new InstagramAuthInfo();

            expect(InstagramAuthInfo.type).to.eql("instagram");
            expect(instagramSource.client).to.be.instanceOf(OAuthClient);
            expect(instagramSource.client.tokenUrl).to.eql(INSTAGRAM_TOKEN_URL);
            expect(instagramSource.cacheClient).to.not.eql(stubCacheClient);
            expect(instagramSource.cacheClient).to.be.instanceOf(CacheClient);
            expect(instagramSource.initializing).to.be.instanceOf(Promise);
            expect(instagramSource).to.be.instanceOf(InstagramAuthInfo);
        });

        it("should build a `InstagramAuthInfo` instance (with stubbed client)", function () {
            const instagramSource = new InstagramAuthInfo(stubServiceClient, stubCacheClient);

            expect(InstagramAuthInfo.type).to.eql("instagram");
            expect(instagramSource.client).to.eql(stubServiceClient);
            expect(instagramSource.cacheClient).to.eql(stubCacheClient);
            expect(instagramSource.initializing).to.be.instanceOf(Promise);
            expect(instagramSource).to.be.instanceOf(InstagramAuthInfo);
        });
    });

    describe("recordGetter", function () {
        it("passes `serviceClient` the expected parameters", function () {
            const stubAuthInfoSearchParams = new AuthInfoSearchParams({
                code: "foo"
            });
            const instagramSource = new InstagramAuthInfo(stubServiceClient, stubCacheClient);

            return instagramSource.recordGetter(stubAuthInfoSearchParams.id, stubAuthInfoSearchParams)
                .then(authInfo => {
                    expect(authInfo).to.be.instanceof(AuthInfo);
                    sinon.assert.calledOnce(stubServiceClient.getAuthToken);
                    sinon.assert.calledWith(stubServiceClient.getAuthToken, stubAuthInfoSearchParams);
                });
        });

        it("returns `null` if no `code`", function () {
            const stubAuthInfoSearchParams = new AuthInfoSearchParams();
            const instagramSource = new InstagramAuthInfo(stubServiceClient, stubCacheClient);

            return instagramSource.recordGetter(stubAuthInfoSearchParams.id, stubAuthInfoSearchParams)
                .then(authInfo => {
                    expect(authInfo).to.not.be.ok;
                    sinon.assert.notCalled(stubServiceClient.getAuthToken);
                });
        });

        it("finds no authInfo", function () {
            stubServiceClient = {
                getAuthToken: sinon.stub().callsFake(() => Promise.resolve(null))
            };

            const stubAuthInfoSearchParams = new AuthInfoSearchParams({
                code: "foo"
            });
            const instagramSource = new InstagramAuthInfo(stubServiceClient, stubCacheClient);

            return instagramSource.recordGetter(stubAuthInfoSearchParams.id, stubAuthInfoSearchParams)
                .then(authInfo => {
                    expect(authInfo).to.not.be.ok;
                    sinon.assert.calledOnce(stubServiceClient.getAuthToken);
                    sinon.assert.calledWith(stubServiceClient.getAuthToken, stubAuthInfoSearchParams);
                });
        });
    });
});
