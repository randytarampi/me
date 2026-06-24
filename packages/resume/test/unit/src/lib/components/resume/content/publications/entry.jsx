import {expect} from "chai";
import {render} from "@testing-library/react";
import React from "react";
import ResumePublicationsEntry from "../../../../../../../../src/lib/components/resume/content/publications/entry";

describe("ResumePublicationsEntry", function () {
    let stubResumePublicationsEntry;

    beforeEach(function () {
        stubResumePublicationsEntry = {
            name: "Publication",
            publisher: "Company",
            releaseDate: "2014-10-01",
            url: "http://publication.com",
            summary: "Description..."
        };
    });

    it("renders", function () {
        const rendered = render(<ResumePublicationsEntry publicationsEntry={stubResumePublicationsEntry} index={0}/>);

        expect(rendered.container.firstElementChild?.classList.contains("hide-on-print")).to.eql(false);
        expect(rendered.container.querySelector(".resume-publications-entry")).to.not.eql(null);
        expect(rendered.container.querySelector(".resume-publications-entry__basics")).to.not.eql(null);
        expect(rendered.container.querySelector(".resume-publications-entry__date")).to.not.eql(null);
        expect(rendered.container.querySelector(".resume-publications-entry__name")).to.not.eql(null);

        expect(rendered.container.querySelector(".resume-publications-entry__url")).to.not.eql(null);

        expect(rendered.container.querySelector(".resume-publications-entry__publisher")).to.not.eql(null);
        expect(rendered.container.querySelector(".resume-publications-entry__summary")).to.not.eql(null);
    });

    it("renders (`.hide-on-print` if 4th or subsequent publication)", function () {
        const rendered = render(<ResumePublicationsEntry publicationsEntry={stubResumePublicationsEntry} index={4}/>);

        expect(rendered.container.firstElementChild?.classList.contains("hide-on-print")).to.eql(true);
    });

    it("renders (no `publicationsEntry.url`)", function () {
        delete stubResumePublicationsEntry.url;
        const rendered = render(<ResumePublicationsEntry publicationsEntry={stubResumePublicationsEntry} index={0}/>);


        expect(rendered.container.querySelector(".resume-publications-entry__name")?.textContent).to.contain(stubResumePublicationsEntry.name);
        expect(rendered.container.querySelector(".resume-publications-entry__details > .right.hide-on-small-only")).to.eql(null);
    });
});
