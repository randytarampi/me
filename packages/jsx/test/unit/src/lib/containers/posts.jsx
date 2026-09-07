import {expect} from "chai";
import {getUsePublicFeedV5} from "../../../../../src/lib/containers/posts.jsx";

describe("posts container", function () {
    it("honours an explicit usePublicFeedV5 prop override", function () {
        expect(getUsePublicFeedV5(true)).to.equal(true);
        expect(getUsePublicFeedV5(false)).to.equal(false);
    });
});
