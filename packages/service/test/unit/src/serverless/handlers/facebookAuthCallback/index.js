import {RequestError, requestErrorCodeToHttpStatusCode} from "@randy.tarampi/js";
import {responseBuilder} from "@randy.tarampi/serverless";
import {expect} from "chai";
import sinon from "sinon";
import {AuthInfoSearchParams} from "../../../../../../src/lib/authInfoSearchParams.js";
import esmock from "../../../../../lib/esmock.js";

afterEach(function () {
    sinon.restore();
});

describe("facebookAuthCallback", function () {
    this.timeout(5000);

    it("delegates to `FacebookAuthInfo.getRecord`", async function () {
        const stubCode = "grr";
        const stubEvent = {queryStringParameters: {code: stubCode}};
        const stubContext = {};
        const stubToken = {access_token: "woof", user: {id: "meow"}};
        const expectedResponse = responseBuilder(stubToken);

        const getRecordStub = sinon.stub().callsFake((code, searchParams) => {
            expect(code).to.eql(stubCode);
            expect(searchParams).to.eql(new AuthInfoSearchParams({
                clientId: process.env.FACEBOOK_API_KEY,
                clientSecret: process.env.FACEBOOK_API_SECRET,
                redirectUri: process.env.FACEBOOK_AUTH_CALLBACK_URI,
                code: stubCode
            }));
            return Promise.resolve(stubToken);
        });
        const StubFacebookAuthInfo = function StubFacebookAuthInfo() {
            this.getRecord = getRecordStub;
        };

        const configureEnvironmentStub = sinon.stub().resolves();
        const returnErrorResponseStub = sinon.stub().returns(sinon.stub());

        const {default: facebookAuthCallback} = await esmock("../../../../../../src/serverless/handlers/facebookAuthCallback/index.js", import.meta.url, {
            "../../../../../../src/lib/sources/facebook/authInfo.js": {FacebookAuthInfo: StubFacebookAuthInfo},
            "../../../../../../src/serverless/util/configureEnvironment.js": {default: configureEnvironmentStub},
            "../../../../../../src/serverless/util/response/returnErrorResponse.js": {default: returnErrorResponseStub}
        });

        await new Promise((resolve, reject) => {
            const stubCallback = (error, postResponse) => {
                try {
                    expect(error).to.not.be.ok;
                    expect(postResponse).to.eql(expectedResponse);
                    expect(configureEnvironmentStub.calledOnce).to.eql(true);
                    expect(returnErrorResponseStub.calledOnce).to.eql(true);
                    expect(getRecordStub.calledOnce).to.eql(true);
                    resolve();
                } catch (expectationError) {
                    reject(expectationError);
                }
            };

            facebookAuthCallback(stubEvent, stubContext, stubCallback);
        });
    });

    it("`returnErrorResponse` on error", async function () {
        const stubCode = "grr";
        const stubEvent = {queryStringParameters: {code: stubCode}};
        const stubContext = {};
        // NOTE-RT: `responseBuilder` (from `@randy.tarampi/serverless`, which can't be mocked - see the
        // note atop `cachePosts`'s test) throws when handed a circular object, since it internally
        // `JSON.stringify`s the token - this is used here to genuinely trigger the error path.
        const stubToken = {access_token: "woof", user: {id: "meow"}};
        stubToken.self = stubToken;

        const StubFacebookAuthInfo = function StubFacebookAuthInfo() {
            this.getRecord = sinon.stub().callsFake((code, searchParams) => {
                expect(code).to.eql(stubCode);
                expect(searchParams).to.eql(new AuthInfoSearchParams({
                    clientId: process.env.FACEBOOK_API_KEY,
                    clientSecret: process.env.FACEBOOK_API_SECRET,
                    redirectUri: process.env.FACEBOOK_AUTH_CALLBACK_URI,
                    code: stubCode
                }));
                return Promise.resolve(stubToken);
            });
        };

        const configureEnvironmentStub = sinon.stub().resolves();
        const errorHandlerStub = sinon.stub();
        const returnErrorResponseStub = sinon.stub().returns(errorHandlerStub);

        const {default: facebookAuthCallback} = await esmock("../../../../../../src/serverless/handlers/facebookAuthCallback/index.js", import.meta.url, {
            "../../../../../../src/lib/sources/facebook/authInfo.js": {FacebookAuthInfo: StubFacebookAuthInfo},
            "../../../../../../src/serverless/util/configureEnvironment.js": {default: configureEnvironmentStub},
            "../../../../../../src/serverless/util/response/returnErrorResponse.js": {default: returnErrorResponseStub}
        });

        await new Promise((resolve, reject) => {
            const stubCallback = () => {
                throw new Error("Wtf? This should've thrown");
            };

            const stubErrorCallback = error => {
                try {
                    expect(error.message).to.match(/circular structure/i);
                    resolve();
                } catch (expectationError) {
                    reject(expectationError);
                }
            };

            errorHandlerStub.callsFake(stubErrorCallback);
            facebookAuthCallback(stubEvent, stubContext, stubCallback);
        });
    });

    it("throws if no `code` provided", async function () {
        const stubEvent = {queryStringParameters: {}};
        const stubContext = {};

        const getRecordStub = sinon.stub().callsFake((code, searchParams) => {
            expect(code).to.eql(undefined);
            expect(searchParams).to.eql(new AuthInfoSearchParams({
                clientId: process.env.FACEBOOK_API_KEY,
                clientSecret: process.env.FACEBOOK_API_SECRET,
                redirectUri: process.env.FACEBOOK_AUTH_CALLBACK_URI,
                code: undefined
            }));
            return Promise.resolve({access_token: "woof", user: {id: "meow"}});
        });
        const StubFacebookAuthInfo = function StubFacebookAuthInfo() {
            this.getRecord = getRecordStub;
        };

        const configureEnvironmentStub = sinon.stub().resolves();
        const errorHandlerStub = sinon.stub();
        const returnErrorResponseStub = sinon.stub().returns(errorHandlerStub);

        const {default: facebookAuthCallback} = await esmock("../../../../../../src/serverless/handlers/facebookAuthCallback/index.js", import.meta.url, {
            "../../../../../../src/lib/sources/facebook/authInfo.js": {FacebookAuthInfo: StubFacebookAuthInfo},
            "../../../../../../src/serverless/util/configureEnvironment.js": {default: configureEnvironmentStub},
            "../../../../../../src/serverless/util/response/returnErrorResponse.js": {default: returnErrorResponseStub}
        });

        await new Promise((resolve, reject) => {
            const stubCallback = () => {
                throw new Error("Wtf? This should've thrown");
            };

            const stubErrorCallback = error => {
                try {
                    expect(error.message).to.eql("Tried to handle Facebook authentication response, but no `code` was received");
                    expect(error.code).to.eql(RequestError.codes.badRequest);
                    expect(error.statusCode).to.eql(requestErrorCodeToHttpStatusCode[RequestError.codes.badRequest]);
                    expect(getRecordStub.notCalled).to.eql(true);
                    resolve();
                } catch (expectationError) {
                    reject(expectationError);
                }
            };

            errorHandlerStub.callsFake(stubErrorCallback);
            facebookAuthCallback(stubEvent, stubContext, stubCallback);
        });
    });
});
