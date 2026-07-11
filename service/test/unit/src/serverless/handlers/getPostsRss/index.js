import {expect} from "chai";
import getPostsRss from "../../../../../../src/serverless/handlers/getPostsRss/index.js";

describe("getPostsRss", function () {
    it("handles a request", function () {
        expect(() => getPostsRss({}, {}, () => {})).to.not.throw();
    });

    it("handles an error request", function () {
        expect(() => getPostsRss({queryStringParameters: {}}, {}, () => {})).to.not.throw();
    });

    it("handles a parse error request", function () {
        expect(() => getPostsRss({source: "serverless-plugin-warmup"}, {}, () => {})).to.not.throw();
    });

    it("returns early after being warmed", function () {
        expect(() => getPostsRss({source: "serverless-plugin-warmup"}, {}, () => {})).to.not.throw();
    });
});
