import {expect} from "chai";
import {List} from "immutable";
import Interest from "../../../lib/interest";

describe("Interest", function () {
    let stubInterestJs;

    beforeEach(function () {
        stubInterestJs = {
            name: "Woof",
            level: "Meow",
            keywords: [
                "Grr",
                "Rawr"
            ]
        };
    });

    describe("constructor", function () {
        it("returns an Interest", function () {
            const interest = new Interest({
                ...stubInterestJs,
                keywords: List(stubInterestJs.keywords)
            });

            expect(interest).to.be.ok;
            expect(interest).to.be.instanceOf(Interest);
            expect(interest.name).to.eql(stubInterestJs.name);
            expect(interest.level).to.eql(stubInterestJs.level);
            expect(interest.keywords).to.be.instanceOf(List);
            expect(interest.keywords).to.eql(List(stubInterestJs.keywords));
        });

        it("returns an empty Interest", function () {
            const interest = new Interest();

            expect(interest).to.be.ok;
            expect(interest).to.be.instanceOf(Interest);
            expect(interest.keywords).to.eql(List());
        });
    });

    describe(".fromJS", function () {
        it("returns an Interest", function () {
            const interest = Interest.fromJS({
                ...stubInterestJs
            });

            expect(interest).to.be.ok;
            expect(interest).to.be.instanceOf(Interest);
            expect(interest.name).to.eql(stubInterestJs.name);
            expect(interest.level).to.eql(stubInterestJs.level);
            expect(interest.keywords).to.be.instanceOf(List);
            expect(interest.keywords).to.eql(List(stubInterestJs.keywords));
        });

        it("returns an empty Interest", function () {
            const interest = Interest.fromJS();

            expect(interest).to.be.ok;
            expect(interest).to.be.instanceOf(Interest);
            expect(interest.keywords).to.eql(null);
        });
    });

    describe(".fromJSON", function () {
        it("returns an Interest", function () {
            const interest = Interest.fromJSON({
                ...stubInterestJs
            });

            expect(interest).to.be.ok;
            expect(interest).to.be.instanceOf(Interest);
            expect(interest.name).to.eql(stubInterestJs.name);
            expect(interest.level).to.eql(stubInterestJs.level);
            expect(interest.keywords).to.be.instanceOf(List);
            expect(interest.keywords).to.eql(List(stubInterestJs.keywords));
        });

        it("returns an empty Interest", function () {
            const interest = Interest.fromJSON();

            expect(interest).to.be.ok;
            expect(interest).to.be.instanceOf(Interest);
            expect(interest.keywords).to.eql(null);
        });
    });

    describe(".fromResume", function () {
        it("returns an Interest", function () {
            const interest = Interest.fromResume({
                ...stubInterestJs
            });

            expect(interest).to.be.ok;
            expect(interest).to.be.instanceOf(Interest);
            expect(interest.name).to.eql(stubInterestJs.name);
            expect(interest.level).to.eql(stubInterestJs.level);
            expect(interest.keywords).to.be.instanceOf(List);
            expect(interest.keywords).to.eql(List(stubInterestJs.keywords));
        });

        it("returns an empty Interest", function () {
            const interest = Interest.fromResume();

            expect(interest).to.be.ok;
            expect(interest).to.be.instanceOf(Interest);
            expect(interest.keywords).to.eql(null);
        });
    });
});
