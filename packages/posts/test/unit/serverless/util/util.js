import {expect} from "chai";
import SearchParams from "../../../../lib/searchParams";
import {parseQueryStringParametersIntoSearchParams} from "../../../../serverless/util/parseQueryStringParametersIntoSearchParams";

describe("util", function () {
    describe("parseQueryStringParametersIntoSearchParams", function () {
        it("returns the expected SearchParams", function () {
            const baseParameters = {
                type: "woof"
            };
            const queryStringParameters = {
                source: "meow",
                perPage: "4"
            };
            const searchParams = parseQueryStringParametersIntoSearchParams(baseParameters)(queryStringParameters);

            expect(searchParams).to.be.ok;
            expect(searchParams).to.be.instanceOf(SearchParams);
            expect(searchParams.type).to.eql("woof");
            expect(searchParams.source).to.eql("meow");
            expect(searchParams.perPage).to.eql(4);
        });
    });
});
