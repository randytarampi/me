import {expect} from "chai";
import proxyquire from "proxyquire";
import {AuthInfoSearchParams} from "../../../../../src/lib/authInfoSearchParams";

describe("OAuth2Client", function () {
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

        const ProxyquiredOAuth2Client = proxyquire("../../../../../src/lib/sources/oAuth2Client", {
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
        const proxyquiredOAuth2Client = new ProxyquiredOAuth2Client(stubFetchUrl);

        return proxyquiredOAuth2Client.getAccessToken(new AuthInfoSearchParams({
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
