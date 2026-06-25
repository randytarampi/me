import {expect} from "chai";
import fs from "fs";
import path from "path";
import React from "react";
import sinon from "sinon";
import {renderPrintablesToHtml} from "../../../../src/lib/renderPrintablesToHtml.js";

describe("renderPrintablesToHtml", function () {
    afterEach(function () {
        sinon.restore();
    });

    it("delegates to `renderPrintablesHtml` and `fs.writeFile`", async function () {
        const printableComponent = ({printable}) => React.createElement("div", null, printable.name);
        const printableStylesPath = path.resolve("test/resources/styles.css");
        const printableTemplateDirectory = path.resolve("test/resources/printables");
        const printableBuilder = (printableJson, printableFilename) => ({
            ...printableJson,
            filename: printableFilename
        });
        const printableDestinationDirectory = path.resolve("test/resources/output");

        fs.mkdirSync(printableDestinationDirectory, {recursive: true});
        sinon.stub(fs, "writeFile").callsFake((filePath, file, callback) => callback());

        const files = await renderPrintablesToHtml({
            printableComponent,
            printableStylesPath,
            printableBuilder,
            printableTemplateDirectory,
            printableRenderOptions: {woof: "meow"},
            printableDestinationDirectory
        });

        expect(files).to.have.length(3);
        expect(fs.writeFile.callCount).to.eql(3);
        expect(fs.writeFile.firstCall.args[0]).to.match(/\.html$/);
    });

    it("handles errors", async function () {
        const printableComponent = ({printable}) => React.createElement("div", null, printable.name);
        const printableStylesPath = path.resolve("test/resources/styles.css");
        const printableTemplateDirectory = path.resolve("test/resources/printables");
        const printableBuilder = (printableJson, printableFilename) => ({
            ...printableJson,
            filename: printableFilename
        });
        const printableDestinationDirectory = path.resolve("test/resources/output");

        sinon.stub(fs, "writeFile").throws(new Error("woof"));

        try {
            await renderPrintablesToHtml({
                printableComponent,
                printableStylesPath,
                printableBuilder,
                printableTemplateDirectory,
                printableRenderOptions: {woof: "meow"},
                printableDestinationDirectory
            });
            throw new Error("Wtf? This should've thrown");
        } catch (error) {
            expect(error.message).to.eql("woof");
        }
    });

    it("handles `fs.writeFile` errors", async function () {
        const printableComponent = ({printable}) => React.createElement("div", null, printable.name);
        const printableStylesPath = path.resolve("test/resources/styles.css");
        const printableTemplateDirectory = path.resolve("test/resources/printables");
        const printableBuilder = (printableJson, printableFilename) => ({
            ...printableJson,
            filename: printableFilename
        });
        const printableDestinationDirectory = path.resolve("test/resources/output");

        sinon.stub(fs, "writeFile").callsFake((filePath, file, callback) => callback(new Error("meow")));

        try {
            await renderPrintablesToHtml({
                printableComponent,
                printableStylesPath,
                printableBuilder,
                printableTemplateDirectory,
                printableRenderOptions: {woof: "meow"},
                printableDestinationDirectory
            });
            throw new Error("Wtf? This should've thrown");
        } catch (error) {
            expect(error.message).to.eql("meow");
        }
    });
});
