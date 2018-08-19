import {expect} from "chai";
import path from "path";
import Helmet from "react-helmet";
import assembleLetter from "../../../lib/assembleLetter";
import renderHtml from "../../../lib/renderHtml";

describe("renderHtml", function () {
    this.timeout(60000);

    beforeEach(function () {
        Helmet.canUseDOM = false;
    });

    afterEach(function () {
        Helmet.canUseDOM = true;
    });

    it("works with JSON", function () {
        const letter = assembleLetter(path.join(__dirname, "../../resources/test.json"));
        const letterHtml = renderHtml(letter);

        expect(letterHtml).to.be.ok;
        expect(letterHtml).to.be.a("string");
        expect(letterHtml).to.have.string(letter.sender.name);
    });

    it("works with JS", function () {
        const letter = assembleLetter(path.join(__dirname, "../../resources/meow.js"));
        const letterHtml = renderHtml(letter);

        expect(letterHtml).to.be.ok;
        expect(letterHtml).to.be.a("string");
        expect(letterHtml).to.have.string(letter.recipient.name);
    });

    it("works with JSX", function () {
        const letter = assembleLetter(path.join(__dirname, "../../resources/woof.jsx"));
        const letterHtml = renderHtml(letter);

        expect(letterHtml).to.be.ok;
        expect(letterHtml).to.be.a("string");
        expect(letterHtml).to.have.string(letter.sender.name);
    });
});
