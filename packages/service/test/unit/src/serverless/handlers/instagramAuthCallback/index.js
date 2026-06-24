import {RequestError, requestErrorCodeToHttpStatusCode} from "@randy.tarampi/js";
import {expect} from "chai";
import sinon from "sinon";
import {AuthInfoSearchParams} from "../../../../../../src/lib/authInfoSearchParams";
import {freshRequire} from "../../../../../lib/freshRequire";

afterEach(function () {
    sinon.restore();
});

describe("instagramAuthCallback", function () {
    this.timeout(5000);

    it("delegates to `InstagramAuthInfo.getRecord`", async function () {
        const stubCode = "grr";
        const stubEvent = {queryStringParameters: {code: stubCode}};
        const stubContext = {};
        const stubToken = {access_token: "woof", user_id: "meow"};
        const stubResponse = ["meow"];

        const instagramAuthInfoModule = freshRequire("../../../../../../src/lib/sources/instagram/authInfo.js");
        const getRecordStub = sinon.stub().callsFake((code, searchParams) => {
            expect(code).to.eql(stubCode);
            expect(searchParams).to.eql(new AuthInfoSearchParams({
                clientId: process.env.INSTAGRAM_API_KEY,
                clientSecret: process.env.INSTAGRAM_API_SECRET,
                redirectUri: process.env.INSTAGRAM_AUTH_CALLBACK_URI,
                code: stubCode
            }));
            return Promise.resolve(stubToken);
        });
        sinon.stub(instagramAuthInfoModule, "InstagramAuthInfo").callsFake(function StubInstagramAuthInfo() {
            this.getRecord = getRecordStub;
        });

        const configureEnvironmentModule = freshRequire("../../../../../../src/serverless/util/configureEnvironment.js");
        sinon.stub(configureEnvironmentModule, "default").resolves();

        const serverlessModule = freshRequire("@randy.tarampi/serverless");
        sinon.stub(serverlessModule, "responseBuilder").callsFake(token => {
            expect(token).to.eql(stubToken);
            return stubResponse;
        });

        const returnErrorResponseModule = freshRequire("../../../../../../src/serverless/util/response/returnErrorResponse.js");
        sinon.stub(returnErrorResponseModule, "default").returns(sinon.stub());

        const instagramAuthCallback = freshRequire("../../../../../../src/serverless/handlers/instagramAuthCallback").default;

        await new Promise((resolve, reject) => {
            const stubCallback = (error, postResponse) => {
                try {
                    expect(error).to.not.be.ok;
                    expect(postResponse).to.eql(stubResponse);
                    expect(configureEnvironmentModule.default.calledOnce).to.eql(true);
                    expect(serverlessModule.responseBuilder.calledOnce).to.eql(true);
                    expect(returnErrorResponseModule.default.calledOnce).to.eql(true);
                    expect(getRecordStub.calledOnce).to.eql(true);
                    resolve();
                } catch (expectationError) {
                    reject(expectationError);
                }
            };

            instagramAuthCallback(stubEvent, stubContext, stubCallback);
        });
    });

    it("`returnErrorResponse` on error", async function () {
        const stubCode = "grr";
        const stubEvent = {queryStringParameters: {code: stubCode}};
        const stubContext = {};
        const stubToken = {access_token: "woof", user_id: "meow"};
        const stubError = new Error("woof");

        const instagramAuthInfoModule = freshRequire("../../../../../../src/lib/sources/instagram/authInfo.js");
        sinon.stub(instagramAuthInfoModule, "InstagramAuthInfo").callsFake(function StubInstagramAuthInfo() {
            this.getRecord = sinon.stub().callsFake((code, searchParams) => {
                expect(code).to.eql(stubCode);
                expect(searchParams).to.eql(new AuthInfoSearchParams({
                    clientId: process.env.INSTAGRAM_API_KEY,
                    clientSecret: process.env.INSTAGRAM_API_SECRET,
                    redirectUri: process.env.INSTAGRAM_AUTH_CALLBACK_URI,
                    code: stubCode
                }));
                return Promise.resolve(stubToken);
            });
        });

        const configureEnvironmentModule = freshRequire("../../../../../../src/serverless/util/configureEnvironment.js");
        sinon.stub(configureEnvironmentModule, "default").resolves();

        const serverlessModule = freshRequire("@randy.tarampi/serverless");
        sinon.stub(serverlessModule, "responseBuilder").throws(stubError);

        const returnErrorResponseModule = freshRequire("../../../../../../src/serverless/util/response/returnErrorResponse.js");
        const errorHandlerStub = sinon.stub();
        sinon.stub(returnErrorResponseModule, "default").returns(errorHandlerStub);

        const instagramAuthCallback = freshRequire("../../../../../../src/serverless/handlers/instagramAuthCallback").default;

        await new Promise((resolve, reject) => {
            const stubCallback = () => {
                throw new Error("Wtf? This should've thrown");
            };

            const stubErrorCallback = error => {
                try {
                    expect(error.message).to.eql(stubError.message);
                    resolve();
                } catch (expectationError) {
                    reject(expectationError);
                }
            };

            errorHandlerStub.callsFake(stubErrorCallback);
            instagramAuthCallback(stubEvent, stubContext, stubCallback);
        });
    });

    it("throws if no `code` provided", async function () {
        const stubEvent = {queryStringParameters: {}};
        const stubContext = {};

        const instagramAuthInfoModule = freshRequire("../../../../../../src/lib/sources/instagram/authInfo.js");
        const getRecordStub = sinon.stub().callsFake((code, searchParams) => {
            expect(code).to.eql(undefined);
            expect(searchParams).to.eql(new AuthInfoSearchParams({
                clientId: process.env.INSTAGRAM_API_KEY,
                clientSecret: process.env.INSTAGRAM_API_SECRET,
                redirectUri: process.env.INSTAGRAM_AUTH_CALLBACK_URI,
                code: undefined
            }));
            return Promise.resolve({access_token: "woof", user_id: "meow"});
        });
        sinon.stub(instagramAuthInfoModule, "InstagramAuthInfo").callsFake(function StubInstagramAuthInfo() {
            this.getRecord = getRecordStub;
        });

        const configureEnvironmentModule = freshRequire("../../../../../../src/serverless/util/configureEnvironment.js");
        sinon.stub(configureEnvironmentModule, "default").resolves();

        const serverlessModule = freshRequire("@randy.tarampi/serverless");
        sinon.stub(serverlessModule, "responseBuilder").throws(new Error("Wtf? This should've thrown"));

        const returnErrorResponseModule = freshRequire("../../../../../../src/serverless/util/response/returnErrorResponse.js");
        const errorHandlerStub = sinon.stub();
        sinon.stub(returnErrorResponseModule, "default").returns(errorHandlerStub);

        const instagramAuthCallback = freshRequire("../../../../../../src/serverless/handlers/instagramAuthCallback").default;

        await new Promise((resolve, reject) => {
            const stubCallback = () => {
                throw new Error("Wtf? This should've thrown");
            };

            const stubErrorCallback = error => {
                try {
                    expect(error.message).to.eql("Tried to handle Instagram authentication response, but no `code` was received");
                    expect(error.code).to.eql(RequestError.codes.badRequest);
                    expect(error.statusCode).to.eql(requestErrorCodeToHttpStatusCode[RequestError.codes.badRequest]);
                    expect(getRecordStub.notCalled).to.eql(true);
                    resolve();
                } catch (expectationError) {
                    reject(expectationError);
                }
            };

            errorHandlerStub.callsFake(stubErrorCallback);
            instagramAuthCallback(stubEvent, stubContext, stubCallback);
        });
    });
});
