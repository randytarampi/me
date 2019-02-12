import {RequestError, requestErrorCodeToHttpStatusCode} from "@randy.tarampi/js";
import {expect} from "chai";
import proxyquire from "proxyquire";
import sinon from "sinon";
import {AuthInfoSearchParams} from "../../../../../../src/lib/authInfoSearchParams";

describe("twitterAuthCallback", function () {
    this.timeout(5000);

    it("delegates to `TwitterAuthInfo.getRecord`", function (done) {
        const stubOAuthToken = "grr";
        const stubOAuthTokenSecret = "rawr";
        const stubOAuthTokenVerifier = "argh";
        const stubEvent = {
            queryStringParameters: {
                oauth_token: stubOAuthToken,
                oauth_token_secret: stubOAuthTokenSecret,
                oauth_verifier: stubOAuthTokenVerifier
            }
        };
        const stubContext = {};
        const stubToken = {access_token: "woof", user_id: "meow"};
        const stubResponse = ["meow"];
        const proxyquireStubs = {
            "../../../lib/sources/twitter/authInfo": {
                "TwitterAuthInfo": class StubTwitterAuthInfo {
                    getRecord(token, searchParams) {
                        expect(token).to.eql(stubOAuthToken);
                        expect(searchParams).to.eql(new AuthInfoSearchParams({
                            clientId: process.env.TWITTER_API_KEY,
                            clientSecret: process.env.TWITTER_API_SECRET,
                            redirectUri: process.env.TWITTER_AUTH_CALLBACK_URI,
                            requestToken: stubOAuthToken,
                            requestTokenSecret: stubOAuthTokenSecret,
                            requestTokenVerifier: stubOAuthTokenVerifier
                        }));
                        return Promise.resolve(stubToken);
                    }
                }
            },
            "../../util/configureEnvironment": {
                "default": sinon.stub().returns(Promise.resolve())
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
                expect(proxyquireStubs["../../util/configureEnvironment"].default.calledOnce).to.eql(true);
                expect(proxyquireStubs["../../util/response/responseBuilder"].default.calledOnce).to.eql(true);
                expect(proxyquireStubs["../../util/response/returnErrorResponse"].default.calledOnce).to.eql(true);
                done();
            } catch (expectationError) {
                done(expectationError);
            }
        };
        const proxyquiredtwitterAuthCallback = proxyquire("../../../../../../src/serverless/handlers/twitterAuthCallback", proxyquireStubs);

        proxyquiredtwitterAuthCallback.default(stubEvent, stubContext, stubCallback);
    });

    it("`returnErrorResponse` on error", function (done) {
        const stubOAuthToken = "grr";
        const stubOAuthTokenSecret = "rawr";
        const stubOAuthTokenVerifier = "argh";
        const stubEvent = {
            queryStringParameters: {
                oauth_token: stubOAuthToken,
                oauth_token_secret: stubOAuthTokenSecret,
                oauth_verifier: stubOAuthTokenVerifier
            }
        };
        const stubContext = {};
        const stubToken = {access_token: "woof", user_id: "meow"};
        const stubError = new Error("woof");
        const proxyquireStubs = {
            "../../../lib/sources/twitter/authInfo": {
                "TwitterAuthInfo": class StubTwitterAuthInfo {
                    getRecord(token, searchParams) {
                        expect(token).to.eql(stubOAuthToken);
                        expect(searchParams).to.eql(new AuthInfoSearchParams({
                            clientId: process.env.TWITTER_API_KEY,
                            clientSecret: process.env.TWITTER_API_SECRET,
                            redirectUri: process.env.TWITTER_AUTH_CALLBACK_URI,
                            requestToken: stubOAuthToken,
                            requestTokenSecret: stubOAuthTokenSecret,
                            requestTokenVerifier: stubOAuthTokenVerifier
                        }));
                        return Promise.resolve(stubToken);
                    }
                }
            },
            "../../util/configureEnvironment": {
                "default": sinon.stub().returns(Promise.resolve())
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
                expect(error.message).to.eql(stubError.message);
                done();
            } catch (expectationError) {
                done(expectationError);
            }
        };
        const proxyquiredtwitterAuthCallback = proxyquire("../../../../../../src/serverless/handlers/twitterAuthCallback", proxyquireStubs);

        proxyquiredtwitterAuthCallback.default(stubEvent, stubContext, stubCallback);
    });

    it("throws if no `code` provided", function (done) {
        const stubOAuthToken = "grr";
        const stubOAuthTokenSecret = "rawr";
        const stubOAuthTokenVerifier = null;
        const stubEvent = {
            queryStringParameters: {
                oauth_token: stubOAuthToken,
                oauth_token_secret: stubOAuthTokenSecret,
                oauth_verifier: stubOAuthTokenVerifier
            }
        };
        const stubContext = {};
        const stubToken = {access_token: "woof", user_id: "meow"};
        const stubError = new Error("woof");
        const proxyquireStubs = {
            "../../../lib/sources/twitter/authInfo": {
                "TwitterAuthInfo": class StubTwitterAuthInfo {
                    getRecord(token, searchParams) {
                        expect(token).to.eql(stubOAuthToken);
                        expect(searchParams).to.eql(new AuthInfoSearchParams({
                            clientId: process.env.TWITTER_API_KEY,
                            clientSecret: process.env.TWITTER_API_SECRET,
                            redirectUri: process.env.TWITTER_AUTH_CALLBACK_URI,
                            requestToken: stubOAuthToken,
                            requestTokenSecret: stubOAuthTokenSecret,
                            requestTokenVerifier: stubOAuthTokenVerifier
                        }));
                        return Promise.resolve(stubToken);
                    }
                }
            },
            "../../util/configureEnvironment": {
                "default": sinon.stub().returns(Promise.resolve())
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
                expect(error.message).to.eql("Tried to handle Twitter authentication response, but no `oauth_verifier` was received");
                expect(error.code).to.eql(RequestError.codes.badRequest);
                expect(error.statusCode).to.eql(requestErrorCodeToHttpStatusCode[RequestError.codes.badRequest]);
                done();
            } catch (expectationError) {
                done(expectationError);
            }
        };
        const proxyquiredtwitterAuthCallback = proxyquire("../../../../../../src/serverless/handlers/twitterAuthCallback", proxyquireStubs);

        proxyquiredtwitterAuthCallback.default(stubEvent, stubContext, stubCallback);
    });
});
