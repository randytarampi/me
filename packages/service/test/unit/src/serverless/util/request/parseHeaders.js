const {expect} = require("chai");
const {freshRequire} = require("../../../../../lib/freshRequire.js");

describe("parseHeaders", function () {
    let versionHeader;
    let parseHeaders;

    beforeEach(function () {
        versionHeader = freshRequire("../../../../../../src/serverless/util/request/headers/version.js");
        parseHeaders = freshRequire("../../../../../../src/serverless/util/request/parseHeaders.js").default;
    });

    afterEach(function () {
    });

    it("returns no headers if it receives no headers", function () {
        const stubHeaders = null;
        const parsedHeaders = parseHeaders(stubHeaders);

        expect(parsedHeaders).to.eql(stubHeaders);
    });

    it("only inspects custom headers", function () {
        const stubHeaders = {};
        const parsedHeaders = parseHeaders(stubHeaders);

        expect(parsedHeaders).to.eql(stubHeaders);
    });

    it("inspects & parses custom headers", function () {
        const stubHeaders = {
            [versionHeader.headerName]: "5"
        };
        const parsedHeaders = parseHeaders(stubHeaders);

        expect(parsedHeaders).to.eql({
            [versionHeader.headerName]: "5",
            [versionHeader.headerName.toLowerCase()]: 5
        });
    });

    it("inspects & throws custom headers validation errors", function () {
        const stubHeaders = {
            [versionHeader.headerName]: "-1"
        };

        try {
            parseHeaders(stubHeaders);
            throw new Error("Wtf? This should've thrown");
        } catch (error) {
            expect(error.message).to.match(/^`ME-API-VERSION` is invalid$/);
        }
    });
});
module.exports.default = module.exports;
