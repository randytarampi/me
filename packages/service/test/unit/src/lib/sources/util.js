import {expect} from "chai";
import sinon from "sinon";
import {filterPostForOrderingConditionsInSearchParams} from "../../../../../src/lib/sources/util";

describe("util", function () {
    describe("filterPostForOrderingConditionsInSearchParams", function () {
        it("returns `true` if `!searchParams.hasOrderingConditions`", function () {
            const stubSearchParams = {
                hasOrderingConditions: false,
                computeOrderingComparisonForEntity: sinon.stub().returns(false)
            };
            const stubPost = {};

            const postFilteredThrough = filterPostForOrderingConditionsInSearchParams(stubPost, stubSearchParams);

            expect(postFilteredThrough).to.eql(true);
            expect(stubSearchParams.computeOrderingComparisonForEntity.notCalled).to.eql(true);
        });

        it("defers to `searchParams.computeOrderingComparisonForEntity` if `searchParams.hasOrderingConditions`", function () {
            const stubSearchParams = {
                hasOrderingConditions: true,
                computeOrderingComparisonForEntity: sinon.stub().returns(false)
            };
            const stubPost = {};

            const postFilteredThrough = filterPostForOrderingConditionsInSearchParams(stubPost, stubSearchParams);

            expect(postFilteredThrough).to.eql(false);
            sinon.assert.calledWith(stubSearchParams.computeOrderingComparisonForEntity, stubPost);
        });
    });
});
