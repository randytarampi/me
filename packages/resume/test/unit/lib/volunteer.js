import {expect} from "chai";
import {List} from "immutable";
import {DateTime} from "luxon";
import Volunteer from "../../../lib/volunteer";

describe("Volunteer", function () {
    let stubVolunteerJs;

    beforeEach(function () {
        stubVolunteerJs = {
            organization: "Woof",
            position: "Meow",
            startDate: "2018-09-14",
            endDate: "2013-09-14",
            summary: "Grr",
            website: "rawr://rawr.rawr/rawr",
            highlights: [
                "Ugh",
                "Argh"
            ]
        };
    });

    describe("constructor", function () {
        it("returns a Volunteer", function () {
            const volunteer = new Volunteer({
                ...stubVolunteerJs,
                startDate: DateTime.fromISO(stubVolunteerJs.startDate),
                endDate: DateTime.fromISO(stubVolunteerJs.endDate),
                highlights: List(stubVolunteerJs.highlights)
            });

            expect(volunteer).to.be.ok;
            expect(volunteer).to.be.instanceOf(Volunteer);
            expect(volunteer.organization).to.eql(stubVolunteerJs.organization);
            expect(volunteer.position).to.eql(stubVolunteerJs.position);
            expect(volunteer.startDate).to.be.instanceOf(DateTime);
            expect(volunteer.startDate).to.eql(DateTime.fromISO(stubVolunteerJs.startDate));
            expect(volunteer.endDate).to.be.instanceOf(DateTime);
            expect(volunteer.endDate).to.eql(DateTime.fromISO(stubVolunteerJs.endDate));
            expect(volunteer.summary).to.eql(stubVolunteerJs.summary);
            expect(volunteer.website).to.eql(stubVolunteerJs.website);
            expect(volunteer.highlights).to.eql(List(stubVolunteerJs.highlights));
        });

        it("returns an empty Volunteer", function () {
            const volunteer = new Volunteer();

            expect(volunteer).to.be.ok;
            expect(volunteer).to.be.instanceOf(Volunteer);
            expect(volunteer.startDate).to.eql(null);
            expect(volunteer.endDate).to.eql(null);
            expect(volunteer.highlights).to.eql(List());
        });
    });

    describe(".fromJS", function () {
        it("returns a Volunteer", function () {
            const volunteer = Volunteer.fromJS({
                ...stubVolunteerJs,
                startDate: DateTime.fromISO(stubVolunteerJs.startDate).toJSDate(),
                endDate: DateTime.fromISO(stubVolunteerJs.endDate).toJSDate()
            });

            expect(volunteer).to.be.ok;
            expect(volunteer).to.be.instanceOf(Volunteer);
            expect(volunteer.organization).to.eql(stubVolunteerJs.organization);
            expect(volunteer.position).to.eql(stubVolunteerJs.position);
            expect(volunteer.startDate).to.be.instanceOf(DateTime);
            expect(volunteer.startDate).to.eql(DateTime.fromISO(stubVolunteerJs.startDate));
            expect(volunteer.endDate).to.be.instanceOf(DateTime);
            expect(volunteer.endDate).to.eql(DateTime.fromISO(stubVolunteerJs.endDate));
            expect(volunteer.summary).to.eql(stubVolunteerJs.summary);
            expect(volunteer.website).to.eql(stubVolunteerJs.website);
            expect(volunteer.highlights).to.eql(List(stubVolunteerJs.highlights));
        });

        it("returns an empty Volunteer", function () {
            const volunteer = Volunteer.fromJS();

            expect(volunteer).to.be.ok;
            expect(volunteer).to.be.instanceOf(Volunteer);
            expect(volunteer.startDate).to.eql(null);
            expect(volunteer.endDate).to.eql(null);
            expect(volunteer.highlights).to.eql(null);
        });
    });

    describe(".fromJSON", function () {
        it("returns a Volunteer", function () {
            const volunteer = Volunteer.fromJSON({
                ...stubVolunteerJs
            });

            expect(volunteer).to.be.ok;
            expect(volunteer).to.be.instanceOf(Volunteer);
            expect(volunteer.organization).to.eql(stubVolunteerJs.organization);
            expect(volunteer.position).to.eql(stubVolunteerJs.position);
            expect(volunteer.startDate).to.be.instanceOf(DateTime);
            expect(volunteer.startDate).to.eql(DateTime.fromISO(stubVolunteerJs.startDate));
            expect(volunteer.endDate).to.be.instanceOf(DateTime);
            expect(volunteer.endDate).to.eql(DateTime.fromISO(stubVolunteerJs.endDate));
            expect(volunteer.summary).to.eql(stubVolunteerJs.summary);
            expect(volunteer.website).to.eql(stubVolunteerJs.website);
            expect(volunteer.highlights).to.eql(List(stubVolunteerJs.highlights));
        });

        it("returns an empty Volunteer", function () {
            const volunteer = Volunteer.fromJSON();

            expect(volunteer).to.be.ok;
            expect(volunteer).to.be.instanceOf(Volunteer);
            expect(volunteer.startDate).to.eql(null);
            expect(volunteer.endDate).to.eql(null);
            expect(volunteer.highlights).to.eql(null);
        });
    });

    describe(".fromResume", function () {
        it("returns a Volunteer", function () {
            const volunteer = Volunteer.fromResume({
                ...stubVolunteerJs
            });

            expect(volunteer).to.be.ok;
            expect(volunteer).to.be.instanceOf(Volunteer);
            expect(volunteer.organization).to.eql(stubVolunteerJs.organization);
            expect(volunteer.position).to.eql(stubVolunteerJs.position);
            expect(volunteer.startDate).to.be.instanceOf(DateTime);
            expect(volunteer.startDate).to.eql(DateTime.fromISO(stubVolunteerJs.startDate));
            expect(volunteer.endDate).to.be.instanceOf(DateTime);
            expect(volunteer.endDate).to.eql(DateTime.fromISO(stubVolunteerJs.endDate));
            expect(volunteer.summary).to.eql(stubVolunteerJs.summary);
            expect(volunteer.website).to.eql(stubVolunteerJs.website);
            expect(volunteer.highlights).to.eql(List(stubVolunteerJs.highlights));
        });

        it("returns an empty Volunteer", function () {
            const volunteer = Volunteer.fromResume();

            expect(volunteer).to.be.ok;
            expect(volunteer).to.be.instanceOf(Volunteer);
            expect(volunteer.startDate).to.eql(null);
            expect(volunteer.endDate).to.eql(null);
            expect(volunteer.highlights).to.eql(null);
        });
    });
});
