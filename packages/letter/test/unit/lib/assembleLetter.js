import {expect} from "chai";
import path from "path";
import assembleLetter from "../../../lib/assembleLetter";
import Letter from "../../../lib/letter";

describe("assembleLetter", function () {
    it("works with JSON", function () {
        const letter = assembleLetter(path.join(__dirname, "../../resources/test.json"));

        expect(letter).to.be.ok;
        expect(letter).to.be.instanceof(Letter);
        expect(letter.id).to.eql("test");
        expect(letter.sender.name).to.eql("John Doe");
    });

    it("works with JS", function () {
        const letter = assembleLetter(path.join(__dirname, "../../resources/meow.js"));

        expect(letter).to.be.ok;
        expect(letter).to.be.instanceof(Letter);
        expect(letter.id).to.eql("meow");
        expect(letter.recipient.name).to.eql("Meow Meow");
    });

    it("works with JSX", function () {
        const letter = assembleLetter(path.join(__dirname, "../../resources/woof.jsx"));

        expect(letter).to.be.ok;
        expect(letter).to.be.instanceof(Letter);
        expect(letter.id).to.eql("woof");
        expect(letter.recipient.name).to.eql("Woof Woof");
    });
});
