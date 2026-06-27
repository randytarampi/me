const {expect} = require("chai");
const {AuthInfoSearchParams} = require("../../../../../../src/lib/authInfoSearchParams.js");
const {freshRequire} = require("../../../../../lib/freshRequire.js");

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

        const twitter = freshRequire("twitter");
        twitter.default = StubTwitterClient;

        const {getTwitterClientForSearchParams} = freshRequire("../../../../../../src/lib/sources/twitter/util.js");

        expect(getTwitterClientForSearchParams(stubTwitterConfig)).to.be.instanceof(StubTwitterClient);
    });
});
module.exports.default = module.exports;
