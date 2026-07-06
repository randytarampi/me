import {expect} from "chai";
import instagramAuthCallback from "../../../../../../src/serverless/handlers/instagramAuthCallback/index.js";

describe("instagramAuthCallback", function () {
    this.timeout(5000);

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
