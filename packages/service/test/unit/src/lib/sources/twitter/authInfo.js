import {timedPromise} from "@randy.tarampi/js";
import {expect} from "chai";
import sinon from "sinon";
import {AuthInfo} from "../../../../../../src/lib/authInfo";
import AuthInfoSearchParams from "../../../../../../src/lib/authInfoSearchParams";
import CacheClient from "../../../../../../src/lib/cacheClient";
import {OAuthClient} from "../../../../../../src/lib/sources/oAuthClient";
import {
    TWITTER_ACCESS_TOKEN_URL,
    TWITTER_REQUEST_TOKEN_URL,
    TwitterAuthInfo
} from "../../../../../../src/lib/sources/twitter/authInfo";
import dummyClassesGenerator from "../../../../../lib/dummyClassesGenerator";

describe("TwitterAuthInfo", function () {
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

    let twitterAccessToken;
    let twitterAccessTokenResponse;

    beforeEach(function () {
        twitterAccessToken = "woof";
        twitterAccessTokenResponse = {
            access_token: twitterAccessToken,
            id: "woof",
            screen_name: "woofwoof"
        };
        stubAuthInfo = TwitterAuthInfo.instanceToRecord(twitterAccessTokenResponse);
        stubAuthInfos = [
            stubAuthInfo,
            stubAuthInfo.setIn(["id"], "MEOW")
        ];
        stubServiceClient = {
            getAccessToken: sinon.stub().callsFake(() => Promise.resolve(twitterAccessTokenResponse))
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
        it("should build a `TwitterAuthInfo` instance (including the default `twitter` client)", function () {
            const twitterSource = new TwitterAuthInfo();

            expect(TwitterAuthInfo.type).to.eql("twitter");
            expect(twitterSource.client).to.be.instanceOf(OAuthClient);
            expect(twitterSource.client.tokenUrl).to.eql(TWITTER_ACCESS_TOKEN_URL);
            expect(twitterSource.client.requestUrl).to.eql(TWITTER_REQUEST_TOKEN_URL);
            expect(twitterSource.cacheClient).to.not.eql(stubCacheClient);
            expect(twitterSource.cacheClient).to.be.instanceOf(CacheClient);
            expect(twitterSource.initializing).to.be.instanceOf(Promise);
            expect(twitterSource).to.be.instanceOf(TwitterAuthInfo);
        });

        it("should build a `TwitterAuthInfo` instance (with stubbed client)", function () {
            const twitterSource = new TwitterAuthInfo(stubServiceClient, stubCacheClient);

            expect(TwitterAuthInfo.type).to.eql("twitter");
            expect(twitterSource.client).to.eql(stubServiceClient);
            expect(twitterSource.cacheClient).to.eql(stubCacheClient);
            expect(twitterSource.initializing).to.be.instanceOf(Promise);
            expect(twitterSource).to.be.instanceOf(TwitterAuthInfo);
        });
    });

    describe("recordsGetter", function () {
        it("returns an empty array", function () {

            const stubAuthInfoSearchParams = new AuthInfoSearchParams({
                requestTokenVerifier: "foo"
            });
            const twitterSource = new TwitterAuthInfo(stubServiceClient, stubCacheClient);

            return twitterSource.recordsGetter(stubAuthInfoSearchParams)
                .then(authInfos => {
                    expect(authInfos).to.be.eql([]);
                    sinon.assert.notCalled(stubServiceClient.getAccessToken);
                });
        });
    });

    describe("recordGetter", function () {
        it("passes `serviceClient` the expected parameters", function () {
            const stubAuthInfoSearchParams = new AuthInfoSearchParams({
                requestTokenVerifier: "foo"
            });
            const twitterSource = new TwitterAuthInfo(stubServiceClient, stubCacheClient);

            return twitterSource.recordGetter(stubAuthInfoSearchParams.id, stubAuthInfoSearchParams)
                .then(authInfo => {
                    expect(authInfo).to.be.instanceof(AuthInfo);
                    sinon.assert.calledOnce(stubServiceClient.getAccessToken);
                    sinon.assert.calledWith(stubServiceClient.getAccessToken, stubAuthInfoSearchParams);
                });
        });

        it("returns `null` if no `requestTokenVerifier`", function () {
            const stubAuthInfoSearchParams = new AuthInfoSearchParams();
            const twitterSource = new TwitterAuthInfo(stubServiceClient, stubCacheClient);

            return twitterSource.recordGetter(stubAuthInfoSearchParams.id, stubAuthInfoSearchParams)
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
                requestTokenVerifier: "foo"
            });
            const twitterSource = new TwitterAuthInfo(stubServiceClient, stubCacheClient);

            return twitterSource.recordGetter(stubAuthInfoSearchParams.id, stubAuthInfoSearchParams)
                .then(authInfo => {
                    expect(authInfo).to.not.be.ok;
                    sinon.assert.calledOnce(stubServiceClient.getAccessToken);
                    sinon.assert.calledWith(stubServiceClient.getAccessToken, stubAuthInfoSearchParams);
                });
        });
    });
});
