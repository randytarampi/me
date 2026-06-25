import {expect} from "chai";
import {renderPrintablesToPdf} from "../../../../src/lib/renderPrintablesToPdf.js";

describe("renderPrintablesToPdf", function () {
    it("exports a function", function () {
        expect(renderPrintablesToPdf).to.be.a("function");
    });
});
