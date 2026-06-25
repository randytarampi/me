const {expect} = require("chai");
const {AuthInfoSearchParams} = require("../../../../../../src/lib/authInfoSearchParams.js");
const {loadEsmock, purgeEsmock} = require("../../../../../lib/loadEsmock.js");

afterEach(function () {
    purgeEsmock();
});

describe("util", function () {
    it("returns the expected Twitter client", async function () {
        const stubTwitterConfig = new AuthInfoSearchParams({
            clientId: process.env.TWITTER_API_KEY,
            clientSecret: process.env.TWITTER_API_SECRET,
            accessToken: process.env.TWITTER_API_BEARER_TOKEN,
            accessTokenSecret: process.env.TWITTER_API_BEARER_TOKEN_SECRET
        });

        class StubTwitterClient {
            constructor(twitterConfig) {
                expect(twitterConfig).to.include(stubTwitterConfig.OAuth);
            }
        }

        const esmock = await loadEsmock();
        const {getTwitterClientForSearchParams} = await esmock("../../../../../../src/lib/sources/twitter/util.js", {
            twitter: {
                default: StubTwitterClient
            }
        });

        expect(getTwitterClientForSearchParams(stubTwitterConfig)).to.be.instanceof(StubTwitterClient);
    });
});
module.exports.default = module.exports;
