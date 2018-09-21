import {expect} from "chai";
import sinon from "sinon";
import * as renderPdfModule from "../../../../src/lib/renderPdf";
import * as renderPrintablesHtmlModule from "../../../../src/lib/renderPrintablesHtml";
import {renderPrintablesToPdf} from "../../../../src/lib/renderPrintablesToPdf";

describe("renderPrintablesToPdf", function () {
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

        sinon.stub(renderPdfModule, "renderPdf").returns(Promise.resolve());
        sinon.stub(renderPrintablesHtmlModule, "renderPrintablesHtml").returns(Promise.resolve(stubPrintableHtmlPairs));
    });

    afterEach(function () {
        renderPdfModule.renderPdf.restore();
        renderPrintablesHtmlModule.renderPrintablesHtml.restore();
    });

    it("delegates to `renderPrintablesHtml` and `renderPdf`", function () {
        return renderPrintablesToPdf({
            printableComponent: stubPrintableComponent,
            printableStylesPath: stubPrintableStylesPath,
            printableBuilder: stubPrintableBuilder,
            printableTemplateDirectory: stubPrintableTemplateDirectory,
            printableRenderOptions: stubPrintableRenderOptions,
            printableDestinationDirectory: stubPrintableDestinationDirectory
        })
            .then(pdfs => {
                expect(pdfs).to.be.ok;
                expect(pdfs).to.have.length(stubPrintableHtmlPairs.length);

                expect(renderPrintablesHtmlModule.renderPrintablesHtml.calledOnce).to.be.ok;
                sinon.assert.calledWith(renderPrintablesHtmlModule.renderPrintablesHtml, {
                    printableComponent: stubPrintableComponent,
                    printableStylesPath: stubPrintableStylesPath,
                    printableBuilder: stubPrintableBuilder,
                    printableTemplateDirectory: stubPrintableTemplateDirectory,
                    printableRenderOptions: stubPrintableRenderOptions
                });

                expect(renderPdfModule.renderPdf.calledTwice).to.be.ok;
                stubPrintableHtmlPairs.forEach(({printable: stubPrintable, printableHtml: stubPrintableHtml}) => {
                    sinon.assert.calledWith(renderPdfModule.renderPdf, {
                        printable: stubPrintable,
                        printableHtml: stubPrintableHtml,
                        printableDestinationDirectory: stubPrintableDestinationDirectory
                    });
                });
            });
    });
});
