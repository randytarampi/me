import {expect} from "chai";
import path from "path";
import {createRequire} from "module";
import Letter from "../../../../../src/lib/letter.js";
import sinon from "sinon";
import fetchLetterApi, {buildFetchUrlForVariant} from "../../../../../src/lib/api/fetchLetter.js";

const require = createRequire(path.resolve("test/unit/src/lib/api/fetchLetter.js"));
const testLetterJson = require("../../../../../src/letters/letter.json");

describe("fetchLetter", function () {
    it("delegates to `fetch` with the correct parameters", async function () {
        const stubVariant = "fetch!";
        const stubLetterResponse = {
            json: () => {
                return Promise.resolve(testLetterJson);
            }
        };
        const fetchStub = sinon.stub(global, "fetch").callsFake((fetchUrl, options) => {
            expect(fetchUrl).to.match(/\/fetch!/);

            expect(options.headers).to.eql({
                "Accept": "application/json",
                "Accept-Charset": "utf-8"
            });

            return Promise.resolve(stubLetterResponse);
        });

        try {
            const letterResponse = await fetchLetterApi(stubVariant);
            expect(letterResponse.toJSON()).to.eql(Letter.fromJSON({
                ...testLetterJson,
                id: stubVariant
            }).toJSON());
        } finally {
            fetchStub.restore();
        }
    });

    it("returns `null` if `status` is `404`", async function () {
        const stubVariant = "fetch!";
        const stubLetterResponse = {
            status: 404,
            json: () => {
                return Promise.reject(new Error("Wtf? This shouldn't have thrown"));
            }
        };
        const fetchStub = sinon.stub(global, "fetch").callsFake((fetchUrl, options) => {
            expect(fetchUrl).to.match(/\/fetch!/);

            expect(options.headers).to.eql({
                "Accept": "application/json",
                "Accept-Charset": "utf-8"
            });

            return Promise.resolve(stubLetterResponse);
        });

        try {
            const letterResponse = await fetchLetterApi(stubVariant);
            expect(letterResponse).to.not.be.ok;
            expect(letterResponse).to.eql(null);
        } finally {
            fetchStub.restore();
        }
    });
});

describe("buildFetchUrlForVariant", function () {
    // NOTE-RT: regression test for a `ReferenceError: Can't find variable: process` crash reported when
    // navigating to `/letter` in the browser - `process` isn't polyfilled in webpack5 browser bundles, so a
    // bare `process.env.LETTER_SERVICE_URL` reference used to throw instead of falling back to the
    // babel-replaced `__LETTER_SERVICE_URL__` build-time constant.
    it("doesn't throw when `process` is unavailable (as in a browser bundle) and falls back to the build-time service URL constant", function () {
        // NOTE-RT: restore via the original, non-enumerable property descriptor (not a plain `global.process =
        // NOTE-RT: ...` reassignment, which would redefine it as enumerable) so mocha's `checkLeaks: true`
        // NOTE-RT: doesn't flag `process` as a newly-leaked global after this test.
        const originalProcessDescriptor = Object.getOwnPropertyDescriptor(global, "process");

        delete global.process;

        try {
            expect(() => buildFetchUrlForVariant("test")).to.not.throw();
            expect(buildFetchUrlForVariant("test")).to.match(/\/test\.json$/);
        } finally {
            Object.defineProperty(global, "process", originalProcessDescriptor);
        }
    });

    it("prefers `process.env.LETTER_SERVICE_URL` when `process` is available", function () {
        const originalLetterServiceUrl = process.env.LETTER_SERVICE_URL;

        process.env.LETTER_SERVICE_URL = "http://stub-letter-service-url";

        try {
            expect(buildFetchUrlForVariant("test")).to.eql("http://stub-letter-service-url/test.json");
        } finally {
            process.env.LETTER_SERVICE_URL = originalLetterServiceUrl;
        }
    });
});
