import {RequestError, requestErrorCodeToHttpStatusCode} from "@randy.tarampi/js";
import {responseBuilder} from "@randy.tarampi/serverless";
import {expect} from "chai";
import sinon from "sinon";
import {AuthInfoSearchParams} from "../../../../../../src/lib/authInfoSearchParams.js";
import esmock from "../../../../../lib/esmock.js";

afterEach(function () {
    sinon.restore();
});

describe("twitterAuthCallback", function () {
    this.timeout(5000);

    it("delegates to `TwitterAuthInfo.getRecord`", async function () {
        const stubRequestToken = "grr";
        const stubRequestTokenSecret = "rawr";
        const stubRequestTokenVerifier = "argh";
        const stubEvent = {queryStringParameters: {oauth_token: stubRequestToken, oauth_token_secret: stubRequestTokenSecret, oauth_verifier: stubRequestTokenVerifier}};
        const stubContext = {};
        const stubToken = {token: "woof", tokenSecret: "meow"};
        const expectedResponse = responseBuilder(stubToken);

        const getRecordStub = sinon.stub().callsFake((requestToken, searchParams) => {
            expect(requestToken).to.eql(stubRequestToken);
            expect(searchParams).to.eql(new AuthInfoSearchParams({
                clientId: process.env.TWITTER_API_KEY,
                clientSecret: process.env.TWITTER_API_SECRET,
                requestToken: stubRequestToken,
                requestTokenSecret: stubRequestTokenSecret,
                requestTokenVerifier: stubRequestTokenVerifier
            }));
            return Promise.resolve(stubToken);
        });
        const StubTwitterAuthInfo = function StubTwitterAuthInfo() {
            this.getRecord = getRecordStub;
        };

        const configureEnvironmentStub = sinon.stub().resolves();
        const returnErrorResponseStub = sinon.stub().returns(sinon.stub());

        const {default: twitterAuthCallback} = await esmock("../../../../../../src/serverless/handlers/twitterAuthCallback/index.js", import.meta.url, {
            "../../../../../../src/lib/sources/twitter/authInfo.js": {TwitterAuthInfo: StubTwitterAuthInfo},
            "../../../../../../src/serverless/util/configureEnvironment.js": {default: configureEnvironmentStub},
            "../../../../../../src/serverless/util/response/returnErrorResponse.js": {default: returnErrorResponseStub}
        });

        await new Promise((resolve, reject) => {
            const stubCallback = (error, postResponse) => {
                try {
                    expect(error).to.be.null;
                    expect(postResponse).to.eql(expectedResponse);
                    resolve();
                } catch (expectationError) {
                    reject(expectationError);
                }
            };

            twitterAuthCallback(stubEvent, stubContext, stubCallback);
        });
    });

    it("`returnErrorResponse` on error", async function () {
        const stubRequestToken = "grr";
        const stubRequestTokenSecret = "rawr";
        const stubRequestTokenVerifier = "argh";
        const stubEvent = {queryStringParameters: {oauth_token: stubRequestToken, oauth_token_secret: stubRequestTokenSecret, oauth_verifier: stubRequestTokenVerifier}};
        const stubContext = {};
        const stubToken = {token: "woof", tokenSecret: "meow"};

        const StubTwitterAuthInfo = function StubTwitterAuthInfo() {
            this.getRecord = sinon.stub().callsFake((requestToken, searchParams) => {
                expect(requestToken).to.eql(stubRequestToken);
                expect(searchParams).to.eql(new AuthInfoSearchParams({
                    clientId: process.env.TWITTER_API_KEY,
                    clientSecret: process.env.TWITTER_API_SECRET,
                    requestToken: stubRequestToken,
                    requestTokenSecret: stubRequestTokenSecret,
                    requestTokenVerifier: stubRequestTokenVerifier
                }));
                return Promise.resolve(stubToken);
            });
        };

        const configureEnvironmentStub = sinon.stub().resolves();
        const errorHandlerStub = sinon.stub();
        const returnErrorResponseStub = sinon.stub().returns(errorHandlerStub);

        const {default: twitterAuthCallback} = await esmock("../../../../../../src/serverless/handlers/twitterAuthCallback/index.js", import.meta.url, {
            "../../../../../../src/lib/sources/twitter/authInfo.js": {TwitterAuthInfo: StubTwitterAuthInfo},
            "../../../../../../src/serverless/util/configureEnvironment.js": {default: configureEnvironmentStub},
            "../../../../../../src/serverless/util/response/returnErrorResponse.js": {default: returnErrorResponseStub}
        });

        twitterAuthCallback(stubEvent, stubContext, () => {});
        return Promise.resolve();
    });

    it("throws if no `code` provided", async function () {
        const stubEvent = {queryStringParameters: {}};
        const stubContext = {};

        const getRecordStub = sinon.stub().callsFake((requestToken, searchParams) => {
            expect(requestToken).to.eql(undefined);
            expect(searchParams).to.eql(new AuthInfoSearchParams({
                clientId: process.env.TWITTER_API_KEY,
                clientSecret: process.env.TWITTER_API_SECRET,
                requestToken: undefined,
                requestTokenSecret: undefined,
                requestTokenVerifier: undefined
            }));
            return Promise.resolve({token: "woof", tokenSecret: "meow"});
        });
        const StubTwitterAuthInfo = function StubTwitterAuthInfo() {
            this.getRecord = getRecordStub;
        };

        const configureEnvironmentStub = sinon.stub().resolves();
        const errorHandlerStub = sinon.stub();
        const returnErrorResponseStub = sinon.stub().returns(errorHandlerStub);

        const {default: twitterAuthCallback} = await esmock("../../../../../../src/serverless/handlers/twitterAuthCallback/index.js", import.meta.url, {
            "../../../../../../src/lib/sources/twitter/authInfo.js": {TwitterAuthInfo: StubTwitterAuthInfo},
            "../../../../../../src/serverless/util/configureEnvironment.js": {default: configureEnvironmentStub},
            "../../../../../../src/serverless/util/response/returnErrorResponse.js": {default: returnErrorResponseStub}
        });

        twitterAuthCallback(stubEvent, stubContext, () => {});
        return Promise.resolve();
    });
});
