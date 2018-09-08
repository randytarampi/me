import {expect} from "chai";
import fs from "fs";
import path from "path";
import sinon from "sinon";
import * as assembleLetterModule from "../../../lib/assembleLetter";
import assembleLetters from "../../../lib/assembleLetters";

describe("assembleLetters", function () {
    let stubFiles;

    beforeEach(function () {
        stubFiles = ["woof", "grr", "meow"];

        sinon.stub(assembleLetterModule, "assembleLetter").returns(Promise.resolve());
        sinon.stub(fs, "readdir").callsFake((directory, callback) => {
            callback(null, stubFiles);
        });
    });

    afterEach(function () {
        assembleLetterModule.assembleLetter.restore();
        fs.readdir.restore();
    });

    it("delegates to `assembleLetter`", function () {
        const stubDirectory = path.join(__dirname, "../../resources");

        return assembleLetters(stubDirectory)
            .then(letters => {
                expect(letters).to.be.ok;
                expect(letters).to.have.length(stubFiles.length);
                expect(assembleLetterModule.assembleLetter.callCount).to.eql(3);
                stubFiles.map(stubFile => sinon.assert.calledWith(assembleLetterModule.assembleLetter, path.join(stubDirectory, stubFile)));
                expect(fs.readdir.calledOnce).to.eql(true);
                sinon.assert.calledWith(fs.readdir, stubDirectory);
            });
    });

    it("handles errors", function () {
        const stubDirectory = path.join(__dirname, "../../resources");

        fs.readdir.restore();
        sinon.stub(fs, "readdir").callsFake((directory, callback) => {
            callback(new Error("ʕ•ᴥ•ʔ"));
        });

        return assembleLetters(stubDirectory)
            .then(() => {
                throw new Error("Wtf? This should've thrown");
            })
            .catch(error => {
                expect(error).to.be.ok;
                expect(error.message).to.eql("ʕ•ᴥ•ʔ");
            });
    });
});
