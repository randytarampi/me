import {expect} from "chai";
import proxyquire from "proxyquire";
import sinon from "sinon";
import {AuthInfoSearchParams} from "../../../../../../src/lib/authInfoSearchParams";

describe("twitterAuthRedirect", function () {
    this.timeout(5000);

    it("redirects to the correct page", function (done) {
        const stubOAuthToken = "grr";
        const stubRequestTokenResponse = {token: stubOAuthToken};
        const stubEvent = {};
        const stubContext = {};
        const stubResponse = ["meow"];
        const stubGetRequestToken = sinon.stub().callsFake(searchParams => {
            expect(searchParams).to.eql(new AuthInfoSearchParams({
                clientId: process.env.TWITTER_API_KEY,
                clientSecret: process.env.TWITTER_API_SECRET,
                redirectUri: process.env.TWITTER_AUTH_CALLBACK_URI
            }));
            return Promise.resolve(stubRequestTokenResponse);
        });
        const proxyquireStubs = {
            "../../../lib/sources/twitter/authInfo": {
                "TwitterAuthInfo": class StubTwitterAuthInfo {
                    constructor() {
                        this.client = {
                            getRequestToken: stubGetRequestToken
                        };
                    }
                }
            },
            "../../util/configureEnvironment": {
                "default": sinon.stub().returns(Promise.resolve())
            },
            "../../util/response/responseBuilder": {
                "default": sinon.stub().callsFake((body, status, headers) => {
                    try {
                        expect(body).to.eql(null);
                        expect(status).to.eql(302);
                        expect(headers).to.eql({
                            Location: `https://api.twitter.com/oauth/authorize?oauth_token=${stubOAuthToken}`
                        });
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
        const proxyquiredtwitterAuthRedirect = proxyquire("../../../../../../src/serverless/handlers/twitterAuthRedirect", proxyquireStubs);

        proxyquiredtwitterAuthRedirect.default(stubEvent, stubContext, stubCallback);
    });

    it("`returnErrorResponse` on error", function (done) {
        const stubOAuthToken = "grr";
        const stubRequestTokenResponse = {token: stubOAuthToken};
        const stubEvent = {};
        const stubContext = {};
        const stubError = new Error("woof");
        const stubGetRequestToken = sinon.stub().callsFake(searchParams => {
            expect(searchParams).to.eql(new AuthInfoSearchParams({
                clientId: process.env.TWITTER_API_KEY,
                clientSecret: process.env.TWITTER_API_SECRET,
                redirectUri: process.env.TWITTER_AUTH_CALLBACK_URI
            }));
            return Promise.resolve(stubRequestTokenResponse);
        });
        const proxyquireStubs = {
            "../../../lib/sources/twitter/authInfo": {
                "TwitterAuthInfo": class StubTwitterAuthInfo {
                    constructor() {
                        this.client = {
                            getRequestToken: stubGetRequestToken
                        };
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
        const proxyquiredtwitterAuthRedirect = proxyquire("../../../../../../src/serverless/handlers/twitterAuthRedirect", proxyquireStubs);

        proxyquiredtwitterAuthRedirect.default(stubEvent, stubContext, stubCallback);
    });
});
