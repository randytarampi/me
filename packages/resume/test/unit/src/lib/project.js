import {expect} from "chai";
import {List} from "immutable";
import {DateTime} from "luxon";
import Project from "../../../../src/lib/project";

describe("Project", function () {
    let stubProjectJs;

    beforeEach(function () {
        stubProjectJs = {
            name: "Woof",
            type: "Meow",
            startDate: "2018-09-14",
            endDate: "2013-09-14",
            description: "Grr",
            url: "rawr://rawr.rawr/rawr",
            highlights: [
                "Ugh"
            ],
            keywords: [
                "Argh"
            ],
            roles: [
                "Ahh"
            ]
        };
    });

    describe("constructor", function () {
        it("returns a Project", function () {
            const project = new Project({
                ...stubProjectJs,
                startDate: DateTime.fromISO(stubProjectJs.startDate),
                endDate: DateTime.fromISO(stubProjectJs.endDate),
                highlights: List(stubProjectJs.highlights),
                keywords: List(stubProjectJs.keywords),
                roles: List(stubProjectJs.roles)
            });

            expect(project).to.be.ok;
            expect(project).to.be.instanceOf(Project);
            expect(project.name).to.eql(stubProjectJs.name);
            expect(project.type).to.eql(stubProjectJs.type);
            expect(project.startDate).to.be.instanceOf(DateTime);
            expect(project.startDate).to.eql(DateTime.fromISO(stubProjectJs.startDate));
            expect(project.endDate).to.be.instanceOf(DateTime);
            expect(project.endDate).to.eql(DateTime.fromISO(stubProjectJs.endDate));
            expect(project.description).to.eql(stubProjectJs.description);
            expect(project.url).to.eql(stubProjectJs.url);
            expect(project.highlights).to.eql(List(stubProjectJs.highlights));
            expect(project.keywords).to.eql(List(stubProjectJs.keywords));
            expect(project.roles).to.eql(List(stubProjectJs.roles));
        });

        it("returns an empty Project", function () {
            const project = new Project();

            expect(project).to.be.ok;
            expect(project).to.be.instanceOf(Project);
            expect(project.startDate).to.eql(null);
            expect(project.endDate).to.eql(null);
            expect(project.highlights).to.eql(List());
            expect(project.keywords).to.eql(List());
            expect(project.roles).to.eql(List());
        });
    });

    describe(".fromJS", function () {
        it("returns a Project", function () {
            const project = Project.fromJS({
                ...stubProjectJs,
                startDate: DateTime.fromISO(stubProjectJs.startDate).toJSDate(),
                endDate: DateTime.fromISO(stubProjectJs.endDate).toJSDate()
            });

            expect(project).to.be.ok;
            expect(project).to.be.instanceOf(Project);
            expect(project.name).to.eql(stubProjectJs.name);
            expect(project.type).to.eql(stubProjectJs.type);
            expect(project.startDate).to.be.instanceOf(DateTime);
            expect(project.startDate).to.eql(DateTime.fromISO(stubProjectJs.startDate));
            expect(project.endDate).to.be.instanceOf(DateTime);
            expect(project.endDate).to.eql(DateTime.fromISO(stubProjectJs.endDate));
            expect(project.description).to.eql(stubProjectJs.description);
            expect(project.url).to.eql(stubProjectJs.url);
            expect(project.highlights).to.eql(List(stubProjectJs.highlights));
            expect(project.keywords).to.eql(List(stubProjectJs.keywords));
            expect(project.roles).to.eql(List(stubProjectJs.roles));
        });

        it("returns an empty Project", function () {
            const project = Project.fromJS();

            expect(project).to.be.ok;
            expect(project).to.be.instanceOf(Project);
            expect(project.startDate).to.eql(null);
            expect(project.endDate).to.eql(null);
            expect(project.highlights).to.eql(null);
            expect(project.keywords).to.eql(null);
            expect(project.roles).to.eql(null);
        });
    });

    describe(".fromJSON", function () {
        it("returns a Project", function () {
            const project = Project.fromJSON({
                ...stubProjectJs
            });

            expect(project).to.be.ok;
            expect(project).to.be.instanceOf(Project);
            expect(project.name).to.eql(stubProjectJs.name);
            expect(project.type).to.eql(stubProjectJs.type);
            expect(project.startDate).to.be.instanceOf(DateTime);
            expect(project.startDate).to.eql(DateTime.fromISO(stubProjectJs.startDate));
            expect(project.endDate).to.be.instanceOf(DateTime);
            expect(project.endDate).to.eql(DateTime.fromISO(stubProjectJs.endDate));
            expect(project.description).to.eql(stubProjectJs.description);
            expect(project.url).to.eql(stubProjectJs.url);
            expect(project.highlights).to.eql(List(stubProjectJs.highlights));
            expect(project.keywords).to.eql(List(stubProjectJs.keywords));
            expect(project.roles).to.eql(List(stubProjectJs.roles));
        });

        it("returns an empty Project", function () {
            const project = Project.fromJSON();

            expect(project).to.be.ok;
            expect(project).to.be.instanceOf(Project);
            expect(project.startDate).to.eql(null);
            expect(project.endDate).to.eql(null);
            expect(project.highlights).to.eql(null);
            expect(project.keywords).to.eql(null);
            expect(project.roles).to.eql(null);
        });
    });

    describe(".fromResume", function () {
        it("returns a Project", function () {
            const project = Project.fromResume({
                ...stubProjectJs
            });

            expect(project).to.be.ok;
            expect(project).to.be.instanceOf(Project);
            expect(project.name).to.eql(stubProjectJs.name);
            expect(project.type).to.eql(stubProjectJs.type);
            expect(project.startDate).to.be.instanceOf(DateTime);
            expect(project.startDate).to.eql(DateTime.fromISO(stubProjectJs.startDate));
            expect(project.endDate).to.be.instanceOf(DateTime);
            expect(project.endDate).to.eql(DateTime.fromISO(stubProjectJs.endDate));
            expect(project.description).to.eql(stubProjectJs.description);
            expect(project.url).to.eql(stubProjectJs.url);
            expect(project.highlights).to.eql(List(stubProjectJs.highlights));
            expect(project.keywords).to.eql(List(stubProjectJs.keywords));
            expect(project.roles).to.eql(List(stubProjectJs.roles));
        });

        it("returns an empty Project", function () {
            const project = Project.fromResume();

            expect(project).to.be.ok;
            expect(project).to.be.instanceOf(Project);
            expect(project.startDate).to.eql(null);
            expect(project.endDate).to.eql(null);
            expect(project.highlights).to.eql(null);
            expect(project.keywords).to.eql(null);
            expect(project.roles).to.eql(null);
        });
    });
});
