import {expect} from "chai";
import {List} from "immutable";
import {DateTime} from "luxon";
import Work from "../../../lib/work";

describe("Work", function () {
    let stubWorkJs;

    beforeEach(function () {
        stubWorkJs = {
            company: "Woof",
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
        it("returns a Work", function () {
            const work = new Work({
                ...stubWorkJs,
                startDate: DateTime.fromISO(stubWorkJs.startDate),
                endDate: DateTime.fromISO(stubWorkJs.endDate),
                highlights: List(stubWorkJs.highlights)
            });

            expect(work).to.be.ok;
            expect(work).to.be.instanceOf(Work);
            expect(work.company).to.eql(stubWorkJs.company);
            expect(work.position).to.eql(stubWorkJs.position);
            expect(work.startDate).to.be.instanceOf(DateTime);
            expect(work.startDate).to.eql(DateTime.fromISO(stubWorkJs.startDate));
            expect(work.endDate).to.be.instanceOf(DateTime);
            expect(work.endDate).to.eql(DateTime.fromISO(stubWorkJs.endDate));
            expect(work.summary).to.eql(stubWorkJs.summary);
            expect(work.website).to.eql(stubWorkJs.website);
            expect(work.highlights).to.eql(List(stubWorkJs.highlights));
        });

        it("returns an empty Work", function () {
            const work = new Work();

            expect(work).to.be.ok;
            expect(work).to.be.instanceOf(Work);
            expect(work.startDate).to.eql(null);
            expect(work.endDate).to.eql(null);
            expect(work.highlights).to.eql(List());
        });
    });

    describe(".fromJS", function () {
        it("returns a Work", function () {
            const work = Work.fromJS({
                ...stubWorkJs,
                startDate: DateTime.fromISO(stubWorkJs.startDate).toJSDate(),
                endDate: DateTime.fromISO(stubWorkJs.endDate).toJSDate()
            });

            expect(work).to.be.ok;
            expect(work).to.be.instanceOf(Work);
            expect(work.company).to.eql(stubWorkJs.company);
            expect(work.position).to.eql(stubWorkJs.position);
            expect(work.startDate).to.be.instanceOf(DateTime);
            expect(work.startDate).to.eql(DateTime.fromISO(stubWorkJs.startDate));
            expect(work.endDate).to.be.instanceOf(DateTime);
            expect(work.endDate).to.eql(DateTime.fromISO(stubWorkJs.endDate));
            expect(work.summary).to.eql(stubWorkJs.summary);
            expect(work.website).to.eql(stubWorkJs.website);
            expect(work.highlights).to.eql(List(stubWorkJs.highlights));
        });

        it("returns an empty Work", function () {
            const work = Work.fromJS();

            expect(work).to.be.ok;
            expect(work).to.be.instanceOf(Work);
            expect(work.startDate).to.eql(null);
            expect(work.endDate).to.eql(null);
            expect(work.highlights).to.eql(null);
        });
    });

    describe(".fromJSON", function () {
        it("returns a Work", function () {
            const work = Work.fromJSON({
                ...stubWorkJs
            });

            expect(work).to.be.ok;
            expect(work).to.be.instanceOf(Work);
            expect(work.company).to.eql(stubWorkJs.company);
            expect(work.position).to.eql(stubWorkJs.position);
            expect(work.startDate).to.be.instanceOf(DateTime);
            expect(work.startDate).to.eql(DateTime.fromISO(stubWorkJs.startDate));
            expect(work.endDate).to.be.instanceOf(DateTime);
            expect(work.endDate).to.eql(DateTime.fromISO(stubWorkJs.endDate));
            expect(work.summary).to.eql(stubWorkJs.summary);
            expect(work.website).to.eql(stubWorkJs.website);
            expect(work.highlights).to.eql(List(stubWorkJs.highlights));
        });

        it("returns an empty Work", function () {
            const work = Work.fromJSON();

            expect(work).to.be.ok;
            expect(work).to.be.instanceOf(Work);
            expect(work.startDate).to.eql(null);
            expect(work.endDate).to.eql(null);
            expect(work.highlights).to.eql(null);
        });
    });

    describe(".fromResume", function () {
        it("returns a Work", function () {
            const work = Work.fromResume({
                ...stubWorkJs
            });

            expect(work).to.be.ok;
            expect(work).to.be.instanceOf(Work);
            expect(work.company).to.eql(stubWorkJs.company);
            expect(work.position).to.eql(stubWorkJs.position);
            expect(work.startDate).to.be.instanceOf(DateTime);
            expect(work.startDate).to.eql(DateTime.fromISO(stubWorkJs.startDate));
            expect(work.endDate).to.be.instanceOf(DateTime);
            expect(work.endDate).to.eql(DateTime.fromISO(stubWorkJs.endDate));
            expect(work.summary).to.eql(stubWorkJs.summary);
            expect(work.website).to.eql(stubWorkJs.website);
            expect(work.highlights).to.eql(List(stubWorkJs.highlights));
        });

        it("returns an empty Work", function () {
            const work = Work.fromResume();

            expect(work).to.be.ok;
            expect(work).to.be.instanceOf(Work);
            expect(work.startDate).to.eql(null);
            expect(work.endDate).to.eql(null);
            expect(work.highlights).to.eql(null);
        });
    });
});
