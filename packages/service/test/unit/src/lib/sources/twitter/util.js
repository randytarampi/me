import {expect} from "chai";
import {AuthInfoSearchParams} from "../../../../../../src/lib/authInfoSearchParams.js";
import esmock from "../../../../../lib/esmock.js";

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

        const {getTwitterClientForSearchParams} = await esmock("../../../../../../src/lib/sources/twitter/util.js", import.meta.url, {
            "twitter": {default: StubTwitterClient}
        });

        expect(getTwitterClientForSearchParams(stubTwitterConfig)).to.be.instanceof(StubTwitterClient);
    });
});
