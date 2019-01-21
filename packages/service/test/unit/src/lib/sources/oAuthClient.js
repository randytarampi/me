import {expect} from "chai";
import proxyquire from "proxyquire";
import {AuthInfoSearchParams} from "../../../../../src/lib/authInfoSearchParams";

describe("OAuthClient", function () {
    let stubApiKey;
    let stubApiSecret;
    let stubCallbackUri;
    let stubFetchUrl;

    beforeEach(function () {
        stubApiKey = "foo";
        stubApiSecret = "bar";
        stubCallbackUri = "baz";
        stubFetchUrl = "woof://woof.woof/woof/woof";
    });

    it("delegates to `fetch` with the correct parameters", function () {
        const stubCode = "woof";
        const stubResponseJson = "meow";
        const stubResponse = {
            json: () => {
                return Promise.resolve(stubResponseJson);
            }
        };

        const ProxyquiredOAuthClient = proxyquire("../../../../../src/lib/sources/oAuthClient", {
            "isomorphic-fetch": (fetchUrl, options) => {
                expect(fetchUrl).to.eql(stubFetchUrl);

                expect(options.method).to.eql("POST");
                expect(options.body).to.be.ok;
                const body = JSON.stringify(options.body);
                expect(body).to.contain(`"${stubCode}"`);
                expect(body).to.contain("\"authorization_code\"");
                expect(body).to.contain(`"${stubApiKey}"`);
                expect(body).to.contain(`"${stubApiSecret}"`);
                expect(body).to.contain(`"${stubCallbackUri}"`);

                return Promise.resolve(stubResponse);
            }
        }).default;
        const proxyquiredOAuthClient = new ProxyquiredOAuthClient(stubFetchUrl);

        return proxyquiredOAuthClient.getAuthToken(new AuthInfoSearchParams({
                clientId: stubApiKey,
                clientSecret: stubApiSecret,
                redirectUri: stubCallbackUri,
                code: stubCode
            }))
            .then(postsResponse => {
                expect(postsResponse).to.eql(stubResponseJson);
            });
    });

});
