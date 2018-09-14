import {expect} from "chai";
import {DateTime} from "luxon";
import Award from "../../../lib/award";

describe("Award", function () {
    let stubAwardJs;

    beforeEach(function () {
        stubAwardJs = {
            title: "Woof",
            awarder: "Meow",
            date: "2018-09-14",
            summary: "Grr"
        };
    });

    describe("constructor", function () {
        it("returns an Award", function () {
            const award = new Award({
                ...stubAwardJs,
                date: DateTime.fromISO(stubAwardJs.date)
            });

            expect(award).to.be.ok;
            expect(award).to.be.instanceOf(Award);
            expect(award.title).to.eql(stubAwardJs.title);
            expect(award.awarder).to.eql(stubAwardJs.awarder);
            expect(award.date).to.be.instanceOf(DateTime);
            expect(award.date).to.eql(DateTime.fromISO(stubAwardJs.date));
            expect(award.summary).to.eql(stubAwardJs.summary);
        });

        it("returns an empty Award", function () {
            const award = new Award();

            expect(award).to.be.ok;
            expect(award).to.be.instanceOf(Award);
            expect(award.date).to.eql(null);
        });
    });

    describe(".fromJS", function () {
        it("returns an Award", function () {
            const award = Award.fromJS({
                ...stubAwardJs,
                date: DateTime.fromISO(stubAwardJs.date).toJSDate()
            });

            expect(award).to.be.ok;
            expect(award).to.be.instanceOf(Award);
            expect(award.title).to.eql(stubAwardJs.title);
            expect(award.awarder).to.eql(stubAwardJs.awarder);
            expect(award.date).to.be.instanceOf(DateTime);
            expect(award.date).to.eql(DateTime.fromISO(stubAwardJs.date));
            expect(award.summary).to.eql(stubAwardJs.summary);
        });

        it("returns an empty Award", function () {
            const award = Award.fromJS();

            expect(award).to.be.ok;
            expect(award).to.be.instanceOf(Award);
            expect(award.date).to.eql(null);
        });
    });

    describe(".fromJSON", function () {
        it("returns an Award", function () {
            const award = Award.fromJSON({
                ...stubAwardJs
            });

            expect(award).to.be.ok;
            expect(award).to.be.instanceOf(Award);
            expect(award.title).to.eql(stubAwardJs.title);
            expect(award.awarder).to.eql(stubAwardJs.awarder);
            expect(award.date).to.be.instanceOf(DateTime);
            expect(award.date).to.eql(DateTime.fromISO(stubAwardJs.date));
            expect(award.summary).to.eql(stubAwardJs.summary);
        });

        it("returns an empty Award", function () {
            const award = Award.fromJSON();

            expect(award).to.be.ok;
            expect(award).to.be.instanceOf(Award);
            expect(award.date).to.eql(null);
        });
    });

    describe(".fromResume", function () {
        it("returns an Award", function () {
            const award = Award.fromResume({
                ...stubAwardJs
            });

            expect(award).to.be.ok;
            expect(award).to.be.instanceOf(Award);
            expect(award.title).to.eql(stubAwardJs.title);
            expect(award.awarder).to.eql(stubAwardJs.awarder);
            expect(award.date).to.be.instanceOf(DateTime);
            expect(award.date).to.eql(DateTime.fromISO(stubAwardJs.date));
            expect(award.summary).to.eql(stubAwardJs.summary);
        });

        it("returns an empty Award", function () {
            const award = Award.fromResume();

            expect(award).to.be.ok;
            expect(award).to.be.instanceOf(Award);
            expect(award.date).to.eql(null);
        });
    });
});
