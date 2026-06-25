import {expect} from "chai";
import path from "path";
import sinon from "sinon";
import assemblePrintable from "../../../../src/lib/assemblePrintable.js";

describe("assemblePrintable", function () {
    let stubPrintableBuilder;

    beforeEach(function () {
        stubPrintableBuilder = sinon.stub().callsFake((printableJson, printableFilename) => {
            return {
                printableJson,
                printableFilename
            };
        });
    });

    it("calls `printableBuilder` with the correct parameters", function () {
        const stubPrintableFilename = "test";
        const assembledPrintable = assemblePrintable(stubPrintableBuilder)(path.resolve("test/resources", stubPrintableFilename));

        expect(assembledPrintable).to.eql({
            printableJson: {},
            printableFilename: stubPrintableFilename
        });
        expect(stubPrintableBuilder.calledOnce).to.eql(true);
        sinon.assert.calledWith(stubPrintableBuilder, {}, stubPrintableFilename);
    });
});
