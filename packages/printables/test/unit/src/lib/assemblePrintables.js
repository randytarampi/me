import {expect} from "chai";
import path from "path";
import sinon from "sinon";
import assemblePrintables from "../../../../src/lib/assemblePrintables.js";

describe("assemblePrintables", function () {
    let stubPrintableBuilder;

    beforeEach(function () {
        stubPrintableBuilder = sinon.stub().callsFake((printableJson, printableFilename) => ({
            printableJson,
            printableFilename
        }));
    });

    afterEach(function () {
        sinon.restore();
    });

    it("delegates to `assemblePrintable`", async function () {
        const stubDirectory = path.resolve("test/resources/printables");

        const printables = await assemblePrintables(stubPrintableBuilder)(stubDirectory);

        expect(printables).to.have.length(3);
        expect(printables.map(({printableFilename}) => printableFilename).sort()).to.eql(["grr", "meow", "woof"]);
        expect(stubPrintableBuilder.callCount).to.eql(3);
        ["woof", "grr", "meow"].forEach(stubFile => sinon.assert.calledWith(stubPrintableBuilder, {name: stubFile}, stubFile));
    });

    it("handles errors", async function () {
        const stubDirectory = path.resolve("test/resources/missing");

        try {
            await assemblePrintables(stubPrintableBuilder)(stubDirectory);
            throw new Error("Wtf? This should've thrown");
        } catch (error) {
            expect(error.code).to.eql("ENOENT");
        }
    });
});
