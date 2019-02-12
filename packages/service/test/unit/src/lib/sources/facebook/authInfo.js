import {timedPromise} from "@randy.tarampi/js";
import {expect} from "chai";
import sinon from "sinon";
import {AuthInfo} from "../../../../../../src/lib/authInfo";
import AuthInfoSearchParams from "../../../../../../src/lib/authInfoSearchParams";
import CacheClient from "../../../../../../src/lib/cacheClient";
import {FACEBOOK_TOKEN_URL, FacebookAuthInfo} from "../../../../../../src/lib/sources/facebook/authInfo";
import * as facebookUtil from "../../../../../../src/lib/sources/facebook/util";
import {OAuth2Client} from "../../../../../../src/lib/sources/oAuth2Client";
import dummyClassesGenerator from "../../../../../lib/dummyClassesGenerator";

describe("FacebookAuthInfo", function () {
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

    let facebookUser;
    let facebookAccessToken;
    let facebookAccessTokenResponse;

    beforeEach(function () {
        facebookUser = {
            id: "woof",
            full_name: "Woof Woof"
        };
        facebookAccessToken = "woof";
        facebookAccessTokenResponse = {
            access_token: facebookAccessToken
        };
        stubAuthInfo = FacebookAuthInfo.instanceToRecord({
            tokenJson: facebookAccessTokenResponse,
            userJson: facebookUser
        });
        stubAuthInfos = [
            stubAuthInfo,
            stubAuthInfo.setIn(["id"], "MEOW")
        ];
        stubServiceClient = {
            getAccessToken: sinon.stub().callsFake(() => Promise.resolve(facebookAccessTokenResponse))
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

        sinon.stub(facebookUtil, "fetchFacebookEdge").returns(Promise.resolve(facebookUser));
    });

    afterEach(function () {
        facebookUtil.fetchFacebookEdge.restore();
    });

    describe("constructor", function () {
        it("should build a `FacebookAuthInfo` instance (including the default `facebook` client)", function () {
            const facebookSource = new FacebookAuthInfo();

            expect(FacebookAuthInfo.type).to.eql("facebook");
            expect(facebookSource.client).to.be.instanceOf(OAuth2Client);
            expect(facebookSource.client.tokenUrl).to.eql(FACEBOOK_TOKEN_URL);
            expect(facebookSource.cacheClient).to.not.eql(stubCacheClient);
            expect(facebookSource.cacheClient).to.be.instanceOf(CacheClient);
            expect(facebookSource.initializing).to.be.instanceOf(Promise);
            expect(facebookSource).to.be.instanceOf(FacebookAuthInfo);
        });

        it("should build a `FacebookAuthInfo` instance (with stubbed client)", function () {
            const facebookSource = new FacebookAuthInfo(stubServiceClient, stubCacheClient);

            expect(FacebookAuthInfo.type).to.eql("facebook");
            expect(facebookSource.client).to.eql(stubServiceClient);
            expect(facebookSource.cacheClient).to.eql(stubCacheClient);
            expect(facebookSource.initializing).to.be.instanceOf(Promise);
            expect(facebookSource).to.be.instanceOf(FacebookAuthInfo);
        });
    });

    describe("recordGetter", function () {
        it("passes `serviceClient` the expected parameters", function () {
            const stubAuthInfoSearchParams = new AuthInfoSearchParams({
                code: "foo"
            });
            const facebookSource = new FacebookAuthInfo(stubServiceClient, stubCacheClient);

            return facebookSource.recordGetter(stubAuthInfoSearchParams.id, stubAuthInfoSearchParams)
                .then(authInfo => {
                    expect(authInfo).to.be.instanceof(AuthInfo);
                    sinon.assert.calledOnce(stubServiceClient.getAccessToken);
                    sinon.assert.calledWith(stubServiceClient.getAccessToken, stubAuthInfoSearchParams);
                    sinon.assert.calledOnce(facebookUtil.fetchFacebookEdge);
                    sinon.assert.calledWith(facebookUtil.fetchFacebookEdge, "me", facebookAccessToken);
                });
        });

        it("returns `null` if no `code`", function () {
            const stubAuthInfoSearchParams = new AuthInfoSearchParams();
            const facebookSource = new FacebookAuthInfo(stubServiceClient, stubCacheClient);

            return facebookSource.recordGetter(stubAuthInfoSearchParams.id, stubAuthInfoSearchParams)
                .then(authInfo => {
                    expect(authInfo).to.not.be.ok;
                    sinon.assert.notCalled(stubServiceClient.getAccessToken);
                });
        });

        it("finds no authInfo", function () {
            stubServiceClient = {
                getAccessToken: sinon.stub().callsFake(() => Promise.resolve(null))
            };

            const stubAuthInfoSearchParams = new AuthInfoSearchParams({
                code: "foo"
            });
            const facebookSource = new FacebookAuthInfo(stubServiceClient, stubCacheClient);

            return facebookSource.recordGetter(stubAuthInfoSearchParams.id, stubAuthInfoSearchParams)
                .then(() => {
                    throw new Error("Wtf? This should've thrown");
                })
                .catch(error => {
                    expect(error).to.be.ok;
                    expect(error.message).to.eql("Failed to get access token with error: null");
                    sinon.assert.calledOnce(stubServiceClient.getAccessToken);
                    sinon.assert.calledWith(stubServiceClient.getAccessToken, stubAuthInfoSearchParams);
                    sinon.assert.notCalled(facebookUtil.fetchFacebookEdge);
                });
        });
    });
});
