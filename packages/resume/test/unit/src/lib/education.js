import {expect} from "chai";
import {List} from "immutable";
import {DateTime} from "luxon";
import Education from "../../../../src/lib/education";

describe("Education", function () {
    let stubEducationJs;

    beforeEach(function () {
        stubEducationJs = {
            institution: "Woof",
            area: "Meow",
            startDate: "2018-09-14",
            endDate: "2013-09-14",
            studyType: "Grr",
            website: "rawr://rawr.rawr/rawr",
            courses: [
                "Ugh",
                "Argh"
            ]
        };
    });

    describe("constructor", function () {
        it("returns an Education", function () {
            const education = new Education({
                ...stubEducationJs,
                startDate: DateTime.fromISO(stubEducationJs.startDate),
                endDate: DateTime.fromISO(stubEducationJs.endDate),
                courses: List(stubEducationJs.courses)
            });

            expect(education).to.be.instanceOf(Education);
            expect(education.institution).to.eql(stubEducationJs.institution);
            expect(education.area).to.eql(stubEducationJs.area);
            expect(education.startDate).to.be.instanceOf(DateTime);
            expect(education.startDate).to.eql(DateTime.fromISO(stubEducationJs.startDate));
            expect(education.endDate).to.be.instanceOf(DateTime);
            expect(education.endDate).to.eql(DateTime.fromISO(stubEducationJs.endDate));
            expect(education.studyType).to.eql(stubEducationJs.studyType);
            expect(education.website).to.eql(stubEducationJs.website);
            expect(education.courses).to.eql(List(stubEducationJs.courses));
        });

        it("returns an empty Education", function () {
            const education = new Education();

            expect(education).to.be.instanceOf(Education);
            expect(education.startDate).to.eql(null);
            expect(education.endDate).to.eql(null);
            expect(education.courses).to.eql(List());
        });
    });

    describe("fromJS", function () {
        it("returns an Education", function () {
            const education = Education.fromJS({
                ...stubEducationJs,
                startDate: DateTime.fromISO(stubEducationJs.startDate).toJSDate(),
                endDate: DateTime.fromISO(stubEducationJs.endDate).toJSDate()
            });

            expect(education).to.be.instanceOf(Education);
            expect(education.institution).to.eql(stubEducationJs.institution);
            expect(education.area).to.eql(stubEducationJs.area);
            expect(education.startDate).to.be.instanceOf(DateTime);
            expect(education.startDate).to.eql(DateTime.fromISO(stubEducationJs.startDate));
            expect(education.endDate).to.be.instanceOf(DateTime);
            expect(education.endDate).to.eql(DateTime.fromISO(stubEducationJs.endDate));
            expect(education.studyType).to.eql(stubEducationJs.studyType);
            expect(education.website).to.eql(stubEducationJs.website);
            expect(education.courses).to.eql(List(stubEducationJs.courses));
        });

        it("returns an empty Education", function () {
            const education = Education.fromJS();

            expect(education).to.be.instanceOf(Education);
            expect(education.startDate).to.eql(null);
            expect(education.endDate).to.eql(null);
            expect(education.courses).to.eql(null);
        });
    });

    describe("fromJSON", function () {
        it("returns an Education", function () {
            const education = Education.fromJSON({
                ...stubEducationJs
            });

            expect(education).to.be.instanceOf(Education);
            expect(education.institution).to.eql(stubEducationJs.institution);
            expect(education.area).to.eql(stubEducationJs.area);
            expect(education.startDate).to.be.instanceOf(DateTime);
            expect(education.startDate).to.eql(DateTime.fromISO(stubEducationJs.startDate));
            expect(education.endDate).to.be.instanceOf(DateTime);
            expect(education.endDate).to.eql(DateTime.fromISO(stubEducationJs.endDate));
            expect(education.studyType).to.eql(stubEducationJs.studyType);
            expect(education.website).to.eql(stubEducationJs.website);
            expect(education.courses).to.eql(List(stubEducationJs.courses));
        });

        it("returns an empty Education", function () {
            const education = Education.fromJSON();

            expect(education).to.be.instanceOf(Education);
            expect(education.startDate).to.eql(null);
            expect(education.endDate).to.eql(null);
            expect(education.courses).to.eql(null);
        });
    });

    describe("fromResume", function () {
        it("returns an Education", function () {
            const education = Education.fromResume({
                ...stubEducationJs
            });

            expect(education).to.be.instanceOf(Education);
            expect(education.institution).to.eql(stubEducationJs.institution);
            expect(education.area).to.eql(stubEducationJs.area);
            expect(education.startDate).to.be.instanceOf(DateTime);
            expect(education.startDate).to.eql(DateTime.fromISO(stubEducationJs.startDate));
            expect(education.endDate).to.be.instanceOf(DateTime);
            expect(education.endDate).to.eql(DateTime.fromISO(stubEducationJs.endDate));
            expect(education.studyType).to.eql(stubEducationJs.studyType);
            expect(education.website).to.eql(stubEducationJs.website);
            expect(education.courses).to.eql(List(stubEducationJs.courses));
        });

        it("returns an empty Education", function () {
            const education = Education.fromResume();

            expect(education).to.be.instanceOf(Education);
            expect(education.startDate).to.eql(null);
            expect(education.endDate).to.eql(null);
            expect(education.courses).to.eql(null);
        });
    });
});
