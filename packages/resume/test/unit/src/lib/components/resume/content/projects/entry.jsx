import {expect} from "chai";
import {render} from "@testing-library/react";
import React from "react";
import ResumeProjectsEntry from "../../../../../../../../src/lib/components/resume/content/projects/entry.jsx";

describe("ResumeProjectsEntry", function () {
    let stubResumeProjectsEntry;

    beforeEach(function () {
        stubResumeProjectsEntry = {
            name: "My blog",
            description: "It's a blog",
            highlights: [
                "My choice of technologies here was largely driven by my want to minimize costs",
                "It's all on the AWS Free Tier",
                "The only thing I'm paying for is DNS",
                "Code is hosted on GitHub Pages",
                "CI & CD provided by Travis"
            ],
            startDate: "2018-08-01",
            endDate: "2018-08-01",
            roles: [
                "Developer"
            ],
            entity: "Me, myself & I",
            type: "Application",
            url: "https://www.randytarampi.ca/blog"
        };
    });

    it("renders", function () {
        const rendered = render(<ResumeProjectsEntry projectsEntry={stubResumeProjectsEntry} index={0}/>);

        expect(rendered.container.firstElementChild?.classList.contains("hide-on-print")).to.eql(false);
        expect(rendered.container.querySelector(".resume-projects-entry")).to.not.eql(null);
        expect(rendered.container.querySelector(".resume-projects-entry__basics")).to.not.eql(null);
        expect(rendered.container.querySelector(".resume-projects-entry__date")).to.not.eql(null);
        expect(rendered.container.querySelector(".resume-projects-entry__name")).to.not.eql(null);

        expect(rendered.container.querySelector(".resume-projects-entry__website")).to.not.eql(null);

        expect(rendered.container.querySelector(".resume-projects-entry__details")).to.not.eql(null);
        expect(rendered.container.querySelector(".resume-projects-entry__details > div > .resume-projects-entry__position")).to.not.eql(null);
        expect(rendered.container.querySelector(".resume-projects-entry__description")).to.not.eql(null);
        expect(rendered.container.querySelector(".resume-projects-entry__highlights")).to.not.eql(null);
        expect(rendered.container.querySelector(".resume-projects-entry__highlight")).to.not.eql(null);
    });

    it("renders (no end date)", function () {
        delete stubResumeProjectsEntry.endDate;

        const rendered = render(<ResumeProjectsEntry projectsEntry={stubResumeProjectsEntry} index={0}/>);

        expect(rendered.container.querySelector(".resume-projects-entry__basics > .right.hide-on-small-only > .resume-projects-entry__date")?.innerHTML).to.match(/ to Present/);
        expect(rendered.container.querySelector(".resume-projects-entry__basics > .hide-on-med-and-up > .resume-projects-entry__date")?.innerHTML).to.match(/ to Present/);
    });

    it("renders (`.hide-on-print` if 4th or subsequent project)", function () {
        const rendered = render(<ResumeProjectsEntry projectsEntry={stubResumeProjectsEntry} index={4}/>);

        expect(rendered.container.firstElementChild?.classList.contains("hide-on-print")).to.eql(true);
    });

    it("renders (no `projectsEntry.url`)", function () {
        delete stubResumeProjectsEntry.url;
        const rendered = render(<ResumeProjectsEntry projectsEntry={stubResumeProjectsEntry} index={0}/>);


        expect(rendered.container.querySelector(".resume-projects-entry__name")?.textContent).to.contain(stubResumeProjectsEntry.name);
        expect(rendered.container.querySelector(".resume-projects-entry__details > .right.hide-on-small-only")).to.eql(null);
    });

    it("renders (no `projectsEntry.highlights`)", function () {
        delete stubResumeProjectsEntry.highlights;
        const rendered = render(<ResumeProjectsEntry projectsEntry={stubResumeProjectsEntry} index={0}/>);


        expect(rendered.container.querySelector(".resume-projects-entry__highlights")).to.eql(null);
        expect(rendered.container.querySelector(".resume-projects-entry__highlight")).to.eql(null);
    });

    it("renders (no `projectsEntry.roles`)", function () {
        delete stubResumeProjectsEntry.roles;
        const rendered = render(<ResumeProjectsEntry projectsEntry={stubResumeProjectsEntry} index={0}/>);


        expect(rendered.container.querySelector(".resume-projects-entry__details")).to.not.eql(null);
        expect(rendered.container.querySelector(".resume-projects-entry__details > div > .resume-projects-entry__position")).to.eql(null);
    });
});
