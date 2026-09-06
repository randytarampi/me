import {expect} from "chai";
import shouldUsePublicFeedV5 from "../../../../../src/lib/util/publicFeedVersion.js";

describe("publicFeedVersion", function () {
    it("enables V5 for dev stage builds but not production", function () {
        expect(shouldUsePublicFeedV5("dev")).to.eql(true);
        expect(shouldUsePublicFeedV5("development")).to.eql(true);
        expect(shouldUsePublicFeedV5("prd")).to.eql(false);
        expect(shouldUsePublicFeedV5("production")).to.eql(false);
    });
});
