// Regression test for https://github.com/randytarampi/me/issues/945
// `@randy.tarampi/schema-dot-org-json-ld-components` is a CJS module that sets
// `exports.default = JsonLd`. When imported via native ESM (`import X from "..."`),
// Node.js wraps the entire `module.exports` as the default export, giving
// `{default: JsonLd}` instead of `JsonLd`. The compiled letter package must
// unwrap this correctly or `renderToStaticMarkup` fails with
// "Element type is invalid: expected a string ... but got: object."
import {createRequire} from "module";

const require = createRequire(import.meta.url);

const {expect} = require("chai");
const {createElement} = require("react");
const {renderToStaticMarkup} = require("react-dom/server");
const {ServerApp} = require("@randy.tarampi/letter");
const {Letter} = require("@randy.tarampi/letter/esm/lib/letter.js");
const letterJson = require("../../../../esm/letters/letter.json");

describe("compiled ServerApp (regression test for #945)", function () {
    it("renders the compiled letter package via renderToStaticMarkup without 'Element type is invalid' errors", function () {
        const letter = Letter.fromJS(letterJson);

        // This exercises the same code path as the job-application gulpfile:
        // require("@randy.tarampi/letter").ServerApp → renderToStaticMarkup
        const markup = renderToStaticMarkup(createElement(ServerApp, {printable: letter}));

        expect(markup).to.be.a("string");
        expect(markup).to.not.be.empty;
        expect(markup).to.contain("printable");
    });

    it("SchemaJsonLdComponent renders JSON-LD script tags in the compiled output", function () {
        const letter = Letter.fromJS(letterJson);

        const markup = renderToStaticMarkup(createElement(ServerApp, {printable: letter}));

        // The SchemaJsonLdComponent renders <script type="application/ld+json">
        expect(markup).to.contain("application/ld+json");
    });
});