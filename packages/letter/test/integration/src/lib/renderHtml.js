import {expect} from "chai";
import path from "path";
import Helmet from "react-helmet";
import buildLetter from "../../../../src/lib/buildLetter";
import renderHtml from "../../../../src/lib/renderHtml";

describe("renderHtml", function () {
    this.timeout(60000);

    beforeEach(function () {
        Helmet.canUseDOM = false;
    });

    afterEach(function () {
        Helmet.canUseDOM = true;
    });

    it("works with JSON", function () {
        const letter = buildLetter(path.join(__dirname, "../../../../src/letters/some-awesome-company.json"));
        const letterHtml = renderHtml(letter);

        expect(letterHtml).to.be.a("string");
        expect(letterHtml).to.have.string(letter.sender.name);
    });

    it("works with JS", function () {
        const letter = buildLetter(path.join(__dirname, "../../resources/meow.js"));
        const letterHtml = renderHtml(letter);

        expect(letterHtml).to.be.a("string");
        expect(letterHtml).to.have.string(letter.recipient.name);
    });

    it("works with JSX", function () {
        const letter = buildLetter(path.join(__dirname, "../../resources/woof.jsx"));
        const letterHtml = renderHtml(letter);

        expect(letterHtml).to.be.a("string");
        expect(letterHtml).to.have.string(letter.sender.name);
    });
});
