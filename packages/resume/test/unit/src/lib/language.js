import {expect} from "chai";
import Language from "../../../../src/lib/language";

describe("Language", function () {
    let stubLanguageJs;

    beforeEach(function () {
        stubLanguageJs = {
            fluency: "Woof",
            language: "Meow"
        };
    });

    describe("constructor", function () {
        it("returns a Language", function () {
            const language = new Language({
                ...stubLanguageJs
            });

            expect(language).to.be.instanceOf(Language);
            expect(language.fluency).to.eql(stubLanguageJs.fluency);
            expect(language.language).to.eql(stubLanguageJs.language);
        });

        it("returns an empty Language", function () {
            const language = new Language();

            expect(language).to.be.instanceOf(Language);
        });
    });

    describe("fromJS", function () {
        it("returns a Language", function () {
            const language = Language.fromJS({
                ...stubLanguageJs
            });

            expect(language).to.be.instanceOf(Language);
            expect(language.fluency).to.eql(stubLanguageJs.fluency);
            expect(language.language).to.eql(stubLanguageJs.language);
        });

        it("returns an empty Language", function () {
            const language = Language.fromJS();

            expect(language).to.be.instanceOf(Language);
        });
    });

    describe("fromJSON", function () {
        it("returns a Language", function () {
            const language = Language.fromJSON({
                ...stubLanguageJs
            });

            expect(language).to.be.instanceOf(Language);
            expect(language.fluency).to.eql(stubLanguageJs.fluency);
            expect(language.language).to.eql(stubLanguageJs.language);
        });

        it("returns an empty Language", function () {
            const language = Language.fromJSON();

            expect(language).to.be.instanceOf(Language);
        });
    });

    describe("fromResume", function () {
        it("returns a Language", function () {
            const language = Language.fromResume({
                ...stubLanguageJs
            });

            expect(language).to.be.instanceOf(Language);
            expect(language.fluency).to.eql(stubLanguageJs.fluency);
            expect(language.language).to.eql(stubLanguageJs.language);
        });

        it("returns an empty Language", function () {
            const language = Language.fromResume();

            expect(language).to.be.instanceOf(Language);
        });
    });
});
