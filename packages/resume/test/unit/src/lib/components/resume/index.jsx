import {
    ErrorENOACCESSContentComponent,
    ErrorESERVERContentComponent,
    LoadingSpinner,
    mapErrorCodeToErrorContentComponent as defaultMapErrorCodeToErrorContent,
    PrintableHeader
} from "@randy.tarampi/jsx";
import {expect} from "chai";
import {shallow} from "enzyme";
import React from "react";
import sinon from "sinon";
import {mapResumeErrorCodeToErrorContentComponent, ResumeComponent} from "../../../../../../src/lib/components/resume";
import ResumeAbout from "../../../../../../src/lib/components/resume/content/about";
import ResumeAwards from "../../../../../../src/lib/components/resume/content/awards";
import ResumeContact from "../../../../../../src/lib/components/resume/content/contact";
import ResumeEducation from "../../../../../../src/lib/components/resume/content/education";
import ResumeInterests from "../../../../../../src/lib/components/resume/content/interests";
import ResumeLanguages from "../../../../../../src/lib/components/resume/content/languages";
import ResumeProfiles from "../../../../../../src/lib/components/resume/content/profiles";
import ResumeProjects from "../../../../../../src/lib/components/resume/content/projects";
import ResumePublications from "../../../../../../src/lib/components/resume/content/publications";
import ResumeReferences from "../../../../../../src/lib/components/resume/content/references";
import ResumeSkills from "../../../../../../src/lib/components/resume/content/skills";
import ResumeVolunteer from "../../../../../../src/lib/components/resume/content/volunteer";
import ResumeWork from "../../../../../../src/lib/components/resume/content/work";
import ResumeFooter from "../../../../../../src/lib/components/resume/footer";
import Resume from "../../../../../../src/lib/resume";
import testResumeJson from "../../../../../../src/resumes/some-awesome-company";

