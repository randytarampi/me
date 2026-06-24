import {expect} from "chai";
import {AuthInfoSearchParams} from "../../../../../../src/lib/authInfoSearchParams";
import {freshRequire} from "../../../../../lib/freshRequire";

let twitterModulePath;

afterEach(function () {
    if (twitterModulePath) {
        delete require.cache[twitterModulePath];
        twitterModulePath = undefined;
    }
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

        twitterModulePath = require.resolve("twitter", {paths: [__dirname]});
        require.cache[twitterModulePath] = {
            id: twitterModulePath,
            filename: twitterModulePath,
            loaded: true,
            exports: {
                __esModule: true,
                default: StubTwitterClient
            }
        };

        const {getTwitterClientForSearchParams} = freshRequire("../../../../../../src/lib/sources/twitter/util");

        expect(getTwitterClientForSearchParams(stubTwitterConfig)).to.be.instanceof(StubTwitterClient);

        delete require.cache[twitterModulePath];
    });
});
