import {expect} from "chai";
import fs from "fs";
import path from "path";
import sinon from "sinon";
import * as renderPrintablesHtmlModule from "../../../lib/renderPrintablesHtml";
import {renderPrintablesToHtml} from "../../../lib/renderPrintablesToHtml";

describe("renderPrintablesToHtml", function () {
    let stubPrintableComponent;
    let stubPrintableStylesPath;
    let stubPrintableBuilder;
    let stubPrintableTemplateDirectory;
    let stubPrintableRenderOptions;
    let stubPrintableDestinationDirectory;
    let stubPrintableHtmlPairs;

    beforeEach(function () {
        stubPrintableComponent = "woof";
        stubPrintableStylesPath = "meow";
        stubPrintableBuilder = "grr";
        stubPrintableTemplateDirectory = "rawr";
        stubPrintableRenderOptions = "argh";
        stubPrintableDestinationDirectory = "bah";
        stubPrintableHtmlPairs = [
            {printableHtml: 1, printable: 2},
            {printableHtml: 3, printable: 4}
        ];

        sinon.stub(fs, "writeFile").callsFake((path, file, callback) => callback());
        sinon.stub(renderPrintablesHtmlModule, "renderPrintablesHtml").returns(Promise.resolve(stubPrintableHtmlPairs));
    });

    afterEach(function () {
        fs.writeFile.restore();
        renderPrintablesHtmlModule.renderPrintablesHtml.restore();
    });

    it("delegates to `renderPrintablesHtml` and `fs.writeFile`", function () {
        return renderPrintablesToHtml({
            printableComponent: stubPrintableComponent,
            printableStylesPath: stubPrintableStylesPath,
            printableBuilder: stubPrintableBuilder,
            printableTemplateDirectory: stubPrintableTemplateDirectory,
            printableRenderOptions: stubPrintableRenderOptions,
            printableDestinationDirectory: stubPrintableDestinationDirectory
        })
            .then(files => {
                expect(files).to.be.ok;
                expect(files).to.have.length(stubPrintableHtmlPairs.length);

                expect(renderPrintablesHtmlModule.renderPrintablesHtml.calledOnce).to.be.ok;
                sinon.assert.calledWith(renderPrintablesHtmlModule.renderPrintablesHtml, {
                    printableComponent: stubPrintableComponent,
                    printableStylesPath: stubPrintableStylesPath,
                    printableBuilder: stubPrintableBuilder,
                    printableTemplateDirectory: stubPrintableTemplateDirectory,
                    printableRenderOptions: stubPrintableRenderOptions
                });

                expect(fs.writeFile.calledTwice).to.be.ok;
                stubPrintableHtmlPairs.forEach(({printableHtml: stubPrintableHtml}) => {
                    sinon.assert.calledWith(fs.writeFile, path.join(stubPrintableDestinationDirectory, "/undefined.html"), stubPrintableHtml);
                });
            });
    });
});
