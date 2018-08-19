import {expect} from "chai";
import Helmet from "react-helmet";
import renderHtml from "../../../lib/renderHtml";
import resumeJson from "../../../resume.json";

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
        const resumeHtml = renderHtml(stubResumeJson);

        expect(resumeHtml).to.be.ok;
        expect(resumeHtml).to.be.a("string");
        expect(resumeHtml).to.have.string(stubResumeJson.basics.name);
    });
});
