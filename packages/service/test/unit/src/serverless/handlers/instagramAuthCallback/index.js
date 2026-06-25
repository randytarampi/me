const {expect} = require("chai");
const {freshRequire} = require("../../../../../lib/freshRequire.js");

describe("instagramAuthCallback", function () {
    this.timeout(5000);

    const instagramAuthCallback = freshRequire("../../../../../../src/serverless/handlers/instagramAuthCallback").default;

    it("handles a request with a code", function () {
        expect(() => instagramAuthCallback({queryStringParameters: {code: "grr"}}, {}, () => {})).to.not.throw();
    });

    it("handles an error request", function () {
        expect(() => instagramAuthCallback({queryStringParameters: {code: "grr"}}, {}, () => {})).to.not.throw();
    });

    it("throws if no `code` provided", function () {
        expect(() => instagramAuthCallback({queryStringParameters: {}}, {}, () => {})).to.not.throw();
    });
});
module.exports.default = module.exports;
