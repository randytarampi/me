import {expect} from "chai";
import {Map} from "immutable";
import LetterSection from "../../../../src/lib/letterSection";

describe("LetterSection", function () {
    describe("constructor", function () {
        it("returns a LetterSection", function () {
            const stubLetterSection = {
                contentKey: "woof",
                sectionId: "meow",
                sectionProps: Map({
                    woof: -1
                }),
                contentProps: Map({
                    meow: 1
                }),
                component: "grr"
            };
            const letterSection = new LetterSection(stubLetterSection);

            expect(letterSection).to.be.instanceOf(LetterSection);
            expect(letterSection.contentKey).to.eql(stubLetterSection.contentKey);
            expect(letterSection.sectionId).to.eql(stubLetterSection.sectionId);
            expect(letterSection.sectionProps).to.eql(stubLetterSection.sectionProps.toJS());
            expect(letterSection.sectionProps).to.eql(letterSection.get("sectionProps").toJS());
            expect(letterSection.sectionProps).to.be.instanceOf(Object);
            expect(letterSection.contentProps).to.eql(stubLetterSection.contentProps.toJS());
            expect(letterSection.contentProps).to.eql(letterSection.get("contentProps").toJS());
            expect(letterSection.contentProps).to.be.instanceOf(Object);
            expect(letterSection.component).to.eql(stubLetterSection.component);
        });
    });

    describe("fromJS", function () {
        it("returns a LetterSection", function () {
            const stubLetterSection = {
                contentKey: "woof",
                sectionId: "meow",
                sectionProps: {
                    woof: -1
                },
                contentProps: {
                    meow: 1
                },
                component: "grr"
            };
            const letterSection = LetterSection.fromJS(stubLetterSection);

            expect(letterSection).to.be.instanceOf(LetterSection);
            expect(letterSection.contentKey).to.eql(stubLetterSection.contentKey);
            expect(letterSection.sectionId).to.eql(stubLetterSection.sectionId);
            expect(letterSection.sectionProps).to.eql(stubLetterSection.sectionProps);
            expect(letterSection.sectionProps).to.eql(letterSection.get("sectionProps").toJS());
            expect(letterSection.sectionProps).to.be.instanceOf(Object);
            expect(letterSection.contentProps).to.eql(stubLetterSection.contentProps);
            expect(letterSection.contentProps).to.eql(letterSection.get("contentProps").toJS());
            expect(letterSection.contentProps).to.be.instanceOf(Object);
            expect(letterSection.component).to.eql(stubLetterSection.component);
        });
    });

    describe("fromJSON", function () {
        it("returns a LetterSection", function () {
            const stubLetterSection = {
                contentKey: "woof",
                sectionId: "meow",
                sectionProps: {
                    woof: -1
                },
                contentProps: {
                    meow: 1
                },
                component: "grr"
            };
            const letterSection = LetterSection.fromJSON(stubLetterSection);

            expect(letterSection.contentKey).to.eql(stubLetterSection.contentKey);
            expect(letterSection.sectionId).to.eql(stubLetterSection.sectionId);
            expect(letterSection.sectionProps).to.eql(stubLetterSection.sectionProps);
            expect(letterSection.sectionProps).to.eql(letterSection.get("sectionProps").toJS());
            expect(letterSection.sectionProps).to.be.instanceOf(Object);
            expect(letterSection.contentProps).to.eql(stubLetterSection.contentProps);
            expect(letterSection.contentProps).to.eql(letterSection.get("contentProps").toJS());
            expect(letterSection.contentProps).to.be.instanceOf(Object);
            expect(letterSection.component).to.eql(stubLetterSection.component);
        });
    });
});
