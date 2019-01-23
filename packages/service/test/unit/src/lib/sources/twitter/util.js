import {expect} from "chai";
import proxyquire from "proxyquire";
import {AuthInfoSearchParams} from "../../../../../../src/lib/authInfoSearchParams";

describe("util", function () {
    describe("getTwitterClientForSearchParams", function () {
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

        const proxyquiredGetTwitterClientForSearchParams = proxyquire("../../../../../../src/lib/sources/twitter/util", {
            "twitter": StubTwitterClient
        }).getTwitterClientForSearchParams;

        expect(proxyquiredGetTwitterClientForSearchParams(stubTwitterConfig)).to.be.instanceof(StubTwitterClient);
    });
});
