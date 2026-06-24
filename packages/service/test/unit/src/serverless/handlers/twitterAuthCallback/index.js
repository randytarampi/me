import {RequestError, requestErrorCodeToHttpStatusCode} from "@randy.tarampi/js";
import {expect} from "chai";
import sinon from "sinon";
import {AuthInfoSearchParams} from "../../../../../../src/lib/authInfoSearchParams";
import {freshRequire} from "../../../../../lib/freshRequire";
import path from "path";

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
        const stubResponse = ["meow"];

        const twitterAuthInfoModule = freshRequire(path.resolve(__dirname, "../../../../../../src/lib/sources/twitter/authInfo.js"));
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
        sinon.stub(twitterAuthInfoModule, "TwitterAuthInfo").callsFake(function StubTwitterAuthInfo() {
            this.getRecord = getRecordStub;
        });

        const configureEnvironmentModule = freshRequire(path.resolve(__dirname, "../../../../../../src/serverless/util/configureEnvironment.js"));
        sinon.stub(configureEnvironmentModule, "default").resolves();

        const serverlessModule = freshRequire("@randy.tarampi/serverless");
        sinon.stub(serverlessModule, "responseBuilder").callsFake(token => {
            expect(token).to.eql(stubToken);
            return stubResponse;
        });

        const returnErrorResponseModule = freshRequire(path.resolve(__dirname, "../../../../../../src/serverless/util/response/returnErrorResponse.js"));
        sinon.stub(returnErrorResponseModule, "default").returns(sinon.stub());

        const twitterAuthCallback = freshRequire(path.resolve(__dirname, "../../../../../../src/serverless/handlers/twitterAuthCallback")).default;

        await new Promise((resolve, reject) => {
            const stubCallback = (error, postResponse) => {
                try {
                    expect(error).to.be.ok;
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
        const stubError = new Error("woof");

        const twitterAuthInfoModule = freshRequire(path.resolve(__dirname, "../../../../../../src/lib/sources/twitter/authInfo.js"));
        sinon.stub(twitterAuthInfoModule, "TwitterAuthInfo").callsFake(function StubTwitterAuthInfo() {
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
        });

        const configureEnvironmentModule = freshRequire(path.resolve(__dirname, "../../../../../../src/serverless/util/configureEnvironment.js"));
        sinon.stub(configureEnvironmentModule, "default").resolves();

        const serverlessModule = freshRequire("@randy.tarampi/serverless");
        sinon.stub(serverlessModule, "responseBuilder").throws(stubError);

        const returnErrorResponseModule = freshRequire(path.resolve(__dirname, "../../../../../../src/serverless/util/response/returnErrorResponse.js"));
        const errorHandlerStub = sinon.stub();
        sinon.stub(returnErrorResponseModule, "default").returns(errorHandlerStub);

        const twitterAuthCallback = freshRequire(path.resolve(__dirname, "../../../../../../src/serverless/handlers/twitterAuthCallback")).default;

        twitterAuthCallback(stubEvent, stubContext, () => {});
        return Promise.resolve();
    });

    it("throws if no `code` provided", async function () {
        const stubEvent = {queryStringParameters: {}};
        const stubContext = {};

        const twitterAuthInfoModule = freshRequire(path.resolve(__dirname, "../../../../../../src/lib/sources/twitter/authInfo.js"));
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
        sinon.stub(twitterAuthInfoModule, "TwitterAuthInfo").callsFake(function StubTwitterAuthInfo() {
            this.getRecord = getRecordStub;
        });

        const configureEnvironmentModule = freshRequire(path.resolve(__dirname, "../../../../../../src/serverless/util/configureEnvironment.js"));
        sinon.stub(configureEnvironmentModule, "default").resolves();

        const serverlessModule = freshRequire("@randy.tarampi/serverless");
        sinon.stub(serverlessModule, "responseBuilder").throws(new Error("Wtf? This should've thrown"));

        const returnErrorResponseModule = freshRequire(path.resolve(__dirname, "../../../../../../src/serverless/util/response/returnErrorResponse.js"));
        const errorHandlerStub = sinon.stub();
        sinon.stub(returnErrorResponseModule, "default").returns(errorHandlerStub);

        const twitterAuthCallback = freshRequire(path.resolve(__dirname, "../../../../../../src/serverless/handlers/twitterAuthCallback")).default;

        twitterAuthCallback(stubEvent, stubContext, () => {});
        return Promise.resolve();
    });
});
