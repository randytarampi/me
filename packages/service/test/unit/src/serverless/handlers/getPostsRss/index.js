const {expect} = require("chai");
const {freshRequire} = require("../../../../../lib/freshRequire.js");

describe("getPostsRss", function () {
    const getPostsRss = freshRequire("../../../../../../src/serverless/handlers/getPostsRss").default;

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
module.exports.default = module.exports;
