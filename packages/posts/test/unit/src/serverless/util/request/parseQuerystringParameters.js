import {expect} from "chai";
import parseQuerystringParameters from "../../../../../../src/serverless/util/request/parseQuerystringParameters";

describe("parseQuerystringParameters", function () {
    it("returns empty query string parameters if it receives no query string parameters", function () {
        const stubQuerystringParameters = null;
        const parsedQuerystringParameters = parseQuerystringParameters(stubQuerystringParameters);

        expect(parsedQuerystringParameters).to.eql({});
    });

    it("only inspects custom QuerystringParameters", function () {
        const stubQuerystringParameters = {};
        const parsedQuerystringParameters = parseQuerystringParameters(stubQuerystringParameters);

        expect(parsedQuerystringParameters).to.eql(stubQuerystringParameters);
    });

    it("inspects & parses custom QuerystringParameters", function () {
        const stubQuerystringParameters = {
            "page": "5",
            "perPage": "100",
        };
        const parsedQuerystringParameters = parseQuerystringParameters(stubQuerystringParameters);

        expect(parsedQuerystringParameters).to.be.ok;
        expect(parsedQuerystringParameters).to.eql({
            page: 5,
            perPage: 100
        });
    });

    it("inspects & throws custom QuerystringParameters validation errors", function () {
        const stubQuerystringParameters = {
            "page": "5",
            "perPage": "woof",
        };

        try {
            parseQuerystringParameters(stubQuerystringParameters);
            throw new Error("Wtf? This should've thrown");
        } catch (error) {
            expect(error).to.be.ok;
            expect(error.message).to.match(/^Expected `perPage` to be a number but got `woof` instead$/);
        }
    });
});
