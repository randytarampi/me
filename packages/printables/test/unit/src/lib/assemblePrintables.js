import {expect} from "chai";
import fs from "fs";
import path from "path";
import sinon from "sinon";
import * as assemblePrintableModule from "../../../../src/lib/assemblePrintable";
import assemblePrintables from "../../../../src/lib/assemblePrintables";

describe("assemblePrintables", function () {
    let stubFiles;
    let stubPrintableBuilder;

    beforeEach(function () {
        stubFiles = ["woof", "grr", "meow"];

        stubPrintableBuilder = sinon.stub().callsFake((printableJson, printableFilename) => {
            return {
                printableJson,
                printableFilename
            };
        });
        sinon.stub(assemblePrintableModule, "assemblePrintable").returns(stubPrintableBuilder);
        sinon.stub(fs, "readdir").callsFake((directory, callback) => {
            callback(null, stubFiles);
        });
    });

    afterEach(function () {
        assemblePrintableModule.assemblePrintable.restore();
        fs.readdir.restore();
    });

    it("delegates to `assembleLetter`", function () {
        const stubDirectory = path.join(__dirname, "../../resources");

        return assemblePrintables(stubPrintableBuilder)(stubDirectory)
            .then(letters => {
                expect(letters).to.have.length(stubFiles.length);
                expect(stubPrintableBuilder.callCount).to.eql(3);
                stubFiles.map(stubFile => sinon.assert.calledWith(stubPrintableBuilder, path.join(stubDirectory, stubFile)));
                expect(fs.readdir.calledOnce).to.eql(true);
                sinon.assert.calledWith(fs.readdir, stubDirectory);
            });
    });

    it("handles errors", function () {
        const stubDirectory = path.join(__dirname, "../../resources");

        fs.readdir.restore();
        sinon.stub(fs, "readdir").callsFake((directory, callback) => {
            callback(new Error("ʕ•ᴥ•ʔ"));
        });

        return assemblePrintables(stubPrintableBuilder)(stubDirectory)
            .then(() => {
                throw new Error("Wtf? This should've thrown");
            })
            .catch(error => {
                expect(error.message).to.eql("ʕ•ᴥ•ʔ");
            });
    });
});
