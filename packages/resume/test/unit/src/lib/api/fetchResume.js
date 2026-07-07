import {expect} from "chai";
import path from "path";
import Resume from "../../../../../src/lib/resume.js";
import {createRequire} from "module";
import sinon from "sinon";
import fetchResumeApi, {buildFetchUrlForVariant} from "../../../../../src/lib/api/fetchResume.js";

const require = createRequire(path.resolve("test/unit/src/lib/api/fetchResume.js"));
const testResumeJson = require("../../../../../src/resumes/some-awesome-company.json");

describe("fetchResume", function () {
    it("delegates to `fetch` with the correct parameters", async function () {
        const stubVariant = "fetch!";
        const stubResumeResponse = {
            json: () => {
                return Promise.resolve(testResumeJson);
            }
        };
        const fetchStub = sinon.stub(global, "fetch").callsFake((fetchUrl, options) => {
            expect(fetchUrl).to.match(/\/fetch!/);

            expect(options.headers).to.eql({
                "Accept": "application/json",
                "Accept-Charset": "utf-8"
            });

            return Promise.resolve(stubResumeResponse);
        });

        try {
            const resumeResponse = await fetchResumeApi(stubVariant);
            expect(resumeResponse).to.eql(Resume.fromResume(testResumeJson));
        } finally {
            fetchStub.restore();
        }
    });

    it("returns `null` if `status` is `404`", async function () {
        const stubVariant = "fetch!";
        const stubResumeResponse = {
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

            return Promise.resolve(stubResumeResponse);
        });

        try {
            const resumeResponse = await fetchResumeApi(stubVariant);
            expect(resumeResponse).to.not.be.ok;
            expect(resumeResponse).to.eql(null);
        } finally {
            fetchStub.restore();
        }
    });
});

describe("buildFetchUrlForVariant", function () {
    // NOTE-RT: regression test for a `ReferenceError: Can't find variable: process` crash reported when
    // navigating to `/resume` in the browser - `process` isn't polyfilled in webpack5 browser bundles, so a
    // bare `process.env.RESUME_SERVICE_URL` reference used to throw instead of falling back to the
    // babel-replaced `__RESUME_SERVICE_URL__` build-time constant.
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

    it("prefers `process.env.RESUME_SERVICE_URL` when `process` is available", function () {
        const originalResumeServiceUrl = process.env.RESUME_SERVICE_URL;

        process.env.RESUME_SERVICE_URL = "http://stub-resume-service-url";

        try {
            expect(buildFetchUrlForVariant("test")).to.eql("http://stub-resume-service-url/test.json");
        } finally {
            process.env.RESUME_SERVICE_URL = originalResumeServiceUrl;
        }
    });
});
