import {expect} from "chai";
import path from "path";
import sinon from "sinon";
import assemblePrintable from "../../../../src/lib/assemblePrintable";

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
        const assembledPrintable = assemblePrintable(stubPrintableBuilder)(path.join(__dirname, `../../../resources/${stubPrintableFilename}`));

        expect(assembledPrintable).to.eql({
            printableJson: {},
            printableFilename: stubPrintableFilename
        });
        expect(stubPrintableBuilder.calledOnce).to.eql(true);
        sinon.assert.calledWith(stubPrintableBuilder, {}, stubPrintableFilename);
    });
});
