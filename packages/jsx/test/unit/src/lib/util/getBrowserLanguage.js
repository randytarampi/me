const {expect} = require("chai");
const getBrowserLanguage = require("../../../../../src/lib/util/getBrowserLanguage.js").default || require("../../../../../src/lib/util/getBrowserLanguage.js");

describe("getBrowserLanguage", function () {
    const navigatorLanguages = navigator.languages;
    const navigatorLanguage = navigator.language;

    afterEach(function () {
        Object.defineProperty(navigator, "language", {
            configurable: true,
            value: navigatorLanguage
        });
        Object.defineProperty(navigator, "languages", {
            configurable: true,
            value: navigatorLanguages
        });
    });

    it("gets `en` by default", function () {
        Object.defineProperty(navigator, "language", {
            configurable: true,
            value: undefined
        });
        Object.defineProperty(navigator, "languages", {
            configurable: true,
            value: undefined
        });

        expect(getBrowserLanguage()).to.eql("en");
    });

    it("gets `navigator.languages[0]`", function () {
        Object.defineProperty(navigator, "languages", {
            configurable: true,
            value: ["woof", "meow"]
        });

        expect(getBrowserLanguage()).to.eql(navigator.languages[0]);
    });

    it("gets `navigator.language`", function () {
        Object.defineProperty(navigator, "languages", {
            configurable: true,
            value: undefined
        });
        Object.defineProperty(navigator, "language", {
            configurable: true,
            value: "grr"
        });

        expect(getBrowserLanguage()).to.eql(navigator.language);
    });
});
