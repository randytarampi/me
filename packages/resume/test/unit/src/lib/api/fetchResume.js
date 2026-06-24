import {expect} from "chai";
import Resume from "../../../../../src/lib/resume";
import testResumeJson from "../../../../../src/resumes/some-awesome-company";
import sinon from "sinon";
import fetchResumeApi from "../../../../../src/lib/api/fetchResume";

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
