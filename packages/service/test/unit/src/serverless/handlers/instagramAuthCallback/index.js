import {RequestError, requestErrorCodeToHttpStatusCode} from "@randy.tarampi/js";
import {expect} from "chai";
import proxyquire from "proxyquire";
import sinon from "sinon";
import {AuthInfoSearchParams} from "../../../../../../src/lib/authInfoSearchParams";

describe("instagramAuthCallback", function () {
    this.timeout(5000);

    it("delegates to `InstagramAuthInfo.getRecord`", function (done) {
        const stubCode = "grr";
        const stubEvent = {queryStringParameters: {code: stubCode}};
        const stubContext = {};
        const stubToken = {access_token: "woof", user: {id: "meow"}};
        const stubResponse = ["meow"];
        const proxyquireStubs = {
            "../../../lib/sources/instagram/authInfo": {
                "InstagramAuthInfo": class StubInstagramAuthInfo {
                    getRecord(code, searchParams) {
                        expect(code).to.eql(stubCode);
                        expect(searchParams.code).to.eql(stubCode);
                        expect(searchParams).to.eql(new AuthInfoSearchParams({
                            clientId: process.env.INSTAGRAM_API_KEY,
                            clientSecret: process.env.INSTAGRAM_API_SECRET,
                            redirectUri: process.env.INSTAGRAM_AUTH_CALLBACK_URI,
                            code: stubCode
                        }));
                        return Promise.resolve(stubToken);
                    }
                }
            },
            "../../util/configureEnvironment": {
                "default": sinon.stub().returns(Promise.resolve()),
            },
            "@randy.tarampi/serverless": {
                "responseBuilder": sinon.stub().callsFake(token => {
                    try {
                        expect(token).to.eql(stubToken);
                        return stubResponse;
                    } catch (error) {
                        done(error);
                    }
                })
            },
            "../../util/response/returnErrorResponse": {
                "default": sinon.stub().callsFake((event, context, callback) => {
                    try {
                        expect(callback).to.eql(stubCallback);
                        return stubCallback;
                    } catch (error) {
                        done(error);
                    }
                })
            }
        };
        const stubCallback = (error, postResponse) => {
            try {
                expect(error).to.not.be.ok;
                expect(postResponse).to.eql(stubResponse);
                expect(proxyquireStubs["../../util/configureEnvironment"].default.calledOnce).to.eql(true);
                expect(proxyquireStubs["@randy.tarampi/serverless"].responseBuilder.calledOnce).to.eql(true);
                expect(proxyquireStubs["../../util/response/returnErrorResponse"].default.calledOnce).to.eql(true);
                done();
            } catch (expectationError) {
                done(expectationError);
            }
        };
        const proxyquiredinstagramAuthCallback = proxyquire("../../../../../../src/serverless/handlers/instagramAuthCallback", proxyquireStubs);

        proxyquiredinstagramAuthCallback.default(stubEvent, stubContext, stubCallback);
    });

    it("`returnErrorResponse` on error", function (done) {
        const stubCode = "grr";
        const stubEvent = {queryStringParameters: {code: stubCode}};
        const stubContext = {};
        const stubToken = {access_token: "woof", user: {id: "meow"}};
        const stubError = new Error("woof");
        const proxyquireStubs = {
            "../../../lib/sources/instagram/authInfo": {
                "InstagramAuthInfo": class StubInstagramAuthInfo {
                    getRecord(code, searchParams) {
                        expect(code).to.eql(stubCode);
                        expect(searchParams.code).to.eql(stubCode);
                        expect(searchParams).to.eql(new AuthInfoSearchParams({
                            clientId: process.env.INSTAGRAM_API_KEY,
                            clientSecret: process.env.INSTAGRAM_API_SECRET,
                            redirectUri: process.env.INSTAGRAM_AUTH_CALLBACK_URI,
                            code: stubCode
                        }));
                        return Promise.resolve(stubToken);
                    }
                }
            },
            "../../util/configureEnvironment": {
                "default": sinon.stub().returns(Promise.resolve()),
            },
            "@randy.tarampi/serverless": {
                "responseBuilder": sinon.stub().throws(stubError)
            },
            "../../util/response/returnErrorResponse": {
                "default": sinon.stub().callsFake((event, context, callback) => {
                    try {
                        expect(callback).to.eql(stubCallback);
                        return stubErrorCallback;
                    } catch (error) {
                        done(error);
                    }
                })
            }
        };
        const stubCallback = () => {
            throw new Error("Wtf? This should've thrown");
        };
        const stubErrorCallback = error => {
            try {
                expect(error.message).to.eql(stubError.message);
                done();
            } catch (expectationError) {
                done(expectationError);
            }
        };
        const proxyquiredinstagramAuthCallback = proxyquire("../../../../../../src/serverless/handlers/instagramAuthCallback", proxyquireStubs);

        proxyquiredinstagramAuthCallback.default(stubEvent, stubContext, stubCallback);
    });

    it("throws if no `code` provided", function (done) {
        const stubCode = undefined;
        const stubEvent = {queryStringParameters: {}};
        const stubContext = {};
        const stubToken = {access_token: "woof", user: {id: "meow"}};
        const stubError = new Error("woof");
        const proxyquireStubs = {
            "../../../lib/sources/instagram/authInfo": {
                "InstagramAuthInfo": class StubInstagramAuthInfo {
                    getRecord(code, searchParams) {
                        expect(code).to.eql(stubCode);
                        expect(searchParams.code).to.eql(stubCode);
                        expect(searchParams).to.eql(new AuthInfoSearchParams({
                            clientId: process.env.INSTAGRAM_API_KEY,
                            clientSecret: process.env.INSTAGRAM_API_SECRET,
                            redirectUri: process.env.INSTAGRAM_AUTH_CALLBACK_URI,
                            code: stubCode
                        }));
                        return Promise.resolve(stubToken);
                    }
                }
            },
            "../../util/configureEnvironment": {
                "default": sinon.stub().returns(Promise.resolve()),
            },
            "@randy.tarampi/serverless": {
                "responseBuilder": sinon.stub().throws(stubError)
            },
            "../../util/response/returnErrorResponse": {
                "default": sinon.stub().callsFake((event, context, callback) => {
                    try {
                        expect(callback).to.eql(stubCallback);
                        return stubErrorCallback;
                    } catch (error) {
                        done(error);
                    }
                })
            }
        };
        const stubCallback = () => {
            throw new Error("Wtf? This should've thrown");
        };
        const stubErrorCallback = error => {
            try {
                expect(error.message).to.eql("Tried to handle Instagram authentication response, but no `code` was received");
                expect(error.code).to.eql(RequestError.codes.badRequest);
                expect(error.statusCode).to.eql(requestErrorCodeToHttpStatusCode[RequestError.codes.badRequest]);
                done();
            } catch (expectationError) {
                done(expectationError);
            }
        };
        const proxyquiredinstagramAuthCallback = proxyquire("../../../../../../src/serverless/handlers/instagramAuthCallback", proxyquireStubs);

        proxyquiredinstagramAuthCallback.default(stubEvent, stubContext, stubCallback);
    });
});
