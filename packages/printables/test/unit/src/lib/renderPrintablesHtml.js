import {expect} from "chai";
import sinon from "sinon";
import * as assemblePrintablesModule from "../../../../src/lib/assemblePrintables";
import * as renderHtmlModule from "../../../../src/lib/renderHtml";
import {renderPrintablesHtml} from "../../../../src/lib/renderPrintablesHtml";

describe("renderPrintablesHtml", function () {
    let stubPrintableComponent;
    let stubPrintableStylesPath;
    let stubPrintableBuilder;
    let stubPrintableTemplateDirectory;
    let stubPrintableRenderOptions;
    let stubPrintableHtmlPairs;
    let stubPrintableHtmlRenderer;
    let stubPrintablesAssembler;

    beforeEach(function () {
        stubPrintableComponent = "woof";
        stubPrintableStylesPath = "meow";
        stubPrintableBuilder = "grr";
        stubPrintableTemplateDirectory = "rawr";
        stubPrintableRenderOptions = "argh";
        stubPrintableHtmlPairs = [
            {printableHtml: 1, printable: 2},
            {printableHtml: 3, printable: 4}
        ];
        stubPrintableHtmlRenderer = sinon.stub().callsFake(({printable}) => stubPrintableHtmlPairs.find(pair => pair.printable === printable).printableHtml);
        stubPrintablesAssembler = sinon.stub().returns(Promise.resolve(stubPrintableHtmlPairs.map(pair => pair.printable)));

        sinon.stub(assemblePrintablesModule, "assemblePrintables").returns(stubPrintablesAssembler);
        sinon.stub(renderHtmlModule, "renderHtml").returns(stubPrintableHtmlRenderer);
    });

    afterEach(function () {
        assemblePrintablesModule.assemblePrintables.restore();
        renderHtmlModule.renderHtml.restore();
    });

    it("delegates to `assemblePrintables` and `renderHtml`", function () {
        return renderPrintablesHtml({
            printableComponent: stubPrintableComponent,
            printableStylesPath: stubPrintableStylesPath,
            printableBuilder: stubPrintableBuilder,
            printableTemplateDirectory: stubPrintableTemplateDirectory,
            printableRenderOptions: stubPrintableRenderOptions
        })
            .then(pairs => {
                expect(pairs).to.be.ok;
                expect(pairs).to.have.length(stubPrintableHtmlPairs.length);
                expect(pairs).to.eql(stubPrintableHtmlPairs);

                expect(renderHtmlModule.renderHtml.calledOnce).to.be.ok;
                sinon.assert.calledWith(renderHtmlModule.renderHtml, {
                    printableComponent: stubPrintableComponent,
                    printableStylesPath: stubPrintableStylesPath
                });

                expect(assemblePrintablesModule.assemblePrintables.calledOnce).to.be.ok;
                sinon.assert.calledWith(assemblePrintablesModule.assemblePrintables, stubPrintableBuilder);

                expect(stubPrintablesAssembler.calledOnce).to.be.ok;
                sinon.assert.calledWith(stubPrintablesAssembler, stubPrintableTemplateDirectory);

                expect(stubPrintableHtmlRenderer.calledTwice).to.be.ok;
                stubPrintableHtmlPairs.forEach(({printable}) => {
                    sinon.assert.calledWith(stubPrintableHtmlRenderer, {
                        printable,
                        ...stubPrintableRenderOptions
                    });
                });
            });
    });
});
