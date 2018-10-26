import {expect} from "chai";
import Helmet from "react-helmet";
import renderHtml from "../../../../src/lib/renderHtml";
import Resume from "../../../../src/lib/resume";
import resumeJson from "../../../../src/resumes/resume.json";

describe("renderHtml", function () {
    this.timeout(60000);

    beforeEach(function () {
        Helmet.canUseDOM = false;
    });

    afterEach(function () {
        Helmet.canUseDOM = true;
    });

    it("works with the default resume.json", function () {
        const resumeHtml = renderHtml();

        expect(resumeHtml).to.be.ok;
        expect(resumeHtml).to.be.a("string");
        expect(resumeHtml).to.have.string(resumeJson.basics.name);
    });

    it("accepts a passed in resume", function () {
        const stubResumeJson = Object.assign({}, resumeJson);
        stubResumeJson.basics.name = "First Woof Last Woof";
        const resume = Resume.fromResume(stubResumeJson);
        const resumeHtml = renderHtml(resume);

        expect(resumeHtml).to.be.ok;
        expect(resumeHtml).to.be.a("string");
        expect(resumeHtml).to.have.string(stubResumeJson.basics.name);
    });
});
