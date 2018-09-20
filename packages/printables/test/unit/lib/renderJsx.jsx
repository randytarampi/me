import {expect} from "chai";
import React from "react";
import Helmet from "react-helmet";
import sinon from "sinon";
import {getRenderedHelmet, renderJsx} from "../../../lib/renderJsx";

describe("renderJsx", function () {
    describe("renderJsx", function () {
        it("calls `renderToStaticMarkup`", function () {
            const stubComponent = props => <div id="woof" {...props}>Woof!</div>;
            const stubProps = {
                meow: "grr",
                pageSize: "RAWR"
            };

            const jsxRenderer = renderJsx(stubComponent);
            expect(jsxRenderer).to.be.ok;
            expect(jsxRenderer).to.be.instanceof(Function);

            const rendered = jsxRenderer(stubProps);
            expect(rendered).to.be.ok;
            expect(rendered).to.eql(`<div id="woof" meow="${stubProps.meow}" pageSize="${stubProps.pageSize.toLocaleLowerCase()}">Woof!</div>`);
        });
    });

    describe("getRenderedHelmet", function () {
        beforeEach(function () {
            sinon.stub(Helmet, "renderStatic").returns("woof");
        });

        afterEach(function () {
            Helmet.renderStatic.restore();
        });

        it("gets calls `Helmet.renderStatic`", function () {
            const renderedHelmet = getRenderedHelmet();

            expect(renderedHelmet).to.be.ok;
            expect(renderedHelmet).to.eql("woof");

            expect(Helmet.renderStatic.calledOnce).to.be.ok;
        });
    });
});
