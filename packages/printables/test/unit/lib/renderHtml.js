import {expect} from "chai";
import path from "path";
import pug from "pug";
import sinon from "sinon";
import * as buildPugLocalsModule from "../../../lib/buildPugLocals";
import {renderHtml} from "../../../lib/renderHtml";

describe("renderHtml", function () {
    let stubPugLocalsBuilder;
    let stubRenderLocals;
    let stubPrintableComponent;
    let stubPrintableStylesPath;
    let stubPrintable;

    beforeEach(function () {
        stubPugLocalsBuilder = sinon.stub().returns({
            woof: "meow"
        });
        sinon.stub(buildPugLocalsModule, "buildPugLocalsBuilder").returns(stubPugLocalsBuilder);
        sinon.stub(pug, "renderFile").returns("grr");

        stubRenderLocals = {
            rawr: 1
        };
        stubPrintableComponent = {
            argh: 2
        };
        stubPrintableStylesPath = "/foo/bar";
        stubPrintable = {
            ugh: 3
        };
    });

    afterEach(function () {
        buildPugLocalsModule.buildPugLocalsBuilder.restore();
        pug.renderFile.restore();
    });

    it("calls `pug.renderFile` with the correct arguments", function () {
        const pugLocalsBuilder = renderHtml({
            printableComponent: stubPrintableComponent,
            printableStylesPath: stubPrintableStylesPath,
            printable: stubPrintable
        });
        expect(pugLocalsBuilder).to.be.ok;
        expect(pugLocalsBuilder).to.be.instanceof(Function);
        expect(buildPugLocalsModule.buildPugLocalsBuilder.calledOnce).to.be.ok;
        sinon.assert.calledWith(buildPugLocalsModule.buildPugLocalsBuilder, {
            printableComponent: stubPrintableComponent,
            printableStylesPath: stubPrintableStylesPath,
            printable: stubPrintable
        });

        const renderedHtml = pugLocalsBuilder(stubRenderLocals);
        expect(renderedHtml).to.be.ok;
        expect(renderedHtml).to.eql("grr");
        expect(stubPugLocalsBuilder.calledOnce).to.be.ok;
        sinon.assert.calledWith(stubPugLocalsBuilder, stubRenderLocals);
        expect(pug.renderFile.calledOnce).to.be.ok;
        sinon.assert.calledWith(pug.renderFile, path.join(__dirname, "../../../node_modules/@randy.tarampi/views/templates/index.pug"), {woof: "meow"});
    });
});
