import {expect} from "chai";
import {Map} from "immutable";
import LetterSection from "../../../../src/lib/letterSection";

describe("LetterSection", function () {
    describe("constructor", function () {
        it("returns a LetterSection", function () {
            const stubLetterSection = {
                contentKey: "woof",
                sectionId: "meow",
                contentProps: Map({
                    meow: 1
                }),
                component: "grr"
            };
            const letterSection = new LetterSection(stubLetterSection);

            expect(letterSection).to.be.ok;
            expect(letterSection).to.be.instanceOf(LetterSection);
            expect(letterSection.contentKey).to.eql(stubLetterSection.contentKey);
            expect(letterSection.sectionId).to.eql(stubLetterSection.sectionId);
            expect(letterSection.contentProps).to.eql(stubLetterSection.contentProps.toJS());
            expect(letterSection.contentProps).to.eql(letterSection.get("contentProps").toJS());
            expect(letterSection.contentProps).to.be.instanceOf(Object);
            expect(letterSection.component).to.eql(stubLetterSection.component);
        });
    });

    describe(".fromJS", function () {
        it("returns a LetterSection", function () {
            const stubLetterSection = {
                contentKey: "woof",
                sectionId: "meow",
                contentProps: {
                    meow: 1
                },
                component: "grr"
            };
            const letterSection = LetterSection.fromJS(stubLetterSection);

            expect(letterSection).to.be.ok;
            expect(letterSection).to.be.instanceOf(LetterSection);
            expect(letterSection.contentKey).to.eql(stubLetterSection.contentKey);
            expect(letterSection.sectionId).to.eql(stubLetterSection.sectionId);
            expect(letterSection.contentProps).to.eql(stubLetterSection.contentProps);
            expect(letterSection.contentProps).to.eql(letterSection.get("contentProps").toJS());
            expect(letterSection.contentProps).to.be.instanceOf(Object);
            expect(letterSection.component).to.eql(stubLetterSection.component);
        });
    });

    describe(".fromJSON", function () {
        it("returns a LetterSection", function () {
            const stubLetterSection = {
                contentKey: "woof",
                sectionId: "meow",
                contentProps: {
                    meow: 1
                },
                component: "grr"
            };
            const letterSection = LetterSection.fromJSON(stubLetterSection);

            expect(letterSection).to.be.ok;
            expect(letterSection.contentKey).to.eql(stubLetterSection.contentKey);
            expect(letterSection.sectionId).to.eql(stubLetterSection.sectionId);
            expect(letterSection.contentProps).to.eql(stubLetterSection.contentProps);
            expect(letterSection.contentProps).to.eql(letterSection.get("contentProps").toJS());
            expect(letterSection.contentProps).to.be.instanceOf(Object);
            expect(letterSection.component).to.eql(stubLetterSection.component);
        });
    });
});
