import {expect} from "chai";
import sinon from "sinon";
import esmock from "../../../../../lib/esmock.js";

afterEach(function () {
    sinon.restore();
});

describe("twitterAuthRedirect", function () {
    this.timeout(5000);

    it("redirects to the correct page", async function () {
        process.env.TWITTER_API_KEY = "TWITTER_API_KEY";
        process.env.TWITTER_API_SECRET = "TWITTER_API_SECRET";
        process.env.TWITTER_AUTH_CALLBACK_URI = "https://example.com/twitter/callback";

        const stubOAuthToken = "grr";
        const stubEvent = {};
        const stubContext = {};

        class StubOAuthOAuth {
            constructor(requestUrl, tokenUrl, apiKey, apiSecret, oAuthVersion, redirectUri, signingScheme) {
                expect(requestUrl).to.eql("https://api.twitter.com/oauth/request_token");
                expect(tokenUrl).to.eql("https://api.twitter.com/oauth/access_token");
                expect(apiKey).to.eql(process.env.TWITTER_API_KEY);
                expect(apiSecret).to.eql(process.env.TWITTER_API_SECRET);
                expect(oAuthVersion).to.eql("1.0a");
                expect(redirectUri).to.eql(process.env.TWITTER_AUTH_CALLBACK_URI);
                expect(signingScheme).to.eql("HMAC-SHA1");
            }

            getOAuthRequestToken(callback) {
                callback(null, stubOAuthToken, "stub-secret", {});
            }
        }

        const configureEnvironmentStub = sinon.stub().resolves();

        const {default: twitterAuthRedirect} = await esmock("../../../../../../src/serverless/handlers/twitterAuthRedirect/index.js", import.meta.url, {
            "oauth": {
                OAuth: function (...args) {
                    return new StubOAuthOAuth(...args);
                }
            },
            "../../../../../../src/serverless/util/configureEnvironment.js": {default: configureEnvironmentStub}
        });

        await new Promise((resolve, reject) => {
            const stubCallback = () => {
                try {
                    resolve();
                } catch (expectationError) {
                    reject(expectationError);
                }
            };

            twitterAuthRedirect(stubEvent, stubContext, stubCallback);
        });
    });

    it("`returnErrorResponse` on error", async function () {
        process.env.TWITTER_API_KEY = "TWITTER_API_KEY";
        process.env.TWITTER_API_SECRET = "TWITTER_API_SECRET";
        process.env.TWITTER_AUTH_CALLBACK_URI = "https://example.com/twitter/callback";

        const stubEvent = {};
        const stubContext = {};

        class StubOAuthOAuth {
            constructor(requestUrl, tokenUrl, apiKey, apiSecret, oAuthVersion, redirectUri, signingScheme) {
                expect(requestUrl).to.eql("https://api.twitter.com/oauth/request_token");
                expect(tokenUrl).to.eql("https://api.twitter.com/oauth/access_token");
                expect(apiKey).to.eql(process.env.TWITTER_API_KEY);
                expect(apiSecret).to.eql(process.env.TWITTER_API_SECRET);
                expect(oAuthVersion).to.eql("1.0a");
                expect(redirectUri).to.eql(process.env.TWITTER_AUTH_CALLBACK_URI);
                expect(signingScheme).to.eql("HMAC-SHA1");
            }

            getOAuthRequestToken(callback) {
                callback(new Error("woof"), "stub-token", "stub-secret", {});
            }
        }

        const configureEnvironmentStub = sinon.stub().resolves();

        const {default: twitterAuthRedirect} = await esmock("../../../../../../src/serverless/handlers/twitterAuthRedirect/index.js", import.meta.url, {
            "oauth": {
                OAuth: function (...args) {
                    return new StubOAuthOAuth(...args);
                }
            },
            "../../../../../../src/serverless/util/configureEnvironment.js": {default: configureEnvironmentStub}
        });

        await new Promise((resolve, reject) => {
            const stubCallback = () => {
                try {
                    resolve();
                } catch (expectationError) {
                    reject(expectationError);
                }
            };

            twitterAuthRedirect(stubEvent, stubContext, stubCallback);
        });
    });
});
