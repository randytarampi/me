import {expect} from "chai";
import getBrowserLanguage from "../../../../src/lib/util/getBrowserLanguage";

describe("getBrowserLanguage", function () {
    const navigatorLanguages = navigator.languages;
    const navigatorLanguage = navigator.language;

    afterEach(function () {
        navigator.language = navigatorLanguage;
        navigator.languages = navigatorLanguages;
    });

    it("gets `en` by default", function () {
        delete navigator.language;
        delete navigator.languages;

        expect(getBrowserLanguage()).to.eql("en");
    });

    it("gets `navigator.languages[0]`", function () {
        navigator.languages = ["woof", "meow"];

        expect(getBrowserLanguage()).to.eql(navigator.languages[0]);
    });

    it("gets `navigator.language`", function () {
        navigator.languages = undefined;
        navigator.language = "grr";

        expect(getBrowserLanguage()).to.eql(navigator.language);
    });
});
