import {expect} from "chai";
import path from "path";
import React from "react";
import pug from "pug";
import sinon from "sinon";
import {renderPrintablesHtml} from "../../../../src/lib/renderPrintablesHtml.js";

describe("renderPrintablesHtml", function () {
    afterEach(function () {
        sinon.restore();
    });

    it("delegates to `assemblePrintables` and `renderHtml`", async function () {
        const printableComponent = ({printable}) => React.createElement("div", null, printable.name);
        const printableStylesPath = path.resolve("test/resources/styles.css");
        const printableTemplateDirectory = path.resolve("test/resources/printables");
        const printableBuilder = (printableJson, printableFilename) => ({
            ...printableJson,
            filename: printableFilename
        });
        const printableRenderOptions = {woof: "meow"};

        sinon.stub(pug, "renderFile").callsFake((templatePath, locals) => `html:${locals.printable.filename}`);

        const pairs = await renderPrintablesHtml({
            printableComponent,
            printableStylesPath,
            printableBuilder,
            printableTemplateDirectory,
            printableRenderOptions
        });

        expect(pairs).to.have.length(3);
        expect(pairs.map(({printableHtml}) => printableHtml).sort()).to.eql(["html:grr", "html:meow", "html:woof"]);
        expect(pairs.map(({printable}) => printable.filename).sort()).to.eql(["grr", "meow", "woof"]);
        expect(pug.renderFile.callCount).to.eql(3);
    });
});
