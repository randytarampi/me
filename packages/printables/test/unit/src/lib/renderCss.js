import {expect} from "chai";
import fs from "fs";
import sinon from "sinon";
import renderCss from "../../../../src/lib/renderCss";

describe("renderCss", function () {
    beforeEach(function () {
        sinon.stub(fs, "readFileSync").callsFake(path => path);
    });

    afterEach(function () {
        fs.readFileSync.restore();
    });

    it("delegates to `assembleLetter`", function () {
        const stubPath = "woof";
        const renderedCss = renderCss(stubPath);

        expect(renderedCss).to.be.ok;
        expect(renderedCss).to.eql(stubPath);
        expect(fs.readFileSync.calledOnce).to.eql(true);
        sinon.assert.calledWith(fs.readFileSync, stubPath);
    });

    it("handles errors", function () {
        const stubPath = "woof";

        fs.readFileSync.restore();
        sinon.stub(fs, "readFileSync").throws(new Error("ʕ•ᴥ•ʔ"));

        try {
            renderCss(stubPath);
            throw new Error("Wtf? This should've thrown");
        } catch (error) {
            expect(fs.readFileSync.calledOnce).to.eql(true);
            sinon.assert.calledWith(fs.readFileSync, stubPath);
            expect(error).to.be.ok;
            expect(error.message).to.eql("ʕ•ᴥ•ʔ");
        }
    });
});