describe("ResumeComponent", function () {
    let stubResume;
    let stubFetchResume;

    beforeEach(function () {
        stubResume = Resume.fromResume(testResumeJson);
        stubFetchResume = sinon.stub();
    });

    describe("componentDidMount", function () {
        it("calls `fetchResume` if `variant`", function () {
            const stubVariant = "woof";
            const rendered = shallow(<ResumeComponent
                variant={stubVariant}
                fetchResume={stubFetchResume}
                match={{}}
                resume={stubResume}
            />);

            expect(rendered).to.have.className("printable");
            expect(rendered).to.have.className("resume");
            expect(rendered).to.have.descendants(".resume-content");
            expect(stubFetchResume.calledOnce).to.be.ok;
            sinon.assert.calledWith(stubFetchResume, stubVariant);
        });

        it("doesn't call `fetchResume` if there's no `variant` defined", function () {
            const rendered = shallow(<ResumeComponent
                fetchResume={stubFetchResume}
                match={{}}
                resume={stubResume}
            />);

            expect(rendered).to.have.className("printable");
            expect(rendered).to.have.className("resume");
            expect(rendered).to.have.descendants(".resume-content");
            expect(stubFetchResume.notCalled).to.be.ok;
        });
    });

    describe("mapResumeErrorCodeToErrorContentComponent", function () {
        it("handles EFETCH", function () {
            expect(mapResumeErrorCodeToErrorContentComponent("EFETCH")).to.eql(ErrorESERVERContentComponent);
        });

        it("handles ESERVER", function () {
            expect(mapResumeErrorCodeToErrorContentComponent("ESERVER")).to.eql(ErrorESERVERContentComponent);
        });

        it("handles ENORESUME", function () {
            expect(mapResumeErrorCodeToErrorContentComponent("ENORESUME")).to.eql(ErrorENOACCESSContentComponent);
        });

        it("defers to defaultMapErrorCodeToErrorContent", function () {
            expect(mapResumeErrorCodeToErrorContentComponent()).to.eql(defaultMapErrorCodeToErrorContent());
        });
    });

    it("renders", function () {
        const rendered = shallow(<ResumeComponent
            fetchResume={stubFetchResume}
            match={{}}
            resume={stubResume}
        />);

        expect(rendered).to.have.className("printable");
        expect(rendered).to.have.className("resume");
        expect(rendered).to.have.descendants("title");
        expect(rendered).to.have.descendants(".resume-content");
        expect(rendered).to.not.contain(<LoadingSpinner/>);
        expect(rendered).to.contain(<PrintableHeader printable={stubResume}/>);
        expect(rendered).to.contain(<ResumeContact resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeAbout resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeProfiles resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeWork resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeProjects resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeSkills resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeEducation resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeAwards resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeVolunteer resume={stubResume}/>);
        expect(rendered).to.contain(<ResumePublications resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeLanguages resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeInterests resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeReferences resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeFooter resume={stubResume}/>);
    });

    it("renders (no `ResumeAbout`)", function () {
        stubResume = stubResume.setIn(["basics", "description"], null);

        const rendered = shallow(<ResumeComponent
            fetchResume={stubFetchResume}
            match={{}}
            resume={stubResume}
        />);

        expect(rendered).to.have.className("printable");
        expect(rendered).to.have.className("resume");
        expect(rendered).to.have.descendants(".resume-content");
        expect(rendered).to.contain(<PrintableHeader printable={stubResume}/>);
        expect(rendered).to.contain(<ResumeContact resume={stubResume}/>);
        expect(rendered).to.not.contain(<ResumeAbout resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeProfiles resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeWork resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeProjects resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeSkills resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeEducation resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeAwards resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeVolunteer resume={stubResume}/>);
        expect(rendered).to.contain(<ResumePublications resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeLanguages resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeInterests resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeReferences resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeFooter resume={stubResume}/>);
    });

    it("renders (no `ResumeProfiles`)", function () {
        stubResume = stubResume.setIn(["basics", "profiles"], null);

        const rendered = shallow(<ResumeComponent
            fetchResume={stubFetchResume}
            match={{}}
            resume={stubResume}
        />);

        expect(rendered).to.have.className("printable");
        expect(rendered).to.have.className("resume");
        expect(rendered).to.have.descendants(".resume-content");
        expect(rendered).to.contain(<PrintableHeader printable={stubResume}/>);
        expect(rendered).to.contain(<ResumeContact resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeAbout resume={stubResume}/>);
        expect(rendered).to.not.contain(<ResumeProfiles resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeWork resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeProjects resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeSkills resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeEducation resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeAwards resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeVolunteer resume={stubResume}/>);
        expect(rendered).to.contain(<ResumePublications resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeLanguages resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeInterests resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeReferences resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeFooter resume={stubResume}/>);
    });

    it("renders (no `ResumeWork`)", function () {
        stubResume = stubResume.set("work", null);

        const rendered = shallow(<ResumeComponent
            fetchResume={stubFetchResume}
            match={{}}
            resume={stubResume}
        />);

        expect(rendered).to.have.className("printable");
        expect(rendered).to.have.className("resume");
        expect(rendered).to.have.descendants(".resume-content");
        expect(rendered).to.contain(<PrintableHeader printable={stubResume}/>);
        expect(rendered).to.contain(<ResumeContact resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeAbout resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeProfiles resume={stubResume}/>);
        expect(rendered).to.not.contain(<ResumeWork resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeProjects resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeSkills resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeEducation resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeAwards resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeVolunteer resume={stubResume}/>);
        expect(rendered).to.contain(<ResumePublications resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeLanguages resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeInterests resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeReferences resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeFooter resume={stubResume}/>);
    });

    it("renders (no `ResumeProjects`)", function () {
        stubResume = stubResume.set("projects", null);

        const rendered = shallow(<ResumeComponent
            fetchResume={stubFetchResume}
            match={{}}
            resume={stubResume}
        />);

        expect(rendered).to.have.className("printable");
        expect(rendered).to.have.className("resume");
        expect(rendered).to.have.descendants(".resume-content");
        expect(rendered).to.contain(<PrintableHeader printable={stubResume}/>);
        expect(rendered).to.contain(<ResumeContact resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeAbout resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeProfiles resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeWork resume={stubResume}/>);
        expect(rendered).to.not.contain(<ResumeProjects resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeSkills resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeEducation resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeAwards resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeVolunteer resume={stubResume}/>);
        expect(rendered).to.contain(<ResumePublications resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeLanguages resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeInterests resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeReferences resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeFooter resume={stubResume}/>);
    });

    it("renders (no `ResumeSkills`)", function () {
        stubResume = stubResume.set("skills", null);

        const rendered = shallow(<ResumeComponent
            fetchResume={stubFetchResume}
            match={{}}
            resume={stubResume}
        />);

        expect(rendered).to.have.className("printable");
        expect(rendered).to.have.className("resume");
        expect(rendered).to.have.descendants(".resume-content");
        expect(rendered).to.contain(<PrintableHeader printable={stubResume}/>);
        expect(rendered).to.contain(<ResumeContact resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeAbout resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeProfiles resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeWork resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeProjects resume={stubResume}/>);
        expect(rendered).to.not.contain(<ResumeSkills resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeEducation resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeAwards resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeVolunteer resume={stubResume}/>);
        expect(rendered).to.contain(<ResumePublications resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeLanguages resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeInterests resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeReferences resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeFooter resume={stubResume}/>);
    });

    it("renders (no `ResumeEducation`)", function () {
        stubResume = stubResume.set("education", null);

        const rendered = shallow(<ResumeComponent
            fetchResume={stubFetchResume}
            match={{}}
            resume={stubResume}
        />);

        expect(rendered).to.have.className("printable");
        expect(rendered).to.have.className("resume");
        expect(rendered).to.have.descendants(".resume-content");
        expect(rendered).to.contain(<PrintableHeader printable={stubResume}/>);
        expect(rendered).to.contain(<ResumeContact resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeAbout resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeProfiles resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeWork resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeProjects resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeSkills resume={stubResume}/>);
        expect(rendered).to.not.contain(<ResumeEducation resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeAwards resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeVolunteer resume={stubResume}/>);
        expect(rendered).to.contain(<ResumePublications resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeLanguages resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeInterests resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeReferences resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeFooter resume={stubResume}/>);
    });

    it("renders (no `ResumeAwards`)", function () {
        stubResume = stubResume.set("awards", null);

        const rendered = shallow(<ResumeComponent
            fetchResume={stubFetchResume}
            match={{}}
            resume={stubResume}
        />);

        expect(rendered).to.have.className("printable");
        expect(rendered).to.have.className("resume");
        expect(rendered).to.have.descendants(".resume-content");
        expect(rendered).to.contain(<PrintableHeader printable={stubResume}/>);
        expect(rendered).to.contain(<ResumeContact resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeAbout resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeProfiles resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeWork resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeProjects resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeSkills resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeEducation resume={stubResume}/>);
        expect(rendered).to.not.contain(<ResumeAwards resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeVolunteer resume={stubResume}/>);
        expect(rendered).to.contain(<ResumePublications resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeLanguages resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeInterests resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeReferences resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeFooter resume={stubResume}/>);
    });

    it("renders (no `ResumeVolunteer`)", function () {
        stubResume = stubResume.set("volunteer", null);

        const rendered = shallow(<ResumeComponent
            fetchResume={stubFetchResume}
            match={{}}
            resume={stubResume}
        />);

        expect(rendered).to.have.className("printable");
        expect(rendered).to.have.className("resume");
        expect(rendered).to.have.descendants(".resume-content");
        expect(rendered).to.contain(<PrintableHeader printable={stubResume}/>);
        expect(rendered).to.contain(<ResumeContact resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeAbout resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeProfiles resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeWork resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeProjects resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeSkills resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeEducation resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeAwards resume={stubResume}/>);
        expect(rendered).to.not.contain(<ResumeVolunteer resume={stubResume}/>);
        expect(rendered).to.contain(<ResumePublications resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeLanguages resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeInterests resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeReferences resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeFooter resume={stubResume}/>);
    });

    it("renders (no `ResumePublications`)", function () {
        stubResume = stubResume.set("publications", null);

        const rendered = shallow(<ResumeComponent
            fetchResume={stubFetchResume}
            match={{}}
            resume={stubResume}
        />);

        expect(rendered).to.have.className("printable");
        expect(rendered).to.have.className("resume");
        expect(rendered).to.have.descendants(".resume-content");
        expect(rendered).to.contain(<PrintableHeader printable={stubResume}/>);
        expect(rendered).to.contain(<ResumeContact resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeAbout resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeProfiles resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeWork resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeProjects resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeSkills resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeEducation resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeAwards resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeVolunteer resume={stubResume}/>);
        expect(rendered).to.not.contain(<ResumePublications resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeLanguages resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeInterests resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeReferences resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeFooter resume={stubResume}/>);
    });

    it("renders (no `ResumeLanguages`)", function () {
        stubResume = stubResume.set("languages", null);

        const rendered = shallow(<ResumeComponent
            fetchResume={stubFetchResume}
            match={{}}
            resume={stubResume}
        />);

        expect(rendered).to.have.className("printable");
        expect(rendered).to.have.className("resume");
        expect(rendered).to.have.descendants(".resume-content");
        expect(rendered).to.contain(<PrintableHeader printable={stubResume}/>);
        expect(rendered).to.contain(<ResumeContact resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeAbout resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeProfiles resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeWork resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeProjects resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeSkills resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeEducation resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeAwards resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeVolunteer resume={stubResume}/>);
        expect(rendered).to.contain(<ResumePublications resume={stubResume}/>);
        expect(rendered).to.not.contain(<ResumeLanguages resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeInterests resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeReferences resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeFooter resume={stubResume}/>);
    });

    it("renders (no `ResumeInterests`)", function () {
        stubResume = stubResume.set("interests", null);

        const rendered = shallow(<ResumeComponent
            fetchResume={stubFetchResume}
            match={{}}
            resume={stubResume}
        />);

        expect(rendered).to.have.className("printable");
        expect(rendered).to.have.className("resume");
        expect(rendered).to.have.descendants(".resume-content");
        expect(rendered).to.contain(<PrintableHeader printable={stubResume}/>);
        expect(rendered).to.contain(<ResumeContact resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeAbout resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeProfiles resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeWork resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeProjects resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeSkills resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeEducation resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeAwards resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeVolunteer resume={stubResume}/>);
        expect(rendered).to.contain(<ResumePublications resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeLanguages resume={stubResume}/>);
        expect(rendered).to.not.contain(<ResumeInterests resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeReferences resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeFooter resume={stubResume}/>);
    });

    it("renders (no `ResumeReferences`)", function () {
        stubResume = stubResume.set("references", null);

        const rendered = shallow(<ResumeComponent
            fetchResume={stubFetchResume}
            match={{}}
            resume={stubResume}
        />);

        expect(rendered).to.have.className("printable");
        expect(rendered).to.have.className("resume");
        expect(rendered).to.have.descendants(".resume-content");
        expect(rendered).to.contain(<PrintableHeader printable={stubResume}/>);
        expect(rendered).to.contain(<ResumeContact resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeAbout resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeProfiles resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeWork resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeProjects resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeSkills resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeEducation resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeAwards resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeVolunteer resume={stubResume}/>);
        expect(rendered).to.contain(<ResumePublications resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeLanguages resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeInterests resume={stubResume}/>);
        expect(rendered).to.not.contain(<ResumeReferences resume={stubResume}/>);
        expect(rendered).to.contain(<ResumeFooter resume={stubResume}/>);
    });

    it("renders (`isLoading`)", function () {
        const rendered = shallow(<ResumeComponent
            fetchResume={stubFetchResume}
            isLoading={true}
            match={{}}
            resume={stubResume}
        />);

        expect(rendered).to.have.className("printable");
        expect(rendered).to.have.className("resume");
        expect(rendered).to.not.have.descendants(".resume-content");
        expect(rendered).to.contain(<LoadingSpinner/>);
        expect(rendered).to.not.contain(<PrintableHeader printable={stubResume}/>);
        expect(rendered).to.not.contain(<ResumeContact resume={stubResume}/>);
        expect(rendered).to.not.contain(<ResumeAbout resume={stubResume}/>);
        expect(rendered).to.not.contain(<ResumeProfiles resume={stubResume}/>);
        expect(rendered).to.not.contain(<ResumeWork resume={stubResume}/>);
        expect(rendered).to.not.contain(<ResumeProjects resume={stubResume}/>);
        expect(rendered).to.not.contain(<ResumeSkills resume={stubResume}/>);
        expect(rendered).to.not.contain(<ResumeEducation resume={stubResume}/>);
        expect(rendered).to.not.contain(<ResumeAwards resume={stubResume}/>);
        expect(rendered).to.not.contain(<ResumeVolunteer resume={stubResume}/>);
        expect(rendered).to.not.contain(<ResumePublications resume={stubResume}/>);
        expect(rendered).to.not.contain(<ResumeLanguages resume={stubResume}/>);
        expect(rendered).to.not.contain(<ResumeInterests resume={stubResume}/>);
        expect(rendered).to.not.contain(<ResumeReferences resume={stubResume}/>);
        expect(rendered).to.not.contain(<ResumeFooter resume={stubResume}/>);
    });
});
