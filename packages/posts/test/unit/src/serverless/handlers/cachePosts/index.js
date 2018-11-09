import {expect} from "chai";
import proxyquire from "proxyquire";
import sinon from "sinon";

describe("cachePosts", function () {
    it("delegates to `cachePosts`", function (done) {
        this.timeout(5000);

        const stubEvent = {};
        const stubContext = {};
        const stubPosts = ["woof"];
        const stubResponse = ["meow"];
        const proxyquireStubs = {
            "../../../sources/cachePosts": {
                "default": sinon.stub().returns(Promise.resolve(stubPosts)),
            },
            "../../util/configureEnvironment": {
                "default": sinon.stub().returns(Promise.resolve()),
            },
            "../../util/response/responseBuilder": {
                "default": sinon.stub().callsFake(posts => {
                    try {
                        expect(posts).to.eql(stubPosts);
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
                expect(proxyquireStubs["../../../sources/cachePosts"].default.calledOnce).to.eql(true);
                expect(proxyquireStubs["../../util/configureEnvironment"].default.calledOnce).to.eql(true);
                expect(proxyquireStubs["../../util/response/responseBuilder"].default.calledOnce).to.eql(true);
                expect(proxyquireStubs["../../util/response/returnErrorResponse"].default.calledOnce).to.eql(true);
                done();
            } catch (expectationError) {
                done(expectationError);
            }
        };
        const proxyquiredCachePosts = proxyquire("../../../../../../src/serverless/handlers/cachePosts", proxyquireStubs);

        proxyquiredCachePosts.default(stubEvent, stubContext, stubCallback);
    });

    it("`returnErrorResponse` on error", function (done) {
        const stubEvent = {};
        const stubContext = {};
        const stubPosts = ["woof"];
        const stubError = new Error("woof");
        const proxyquireStubs = {
            "../../../sources/cachePosts": {
                "default": sinon.stub().returns(Promise.resolve(stubPosts)),
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
        const proxyquiredCachePosts = proxyquire("../../../../../../src/serverless/handlers/cachePosts", proxyquireStubs);

        proxyquiredCachePosts.default(stubEvent, stubContext, stubCallback);
    });
});
