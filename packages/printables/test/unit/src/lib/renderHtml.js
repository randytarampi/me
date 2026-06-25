import {expect} from "chai";
import path from "path";
import React from "react";
import pug from "pug";
import sinon from "sinon";
import {renderHtml} from "../../../../src/lib/renderHtml.js";

describe("renderHtml", function () {
    afterEach(function () {
        sinon.restore();
    });

    it("calls `pug.renderFile` with the correct arguments", function () {
        const PrintableComponent = ({rawr}) => React.createElement("div", null, `woof ${rawr}`);
        sinon.stub(pug, "renderFile").returns("grr");

        const renderedHtml = renderHtml({
            printableComponent: PrintableComponent,
            printableStylesPath: path.resolve("test/resources/styles.css"),
            printable: {ugh: 3}
        })({rawr: 1, printable: {ugh: 3}});

        expect(renderedHtml).to.eql("grr");
        expect(pug.renderFile.calledOnce).to.be.ok;

        const [templatePath, locals] = pug.renderFile.firstCall.args;
        expect(templatePath).to.eql(path.resolve("../views/templates/index.pug"));
        expect(locals).to.contain({
            environment: "printable",
            rawr: 1
        });
        expect(locals.content).to.contain("woof 1");
        expect(locals.css).to.contain("body");
        expect(locals.printable).to.eql({ugh: 3});
    });
});
