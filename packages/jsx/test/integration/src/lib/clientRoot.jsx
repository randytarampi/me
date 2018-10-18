import {expect} from "chai";
import {mount} from "enzyme";
import React from "react";
import sinon from "sinon";
import {ClientRoot} from "../../../../src/lib/clientRoot";
import logger from "../../../../src/lib/logger";

describe("ClientRoot", function () {
    const globalNavigator = global.navigator;

    beforeEach(function () {
        sinon.spy(logger, "info");
        sinon.spy(logger, "warn");
    });

    afterEach(function () {
        logger.info.restore();
        logger.warn.restore();
        global.navigator = Object.assign({}, globalNavigator);
    });

    describe("constructor", function () {
        it("logs a greeting (generic)", function () {
            const rendered = mount(<ClientRoot/>);

            expect(rendered).to.be.ok;
            expect(logger.info.callCount).to.eql(4);
            sinon.assert.calledWith(logger.info, sinon.match(/Hey! I see you looking over there./));
            expect(logger.warn.callCount).to.eql(1);
            sinon.assert.calledWith(logger.warn, sinon.match(/If you're a developer and you're reading this message/));
        });

        it("logs a greeting (Firefox)", function () {
            global.navigator.userAgent = "Mozilla/5.0 (Windows NT 10.0; WOW64; rv:42.0) Gecko/20100101 Firefox/42.0";
            const rendered = mount(<ClientRoot/>);

            expect(rendered).to.be.ok;
            expect(logger.info.callCount).to.eql(5);
            sinon.assert.calledWith(logger.info, sinon.match(/Hey! I see you looking over there./));
            sinon.assert.calledWith(logger.info, sinon.match(/https:\/\/addons\.mozilla\.org\/en-US\/firefox\/addon\/remotedev/m));
        });

        it("logs a greeting (Chrome)", function () {
            global.navigator.userAgent = "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2490.80 Safari/537.36";
            const rendered = mount(<ClientRoot/>);

            expect(rendered).to.be.ok;
            expect(logger.info.callCount).to.eql(5);
            sinon.assert.calledWith(logger.info, sinon.match(/Hey! I see you looking over there./));
            sinon.assert.calledWith(logger.info, sinon.match(/https:\/\/chrome\.google\.com\/webstore\/detail\/redux-devtools/m));
        });

        it("logs a greeting (IE)", function () {
            global.navigator.userAgent = "Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.1; Trident/6.0)";
            const rendered = mount(<ClientRoot/>);

            expect(rendered).to.be.ok;
            expect(logger.info.callCount).to.eql(4);
            sinon.assert.calledWith(logger.info, sinon.match(/Hey! I see you looking over there./));
            expect(logger.warn.callCount).to.eql(1);
            sinon.assert.calledWith(logger.warn, sinon.match(/Do yourself a favour and go here before you do anything else:/));
        });
    });

    it("renders", function () {
        const stubProps = {
            woof: "meow"
        };
        const stubChildren = <p id="Woof">Woof woof woof.</p>;
        const rendered = mount(<ClientRoot {...stubProps}>{stubChildren}</ClientRoot>);

        expect(rendered).to.be.ok;
        expect(rendered).to.contain(stubChildren);
    });
});
