import {expect} from "chai";
import Reference from "../../../lib/reference";

describe("Reference", function () {
    let stubReferenceJs;

    beforeEach(function () {
        stubReferenceJs = {
            name: "Woof",
            reference: "Meow"
        };
    });

    describe("constructor", function () {
        it("returns a Reference", function () {
            const reference = new Reference({
                ...stubReferenceJs
            });

            expect(reference).to.be.ok;
            expect(reference).to.be.instanceOf(Reference);
            expect(reference.name).to.eql(stubReferenceJs.name);
            expect(reference.reference).to.eql(stubReferenceJs.reference);
        });

        it("returns an empty Reference", function () {
            const reference = new Reference();

            expect(reference).to.be.ok;
            expect(reference).to.be.instanceOf(Reference);
        });
    });

    describe(".fromJS", function () {
        it("returns a Reference", function () {
            const reference = Reference.fromJS({
                ...stubReferenceJs
            });

            expect(reference).to.be.ok;
            expect(reference).to.be.instanceOf(Reference);
            expect(reference.name).to.eql(stubReferenceJs.name);
            expect(reference.reference).to.eql(stubReferenceJs.reference);
        });

        it("returns an empty Reference", function () {
            const reference = Reference.fromJS();

            expect(reference).to.be.ok;
            expect(reference).to.be.instanceOf(Reference);
        });
    });

    describe(".fromJSON", function () {
        it("returns a Reference", function () {
            const reference = Reference.fromJSON({
                ...stubReferenceJs
            });

            expect(reference).to.be.ok;
            expect(reference).to.be.instanceOf(Reference);
            expect(reference.name).to.eql(stubReferenceJs.name);
            expect(reference.reference).to.eql(stubReferenceJs.reference);
        });

        it("returns an empty Reference", function () {
            const reference = Reference.fromJSON();

            expect(reference).to.be.ok;
            expect(reference).to.be.instanceOf(Reference);
        });
    });

    describe(".fromResume", function () {
        it("returns a Reference", function () {
            const reference = Reference.fromResume({
                ...stubReferenceJs
            });

            expect(reference).to.be.ok;
            expect(reference).to.be.instanceOf(Reference);
            expect(reference.name).to.eql(stubReferenceJs.name);
            expect(reference.reference).to.eql(stubReferenceJs.reference);
        });

        it("returns an empty Reference", function () {
            const reference = Reference.fromResume();

            expect(reference).to.be.ok;
            expect(reference).to.be.instanceOf(Reference);
        });
    });
});
