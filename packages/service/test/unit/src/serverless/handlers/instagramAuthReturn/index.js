import {expect} from "chai";
import proxyquire from "proxyquire";
import sinon from "sinon";
import {codes, codeToStatusCode} from "../../../../../../src/serverless/util/request/requestError";

describe("instagramAuthReturn", function () {
    it("delegates to `getAuthTokenForCode`", function (done) {
        this.timeout(5000);

        const stubCode = "grr";
        const stubEvent = {queryStringParameters: {code: stubCode}};
        const stubContext = {};
        const stubToken = "woof";
        const stubResponse = ["meow"];
        const proxyquireStubs = {
            "../../../sources/instagram/client": {
                "getAuthTokenForCode": sinon.stub().callsFake(code => {
                    expect(code).to.eql(stubCode);
                    return Promise.resolve(stubToken);
                }),
            },
            "../../util/configureEnvironment": {
                "default": sinon.stub().returns(Promise.resolve()),
            },
            "../../util/response/responseBuilder": {
                "default": sinon.stub().callsFake(token => {
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
                expect(proxyquireStubs["../../../sources/instagram/client"].getAuthTokenForCode.calledOnce).to.eql(true);
                expect(proxyquireStubs["../../util/configureEnvironment"].default.calledOnce).to.eql(true);
                expect(proxyquireStubs["../../util/response/responseBuilder"].default.calledOnce).to.eql(true);
                expect(proxyquireStubs["../../util/response/returnErrorResponse"].default.calledOnce).to.eql(true);
                done();
            } catch (expectationError) {
                done(expectationError);
            }
        };
        const proxyquiredinstagramAuthReturn = proxyquire("../../../../../../src/serverless/handlers/instagramAuthReturn", proxyquireStubs);

        proxyquiredinstagramAuthReturn.default(stubEvent, stubContext, stubCallback);
    });

    it("`returnErrorResponse` on error", function (done) {
        const stubCode = "grr";
        const stubEvent = {queryStringParameters: {code: stubCode}};
        const stubContext = {};
        const stubToken = "woof";
        const stubError = new Error("woof");
        const proxyquireStubs = {
            "../../../sources/instagram/client": {
                "getAuthTokenForCode": sinon.stub().callsFake(code => {
                    expect(code).to.eql(stubCode);
                    return Promise.resolve(stubToken);
                }),
            },
            "../../util/configureEnvironment": {
                "default": sinon.stub().returns(Promise.resolve()),
            },
            "../../util/response/responseBuilder": {
                "default": sinon.stub().throws(stubError)
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
                expect(error).to.be.ok;
                expect(error.message).to.eql(stubError.message);
                done();
            } catch (expectationError) {
                done(expectationError);
            }
        };
        const proxyquiredinstagramAuthReturn = proxyquire("../../../../../../src/serverless/handlers/instagramAuthReturn", proxyquireStubs);

        proxyquiredinstagramAuthReturn.default(stubEvent, stubContext, stubCallback);
    });

    it("throws if no `code` provided", function (done) {
        const stubCode = undefined;
        const stubEvent = {queryStringParameters: {}};
        const stubContext = {};
        const stubToken = "woof";
        const stubError = new Error("woof");
        const proxyquireStubs = {
            "../../../sources/instagram/client": {
                "getAuthTokenForCode": sinon.stub().callsFake(code => {
                    expect(code).to.eql(stubCode);
                    return Promise.resolve(stubToken);
                }),
            },
            "../../util/configureEnvironment": {
                "default": sinon.stub().returns(Promise.resolve()),
            },
            "../../util/response/responseBuilder": {
                "default": sinon.stub().throws(stubError)
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
                expect(error).to.be.ok;
                expect(error.message).to.eql("Tried to handle Instagram authentication response, but no `code` was received");
                expect(error.code).to.eql(codes.badRequest);
                expect(error.statusCode).to.eql(codeToStatusCode[codes.badRequest]);
                done();
            } catch (expectationError) {
                done(expectationError);
            }
        };
        const proxyquiredinstagramAuthReturn = proxyquire("../../../../../../src/serverless/handlers/instagramAuthReturn", proxyquireStubs);

        proxyquiredinstagramAuthReturn.default(stubEvent, stubContext, stubCallback);
    });
});
