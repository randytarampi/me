import {Person} from "@randy.tarampi/js";
import {expect} from "chai";
import {List, Map} from "immutable";
import Letter from "../../../../src/lib/letter";
import LetterSection from "../../../../src/lib/letterSection";

describe("Letter", function () {
    let stubPersonJs;
    let stubSenderJs;
    let stubRecipientJs;
    let stubLetterJs;
    let stubLetterSectionJs;

    beforeEach(function () {
        stubPersonJs = {
            name: null,
            givenName: "Woof",
            familyName: "Woof",
            worksFor: null,
            jobTitle: "Woof",
            picture: null,
            email: "woof@randytarampi.ca",
            telephone: "+16692216251",
            url: "woof.woof/woof",
            description: "Woof woof woof",
            address: {
                streetAddress: "woof",
                postalCode: "meow",
                addressLocality: "grr",
                addressCountry: "CA",
                addressRegion: "BC"
            }
        };
        stubSenderJs = Object.assign({}, stubPersonJs);
        stubRecipientJs = Object.assign({}, stubPersonJs, {givenName: "Meow", email: "meow@randytarampi.ca"});

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
            filename: null,
            content: [
                stubLetterSectionJs
            ],
            renderOptions: {
                format: "bar"
            },
            renderExpectations: {
                pages: "baz"
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

            expect(letter).to.be.instanceOf(Letter);
            expect(letter.sender).to.be.instanceOf(Person);
            expect(letter.sender.givenName).to.eql(stubSenderJs.givenName);
            expect(letter.recipient).to.be.instanceOf(Person);
            expect(letter.recipient.givenName).to.eql(stubRecipientJs.givenName);
            expect(letter.content).to.be.instanceOf(List);
            letter.content.map(letterContent => {
                expect(letterContent).to.be.instanceOf(LetterSection);
                expect(letterContent.sectionId).to.eql(stubLetterSectionJs.sectionId);
            });
            expect(letter.renderOptions).to.be.instanceOf(Map);
            expect(letter.renderOptions.get("format")).to.eql("bar");
        });

        it("returns an empty Letter", function () {
            const letter = new Letter();

            expect(letter).to.be.instanceOf(Letter);
        });
    });

    describe("fromJS", function () {
        it("returns a Letter", function () {
            const letter = Letter.fromJS(stubLetterJs);

            expect(letter).to.be.instanceOf(Letter);
            expect(letter.sender).to.be.instanceOf(Person);
            expect(letter.sender.givenName).to.eql(stubSenderJs.givenName);
            expect(letter.recipient).to.be.instanceOf(Person);
            expect(letter.recipient.givenName).to.eql(stubRecipientJs.givenName);
            expect(letter.content).to.be.instanceOf(List);
            letter.content.map(letterContent => {
                expect(letterContent).to.be.instanceOf(LetterSection);
                expect(letterContent.sectionId).to.eql(stubLetterSectionJs.sectionId);
            });
            expect(letter.renderOptions).to.be.instanceOf(Map);
            expect(letter.renderOptions.get("format")).to.eql("bar");
        });

        it("returns an empty Letter", function () {
            const letter = Letter.fromJS();

            expect(letter).to.be.instanceOf(Letter);
        });
    });

    describe("fromJSON", function () {
        it("returns a Letter", function () {
            const letter = Letter.fromJSON(stubLetterJs);

            expect(letter).to.be.instanceOf(Letter);
            expect(letter.sender).to.be.instanceOf(Person);
            expect(letter.sender.givenName).to.eql(stubSenderJs.givenName);
            expect(letter.recipient).to.be.instanceOf(Person);
            expect(letter.recipient.givenName).to.eql(stubRecipientJs.givenName);
            expect(letter.content).to.be.instanceOf(List);
            letter.content.map(letterContent => {
                expect(letterContent).to.be.instanceOf(LetterSection);
                expect(letterContent.sectionId).to.eql(stubLetterSectionJs.sectionId);
            });
            expect(letter.renderOptions).to.be.instanceOf(Map);
            expect(letter.renderOptions.get("format")).to.eql("bar");
        });

        it("returns an empty Letter", function () {
            const letter = Letter.fromJSON();

            expect(letter).to.be.instanceOf(Letter);
        });
    });

    describe("basics", function () {
        it("returns the `sender`", function () {
            const letter = Letter.fromJS(stubLetterJs);

            expect(letter).to.be.instanceOf(Letter);
            expect(letter.basics).to.eql(letter.sender);
        });
    });

    describe("pdfRenderOptions", function () {
        it("returns `renderOptions` as JS Object", function () {
            const letter = Letter.fromJS(stubLetterJs);

            expect(letter).to.be.instanceOf(Letter);
            expect(letter.pdfRenderOptions).to.eql(stubLetterJs.renderOptions);
        });

        it("returns `null` if no `renderOptions`", function () {
            delete stubLetterJs.renderOptions;

            const letter = Letter.fromJS(stubLetterJs);

            expect(letter).to.be.instanceOf(Letter);
            expect(letter.pdfRenderOptions).to.eql(null);
        });
    });

    describe("pdfRenderExpectations", function () {
        it("returns `renderExpectations` as JS Object", function () {
            const letter = Letter.fromJS(stubLetterJs);

            expect(letter).to.be.instanceOf(Letter);
            expect(letter.pdfRenderExpectations).to.eql(stubLetterJs.renderExpectations);
        });

        it("returns `null` if no `renderExpectations`", function () {
            delete stubLetterJs.renderExpectations;

            const letter = Letter.fromJS(stubLetterJs);

            expect(letter).to.be.instanceOf(Letter);
            expect(letter.pdfRenderExpectations).to.eql(null);
        });
    });

    describe("pageSize", function () {
        it("returns `renderOptions.format`", function () {
            const letter = Letter.fromJS(stubLetterJs);

            expect(letter).to.be.instanceOf(Letter);
            expect(letter.pageSize).to.eql(stubLetterJs.renderOptions.format);
        });

        it("returns `null` if no `renderOptions`", function () {
            delete stubLetterJs.renderOptions;

            const letter = Letter.fromJS(stubLetterJs);

            expect(letter).to.be.instanceOf(Letter);
            expect(letter.pdfRenderOptions).to.eql(null);
        });
    });

    describe("filename", function () {
        it("returns `filename`", function () {
            stubLetterJs.filename = "woof";
            const letter = Letter.fromJS(stubLetterJs);

            expect(letter).to.be.instanceOf(Letter);
            expect(letter.filename).to.eql(stubLetterJs.filename);
        });

        it("returns `id` if no `filename`", function () {
            const letter = Letter.fromJS(stubLetterJs);

            expect(letter).to.be.instanceOf(Letter);
            expect(letter.filename).to.eql(stubLetterJs.id);
        });
    });

    describe("pdfMetadata", function () {
        it("returns ExifTool parsable tags", function () {
            const letter = Letter.fromJS(stubLetterJs);

            expect(letter).to.be.instanceOf(Letter);
            expect(letter.pdfMetadata).to.eql({
                Author: letter.basics.name,
                Creator: letter.basics.name,
                Producer: letter.basics.name,
                Subject: letter.basics.name,
                Title: letter.basics.name,
                Keywords: [
                    "cover letter",
                    "@randy.tarampi/letter",
                    letter.basics.name,
                    letter.basics.label,
                    letter.basics.website,
                    letter.basics.phone,
                    letter.basics.email,
                    letter.filename
                ]
            });
        });
    });
});
