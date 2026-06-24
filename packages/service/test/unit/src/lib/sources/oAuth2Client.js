import {expect} from "chai";
import {AuthInfoSearchParams} from "../../../../../src/lib/authInfoSearchParams";
import sinon from "sinon";
import OAuth2Client from "../../../../../src/lib/sources/oAuth2Client";

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

    describe("getAccessToken", function () {
        it("delegates to `fetch` with the correct parameters", async function () {
            const stubCode = "woof";
            const stubResponseJson = "meow";
            const stubResponse = {
                json: () => {
                    return Promise.resolve(stubResponseJson);
                }
            };
            const fetchStub = sinon.stub(global, "fetch").callsFake((fetchUrl, options) => {
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
            });

            try {
                const oAuth2Client = new OAuth2Client(stubFetchUrl);

                const postsResponse = await oAuth2Client.getAccessToken(new AuthInfoSearchParams({
                    clientId: stubApiKey,
                    clientSecret: stubApiSecret,
                    redirectUri: stubCallbackUri,
                    code: stubCode
                }));

                expect(postsResponse).to.eql(stubResponseJson);
            } finally {
                fetchStub.restore();
            }
        });
    });
});
