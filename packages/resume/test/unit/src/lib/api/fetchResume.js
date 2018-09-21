import {expect} from "chai";
import proxyquire from "proxyquire";
import Resume from "../../../../../src/lib/resume";
import testResumeJson from "../../../../../src/resumes/test";

describe("fetchResume", function () {
    it("delegates to `fetch` with the correct parameters", function () {
        const stubVariant = "fetch!";
        const stubResumeResponse = {
            json: () => {
                return Promise.resolve(testResumeJson);
            }
        };

        const proxyquiredFetchResume = proxyquire("../../../../../src/lib/api/fetchResume", {
            "isomorphic-fetch": (fetchUrl, options) => {
                expect(fetchUrl).to.be.ok;
                expect(fetchUrl).to.match(/\/fetch!/);

                expect(options).to.be.ok;
                expect(options.headers).to.be.ok;
                expect(options.headers).to.eql({
                    "Accept": "application/json",
                    "Accept-Charset": "utf-8"
                });

                return Promise.resolve(stubResumeResponse);
            }
        });

        return proxyquiredFetchResume.default(stubVariant)
            .then(resumeResponse => {
                expect(resumeResponse).to.be.ok;
                expect(resumeResponse).to.eql(Resume.fromResume(testResumeJson));
            });
    });

    it("returns `null` if `status` is `404`", function () {
        const stubVariant = "fetch!";
        const stubResumeResponse = {
            status: 404,
            json: () => {
                return Promise.reject(new Error("Wtf? This shouldn't have thrown"));
            }
        };

        const proxyquiredFetchResume = proxyquire("../../../../../src/lib/api/fetchResume", {
            "isomorphic-fetch": (fetchUrl, options) => {
                expect(fetchUrl).to.be.ok;
                expect(fetchUrl).to.match(/\/fetch!/);

                expect(options).to.be.ok;
                expect(options.headers).to.be.ok;
                expect(options.headers).to.eql({
                    "Accept": "application/json",
                    "Accept-Charset": "utf-8"
                });

                return Promise.resolve(stubResumeResponse);
            }
        });

        return proxyquiredFetchResume.default(stubVariant)
            .then(resumeResponse => {
                expect(resumeResponse).to.not.be.ok;
                expect(resumeResponse).to.eql(null);
            });
    });
});
