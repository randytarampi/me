import {expect} from "chai";
import proxyquire from "proxyquire";
import {AuthInfoSearchParams} from "../../../../../src/lib/authInfoSearchParams";

describe("OAuthClient", function () {
    let stubRequestUrl;
    let stubTokenUrl;
    let stubApiKey;
    let stubApiSecret;
    let stubRedirectUri;
    let stubRequestToken;
    let stubRequestTokenSecret;
    let stubRequestTokenVerifier;
    let stubAccessToken;
    let stubAccessTokenSecret;

    class StubOAuthOAuth {
        constructor(requestUrl, tokenUrl, apiKey, apiSecret, oAuthVersion, redirectUri, signingScheme) {
            expect(requestUrl).to.eql(stubRequestUrl);
            expect(tokenUrl).to.eql(stubTokenUrl);
            expect(apiKey).to.eql(stubApiKey);
            expect(apiSecret).to.eql(stubApiSecret);
            expect(oAuthVersion).to.eql("1.0a");
            expect(redirectUri).to.eql(stubRedirectUri);
            expect(signingScheme).to.eql("HMAC-SHA1");
        }

        getOAuthRequestToken(callback) {
            callback(null, stubRequestToken, stubRequestTokenSecret, {});
        }

        getOAuthAccessToken(requestToken, requestTokenSecret, requestTokenVerifier, callback) {
            expect(requestToken).to.eql(stubRequestToken);
            expect(requestTokenSecret).to.eql(stubRequestTokenSecret);
            expect(requestTokenVerifier).to.eql(stubRequestTokenVerifier);
            callback(null, stubAccessToken, stubAccessTokenSecret, {});
        }
    }

    class StubOAuthOAuthWithCallbackErrors {
        constructor(requestUrl, tokenUrl, apiKey, apiSecret, oAuthVersion, redirectUri, signingScheme) {
            expect(requestUrl).to.eql(stubRequestUrl);
            expect(tokenUrl).to.eql(stubTokenUrl);
            expect(apiKey).to.eql(stubApiKey);
            expect(apiSecret).to.eql(stubApiSecret);
            expect(oAuthVersion).to.eql("1.0a");
            expect(redirectUri).to.eql(stubRedirectUri);
            expect(signingScheme).to.eql("HMAC-SHA1");
        }

        getOAuthRequestToken(callback) {
            callback(new Error("getOAuthRequestToken"), stubRequestToken, stubRequestTokenSecret, {});
        }

        getOAuthAccessToken(requestToken, requestTokenSecret, requestTokenVerifier, callback) {
            expect(requestToken).to.eql(stubRequestToken);
            expect(requestTokenSecret).to.eql(stubRequestTokenSecret);
            expect(requestTokenVerifier).to.eql(stubRequestTokenVerifier);
            callback(new Error("getOAuthAccessToken"), stubAccessToken, stubAccessTokenSecret, {});
        }
    }

    class StubOAuthOAuthWithErrors {
        constructor(requestUrl, tokenUrl, apiKey, apiSecret, oAuthVersion, redirectUri, signingScheme) {
            expect(requestUrl).to.eql(stubRequestUrl);
            expect(tokenUrl).to.eql(stubTokenUrl);
            expect(apiKey).to.eql(stubApiKey);
            expect(apiSecret).to.eql(stubApiSecret);
            expect(oAuthVersion).to.eql("1.0a");
            expect(redirectUri).to.eql(stubRedirectUri);
            expect(signingScheme).to.eql("HMAC-SHA1");
        }

        getOAuthRequestToken() {
            throw new Error("getOAuthRequestToken");
        }

        getOAuthAccessToken() {
            throw new Error("getOAuthAccessToken");
        }
    }

    beforeEach(function () {
        stubRequestUrl = "woof://woof.woof/woof/woof";
        stubTokenUrl = "meow://meow.meow/meow/meow";
        stubApiKey = "woof";
        stubApiSecret = "meow";
        stubRedirectUri = "grr://grr.grr/grr/grr";
        stubRequestToken = "grr";
        stubRequestTokenSecret = "rawr";
        stubRequestTokenVerifier = "argh";
        stubAccessToken = "ugh";
        stubAccessTokenSecret = "hm";
    });

    describe("getRequestToken", function () {
        it("delegates to `OAuth` with the correct parameters", function () {
            const ProxyquiredOAuthClient = proxyquire("../../../../../src/lib/sources/oAuthClient", {
                "oauth": {
                    OAuth: StubOAuthOAuth
                }
            }).default;
            const proxyquiredOAuthClient = new ProxyquiredOAuthClient(stubRequestUrl, stubTokenUrl);

            return proxyquiredOAuthClient.getRequestToken(new AuthInfoSearchParams({
                    clientId: stubApiKey,
                    clientSecret: stubApiSecret,
                    redirectUri: stubRedirectUri
                }))
                .then(tokenResponse => {
                    expect(tokenResponse.token).to.eql(stubRequestToken);
                    expect(tokenResponse.tokenSecret).to.eql(stubRequestTokenSecret);
                });
        });

        it("handles errors (callback)", function () {
            const ProxyquiredOAuthClient = proxyquire("../../../../../src/lib/sources/oAuthClient", {
                "oauth": {
                    OAuth: StubOAuthOAuthWithCallbackErrors
                }
            }).default;
            const proxyquiredOAuthClient = new ProxyquiredOAuthClient(stubRequestUrl, stubTokenUrl);

            return proxyquiredOAuthClient.getRequestToken(new AuthInfoSearchParams({
                    clientId: stubApiKey,
                    clientSecret: stubApiSecret,
                    redirectUri: stubRedirectUri
                }))
                .then(() => {
                    throw new Error("Wtf? This should've thrown");
                })
                .catch(error => {
                    expect(error.message).to.eql("getOAuthRequestToken");
                });
        });

        it("handles errors (OAuth)", function () {
            const ProxyquiredOAuthClient = proxyquire("../../../../../src/lib/sources/oAuthClient", {
                "oauth": {
                    OAuth: StubOAuthOAuthWithErrors
                }
            }).default;
            const proxyquiredOAuthClient = new ProxyquiredOAuthClient(stubRequestUrl, stubTokenUrl);

            return proxyquiredOAuthClient.getRequestToken(new AuthInfoSearchParams({
                    clientId: stubApiKey,
                    clientSecret: stubApiSecret,
                    redirectUri: stubRedirectUri
                }))
                .then(() => {
                    throw new Error("Wtf? This should've thrown");
                })
                .catch(error => {
                    expect(error.message).to.eql("getOAuthRequestToken");
                });
        });
    });

    describe("getAccessToken", function () {
        it("delegates to `OAuth` with the correct parameters", function () {
            const ProxyquiredOAuthClient = proxyquire("../../../../../src/lib/sources/oAuthClient", {
                "oauth": {
                    OAuth: StubOAuthOAuth
                }
            }).default;
            const proxyquiredOAuthClient = new ProxyquiredOAuthClient(stubRequestUrl, stubTokenUrl);

            return proxyquiredOAuthClient.getAccessToken(new AuthInfoSearchParams({
                    clientId: stubApiKey,
                    clientSecret: stubApiSecret,
                    redirectUri: stubRedirectUri,
                    requestToken: stubRequestToken,
                    requestTokenSecret: stubRequestTokenSecret,
                    requestTokenVerifier: stubRequestTokenVerifier
                }))
                .then(tokenResponse => {
                    expect(tokenResponse.token).to.eql(stubAccessToken);
                    expect(tokenResponse.tokenSecret).to.eql(stubAccessTokenSecret);
                });
        });

        it("handles errors (callback)", function () {
            const ProxyquiredOAuthClient = proxyquire("../../../../../src/lib/sources/oAuthClient", {
                "oauth": {
                    OAuth: StubOAuthOAuthWithCallbackErrors
                }
            }).default;
            const proxyquiredOAuthClient = new ProxyquiredOAuthClient(stubRequestUrl, stubTokenUrl);

            return proxyquiredOAuthClient.getAccessToken(new AuthInfoSearchParams({
                    clientId: stubApiKey,
                    clientSecret: stubApiSecret,
                    redirectUri: stubRedirectUri,
                    requestToken: stubRequestToken,
                    requestTokenSecret: stubRequestTokenSecret,
                    requestTokenVerifier: stubRequestTokenVerifier
                }))
                .then(() => {
                    throw new Error("Wtf? This should've thrown");
                })
                .catch(error => {
                    expect(error.message).to.eql("getOAuthAccessToken");
                });
        });

        it("handles errors (OAuth)", function () {
            const ProxyquiredOAuthClient = proxyquire("../../../../../src/lib/sources/oAuthClient", {
                "oauth": {
                    OAuth: StubOAuthOAuthWithErrors
                }
            }).default;
            const proxyquiredOAuthClient = new ProxyquiredOAuthClient(stubRequestUrl, stubTokenUrl);

            return proxyquiredOAuthClient.getAccessToken(new AuthInfoSearchParams({
                    clientId: stubApiKey,
                    clientSecret: stubApiSecret,
                    redirectUri: stubRedirectUri,
                    requestToken: stubRequestToken,
                    requestTokenSecret: stubRequestTokenSecret,
                    requestTokenVerifier: stubRequestTokenVerifier
                }))
                .then(() => {
                    throw new Error("Wtf? This should've thrown");
                })
                .catch(error => {
                    expect(error.message).to.eql("getOAuthAccessToken");
                });
        });
    });
});
