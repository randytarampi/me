import {expect} from "chai";
import LetterSection from "../../../lib/letterSection";
import Person from "../../../lib/person";
import Letter from "../../../lib/letter";
import {List, Map} from "immutable";

describe("Letter", function () {
    let stubPersonJs;
    let stubSenderJs;
    let stubRecipientJs;
    let stubLetterJs;
    let stubLetterSectionJs;

    beforeEach(function () {
        stubPersonJs = {
            name: null,
            firstName: "Woof",
            lastName: "Woof",
            worksFor: null,
            jobTitle: null,
            label: "Woof",
            picture: null,
            email: "woof@randytarampi.ca",
            phone: "+1234567890",
            website: "woof.woof/woof",
            summary: "Woof woof woof",
            location: {
                address: "woof",
                postalCode: "meow",
                city: "grr",
                countryCode: "CA",
                region: "BC"
            }
        };
        stubSenderJs = Object.assign({}, stubPersonJs);
        stubRecipientJs = Object.assign({}, stubPersonJs, {firstName: "Meow", email: "meow@randytarampi.ca"});

        stubLetterSectionJs = {
            contentKey: "woof",
            sectionId: "meow",
            contentProps: {
                grr: "rawr"
            },
            component: null
        };
        stubLetterJs = {
            sender: stubSenderJs,
            recipient: stubRecipientJs,
            id: "foo",
            fileName: null,
            content: [
                stubLetterSectionJs
            ],
            renderOptions: {
                format: "bar"
            }
        };
    });

    describe("constructor", function () {
        it("returns a Letter", function () {
            const letter = new Letter({
                ...stubLetterJs,
                sender: Person.fromJS(stubLetterJs.sender),
                recipient: Person.fromJS(stubLetterJs.recipient),
                content: List(stubLetterJs.content.map(LetterSection.fromJS)),
                renderOptions: Map(stubLetterJs.renderOptions)
            });

            expect(letter).to.be.ok;
            expect(letter).to.be.instanceOf(Letter);
            expect(letter.sender).to.be.instanceOf(Person);
            expect(letter.sender.firstName).to.eql(stubSenderJs.firstName);
            expect(letter.recipient).to.be.instanceOf(Person);
            expect(letter.recipient.firstName).to.eql(stubRecipientJs.firstName);
            expect(letter.content).to.be.instanceOf(List);
            letter.content.map(letterContent => {
                expect(letterContent).to.be.instanceOf(LetterSection);
                expect(letterContent.sectionId).to.eql(stubLetterSectionJs.sectionId);
            });
            expect(letter.renderOptions).to.be.instanceOf(Map);
            expect(letter.renderOptions.get("format")).to.eql("bar");
        });
    });

    describe(".fromJS", function () {
        it("returns a Letter", function () {
            const letter = Letter.fromJS(stubLetterJs);

            expect(letter).to.be.ok;
            expect(letter).to.be.instanceOf(Letter);
            expect(letter.sender).to.be.instanceOf(Person);
            expect(letter.sender.firstName).to.eql(stubSenderJs.firstName);
            expect(letter.recipient).to.be.instanceOf(Person);
            expect(letter.recipient.firstName).to.eql(stubRecipientJs.firstName);
            expect(letter.content).to.be.instanceOf(List);
            letter.content.map(letterContent => {
                expect(letterContent).to.be.instanceOf(LetterSection);
                expect(letterContent.sectionId).to.eql(stubLetterSectionJs.sectionId);
            });
            expect(letter.renderOptions).to.be.instanceOf(Map);
            expect(letter.renderOptions.get("format")).to.eql("bar");
        });
    });

    describe(".fromJSON", function () {
        it("returns a Letter", function () {
            const letter = Letter.fromJSON(stubLetterJs);

            expect(letter).to.be.ok;
            expect(letter).to.be.instanceOf(Letter);
            expect(letter.sender).to.be.instanceOf(Person);
            expect(letter.sender.firstName).to.eql(stubSenderJs.firstName);
            expect(letter.recipient).to.be.instanceOf(Person);
            expect(letter.recipient.firstName).to.eql(stubRecipientJs.firstName);
            expect(letter.content).to.be.instanceOf(List);
            letter.content.map(letterContent => {
                expect(letterContent).to.be.instanceOf(LetterSection);
                expect(letterContent.sectionId).to.eql(stubLetterSectionJs.sectionId);
            });
            expect(letter.renderOptions).to.be.instanceOf(Map);
            expect(letter.renderOptions.get("format")).to.eql("bar");
        });
    });

    describe("#basics", function () {
        it("returns the `sender`", function () {
            const letter = Letter.fromJSON(stubLetterJs);

            expect(letter).to.be.ok;
            expect(letter).to.be.instanceOf(Letter);
            expect(letter.basics).to.eql(letter.sender);
        });
    });

    describe("#pdfRenderOptions", function () {
        it("returns `renderOptions` as JS Object", function () {
            const letter = Letter.fromJSON(stubLetterJs);

            expect(letter).to.be.ok;
            expect(letter).to.be.instanceOf(Letter);
            expect(letter.pdfRenderOptions).to.eql(stubLetterJs.renderOptions);
        });
    });

    describe("#pageSize", function () {
        it("returns `renderOptions.format`", function () {
            const letter = Letter.fromJSON(stubLetterJs);

            expect(letter).to.be.ok;
            expect(letter).to.be.instanceOf(Letter);
            expect(letter.pageSize).to.eql(stubLetterJs.renderOptions.format);
        });
    });

    describe("#fileName", function () {
        it("returns `fileName`", function () {
            stubLetterJs.fileName = "woof";
            const letter = Letter.fromJSON(stubLetterJs);

            expect(letter).to.be.ok;
            expect(letter).to.be.instanceOf(Letter);
            expect(letter.fileName).to.eql(stubLetterJs.fileName);
        });

        it("returns `id` if no `fileName`", function () {
            const letter = Letter.fromJSON(stubLetterJs);

            expect(letter).to.be.ok;
            expect(letter).to.be.instanceOf(Letter);
            expect(letter.fileName).to.eql(stubLetterJs.id);
        });
    });
});
